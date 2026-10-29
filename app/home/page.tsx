import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar } from "@/components/avatar/Avatar";
import { normalizeAvatarConfig } from "@/content/avatar";
import { createLearner, signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: learners, error } = await supabase
    .from("learners")
    .select("id,name,avatar_config,created_at")
    .order("created_at", { ascending: true });

  const params = await searchParams;

  return (
    <main className="appShell">
      <header className="topBar">
        <div>
          <p className="eyebrow">BrightSpark</p>
          <h1 className="screenTitle">Who&apos;s learning?</h1>
        </div>
        <form action={signOut}>
          <button className="textButton">Sign out</button>
        </form>
      </header>

      {params.error ? (
        <div className="notice errorNotice">
          Something went wrong. Please try again.
        </div>
      ) : null}

      {error ? (
        <div className="notice errorNotice">
          Learners could not be loaded. The BrightSpark database migration may
          not have been applied yet.
        </div>
      ) : null}

      <section className="learnerGrid">
        {(learners ?? []).map((learner) => (
          <a
            className="learnerCard"
            href={`/learn/${learner.id}`}
            key={learner.id}
          >
            <Avatar config={normalizeAvatarConfig(learner.avatar_config)} size={64} />
            <strong>{learner.name}</strong>
            <span>Continue learning →</span>
          </a>
        ))}

        <section className="createLearnerCard">
          <div className="avatarPlaceholder soft" aria-hidden="true">
            +
          </div>
          <h2>{learners?.length ? "Add another learner" : "Create your learner"}</h2>
          <p>
            Start with a name, then create their avatar before learning begins.
          </p>
          <form action={createLearner} className="authForm">
            <label htmlFor="name">Learner name</label>
            <input
              id="name"
              name="name"
              maxLength={80}
              placeholder="Poppy"
              autoComplete="off"
              required
            />
            <button className="primaryButton">Create learner</button>
          </form>
        </section>
      </section>
    </main>
  );
}
