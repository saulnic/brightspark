# BrightSpark architecture

## Principles

1. Git is the source of truth for code and database migrations.
2. Supabase is the runtime database/auth platform, not a manually configured schema.
3. Accounts and learners are separate concepts: one authenticated adult account may own multiple learner profiles.
4. Question attempts are immutable learning events. Summaries can be derived from them.
5. Learning content, learning/progression logic, rewards and presentation stay separate.
6. Generated questions must be reproducible from skill + difficulty + seed + content version.
7. Every question generator will have automated invariant tests before content is considered production-ready.
8. Client interactions should remain fast; answer events can be persisted locally first and synced to the backend.
9. Row Level Security is mandatory on learner-owned data.

## Planned application domains

- `learning/` — question contracts, generators, validators, progression and adaptive logic
- `content/` — curriculum-aligned content/question-bank configuration
- `components/` — UI presentation
- `rewards/` — reward catalogue and unlock logic
- `lib/supabase/` — persistence/auth adapters
- `supabase/migrations/` — versioned database changes

## Initial backend model

`auth.users -> accounts -> learners -> sessions / attempts / skill progress / rewards`

The database keeps raw attempts so future analytics and adaptive learning rules do not depend on today's UI or summary model.
