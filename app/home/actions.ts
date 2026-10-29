"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createLearner(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();

  if (!name || name.length > 80) {
    redirect("/home?error=invalid_name");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: learner, error } = await supabase
    .from("learners")
    .insert({ account_id: user.id, name })
    .select("id")
    .single();

  if (error || !learner) {
    redirect("/home?error=create_learner_failed");
  }

  revalidatePath("/home");
  redirect(`/learn/${learner.id}/avatar`);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
