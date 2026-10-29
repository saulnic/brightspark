-- Add Science as a first-class BrightSpark subject and seed initial Science modules.

alter table public.skills
  drop constraint if exists skills_subject_check;

alter table public.skills
  add constraint skills_subject_check
  check (subject in ('maths','english','science'));

insert into public.skills (id, subject, name, sort_order)
values
  ('solar','science','Solar system',210),
  ('volcanoes','science','Volcanoes',220),
  ('dinosaurs','science','Dinosaurs & fossils',230),
  ('habitats','science','Animals & habitats',240)
on conflict (id) do update
set subject = excluded.subject,
    name = excluded.name,
    sort_order = excluded.sort_order,
    active = true;
