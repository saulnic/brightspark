"use client";
import {createClient} from "@/lib/supabase/client";
import {pickReward,rewardInterval} from "@/content/rewards";
export async function saveGeographyRound(learnerId:string,skillId:string,answers:{correct:boolean;answer:string;expected:string;prompt:string}[]){
 const db=createClient(),now=new Date().toISOString(),correct=answers.filter(a=>a.correct).length;
 const {data:session,error:sessionError}=await db.from("learning_sessions").insert({learner_id:learnerId,skill_id:skillId,completed_at:now,question_count:answers.length,correct_count:correct,incorrect_count:answers.length-correct}).select("id").single();
 if(sessionError||!session)throw new Error(sessionError?.message??"Could not save session");
 const {error:attemptError}=await db.from("question_attempts").insert(answers.map((a,i)=>({session_id:session.id,learner_id:learnerId,skill_id:skillId,learning_objective:skillId,difficulty:1,question_type:"multiple_choice",question_seed:i,content_version:1,question_key:skillId+"-"+i,correct:a.correct,answer_given:a.answer,correct_answer:a.expected,duration_ms:0})));
 if(attemptError)throw new Error(attemptError.message);
 const {data:old,error:readError}=await db.from("learner_skill_progress").select("stage,xp").eq("learner_id",learnerId).eq("skill_id",skillId).maybeSingle();
 if(readError)throw new Error(readError.message);
 let stage=old?.stage??1,xp=old?.xp??0;const oldStars=(stage-1)*30+xp;xp=Math.max(0,xp+correct-(answers.length-correct));while(xp>=30&&stage<8){xp-=30;stage++}
 const {error:progressError}=await db.from("learner_skill_progress").upsert({learner_id:learnerId,skill_id:skillId,stage,xp,last_practised_at:now});
 if(progressError)throw new Error(progressError.message);
 const {data:all}=await db.from("learner_skill_progress").select("stage,xp").eq("learner_id",learnerId);
 const totalStars=(all??[]).reduce((n,p)=>n+(Math.max(1,p.stage)-1)*30+p.xp,0);
 const {data:state}=await db.from("learner_reward_state").select("next_reward_star,reward_sequence").eq("learner_id",learnerId).maybeSingle();
 const sequence=state?.reward_sequence??0,threshold=state?.next_reward_star??rewardInterval(learnerId,sequence);
 if(totalStars>=threshold&&totalStars>oldStars){const {data:owned}=await db.from("learner_rewards").select("reward_id").eq("learner_id",learnerId);const reward=pickReward(learnerId,sequence,(owned??[]).map(x=>x.reward_id));if(reward){const {error}=await db.from("learner_rewards").upsert({learner_id:learnerId,reward_id:reward.id,source:"surprise",metadata:{earned_at_stars:totalStars}},{onConflict:"learner_id,reward_id",ignoreDuplicates:true});if(!error)await db.from("learner_reward_state").upsert({learner_id:learnerId,next_reward_star:totalStars+rewardInterval(learnerId,sequence+1),reward_sequence:sequence+1,updated_at:now});}}
 return {correct,starsEarned:Math.max(0,(stage-1)*30+xp-oldStars)};
}
