# 🚀 Supabase Database Setup Guide

## Step 1: Access Your Supabase Dashboard

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sign in and select your project
3. Click on **"SQL Editor"** in the left sidebar

## Step 2: Run the Database Setup Script

1. **Create a New Query**
   - Click **"New query"** button
   - This will open a blank SQL editor

2. **Copy the Complete Setup Script**
   - Copy ALL the content from the script below
   - Make sure you get everything from the first line to the last line

3. **Paste and Execute**
   - Paste the entire script into the SQL editor
   - Click **"Run"** (or press Ctrl/Cmd + Enter)
   - Wait for execution to complete (should take 10-15 seconds)

## Step 3: The Complete Setup Script

```sql
-- Complete Supabase setup for Quiz App
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  question_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_taken INTEGER NOT NULL, -- in seconds
  score DECIMAL(5,2) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_attempts table for detailed tracking
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_answer INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken INTEGER NOT NULL, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_category_id ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_id ON quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_category_id ON quiz_sessions(category_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_session_id ON quiz_attempts(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_question_id ON quiz_attempts(question_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at 
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_questions_updated_at ON questions;
CREATE TRIGGER update_questions_updated_at 
  BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories table (public read)
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- RLS Policies for questions table (public read)
DROP POLICY IF EXISTS "Anyone can view questions" ON questions;
CREATE POLICY "Anyone can view questions" ON questions
  FOR SELECT USING (true);

-- RLS Policies for quiz_sessions table
DROP POLICY IF EXISTS "Users can view their own quiz sessions" ON quiz_sessions;
CREATE POLICY "Users can view their own quiz sessions" ON quiz_sessions
  FOR SELECT USING (auth.uid()::text = user_id::text);

DROP POLICY IF EXISTS "Users can insert their own quiz sessions" ON quiz_sessions;
CREATE POLICY "Users can insert their own quiz sessions" ON quiz_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for quiz_attempts table
DROP POLICY IF EXISTS "Users can view their own quiz attempts" ON quiz_attempts;
CREATE POLICY "Users can view their own quiz attempts" ON quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_sessions 
      WHERE id = session_id AND user_id::text = auth.uid()::text
    )
  );

DROP POLICY IF EXISTS "Users can insert their own quiz attempts" ON quiz_attempts;
CREATE POLICY "Users can insert their own quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM quiz_sessions 
      WHERE id = session_id AND user_id::text = auth.uid()::text
    )
  );

-- Insert sample categories
INSERT INTO categories (name, description, question_count) VALUES
('General Knowledge', 'Test your general knowledge across various topics', 50),
('Science', 'Questions about physics, chemistry, biology, and more', 45),
('Technology', 'Computer science, programming, and tech trends', 40),
('Geography', 'World geography, countries, capitals, and landmarks', 35),
('Mathematics', 'Math problems from basic arithmetic to advanced concepts', 30),
('History', 'Historical events, figures, and civilizations', 25)
ON CONFLICT (name) DO NOTHING;

-- Insert sample questions
WITH category_ids AS (
  SELECT id, name FROM categories
)
INSERT INTO questions (question_text, options, correct_answer, category_id, difficulty, explanation) 
SELECT 
  'What is the capital of France?',
  '["London", "Berlin", "Paris", "Madrid"]'::jsonb,
  2,
  c.id,
  'easy',
  'Paris has been the capital of France since 987 AD.'
FROM category_ids c WHERE c.name = 'Geography'
UNION ALL
SELECT 
  'Which planet is known as the Red Planet?',
  '["Venus", "Mars", "Jupiter", "Saturn"]'::jsonb,
  1,
  c.id,
  'easy',
  'Mars appears red due to iron oxide (rust) on its surface.'
FROM category_ids c WHERE c.name = 'Science'
UNION ALL
SELECT 
  'What does CPU stand for?',
  '["Computer Processing Unit", "Central Processing Unit", "Core Processing Unit", "Central Program Unit"]'::jsonb,
  1,
  c.id,
  'easy',
  'CPU stands for Central Processing Unit, the main processor of a computer.'
FROM category_ids c WHERE c.name = 'Technology'
UNION ALL
SELECT 
  'What is the largest ocean on Earth?',
  '["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"]'::jsonb,
  3,
  c.id,
  'easy',
  'The Pacific Ocean covers about 46% of the Earth''s water surface.'
FROM category_ids c WHERE c.name = 'Geography'
UNION ALL
SELECT 
  'What is 15 × 8?',
  '["120", "125", "115", "130"]'::jsonb,
  0,
  c.id,
  'medium',
  '15 × 8 = 120'
FROM category_ids c WHERE c.name = 'Mathematics'
UNION ALL
SELECT 
  'Who painted the Mona Lisa?',
  '["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"]'::jsonb,
  2,
  c.id,
  'medium',
  'Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.'
FROM category_ids c WHERE c.name = 'General Knowledge'
UNION ALL
SELECT 
  'What is the chemical symbol for gold?',
  '["Go", "Gd", "Au", "Ag"]'::jsonb,
  2,
  c.id,
  'medium',
  'Au comes from the Latin word "aurum" meaning gold.'
FROM category_ids c WHERE c.name = 'Science'
UNION ALL
SELECT 
  'Which programming language is known for its use in web development?',
  '["Python", "JavaScript", "C++", "Java"]'::jsonb,
  1,
  c.id,
  'easy',
  'JavaScript is primarily used for web development and runs in browsers.'
FROM category_ids c WHERE c.name = 'Technology'
UNION ALL
SELECT 
  'Which country has the most time zones?',
  '["Russia", "United States", "China", "France"]'::jsonb,
  3,
  c.id,
  'hard',
  'France has 12 time zones due to its overseas territories.'
FROM category_ids c WHERE c.name = 'Geography'
UNION ALL
SELECT 
  'What is the value of π (pi) to two decimal places?',
  '["3.14", "3.15", "3.16", "3.13"]'::jsonb,
  0,
  c.id,
  'easy',
  'Pi (π) is approximately 3.14159, which rounds to 3.14.'
FROM category_ids c WHERE c.name = 'Mathematics'
ON CONFLICT DO NOTHING;

-- Update question counts for categories
UPDATE categories SET question_count = (
  SELECT COUNT(*) FROM questions WHERE category_id = categories.id
);

-- Create a function to get random questions (useful for quiz generation)
CREATE OR REPLACE FUNCTION get_random_questions(
  p_category_id UUID,
  p_difficulty TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  question_text TEXT,
  options JSONB,
  correct_answer INTEGER,
  category_id UUID,
  difficulty TEXT,
  explanation TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    q.id,
    q.question_text,
    q.options,
    q.correct_answer,
    q.category_id,
    q.difficulty,
    q.explanation
  FROM questions q
  WHERE q.category_id = p_category_id
    AND (p_difficulty IS NULL OR q.difficulty = p_difficulty)
  ORDER BY RANDOM()
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_random_questions TO authenticated;

-- Verify the setup
SELECT 'Setup completed successfully!' as status;
SELECT 'Categories created: ' || COUNT(*) as categories_count FROM categories;
SELECT 'Questions created: ' || COUNT(*) as questions_count FROM questions;
```

