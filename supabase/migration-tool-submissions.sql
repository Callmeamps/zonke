-- Tool Submissions table for lead magnet tools
CREATE TABLE IF NOT EXISTS tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id VARCHAR(50) NOT NULL,
  email TEXT NOT NULL,
  results JSONB,
  score DECIMAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);

CREATE INDEX IF NOT EXISTS idx_tool_submissions_tool_id ON tool_submissions(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_submissions_email ON tool_submissions(email);
CREATE INDEX IF NOT EXISTS idx_tool_submissions_created_at ON tool_submissions(created_at);

ALTER TABLE tool_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON tool_submissions
  FOR INSERT WITH CHECK (true);
