import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizeAvatarConfig } from "@/content/avatar";
import { earnedStars } from "@/content/rewards";
import { RewardsCollection } from "@/components/rewards/RewardsCollection";

export const dynamic = "force-dynamic";

export default async function RewardsPage({ params }: { params: Promise<{ learnerId:string }> }) {
  const { learnerId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: learner }, { data: progress }] = await Promise.all([
    supabase.from("learners").select("id,name,avatar_config").eq("id", learnerId).eq("account_id", user.id).single(),
    supabase.from("learner_skill_progress").select("stage,xp").eq("learner_id", learnerId),
  ]);

  if (!learner) notFound();

  return (
    <main className="appShell learningApp">
      <header className="topBar compact">
        <a className="textButton" href={`/learn/${learnerId}`}>← Topics</a>
        <a className="textButton" href={`/learn/${learnerId}/avatar`}>Avatar</a>
      </header>
      <RewardsCollection
        learnerId={learner.id}
        learnerName={learner.name}
        avatar={normalizeAvatarConfig(learner.avatar_config)}
        stars={earnedStars(progress ?? [])}
      />
    </main>
  );
}
