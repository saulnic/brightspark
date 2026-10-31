"use server";
import{redirect}from"next/navigation";
import{revalidatePath}from"next/cache";
import{createClient}from"@/lib/supabase/server";
import{DEFAULT_AVATAR,normalizeAvatarConfig,type AvatarConfig}from"@/content/avatar";
import{isEquipped,REWARDS}from"@/content/rewards";

export async function equipReward(f:FormData){
 const id=String(f.get("learnerId")??""),rid=String(f.get("rewardId")??""),r=REWARDS.find(x=>x.id===rid);
 if(!r)redirect(`/learn/${id}/rewards`);
 const s=await createClient(),{data:{user}}=await s.auth.getUser();
 if(!user)redirect("/login");
 const[{data:l},{data:owned}]=await Promise.all([
  s.from("learners").select("id,avatar_config").eq("id",id).eq("account_id",user.id).single(),
  s.from("learner_rewards").select("reward_id").eq("learner_id",id).eq("reward_id",rid).maybeSingle()
 ]);
 if(!l)redirect("/home");
 if(!owned)redirect(`/learn/${id}/rewards`);
 const current=normalizeAvatarConfig(l.avatar_config);
 const removing=isEquipped(current,r);
 const reset=Object.fromEntries(Object.keys(r.equip).map(key=>[key,DEFAULT_AVATAR[key as keyof AvatarConfig]]));
 const patch=removing?reset:r.equip;
 const next=normalizeAvatarConfig({...current,...patch});
 if(removing&&r.category==="pet"){
  next.pet="none";
  next.petHeadAccessory="none";
  next.petNeckAccessory="none";
 }
 await s.from("learners").update({avatar_config:next,updated_at:new Date().toISOString()}).eq("id",id).eq("account_id",user.id);
 revalidatePath(`/learn/${id}`);
 revalidatePath(`/learn/${id}/avatar`);
 revalidatePath(`/learn/${id}/rewards`);
 redirect(`/learn/${id}/rewards`);
}
