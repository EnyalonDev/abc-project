-- 1. Tabla de Configuración General (Textos y valores únicos)
-- Controla: Hero, Textos de Misión/Visión, Datos de contacto y Footer.
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value text,
  label text,
  "group" text, -- Agrupadores: 'home', 'about', 'contact', 'footer'
  updated_at timestamp with time zone default now()
);

-- 2. Highlights de la Home (Las 3 tarjetas de la página de inicio)
create table home_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text, -- Nombre del icono de Lucide (ej: ShieldCheck)
  display_order int default 0,
  created_at timestamp with time zone default now()
);

-- 3. Valores de la Empresa (Las 3 tarjetas de la página 'Nosotros')
create table company_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  display_order int default 0,
  created_at timestamp with time zone default now()
);

-- 4. Servicios (Catálogo completo de servicios)
create table services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon_name text,
  is_active boolean default true,
  is_featured boolean default false, -- Para destacarlo en la página de Inicio
  display_order int default 0,
  created_at timestamp with time zone default now()
);

-- CONFIGURACIÓN DE SEGURIDAD (Row Level Security)
-- Esto permite que cualquier usuario vea el sitio, pero solo autenticados editen.

alter table site_settings enable row level security;
alter table home_highlights enable row level security;
alter table company_values enable row level security;
alter table services enable row level security;

-- Permisos de Lectura (Público)
create policy "Lectura pública settings" on site_settings for select using (true);
create policy "Lectura pública highlights" on home_highlights for select using (true);
create policy "Lectura pública values" on company_values for select using (true);
create policy "Lectura pública services" on services for select using (true);

-- Permisos de Escritura (Solo Administradores Autenticados)
create policy "Admin settings" on site_settings for all using (auth.role() = 'authenticated');
create policy "Admin highlights" on home_highlights for all using (auth.role() = 'authenticated');
create policy "Admin values" on company_values for all using (auth.role() = 'authenticated');
create policy "Admin services" on services for all using (auth.role() = 'authenticated');

-- DATOS INICIALES (Seed data)
-- Ejecutar esto para que el sitio no aparezca vacío la primera vez.

insert into site_settings (key, value, label, "group") values 
('hero_title', 'Su Patrimonio en las Mejores Manos', 'Título Principal (Hero)', 'home'),
('hero_subtitle', 'Gestión profesional de propiedad horizontal en Colombia. Garantizamos transparencia, seguridad y valorización.', 'Subtítulo Principal', 'home'),
('footer_description', 'Administración de propiedad horizontal con transparencia, eficiencia y compromiso social. Su patrimonio en las mejores manos.', 'Descripción del Footer', 'footer'),
('contact_address', 'Av. Calle 34 # 24 – 05 Of 206, Bogotá, Colombia', 'Dirección Física', 'contact'),
('contact_phone_1', '310 297 1834', 'Teléfono Principal', 'contact'),
('contact_phone_2', '314 306 7529', 'Teléfono Secundario', 'contact'),
('contact_email', 'gerencia@abcpropiedadhorizontal.com', 'Correo de Contacto', 'contact'),
('attention_hours', 'Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 PM', 'Horarios de Atención', 'contact'),
('facebook_url', 'https://www.facebook.com/p/ABC-Propiedad-Horizontal-100063958361522/', 'URL Facebook', 'footer'),
('instagram_url', 'https://www.instagram.com/abcpropiedadhorizontal/', 'URL Instagram', 'footer'),
('about_header_title', 'Nuestra Empresa', 'Título Encabezado Nosotros', 'about'),
('about_header_subtitle', 'Somos una empresa joven y dinámica con 9 años de experiencia transformando la administración en Colombia.', 'Subtítulo Encabezado Nosotros', 'about'),
('mission_content', 'Prestar servicios especializados en la administración integral de propiedad horizontal...', 'Contenido de la Misión', 'about'),
('vision_content', 'Ser reconocidos a nivel nacional como líderes en el manejo integral de propiedad horizontal...', 'Contenido de la Visión', 'about');

insert into home_highlights (title, description, icon_name, display_order) values
('Seguridad y Confianza', 'Protegemos los intereses de la copropiedad con pólizas de cumplimiento.', 'ShieldCheck', 1),
('Valorización del Patrimonio', 'Implementamos planes de mantenimiento preventivo.', 'TrendingUp', 2),
('Convivencia Armónica', 'Fomentamos el respeto y la cultura ciudadana.', 'Users', 3);

insert into company_values (title, description, icon_name, display_order) values
('Transparencia', 'Gestión clara y verificable de todos los recursos.', 'Eye', 1),
('Responsabilidad', 'Compromiso total con el cuidado del patrimonio.', 'HandHeart', 2),
('Honestidad', 'Actuamos con rectitud e integridad en cada proceso.', 'User', 3);