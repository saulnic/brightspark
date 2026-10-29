import{SKILLS}from"@/content/skills";
export type ChallengeSession={skill_id:string;completed_at:string|null};
export function getAvoidedSkillChallenge(sessions:ChallengeSession[],lastChallengeAt:string|null=null){
 const completed=sessions.filter(x=>x.completed_at);
 if(completed.length<10)return null;
 if(lastChallengeAt){const after=completed.filter(x=>new Date(x.completed_at!).getTime()>new Date(lastChallengeAt).getTime());if(after.length<8)return null;}
 const counts=new Map<string,number>(),last=new Map<string,string>();
 for(const session of completed){counts.set(session.skill_id,(counts.get(session.skill_id)??0)+1);const p=last.get(session.skill_id);if(!p||new Date(session.completed_at!).getTime()>new Date(p).getTime())last.set(session.skill_id,session.completed_at!);}
 const ranked=SKILLS.map((skill,index)=>({skill,index,count:counts.get(skill.id)??0,last:last.get(skill.id)??null})).sort((a,b)=>a.count-b.count||(a.last&&b.last?new Date(a.last).getTime()-new Date(b.last).getTime():a.last?1:b.last?-1:a.index-b.index));
 const most=Math.max(...SKILLS.map(skill=>counts.get(skill.id)??0)),least=ranked[0]?.count??0;if(most-least<3)return null;
 const t=ranked[0]?.skill;if(!t)return null;const roundSize=t.subject==="science"?10:5;return{skillId:t.id,skillName:t.name,targetCorrect:Math.ceil(roundSize*.8),roundSize};
}
