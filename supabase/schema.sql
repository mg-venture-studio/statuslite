create table status_pages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  description text,
  custom_domain text,
  theme jsonb default '{"primaryColor": "#3b82f6", "logo": null}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table components (
  id uuid primary key default gen_random_uuid(),
  status_page_id uuid references status_pages(id) on delete cascade not null,
  name text not null,
  description text,
  status text not null default 'operational' check (status in ('operational', 'degraded', 'partial_outage', 'major_outage', 'maintenance')),
  position int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table incidents (
  id uuid primary key default gen_random_uuid(),
  status_page_id uuid references status_pages(id) on delete cascade not null,
  title text not null,
  description text,
  status text not null default 'investigating' check (status in ('investigating', 'identified', 'monitoring', 'resolved')),
  severity text not null default 'minor' check (severity in ('minor', 'major', 'critical')),
  started_at timestamptz default now(),
  resolved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table incident_updates (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references incidents(id) on delete cascade not null,
  body text not null,
  status text not null check (status in ('investigating', 'identified', 'monitoring', 'resolved')),
  created_at timestamptz default now()
);

create table incident_components (
  incident_id uuid references incidents(id) on delete cascade not null,
  component_id uuid references components(id) on delete cascade not null,
  primary key (incident_id, component_id)
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  status_page_id uuid references status_pages(id) on delete cascade not null,
  email text not null,
  verified boolean default false,
  verification_token text,
  created_at timestamptz default now(),
  unique(status_page_id, email)
);

create index idx_components_status_page on components(status_page_id);
create index idx_incidents_status_page on incidents(status_page_id);
create index idx_subscribers_status_page on subscribers(status_page_id);

alter table status_pages enable row level security;
alter table components enable row level security;
alter table incidents enable row level security;
alter table incident_updates enable row level security;
alter table incident_components enable row level security;
alter table subscribers enable row level security;

create policy "Users can view their own status pages"
  on status_pages for select
  using (user_id = auth.uid());

create policy "Users can insert their own status pages"
  on status_pages for insert
  with check (user_id = auth.uid());

create policy "Users can update their own status pages"
  on status_pages for update
  using (user_id = auth.uid());

create policy "Users can delete their own status pages"
  on status_pages for delete
  using (user_id = auth.uid());

create policy "Anyone can view public status pages by slug"
  on status_pages for select
  using (true);

create policy "Users can manage components for their status pages"
  on components for all
  using (
    exists (
      select 1 from status_pages
      where status_pages.id = components.status_page_id
      and status_pages.user_id = auth.uid()
    )
  );

create policy "Anyone can view components"
  on components for select
  using (true);

create policy "Users can manage incidents for their status pages"
  on incidents for all
  using (
    exists (
      select 1 from status_pages
      where status_pages.id = incidents.status_page_id
      and status_pages.user_id = auth.uid()
    )
  );

create policy "Anyone can view incidents"
  on incidents for select
  using (true);

create policy "Users can manage incident updates for their incidents"
  on incident_updates for all
  using (
    exists (
      select 1 from incidents
      join status_pages on status_pages.id = incidents.status_page_id
      where incidents.id = incident_updates.incident_id
      and status_pages.user_id = auth.uid()
    )
  );

create policy "Anyone can view incident updates"
  on incident_updates for select
  using (true);

create policy "Users can manage incident components for their incidents"
  on incident_components for all
  using (
    exists (
      select 1 from incidents
      join status_pages on status_pages.id = incidents.status_page_id
      where incidents.id = incident_components.incident_id
      and status_pages.user_id = auth.uid()
    )
  );

create policy "Anyone can view incident components"
  on incident_components for select
  using (true);

create policy "Users can manage subscribers for their status pages"
  on subscribers for all
  using (
    exists (
      select 1 from status_pages
      where status_pages.id = subscribers.status_page_id
      and status_pages.user_id = auth.uid()
    )
  );

create policy "Anyone can insert subscribers"
  on subscribers for insert
  with check (true);

create policy "Anyone can view subscribers"
  on subscribers for select
  using (true);
