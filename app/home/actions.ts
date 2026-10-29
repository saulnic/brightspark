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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error } = await supabase.from("learners").insert({
    account_id: user.id,
    name,
  });

  if (error) {
    redirect("/home?error=create_learner_failed");
  }

  revalidatePath("/home");
  redirect("/home");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
