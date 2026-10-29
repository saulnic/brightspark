import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LearnerHome } from "@/components/learning/LearnerHome";
import { normalizeAvatarConfig } from "@/content/avatar";
import { Avatar } from "@/components/avatar/Avatar";

export const dynamic = "force-dynamic";

export default async function LearnerPage({
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

  const avatar = normalizeAvatarConfig(learner.avatar_config);
  const { data: progress } = await supabase
    .from("learner_skill_progress")
    .select("skill_id,stage,xp")
    .eq("learner_id", learnerId);

  return (
    <main className="appShell learningApp">
      <header className="topBar compact">
        <a className="textButton" href="/home">← Learners</a>
        <a className="profileChip" href={`/learn/${learner.id}/avatar`}>
          <Avatar config={avatar} size={34} />
          <strong>{learner.name}</strong>
        </a>
      </header>
      <LearnerHome learnerId={learner.id} learnerName={learner.name} avatar={avatar} progress={progress ?? []} />
    </main>
  );
}
