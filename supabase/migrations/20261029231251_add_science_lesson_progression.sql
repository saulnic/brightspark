create table if not exists public.learner_science_progress (
  learner_id uuid not null references public.learners(id) on delete cascade,
  skill_id text not null,
  lesson_index integer not null default 0 check (lesson_index >= 0),
  updated_at timestamptz not null default now(),
  primary key (learner_id, skill_id)
);
alter table public.learner_science_progress enable row level security;
grant select, insert, update, delete on table public.learner_science_progress to authenticated;
create policy "science_progress_select_owned" on public.learner_science_progress for select to authenticated using (learner_id in (select id from public.learners where account_id = (select auth.uid())));
create policy "science_progress_insert_owned" on public.learner_science_progress for insert to authenticated with check (learner_id in (select id from public.learners where account_id = (select auth.uid())));
create policy "science_progress_update_owned" on public.learner_science_progress for update to authenticated using (learner_id in (select id from public.learners where account_id = (select auth.uid()))) with check (learner_id in (select id from public.learners where account_id = (select auth.uid())));
create policy "science_progress_delete_owned" on public.learner_science_progress for delete to authenticated using (learner_id in (select id from public.learners where account_id = (select auth.uid())));
insert into public.learner_science_progress (learner_id, skill_id, lesson_index)
select distinct learner_id, skill_id, 1 from public.learning_sessions
where completed_at is not null and skill_id in ('solar','volcanoes','dinosaurs','habitats')
on conflict (learner_id, skill_id) do nothing;
