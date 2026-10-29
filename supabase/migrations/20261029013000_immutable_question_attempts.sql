-- Keep question attempts append-only for authenticated clients.
-- Attempts are the raw learning event history and should not be rewritten.

drop policy if exists "attempts_owned" on public.question_attempts;

create policy "attempts_select_owned"
on public.question_attempts for select
to authenticated
using (
  exists (
    select 1
    from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

create policy "attempts_insert_owned"
on public.question_attempts for insert
to authenticated
with check (
  exists (
    select 1
    from public.learners l
    where l.id = learner_id
      and l.account_id = auth.uid()
  )
);

revoke update, delete on public.question_attempts from authenticated;
grant select, insert on public.question_attempts to authenticated;
