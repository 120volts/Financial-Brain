create extension if not exists pgcrypto;
create table if not exists public.fb_test_invoices (
 id uuid primary key default gen_random_uuid(), created_at timestamptz default now(),
 project_name text not null, client_name text not null, client_email text,
 service_name text not null, quantity numeric not null, rate numeric not null,
 total numeric not null, due_date date, status text default 'created', payment_method text
);
create table if not exists public.fb_test_events (
 id uuid primary key default gen_random_uuid(), created_at timestamptz default now(),
 invoice_id uuid references public.fb_test_invoices(id) on delete cascade,
 event_type text not null, event_data jsonb default '{}'::jsonb
);
alter table public.fb_test_invoices enable row level security;
alter table public.fb_test_events enable row level security;
create policy "test invoices select" on public.fb_test_invoices for select to anon using (true);
create policy "test invoices insert" on public.fb_test_invoices for insert to anon with check (true);
create policy "test invoices update" on public.fb_test_invoices for update to anon using (true) with check (true);
create policy "test events select" on public.fb_test_events for select to anon using (true);
create policy "test events insert" on public.fb_test_events for insert to anon with check (event_type in ('invoice_created','invoice_viewed','invoice_paid_test'));
