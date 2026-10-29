"use client";

import { SKILLS, STAGE_NAMES } from "@/content/skills";
import { Avatar } from "@/components/avatar/Avatar";
import type { AvatarConfig } from "@/content/avatar";

type Progress = { skill_id: string; stage: number; xp: number };

export function LearnerHome({
  learnerId,
  learnerName,
  avatar,
  progress,
}: {
  learnerId: string;
  learnerName: string;
  avatar: AvatarConfig;
  progress: Progress[];
}) {
  const bySkill = new Map(progress.map((p) => [p.skill_id, p]));

  return (
    <>
      <section className="learningHero">
        <div className="heroIdentity">
          <Avatar config={avatar} size={74} />
          <div>
            <p className="eyebrow">Ready to learn?</p>
            <h1>Hi {learnerName} 👋</h1>
            <p className="muted">Pick something that looks fun.</p>
          </div>
        </div>
        <div className="starPill">⭐ {progress.reduce((sum, p) => sum + p.xp, 0)}</div>
      </section>

      <nav className="utilityRow" aria-label="Learner tools">
        <a href={`/learn/${learnerId}/progress`}>📊 Progress</a>
        <a href={`/learn/${learnerId}/avatar`}>🎨 Avatar</a>
      </nav>

      {(["maths", "english"] as const).map((subject) => (
        <section className="subjectSection" key={subject}>
          <div className="subjectHeading">
            <h2>{subject === "maths" ? "Maths" : "English"}</h2>
            <span>{subject === "maths" ? "🔮" : "📖"}</span>
          </div>
          <div className="topicGrid">
            {SKILLS.filter((skill) => skill.subject === subject).map((skill) => {
              const p = bySkill.get(skill.id) ?? { stage: 1, xp: 0 };
              const stage = Math.max(1, Math.min(8, p.stage));
              return (
                <a className={`topicCard ${subject}`} href={`/learn/${learnerId}/${skill.id}`} key={skill.id}>
                  <div className="topicIcon">{skill.icon}</div>
                  <div className="topicCopy">
                    <strong>{skill.name}</strong>
                    <span>{STAGE_NAMES[stage - 1]} · {p.xp}/30</span>
                  </div>
                  <div className="topicArrow">›</div>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
