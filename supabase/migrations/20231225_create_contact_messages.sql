-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to send messages (public)
CREATE POLICY "Allow anonymous submission" ON contact_messages 
FOR INSERT TO anon 
WITH CHECK (true);

-- Policy: Allow admins to manage (service_role)
-- Note: Our server-side actions use service_role, so they bypass RLS.
-- This policy is for additional security or dashboard usage.
CREATE POLICY "Allow admin full access" ON contact_messages 
FOR ALL TO service_role 
USING (true);
