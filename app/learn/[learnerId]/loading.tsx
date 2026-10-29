export default function LearningLoading() {
  return (
    <main className="appShell learningApp">
      <section className="routeLoading" role="status" aria-live="polite">
        <span className="routeSpinner" aria-hidden="true" />
        <strong>Loading…</strong>
      </section>
    </main>
  );
}
