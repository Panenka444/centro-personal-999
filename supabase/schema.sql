-- Módulo: Tareas
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  due_date date,
  priority text check (priority in ('alta', 'media', 'baja')) default 'media',
  category text,
  status text check (status in ('pendiente', 'hecha')) default 'pendiente',
  created_at timestamptz default now()
);

alter table tasks enable row level security;

create policy "Los usuarios ven solo sus propias tareas"
  on tasks for select
  using (auth.uid() = user_id);

create policy "Los usuarios crean sus propias tareas"
  on tasks for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios actualizan sus propias tareas"
  on tasks for update
  using (auth.uid() = user_id);

create policy "Los usuarios borran sus propias tareas"
  on tasks for delete
  using (auth.uid() = user_id);
