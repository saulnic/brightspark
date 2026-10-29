"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizeAvatarConfig } from "@/content/avatar";

export async function saveAvatar(formData: FormData) {
  const learnerId = String(formData.get("learnerId") ?? "");
  const rawConfig = String(formData.get("config") ?? "{}");

  let parsed: unknown = {};
  try {
    parsed = JSON.parse(rawConfig);
  } catch {
    parsed = {};
  }

  const config = normalizeAvatarConfig(parsed);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("learners")
    .update({ avatar_config: config, updated_at: new Date().toISOString() })
    .eq("id", learnerId)
    .eq("account_id", user.id);

  if (error) redirect(`/learn/${learnerId}/avatar?error=save_failed`);

  revalidatePath(`/learn/${learnerId}`);
  revalidatePath("/home");
  redirect(`/learn/${learnerId}`);
}
