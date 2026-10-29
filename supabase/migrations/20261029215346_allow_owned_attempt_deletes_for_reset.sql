-- Allow the parent reset flow to delete a learner's own immutable attempt history.
-- Attempts remain non-updatable and cannot be deleted across accounts.

grant delete on public.question_attempts to authenticated;

drop policy if exists "attempts_delete_owned" on public.question_attempts;

create policy "attempts_delete_owned"
on public.question_attempts for delete
to authenticated
using (
  exists (
    select 1
    from public.learners l
    where l.id = learner_id
      and l.account_id = (select auth.uid())
  )
);
