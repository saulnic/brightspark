import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { normalizeAvatarConfig } from "@/content/avatar";
import { AvatarEditor } from "@/components/avatar/AvatarEditor";

export default async function AvatarPage({ params }: { params: Promise<{ learnerId: string }> }) {
  const { learnerId } = await params;
  const supabase = await createClient();
  const [userResult, learnerResult] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("learners").select("id,name,avatar_config").eq("id", learnerId).single(),
  ]);
  if (!userResult.data.user) redirect("/login");
  const learner = learnerResult.data;
  if (!learner) notFound();

  return (
    <main className="appShell learningApp">
      <header className="topBar compact">
        <Link className="textButton" href={`/learn/${learnerId}`} prefetch>← Back</Link>
      </header>
      <AvatarEditor learnerId={learner.id} learnerName={learner.name} initial={normalizeAvatarConfig(learner.avatar_config)} />
    </main>
  );
}
