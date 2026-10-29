"use client";
import { SKILLS, STAGE_NAMES } from "@/content/skills";
import { Avatar } from "@/components/avatar/Avatar";
import { InstantLink } from "@/components/system/InstantLink";
import type { AvatarConfig } from "@/content/avatar";

type P = { skill_id:string; stage:number; xp:number };
type C = { skillId:string; skillName:string; rewardName:string; targetCorrect:number; roundSize:number } | null;

export function LearnerHome({
  learnerId, learnerName, avatar, progress, challenge,
}: {
  learnerId:string; learnerName:string; avatar:AvatarConfig; progress:P[]; challenge:C;
}) {
  const by = new Map(progress.map((p)=>[p.skill_id,p]));
  const stars = progress.reduce((s,p)=>s+(Math.max(1,p.stage)-1)*30+p.xp,0);
  const sections = [
    { id:"maths" as const, label:"Maths", icon:"🔮" },
    { id:"english" as const, label:"English", icon:"📖" },
    { id:"science" as const, label:"Science", icon:"🔬" },
  ];

  return <>
    <section className="learningHero">
      <div className="heroIdentity">
        <Avatar config={avatar} size={74}/>
        <div><p className="eyebrow">Ready to learn?</p><h1>Hi {learnerName} 👋</h1><p className="muted">Pick something that looks fun.</p></div>
      </div>
      <InstantLink className="starPill" href={`/learn/${learnerId}/rewards`}>⭐ {stars}</InstantLink>
    </section>

    {challenge ? <InstantLink className="bonusChallenge" href={`/learn/${learnerId}/${challenge.skillId}`}>
      <span className="bonusIcon">🕶️</span>
      <span><strong>Bonus challenge</strong><small>Get {challenge.targetCorrect}/{challenge.roundSize} in {challenge.skillName} now to unlock sunglasses.</small></span>
      <b>›</b>
    </InstantLink> : null}

    {sections.map((subject)=><section className="subjectSection" key={subject.id}>
      <div className="subjectHeading"><h2>{subject.label}</h2><span>{subject.icon}</span></div>
      <div className="topicGrid">
        {SKILLS.filter((skill)=>skill.subject===subject.id).map((skill)=>{
          const p=by.get(skill.id)??{stage:1,xp:0};
          const stage=Math.max(1,Math.min(8,p.stage));
          return <InstantLink className={`topicCard ${subject.id}`} href={`/learn/${learnerId}/${skill.id}`} key={skill.id}>
            <div className="topicIcon">{skill.icon}</div>
            <div className="topicCopy"><strong>{skill.name}</strong><span>{STAGE_NAMES[stage-1]} · {p.xp}/30</span></div>
            <div className="topicArrow">›</div>
          </InstantLink>;
        })}
      </div>
    </section>)}
  </>;
}
