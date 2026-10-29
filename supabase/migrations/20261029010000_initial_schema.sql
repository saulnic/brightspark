-- BrightSpark initial schema
-- Git is the source of truth. Apply this migration to the linked Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.accounts (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learners (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  avatar_config jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id text primary key,
  subject text not null check (subject in ('maths','english','science')),
  name text not null,
  sort_order integer not null,
  stage_count smallint not null default 8 check (stage_count between 1 and 20),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.learner_skill_progress (
  learner_id uuid not null references public.learners(id) on delete cascade,
  skill_id text not null references public.skills(id),
  stage smallint not null default 1 check (stage >= 1),
  xp integer not null default 0 check (xp >= 0),
  seen jsonb not null default '{}'::jsonb,
  mistakes jsonb not null default '{}'::jsonb,
  last_practised_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (learner_id, skill_id)
);

create table if not exists public.learning_sessions (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.learners(id) on delete cascade,
  skill_id text not null references public.skills(id),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  question_count integer not null default 0 check (question_count >= 0),
  correct_count integer not null default 0 check (correct_count >= 0),
  incorrect_count integer not null default 0 check (incorrect_count >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references public.learning_sessions(id) on delete set null,
  learner_id uuid not null references public.learners(id) on delete cascade,
  skill_id text not null references public.skills(id),
  learning_objective text,
  difficulty smallint not null default 1 check (difficulty >= 1),
  question_type text not null,
  question_seed bigint,
  content_version text not null default '1',
  question_key text,
  correct boolean not null,
  answer_given jsonb,
  correct_answer jsonb,
  duration_ms integer check (duration_ms is null or duration_ms >= 0),
  attempted_at timestamptz not null default now()
);

create table if not exists public.reward_catalog (
  id text primary key,
  reward_type text not null check (reward_type in ('pet','avatar_item','pet_accessory','background','bonus')),
  name text not null,
  metadata jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.learner_rewards (
  learner_id uuid not null references public.learners(id) on delete cascade,
  reward_id text not null references public.reward_catalog(id),
  source text not null default 'milestone',
  unlocked_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb,
  primary key (learner_id, reward_id)
);

create table if not exists public.reward_challenges (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.learners(id) on delete cascade,
  skill_id text references public.skills(id),
  reward_id text references public.reward_catalog(id),
  challenge_type text not null,
  status text not null default 'offered' check (status in ('offered','accepted','completed','expired','dismissed')),
  criteria jsonb not null default '{}'::jsonb,
  offered_at timestamptz not null default now(),
  completed_at timestamptz,
  expires_at timestamptz
);

create index if not exists learners_account_id_idx
  on public.learners(account_id);

create index if not exists learner_skill_progress_recent_idx
  on public.learner_skill_progress(learner_id, last_practised_at desc);

create index if not exists learning_sessions_learner_started_idx
  on public.learning_sessions(learner_id, started_at desc);

create index if not exists question_attempts_learner_attempted_idx
  on public.question_attempts(learner_id, attempted_at desc);

create index if not exists question_attempts_skill_attempted_idx
  on public.question_attempts(learner_id, skill_id, attempted_at desc);

create index if not exists reward_challenges_learner_status_idx
  on public.reward_challenges(learner_id, status, offered_at desc);

insert into public.skills (id, subject, name, sort_order)
values
  ('numbers','maths','Number sense',10),
  ('add','maths','Add & subtract',20),
  ('times','maths','Multiply & divide',30),
  ('fractions','maths','Fractions',40),
  ('money','maths','Money',50),
  ('time','maths','Time',60),
  ('measure','maths','Measurement',70),
  ('shapes','maths','Shapes & space',80),
  ('patterns','maths','Patterns',90),
  ('data','maths','Data & chance',100),
  ('spelling','english','Spelling',110),
  ('reading','english','Reading',120),
  ('grammar','english','Grammar',130),
  ('vocab','english','Vocabulary',140),
  ('solar','science','Solar system',210),
  ('volcanoes','science','Volcanoes',220),
  ('dinosaurs','science','Dinosaurs & fossils',230),
  ('habitats','science','Animals & habitats',240)
on conflict (id) do update
set subject = excluded.subject,
    name = excluded.name,
    sort_order = excluded.sort_order;

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.accounts (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_auth_user();

alter table public.accounts enable row level security;
alter table public.learners enable row level security;
alter table public.skills enable row level security;
alter table public.learner_skill_progress enable row level security;
alter table public.learning_sessions enable row level security;
alter table public.question_attempts enable row level security;
alter table public.reward_catalog enable row level security;
alter table public.learner_rewards enable row level security;
alter table public.reward_challenges enable row level security;

create policy "accounts_select_own"
on public.accounts for select
to authenticated
using (id = auth.uid());

create policy "accounts_update_own"
on public.accounts for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "learners_select_owned"
on public.learners for select
to authenticated
using (account_id = auth.uid());

create policy "learners_insert_owned"
on public.learners for insert
to authenticated
with check (account_id = auth.uid());

create policy "learners_update_owned"
on public.learners for update
to authenticated
using (account_id = auth.uid())
with check (account_id = auth.uid());

create policy "learners_delete_owned"
on public.learners for delete
to authenticated
using (account_id = auth.uid());

create policy "skills_read_authenticated"
on public.skills for select
to authenticated
using (active = true);

create policy "skill_progress_owned"
on public.learner_skill_progress for all
to authenticated
using (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

create policy "sessions_owned"
on public.learning_sessions for all
to authenticated
using (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

create policy "attempts_owned"
on public.question_attempts for all
to authenticated
using (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

create policy "reward_catalog_read_authenticated"
on public.reward_catalog for select
to authenticated
using (active = true);

create policy "learner_rewards_owned"
on public.learner_rewards for all
to authenticated
using (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

create policy "reward_challenges_owned"
on public.reward_challenges for all
to authenticated
using (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

grant usage on schema public to authenticated;
grant select, update on public.accounts to authenticated;
grant select, insert, update, delete on public.learners to authenticated;
grant select on public.skills to authenticated;
grant select, insert, update, delete on public.learner_skill_progress to authenticated;
grant select, insert, update, delete on public.learning_sessions to authenticated;
grant select, insert, update, delete on public.question_attempts to authenticated;
grant select on public.reward_catalog to authenticated;
grant select, insert, update, delete on public.learner_rewards to authenticated;
grant select, insert, update, delete on public.reward_challenges to authenticated;
