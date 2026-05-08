-- Zonke Website Database Schema
-- Run these SQL commands in your Supabase SQL editor.

-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Table: audits
CREATE TABLE IF NOT EXISTS audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  company TEXT,
  vertical VARCHAR(20) NOT NULL CHECK (vertical IN ('real_estate', 'tenders')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_audits_email ON audits(email);
CREATE INDEX IF NOT EXISTS idx_audits_vertical ON audits(vertical);
CREATE INDEX IF NOT EXISTS idx_audits_created_at ON audits(created_at);

-- Table: bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_date TIMESTAMPTZ,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Row Level Security (RLS) policies
-- For public inserts via serverless functions using service role key, RLS can be disabled or allow inserts.
-- Typically, you'd create a policy that only allows inserts with service role, but service role bypasses RLS.
-- So we can disable RLS for these tables if using service role, or create policies that allow public insert but not read.
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anonymous (for serverless functions)
CREATE POLICY "Allow public insert" ON audits
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON bookings
  FOR INSERT WITH CHECK (true);

-- Note: Reads are restricted; only service role can read. Adjust as needed.
