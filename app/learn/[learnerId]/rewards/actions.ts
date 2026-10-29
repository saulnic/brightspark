"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizeAvatarConfig } from "@/content/avatar";
import { earnedStars, REWARDS } from "@/content/rewards";

export async function equipReward(formData: FormData) {
  const learnerId = String(formData.get("learnerId") ?? "");
  const rewardId = String(formData.get("rewardId") ?? "");
  const reward = REWARDS.find((item) => item.id === rewardId);
  if (!reward) redirect(`/learn/${learnerId}/rewards`);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: learner }, { data: progress }] = await Promise.all([
    supabase.from("learners").select("id,avatar_config").eq("id", learnerId).eq("account_id", user.id).single(),
    supabase.from("learner_skill_progress").select("stage,xp").eq("learner_id", learnerId),
  ]);
  if (!learner) redirect("/home");

  const stars = earnedStars(progress ?? []);
  if (stars < reward.stars) redirect(`/learn/${learnerId}/rewards`);

  const current = normalizeAvatarConfig(learner.avatar_config);
  const next = normalizeAvatarConfig({ ...current, ...reward.equip });

  await supabase.from("learners")
    .update({ avatar_config: next, updated_at: new Date().toISOString() })
    .eq("id", learnerId)
    .eq("account_id", user.id);

  revalidatePath(`/learn/${learnerId}`);
  revalidatePath(`/learn/${learnerId}/avatar`);
  revalidatePath(`/learn/${learnerId}/rewards`);
  redirect(`/learn/${learnerId}/rewards`);
}
