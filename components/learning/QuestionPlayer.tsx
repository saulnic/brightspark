"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { generateQuestion } from "@/learning/generate-question";
import { validateQuestion } from "@/learning/validate-question";
import type { LearningQuestion } from "@/learning/types";
import { ChoiceVisual, QuestionVisual } from "./QuestionVisual";
import { ScienceLessonCard } from "./ScienceLessonCard";
import { getScienceLesson, scienceQuestionAt } from "@/content/science-lessons";

const DEFAULT_ROUND_SIZE = 5;
const SCIENCE_ROUND_SIZE = 10;

function seedsForRound(size = SCIENCE_ROUND_SIZE) {
  const base = Date.now() % 2_000_000_000;
  return Array.from({ length: size }, (_, i) => base + i * 7919);
}

function correctValue(question: LearningQuestion) {
  return question.choices.find((choice) => choice.id === question.correctChoiceId)?.value;
}

function conceptSignature(question: LearningQuestion) {
  const answer = String(correctValue(question) ?? "").toLowerCase();

  // For shape/property questions, "6 sides" and "6 corners" are effectively
  // the same concept when the answer is hexagon, so suppress by answer.
  if (question.skillId === "shapes") return `shapes:${answer}`;

  return `${question.objectiveId}:${answer}`;
}

function emitFeedback(type: "correct" | "incorrect" | "complete") {
  window.dispatchEvent(new CustomEvent("brightspark:feedback", { detail: { type } }));
}

