"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { generateQuestion } from "@/learning/generate-question";
import { validateQuestion } from "@/learning/validate-question";
import type { LearningQuestion } from "@/learning/types";
import { ChoiceVisual, QuestionVisual } from "./QuestionVisual";
import { ScienceLessonCard } from "./ScienceLessonCard";
import { getScienceLesson, getScienceLessonCount, scienceQuestionAt } from "@/content/science-lessons";
import { getReward, pickReward, rewardInterval, type Reward } from "@/content/rewards";

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
  initialStars,
  initialScienceLessonIndex,
  initialRewardIds,
  initialRewardSequence,
  initialNextRewardAt,
  bonusRewardId,
  bonusTargetCorrect,
}: {
  learnerId: string;
  skillId: string;
  skillName: string;
  initialStage: number;
  initialXp: number;
  initialStars: number;
  initialScienceLessonIndex?: number;
  initialRewardIds: string[];
  initialRewardSequence: number;
  initialNextRewardAt: number | null;
  bonusRewardId?: string;
  bonusTargetCorrect?: number;
}) {
  const router = useRouter();
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
  const [bonusUnlockedName, setBonusUnlockedName] = useState<string | null>(null);
  const [totalStars, setTotalStars] = useState(initialStars);
  const [earnedRewardIds, setEarnedRewardIds] = useState(initialRewardIds);
  const [rewardSequence, setRewardSequence] = useState(initialRewardSequence);
  const [nextRewardAt, setNextRewardAt] = useState<number | null>(initialNextRewardAt);
  const [earnedNow, setEarnedNow] = useState<Reward[]>([]);
  const [rewardPopupOpen, setRewardPopupOpen] = useState(false);
  const [restored, setRestored] = useState(false);
  const [scienceLessonIndex, setScienceLessonIndex] = useState(initialScienceLessonIndex ?? 0);
  const scienceLessonCount = getScienceLessonCount(skillId);
  const scienceLesson = useMemo(() => getScienceLesson(skillId, scienceLessonIndex), [skillId, scienceLessonIndex]);
  const [lessonStarted, setLessonStarted] = useState(false);
  const roundSize = scienceLesson ? SCIENCE_ROUND_SIZE : DEFAULT_ROUND_SIZE;
  const storageKey = `brightspark:round:${learnerId}:${skillId}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as {version:number;stage:number;xp:number;scienceLessonIndex?:number;index:number;answers:typeof answers;seeds:number[];lessonStarted:boolean};
        if (saved.version===2 && saved.stage===initialStage && saved.xp===initialXp && (saved.scienceLessonIndex??scienceLessonIndex)===scienceLessonIndex && Array.isArray(saved.seeds) && saved.seeds.length>=roundSize && saved.index>=0 && saved.index<roundSize) {
          setSeeds(saved.seeds);
          setIndex(saved.index);
          setAnswers(Array.isArray(saved.answers)?saved.answers:[]);
          setLessonStarted(Boolean(saved.lessonStarted));
          setSelected(null);
          setStartedAt(Date.now());
        }
      }
    } catch {}
    setRestored(true);
  }, [storageKey, initialStage, initialXp, roundSize, scienceLessonIndex]);

  function persistRound(nextIndex:number,nextAnswers:typeof answers,nextLessonStarted=lessonStarted) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({version:2,stage:initialStage,xp:initialXp,scienceLessonIndex,index:nextIndex,answers:nextAnswers,seeds,lessonStarted:nextLessonStarted}));
    } catch {}
  }

  function clearSavedRound() {
    try { window.localStorage.removeItem(storageKey); } catch {}
  }

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
      persistRound(index + 1, nextAnswers);
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

      const oldSkillStars=(Math.max(1,stage)-1)*30+xp;
      const nextSkillStars=(Math.max(1,nextStage)-1)*30+nextXp;
      const nextTotalStars=Math.max(0,totalStars-oldSkillStars+nextSkillStars);
      await supabase.from("learner_skill_progress").upsert({
        learner_id: learnerId,
        skill_id: skillId,
        stage: nextStage,
        xp: nextXp,
        last_practised_at: new Date().toISOString(),
      });

      let updatedRewardIds=[...earnedRewardIds];
      let updatedSequence=rewardSequence;
      let updatedNextRewardAt=nextRewardAt??rewardInterval(learnerId,rewardSequence);
      const newlyEarned:Reward[]=[];
      if(nextTotalStars>=updatedNextRewardAt){
        const reward=pickReward(learnerId,updatedSequence,updatedRewardIds);
        if(reward){
          const {error:rewardInsertError}=await supabase.from("learner_rewards").upsert({
            learner_id:learnerId,reward_id:reward.id,source:"surprise",metadata:{earned_at_stars:nextTotalStars}
          },{onConflict:"learner_id,reward_id",ignoreDuplicates:true});
          if(!rewardInsertError){
            updatedRewardIds=[...updatedRewardIds,reward.id];
            newlyEarned.push(reward);
            updatedSequence+=1;
            updatedNextRewardAt=nextTotalStars+rewardInterval(learnerId,updatedSequence);
          }
        }
      }
      await supabase.from("learner_reward_state").upsert({
        learner_id:learnerId,next_reward_star:updatedNextRewardAt,reward_sequence:updatedSequence,updated_at:new Date().toISOString()
      });

      if (scienceLesson && scienceLessonCount > 0) {
        const nextLessonIndex=(scienceLessonIndex+1)%scienceLessonCount;
        await supabase.from("learner_science_progress").upsert({
          learner_id:learnerId,
          skill_id:skillId,
          lesson_index:nextLessonIndex,
          updated_at:new Date().toISOString(),
        });
      }

      let earnedBonusName:string|null=null;
      if (bonusRewardId && correct >= (bonusTargetCorrect ?? Math.ceil(roundSize * 0.8))) {
        let challengeReward=getReward(bonusRewardId)??null;
        if(challengeReward&&updatedRewardIds.includes(challengeReward.id))challengeReward=pickReward(learnerId,updatedSequence+10000,updatedRewardIds);
        if(challengeReward){
          const {error:rewardError}=await supabase.from("learner_rewards").upsert({
            learner_id:learnerId,reward_id:challengeReward.id,source:"challenge",metadata:{skill_id:skillId}
          },{onConflict:"learner_id,reward_id",ignoreDuplicates:true});
          if(!rewardError){
            updatedRewardIds=[...updatedRewardIds,challengeReward.id];
            if(!newlyEarned.some(x=>x.id===challengeReward!.id))newlyEarned.push(challengeReward);
            earnedBonusName=challengeReward.name;
            await supabase.from("reward_challenges").insert({
              learner_id:learnerId,skill_id:skillId,reward_id:challengeReward.id,challenge_type:"avoided_topic",status:"completed",
              criteria:{target_correct:bonusTargetCorrect??Math.ceil(roundSize*.8),round_size:roundSize},completed_at:new Date().toISOString()
            });
          }
        }
      }

      setStage(nextStage);
      setXp(nextXp);
      setTotalStars(nextTotalStars);
      setEarnedRewardIds(updatedRewardIds);
      setRewardSequence(updatedSequence);
      setNextRewardAt(updatedNextRewardAt);
      setBonusUnlockedName(earnedBonusName);
      setAnswers(nextAnswers);
      setEarnedNow(newlyEarned);
      if(newlyEarned.length)setRewardPopupOpen(true);
      clearSavedRound();
      router.refresh();
      emitFeedback("complete");
    } finally {
      setSaving(false);
      setDone(true);
    }
  }

  function playAgain() {
    if(scienceLesson && scienceLessonCount>0)setScienceLessonIndex((scienceLessonIndex+1)%scienceLessonCount);
    setSeeds(seedsForRound());
    setIndex(0);
    setAnswers([]);
    setSelected(null);
    setStartedAt(Date.now());
    setDone(false);
    setLessonStarted(false);
    clearSavedRound();
    setEarnedNow([]);
    setBonusUnlockedName(null);
    setRewardPopupOpen(false);
    setRoundKey((v) => v + 1);
  }

  if (!restored) {
    return <section className="routeLoading" role="status"><span className="routeSpinner" aria-hidden="true"/><strong>Loading…</strong></section>;
  }

  if (scienceLesson && !lessonStarted && !done) {
    return <ScienceLessonCard lesson={scienceLesson} lessonNumber={scienceLessonIndex+1} lessonTotal={scienceLessonCount} onStart={() => { setLessonStarted(true); setStartedAt(Date.now()); persistRound(index, answers, true); }} />;
  }

  if (done) {
    const score = answers.filter((a) => a.correct).length;
    return (
      <>
      {rewardPopupOpen && earnedNow.length ? <div className="rewardModalBackdrop" role="dialog" aria-modal="true" aria-label="New reward earned"><div className="rewardModal"><div className="rewardModalIcon">{earnedNow.map(r=>r.icon).join(" ")}</div><p className="eyebrow">New reward{earnedNow.length>1?"s":""}!</p><h2>{earnedNow.map(r=>r.name).join(", ")}</h2><p>You earned {earnedNow.length>1?"these rewards":"this reward"} with your stars.</p><div className="rewardModalActions"><button className="primaryButton" onClick={()=>{setRewardPopupOpen(false);router.push(`/learn/${learnerId}/rewards`);router.refresh();}}>Go to rewards</button><button className="secondaryButton" onClick={()=>setRewardPopupOpen(false)}>Keep learning</button></div></div></div>:null}
      <section className="finishCard">
        <div className="finishEmoji">{score >= 4 ? "🌟" : score >= 3 ? "👏" : "💪"}</div>
        <h1>{score}/{roundSize} correct</h1>
        <p>{score === roundSize ? "Perfect round!" : score >= Math.ceil(roundSize * 0.6) ? "Nice work!" : "Good practice — every round helps."}</p>
        {bonusUnlockedName ? <div className="bonusUnlocked">🎁 Bonus reward unlocked: {bonusUnlockedName}!</div> : null}
        <div className="roundProgress">{scienceLesson ? `Lesson ${scienceLessonIndex+1} of ${scienceLessonCount} complete · ` : ""}Stage {stage} · {xp}/30 XP</div>
        <div className="finishActions">
          <button className="primaryButton" onClick={playAgain}>{scienceLesson ? "Next lesson" : "Play again"}</button>
          <button className="secondaryButton" onClick={()=>{router.push(`/learn/${learnerId}`);router.refresh();}}>Back to topics</button>
        </div>
      </section>
      </>
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
