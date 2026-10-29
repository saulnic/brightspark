import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LearnerPage({
  params,
}: {
  params: Promise<{ learnerId: string }>;
}) {
  const { learnerId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: learner } = await supabase
    .from("learners")
    .select("id,name,avatar_config")
    .eq("id", learnerId)
    .single();

  if (!learner) notFound();

  return (
    <main className="appShell">
      <header className="topBar">
        <a className="textButton" href="/home">
          ← Learners
        </a>
        <div className="profileChip">
          <span>🙂</span>
          <strong>{learner.name}</strong>
        </div>
      </header>

      <section className="heroCard">
        <p className="eyebrow">Ready to learn?</p>
        <h1>Hi {learner.name} 👋</h1>
        <p>
          Your BrightSpark profile is connected. The learning-module home screen
          will plug in here next.
        </p>
      </section>
    </main>
  );
}
