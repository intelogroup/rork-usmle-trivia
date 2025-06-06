-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-secret-key';

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
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

-- Create quiz_attempts table
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
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories table (public read)
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- RLS Policies for questions table (public read)
CREATE POLICY "Anyone can view questions" ON questions
  FOR SELECT USING (true);

-- RLS Policies for quiz_sessions table
CREATE POLICY "Users can view their own quiz sessions" ON quiz_sessions
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert their own quiz sessions" ON quiz_sessions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- RLS Policies for quiz_attempts table
CREATE POLICY "Users can view their own quiz attempts" ON quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM quiz_sessions 
      WHERE id = session_id AND user_id::text = auth.uid()::text
    )
  );

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
ON CONFLICT DO NOTHING;

-- Insert sample questions
INSERT INTO questions (question_text, options, correct_answer, category_id, difficulty, explanation) 
SELECT 
  'What is the capital of France?',
  '["London", "Berlin", "Paris", "Madrid"]'::jsonb,
  2,
  c.id,
  'easy',
  'Paris has been the capital of France since 987 AD.'
FROM categories c WHERE c.name = 'Geography'
ON CONFLICT DO NOTHING;

INSERT INTO questions (question_text, options, correct_answer, category_id, difficulty, explanation) 
SELECT 
  'Which planet is known as the Red Planet?',
  '["Venus", "Mars", "Jupiter", "Saturn"]'::jsonb,
  1,
  c.id,
  'easy',
  'Mars appears red due to iron oxide (rust) on its surface.'
FROM categories c WHERE c.name = 'Science'
ON CONFLICT DO NOTHING;

INSERT INTO questions (question_text, options, correct_answer, category_id, difficulty, explanation) 
SELECT 
  'What is 15 × 8?',
  '["120", "125", "115", "130"]'::jsonb,
  0,
  c.id,
  'medium',
  '15 × 8 = 120'
FROM categories c WHERE c.name = 'Mathematics'
ON CONFLICT DO NOTHING;

INSERT INTO questions (question_text, options, correct_answer, category_id, difficulty, explanation) 
SELECT 
  'What does CPU stand for?',
  '["Computer Processing Unit", "Central Processing Unit", "Core Processing Unit", "Central Program Unit"]'::jsonb,
  1,
  c.id,
  'easy',
  'CPU stands for Central Processing Unit, the main processor of a computer.'
FROM categories c WHERE c.name = 'Technology'
ON CONFLICT DO NOTHING;

INSERT INTO questions (question_text, options, correct_answer, category_id, difficulty, explanation) 
SELECT 
  'What is the largest ocean on Earth?',
  '["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"]'::jsonb,
  3,
  c.id,
  'easy',
  'The Pacific Ocean covers about 46% of the Earth''s water surface.'
FROM categories c WHERE c.name = 'Geography'
ON CONFLICT DO NOTHING;