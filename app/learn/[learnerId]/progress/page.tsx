import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SKILLS, STAGE_NAMES } from "@/content/skills";

export const dynamic = "force-dynamic";

function startOfBrisbaneTodayUtc() {
  const offset = 10 * 60 * 60 * 1000;
  const brisbaneNow = new Date(Date.now() + offset);
  const midnightAsUtc = Date.UTC(
    brisbaneNow.getUTCFullYear(),
    brisbaneNow.getUTCMonth(),
    brisbaneNow.getUTCDate()
  );
  return new Date(midnightAsUtc - offset);
}

export default async function ProgressPage({
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
    .select("id,name")
    .eq("id", learnerId)
    .single();
  if (!learner) notFound();

  const [attemptResult, progressResult] = await Promise.all([
    supabase
      .from("question_attempts")
      .select("skill_id,correct,attempted_at")
      .eq("learner_id", learnerId)
      .order("attempted_at", { ascending: false }),
    supabase
      .from("learner_skill_progress")
      .select("skill_id,stage,xp,last_practised_at")
      .eq("learner_id", learnerId),
  ]);

  const attempts = attemptResult.data ?? [];
  const progress = progressResult.data ?? [];
  const todayStart = startOfBrisbaneTodayUtc().getTime();
  const today = attempts.filter((a) => new Date(a.attempted_at).getTime() >= todayStart);
  const todayCorrect = today.filter((a) => a.correct).length;
  const todayIncorrect = today.length - todayCorrect;
  const accuracy = today.length ? Math.round((todayCorrect / today.length) * 100) : 0;

  const bySkill = SKILLS.map((skill) => {
    const skillAttempts = attempts.filter((a) => a.skill_id === skill.id);
    const correct = skillAttempts.filter((a) => a.correct).length;
    const p = progress.find((item) => item.skill_id === skill.id);
    return {
      ...skill,
      attempts: skillAttempts.length,
      correct,
      accuracy: skillAttempts.length ? Math.round((correct / skillAttempts.length) * 100) : 0,
      stage: p?.stage ?? 1,
      xp: p?.xp ?? 0,
      last: p?.last_practised_at ?? null,
    };
  });

  const sevenDays = Array.from({ length: 7 }, (_, index) => {
    const dayOffset = 6 - index;
    const end = todayStart + (1 - dayOffset) * 86400000;
    const start = end - 86400000;
    const count = attempts.filter((a) => {
      const t = new Date(a.attempted_at).getTime();
      return t >= start && t < end;
    }).length;
    const labelDate = new Date(start + 10 * 3600000);
    return {
      label: labelDate.toLocaleDateString("en-AU", { weekday: "short", timeZone: "UTC" }).slice(0, 2),
      count,
    };
  });
  const maxDay = Math.max(1, ...sevenDays.map((d) => d.count));

  return (
    <main className="appShell learningApp">
      <header className="topBar compact">
        <a className="textButton" href={`/learn/${learnerId}`}>← Topics</a>
        <strong>{learner.name}&apos;s progress</strong>
      </header>

      <section className="statsGrid">
        <div className="statCard"><span>Today</span><strong>{today.length}</strong><small>attempted</small></div>
        <div className="statCard"><span>Correct</span><strong>{todayCorrect}</strong><small>today</small></div>
        <div className="statCard"><span>Incorrect</span><strong>{todayIncorrect}</strong><small>today</small></div>
        <div className="statCard"><span>Accuracy</span><strong>{accuracy}%</strong><small>today</small></div>
      </section>

      <section className="dashboardCard">
        <div className="dashboardHeading">
          <h2>Last 7 days</h2>
          <span>{attempts.length} total answers</span>
        </div>
        <div className="activityBars">
          {sevenDays.map((day) => (
            <div className="activityDay" key={day.label}>
              <div className="barTrack"><div style={{ height: `${Math.max(6, (day.count / maxDay) * 100)}%` }} /></div>
              <strong>{day.count}</strong>
              <span>{day.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboardCard">
        <div className="dashboardHeading"><h2>By learning module</h2><span>All time</span></div>
        <div className="moduleStats">
          {bySkill.map((skill) => (
            <div className="moduleStatRow" key={skill.id}>
              <div className="moduleStatName"><span>{skill.icon}</span><div><strong>{skill.name}</strong><small>{STAGE_NAMES[Math.min(7, skill.stage - 1)]} · {skill.xp}/30 XP</small></div></div>
              <div className="moduleStatNumbers">
                <strong>{skill.attempts}</strong><span>tries</span>
                <strong>{skill.accuracy}%</strong><span>right</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
