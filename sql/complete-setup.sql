-- Complete Supabase setup for Quiz App
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT DEFAULT 'book-open',
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

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  total_quizzes INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_study_time INTEGER DEFAULT 0, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- Create quiz_sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  time_taken INTEGER NOT NULL, -- in seconds
  score DECIMAL(5,2) NOT NULL,
  experience_gained INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questions_category_id ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_id ON quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_id ON profiles(id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

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

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories table (public read)
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories" ON categories
  FOR SELECT USING (true);

-- RLS Policies for questions table (public read)
DROP POLICY IF EXISTS "Anyone can view questions" ON questions;
CREATE POLICY "Anyone can view questions" ON questions
  FOR SELECT USING (true);

-- RLS Policies for achievements table (public read)
DROP POLICY IF EXISTS "Anyone can view achievements" ON achievements;
CREATE POLICY "Anyone can view achievements" ON achievements
  FOR SELECT USING (true);

-- RLS Policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for user_achievements table
DROP POLICY IF EXISTS "Users can view their own achievements" ON user_achievements;
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own achievements" ON user_achievements;
CREATE POLICY "Users can insert their own achievements" ON user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for quiz_sessions table
DROP POLICY IF EXISTS "Users can view their own quiz sessions" ON quiz_sessions;
CREATE POLICY "Users can view their own quiz sessions" ON quiz_sessions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own quiz sessions" ON quiz_sessions;
CREATE POLICY "Users can insert their own quiz sessions" ON quiz_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample categories
INSERT INTO categories (name, description, icon_name, question_count) VALUES
('General Knowledge', 'Test your general knowledge across various topics', 'brain', 50),
('Science', 'Questions about physics, chemistry, biology, and more', 'microscope', 45),
('Technology', 'Computer science, programming, and tech trends', 'cpu', 40),
('Geography', 'World geography, countries, capitals, and landmarks', 'map', 35),
('Mathematics', 'Math problems from basic arithmetic to advanced concepts', 'calculator', 30),
('History', 'Historical events, figures, and civilizations', 'scroll', 25)
ON CONFLICT (name) DO NOTHING;

-- Insert sample achievements
INSERT INTO achievements (title, description, icon, category, requirement_type, requirement_value, points, rarity) VALUES
('First Steps', 'Complete your first quiz', 'award', 'quiz', 'count', 1, 10, 'common'),
('Quiz Master', 'Complete 10 quizzes', 'trophy', 'quiz', 'count', 10, 50, 'common'),
('Perfect Score', 'Get 100% on any quiz', 'star', 'score', 'percentage', 100, 25, 'rare'),
('Speed Demon', 'Complete a quiz in under 30 seconds', 'zap', 'time', 'time', 30, 30, 'rare'),
('Streak Starter', 'Maintain a 3-day study streak', 'flame', 'streak', 'streak', 3, 20, 'common'),
('Dedicated Learner', 'Maintain a 7-day study streak', 'calendar', 'streak', 'streak', 7, 50, 'rare'),
('Knowledge Seeker', 'Complete quizzes in 5 different categories', 'book-open', 'quiz', 'count', 5, 40, 'rare'),
('Science Enthusiast', 'Complete 20 science quizzes', 'microscope', 'quiz', 'count', 20, 60, 'epic'),
('Math Wizard', 'Get perfect scores on 5 math quizzes', 'calculator', 'score', 'count', 5, 75, 'epic'),
('Legend', 'Reach level 10', 'crown', 'special', 'count', 10, 100, 'legendary')
ON CONFLICT DO NOTHING;

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

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, level, experience_points, total_quizzes, correct_answers, current_streak, best_streak, total_study_time)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    1,
    0,
    0,
    0,
    0,
    0,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Verify the setup
SELECT 'Setup completed successfully!' as status;
SELECT 'Categories created: ' || COUNT(*) as categories_count FROM categories;
SELECT 'Questions created: ' || COUNT(*) as questions_count FROM questions;
SELECT 'Achievements created: ' || COUNT(*) as achievements_count FROM achievements;