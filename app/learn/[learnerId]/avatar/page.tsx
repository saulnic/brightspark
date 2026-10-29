import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeAvatarConfig } from "@/content/avatar";
import { AvatarEditor } from "@/components/avatar/AvatarEditor";

export const dynamic = "force-dynamic";

export default async function AvatarPage({
  params,
}: {
  params: Promise<{ learnerId: string }>;
}) {
  const { learnerId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: learner } = await supabase
    .from("learners")
    .select("id,name,avatar_config")
    .eq("id", learnerId)
    .single();

  if (!learner) notFound();

  return (
    <main className="appShell learningApp">
      <header className="topBar compact">
        <a className="textButton" href={`/learn/${learnerId}`}>← Back</a>
      </header>
      <AvatarEditor
        learnerId={learner.id}
        learnerName={learner.name}
        initial={normalizeAvatarConfig(learner.avatar_config)}
      />
    </main>
  );
}