## Step 4: Verify Success

After running the script, you should see at the bottom:
- ✅ "Setup completed successfully!"
- ✅ "Categories created: 6"
- ✅ "Questions created: 10"

## Step 5: Test in Your App

1. Go back to your app
2. Click **"Test Supabase Connection"** again
3. You should now see:
   - ✅ Supabase connection successful
   - ✅ Database schema verified
   - ✅ Sample data found
   - 🎉 All tests passed!

## What This Creates

### Tables:
- **categories** - Quiz categories (6 sample categories)
- **questions** - Quiz questions with multiple choice (10 sample questions)
- **quiz_sessions** - User quiz attempts and scores
- **quiz_attempts** - Individual question attempts for analytics

### Security:
- Row Level Security (RLS) policies
- Users can only access their own quiz data
- Public read access for categories and questions

### Sample Data:
- 6 categories: General Knowledge, Science, Technology, Geography, Mathematics, History
- 10 sample questions across different categories and difficulties
- Proper relationships and indexes for performance

## Troubleshooting

If you get any errors:
1. Make sure you copied the ENTIRE script
2. Check that you're the owner of the Supabase project
3. Try refreshing the SQL Editor and running again
4. Check the Supabase logs for detailed error messages

Once this is complete, your quiz app will be fully functional with Supabase! 🎉