"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const supabase = createClient();
      const origin = window.location.origin;
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=/home`,
        },
      });

      if (authError) throw authError;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send sign-in email.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="authShell">
      <section className="authCard">
        <div className="brandMark">✨</div>
        <p className="eyebrow">BrightSpark</p>
        <h1>{sent ? "Check your email" : "Welcome"}</h1>

        {sent ? (
          <>
            <p className="muted">
              We sent a secure sign-in link to <strong>{email}</strong>.
            </p>
            <button className="secondaryButton" onClick={() => setSent(false)}>
              Use another email
            </button>
          </>
        ) : (
          <form onSubmit={submit} className="authForm">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
            {error ? <p className="formError">{error}</p> : null}
            <button className="primaryButton" disabled={busy}>
              {busy ? "Sending…" : "Email me a sign-in link"}
            </button>
          </form>
        )}

        <p className="finePrint">
          No password to remember. Your learner history stays with your account
          across devices.
        </p>
      </section>
    </main>
  );
}
