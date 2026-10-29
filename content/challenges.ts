import{SKILLS}from"@/content/skills";
export type ChallengeSession={skill_id:string;completed_at:string|null};
export function getAvoidedSkillChallenge(sessions:ChallengeSession[],earned:string[]){
  if(earned.includes("sunglasses"))return null;
  const completed=sessions.filter(x=>x.completed_at);
  if(completed.length<10)return null;
  const counts=new Map<string,number>();
  const last=new Map<string,string>();
  for(const session of completed){
    counts.set(session.skill_id,(counts.get(session.skill_id)??0)+1);
    const previous=last.get(session.skill_id);
    if(!previous||new Date(session.completed_at!).getTime()>new Date(previous).getTime())last.set(session.skill_id,session.completed_at!);
  }
  const ranked=SKILLS.map((skill,index)=>({skill,index,count:counts.get(skill.id)??0,last:last.get(skill.id)??null}))
    .sort((a,b)=>a.count-b.count||(a.last&&b.last?new Date(a.last).getTime()-new Date(b.last).getTime():a.last?1:b.last?-1:a.index-b.index));
  const most=Math.max(...SKILLS.map(skill=>counts.get(skill.id)??0));
  const least=ranked[0]?.count??0;
  if(most-least<3)return null;
  const t=ranked[0]?.skill;
  if(!t)return null;
  const roundSize=t.subject==="science"?10:5;
  return{skillId:t.id,skillName:t.name,rewardId:"sunglasses",rewardName:"Bonus sunglasses",targetCorrect:Math.ceil(roundSize*.8),roundSize};
}
