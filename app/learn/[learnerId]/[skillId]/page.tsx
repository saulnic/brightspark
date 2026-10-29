import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSkill } from "@/content/skills";
import { QuestionPlayer } from "@/components/learning/QuestionPlayer";

export const dynamic = "force-dynamic";

export default async function SkillPage({
  params,
}: {
  params: Promise<{ learnerId: string; skillId: string }>;
}) {
  const { learnerId, skillId } = await params;
  const skill = getSkill(skillId);
  if (!skill) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: learner } = await supabase
    .from("learners")
    .select("id,name")
    .eq("id", learnerId)
    .single();
  if (!learner) notFound();

  const { data: progress } = await supabase
    .from("learner_skill_progress")
    .select("stage,xp")
    .eq("learner_id", learnerId)
    .eq("skill_id", skillId)
    .maybeSingle();

  return (
    <main className="appShell learningApp">
      <QuestionPlayer
        learnerId={learner.id}
        skillId={skill.id}
        skillName={skill.name}
        initialStage={progress?.stage ?? 1}
        initialXp={progress?.xp ?? 0}
      />
    </main>
  );
}
