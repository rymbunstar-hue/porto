-- SUPABASE DATABASE SCHEMA
-- Jalankan script ini di Dashboard Supabase > SQL Editor

-- 1. Tabel Profil
CREATE TABLE profile (
    id BIGINT PRIMARY KEY DEFAULT 1,
    name TEXT,
    title TEXT,
    location TEXT,
    email TEXT,
    "profileImage" TEXT, -- Menggunakan tanda kutip agar case-sensitive sesuai JS
    description TEXT,
    stats JSONB DEFAULT '[]'::jsonb,
    socials JSONB DEFAULT '{}'::jsonb
);

-- Masukkan data awal profil (Row ID 1 adalah yang digunakan oleh aplikasi)
INSERT INTO profile (id, name, title, location, email, description, stats, socials)
VALUES (1, 
    'Rymbun Anarliansyah', 
    'Fullstack / Laravel Developer', 
    'Based in Indonesia', 
    'rymbunanr@gmail.com', 
    'Membangun pengalaman digital kelas atas dengan arsitektur modern dan kode yang bersih.', 
    '[{"label": "Tahun Pengalaman", "value": "05+"}, {"label": "Klien Puas", "value": "50+"}]', 
    '{"github": "#", "twitter": "#", "behance": "#", "linkedin": "#"}'
) ON CONFLICT (id) DO NOTHING;

-- 2. Tabel Proyek
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    title TEXT,
    description TEXT,
    tags TEXT[],
    img TEXT
);

-- 3. Tabel Tech Stack
CREATE TABLE tech_stack (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_index SERIAL,
    name TEXT,
    icon TEXT,
    "desc" TEXT
);

-- Kebijakan Keamanan (Row Level Security)
-- Catatan: Untuk kemudahan dev, kita aktifkan akses publik. 
-- Disarankan untuk memperketat ini saat production.

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tech_stack ENABLE ROW LEVEL SECURITY;

-- Kebijakan untuk Development (Mock Login)
-- Karena kita menggunakan login buatan sendiri (bukan Supabase Auth), 
-- kita perlu mengizinkan role 'anon' untuk melakukan selaian SELECT (INSERT, UPDATE, DELETE).

-- PENTING: Hapus policy lama jika ada error "policy already exists"
DROP POLICY IF EXISTS "Allow public read access" ON profile;
DROP POLICY IF EXISTS "Allow public read access" ON projects;
DROP POLICY IF EXISTS "Allow public read access" ON tech_stack;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON profile;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON projects;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON tech_stack;

-- Buat policy baru yang mengizinkan SEMUA akses (CRUD) untuk semua orang (termasuk anonim)
CREATE POLICY "Enable all access for anon" ON profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for anon" ON projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for anon" ON tech_stack FOR ALL USING (true) WITH CHECK (true);
