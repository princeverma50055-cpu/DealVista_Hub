create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image text not null,
  affiliate_link text not null,
  category text not null,
  price text,
  created_at timestamptz default now()
);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

alter table products enable row level security;
alter table blogs enable row level security;

create policy "Public read products" on products for select using (true);
create policy "Admin write products" on products for insert with check (auth.jwt() ->> 'email' = 'princeverma50055@gmail.com');
create policy "Admin update products" on products for update using (auth.jwt() ->> 'email' = 'princeverma50055@gmail.com');
create policy "Admin delete products" on products for delete using (auth.jwt() ->> 'email' = 'princeverma50055@gmail.com');

create policy "Public read blogs" on blogs for select using (true);
create policy "Admin write blogs" on blogs for insert with check (auth.jwt() ->> 'email' = 'princeverma50055@gmail.com');
create policy "Admin update blogs" on blogs for update using (auth.jwt() ->> 'email' = 'princeverma50055@gmail.com');
create policy "Admin delete blogs" on blogs for delete using (auth.jwt() ->> 'email' = 'princeverma50055@gmail.com');