export function QuestionPlayer({
  learnerId,
  skillId,
  skillName,
  initialStage,
  initialXp,
  bonusRewardId,
}: {
  learnerId: string;
  skillId: string;
  skillName: string;
  initialStage: number;
  initialXp: number;
  bonusRewardId?: string;
}) {
  const [roundKey, setRoundKey] = useState(0);
  const [seeds, setSeeds] = useState(seedsForRound);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<{ question: LearningQuestion; choiceId: string; correct: boolean; durationMs: number }[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState(Date.now());
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [stage, setStage] = useState(initialStage);
  const [xp, setXp] = useState(initialXp);
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const scienceLesson = useMemo(() => getScienceLesson(skillId, stage), [skillId, stage]);
  const [lessonStarted, setLessonStarted] = useState(false);
  const roundSize = scienceLesson ? SCIENCE_ROUND_SIZE : DEFAULT_ROUND_SIZE;

  const question = useMemo(() => {
    if (scienceLesson) {
      const candidate = scienceQuestionAt(scienceLesson, index, seeds[index]);
      const validation = validateQuestion(candidate);
      if (!validation.valid) throw new Error(validation.errors.join(" "));
      return candidate;
    }

    const used = new Set(answers.map((answer) => conceptSignature(answer.question)));
    let candidate = generateQuestion(skillId, stage, seeds[index]);

    for (let retry = 0; retry < 30 && used.has(conceptSignature(candidate)); retry++) {
      candidate = generateQuestion(skillId, stage, seeds[index] + (retry + 1) * 104729);
    }

    const validation = validateQuestion(candidate);
    if (!validation.valid) throw new Error(validation.errors.join(" "));
    return candidate;
  }, [skillId, stage, seeds, index, roundKey, answers, scienceLesson]);

  function choose(choiceId: string) {
    if (selected) return;
    setSelected(choiceId);
    emitFeedback(choiceId === question.correctChoiceId ? "correct" : "incorrect");
  }

  async function next() {
    if (!selected) return;
    const attempt = {
      question,
      choiceId: selected,
      correct: selected === question.correctChoiceId,
      durationMs: Date.now() - startedAt,
    };
    const nextAnswers = [...answers, attempt];

    if (index < roundSize - 1) {
      setAnswers(nextAnswers);
      setIndex(index + 1);
      setSelected(null);
      setStartedAt(Date.now());
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const correct = nextAnswers.filter((a) => a.correct).length;
      const incorrect = roundSize - correct;
      const { data: session } = await supabase
        .from("learning_sessions")
        .insert({
          learner_id: learnerId,
          skill_id: skillId,
          completed_at: new Date().toISOString(),
          question_count: roundSize,
          correct_count: correct,
          incorrect_count: incorrect,
        })
        .select("id")
        .single();

      if (session) {
        await supabase.from("question_attempts").insert(
          nextAnswers.map((a) => ({
            session_id: session.id,
            learner_id: learnerId,
            skill_id: skillId,
            learning_objective: a.question.objectiveId,
            difficulty: a.question.difficulty,
            question_type: a.question.questionType,
            question_seed: a.question.seed,
            content_version: a.question.contentVersion,
            question_key: a.question.id,
            correct: a.correct,
            answer_given: a.question.choices.find((c) => c.id === a.choiceId)?.value ?? null,
            correct_answer: a.question.choices.find((c) => c.id === a.question.correctChoiceId)?.value ?? null,
            duration_ms: a.durationMs,
          }))
        );
      }

      let nextXp = Math.max(0, xp + correct - incorrect);
      let nextStage = stage;
      while (nextXp >= 30 && nextStage < 8) {
        nextXp -= 30;
        nextStage += 1;
      }

      await supabase.from("learner_skill_progress").upsert({
        learner_id: learnerId,
        skill_id: skillId,
        stage: nextStage,
        xp: nextXp,
        last_practised_at: new Date().toISOString(),
      });

      if (bonusRewardId && correct >= 4) {
        const { data: learnerRow } = await supabase.from("learners").select("avatar_config").eq("id", learnerId).single();
        const current = (learnerRow?.avatar_config ?? {}) as Record<string, unknown>;
        const unlocked = Array.isArray(current.unlockedRewards) ? current.unlockedRewards.filter((value): value is string => typeof value === "string") : [];
        const nextUnlocked = Array.from(new Set([...unlocked, bonusRewardId]));
        const { error: rewardError } = await supabase.from("learners").update({ avatar_config: { ...current, unlockedRewards: nextUnlocked }, updated_at: new Date().toISOString() }).eq("id", learnerId);
        if (!rewardError) setBonusUnlocked(true);
      }

      setStage(nextStage);
      setXp(nextXp);
      setAnswers(nextAnswers);
      emitFeedback("complete");
    } finally {
      setSaving(false);
      setDone(true);
    }
  }

  function playAgain() {
    setSeeds(seedsForRound());
    setIndex(0);
    setAnswers([]);
    setSelected(null);
    setStartedAt(Date.now());
    setDone(false);
    setLessonStarted(false);
    setRoundKey((v) => v + 1);
  }

  if (scienceLesson && !lessonStarted && !done) {
    return <ScienceLessonCard lesson={scienceLesson} onStart={() => { setLessonStarted(true); setStartedAt(Date.now()); }} />;
  }

  if (done) {
    const score = answers.filter((a) => a.correct).length;
    return (
      <section className="finishCard">
        <div className="finishEmoji">{score >= 4 ? "🌟" : score >= 3 ? "👏" : "💪"}</div>
        <h1>{score}/{roundSize} correct</h1>
        <p>{score === roundSize ? "Perfect round!" : score >= Math.ceil(roundSize * 0.6) ? "Nice work!" : "Good practice — every round helps."}</p>
        {bonusUnlocked ? <div className="bonusUnlocked">🕶️ Bonus sunglasses unlocked!</div> : null}
        <div className="roundProgress">Stage {stage} · {xp}/30 XP</div>
        <div className="finishActions">
          <button className="primaryButton" onClick={playAgain}>Play again</button>
          <Link className="secondaryButton" href={`/learn/${learnerId}`} prefetch>Back to topics</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="questionShell">
      <header className="questionHeader">
        <Link href={`/learn/${learnerId}`} className="textButton" prefetch>← Topics</Link>
        <strong>{skillName}</strong>
        <span>{index + 1}/{roundSize}</span>
      </header>
      <div className="progressTrack"><div style={{ width: `${((index + 1) / roundSize) * 100}%` }} /></div>

      <section className="questionCard">
        <h1 className="questionPrompt">{question.prompt}</h1>
        <QuestionVisual question={question} />
        <div className={`answerGrid choices-${question.choices.length}`}>
          {question.choices.map((choice) => {
            const isSelected = selected === choice.id;
            const isCorrect = selected && choice.id === question.correctChoiceId;
            const isWrong = isSelected && selected !== question.correctChoiceId;
            return (
              <button
                key={choice.id}
                className={`answerButton ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                onClick={() => choose(choice.id)}
                disabled={Boolean(selected)}
              >
                <ChoiceVisual question={question} choice={choice} />
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className="feedbackRow">
            <strong>{selected === question.correctChoiceId ? "✅ Correct!" : "💡 Not quite"}</strong>
            <button className="primaryButton" onClick={next} disabled={saving}>
              {index === roundSize - 1 ? (saving ? "Saving…" : "Finish") : "Next"}
            </button>
          </div>
        ) : null}
      </section>
    </section>
  );
}
