-- Create profiles table for extended user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create question_categories table
CREATE TABLE public.question_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for question_categories (publicly readable)
ALTER TABLE public.question_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Question categories are viewable by everyone" 
ON public.question_categories 
FOR SELECT 
USING (true);

-- Create questions table for multiple choice questions
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.question_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for questions (publicly readable)
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Questions are viewable by everyone" 
ON public.questions 
FOR SELECT 
USING (true);

-- Create interview_questions table
CREATE TABLE public.interview_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.question_categories(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  reference_answer TEXT NOT NULL,
  conditional_question TEXT,
  conditional_reference_answer TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for interview_questions (publicly readable)
ALTER TABLE public.interview_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Interview questions are viewable by everyone" 
ON public.interview_questions 
FOR SELECT 
USING (true);

-- Create user_quiz_sessions table
CREATE TABLE public.user_quiz_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.question_categories(id) ON DELETE CASCADE,
  quiz_type TEXT NOT NULL CHECK (quiz_type IN ('multiple_choice', 'interview')),
  total_questions INTEGER NOT NULL,
  score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for user_quiz_sessions
ALTER TABLE public.user_quiz_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz sessions" 
ON public.user_quiz_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quiz sessions" 
ON public.user_quiz_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz sessions" 
ON public.user_quiz_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create user_answers table
CREATE TABLE public.user_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.user_quiz_sessions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  interview_question_id UUID REFERENCES public.interview_questions(id) ON DELETE CASCADE,
  selected_option INTEGER,
  text_answer TEXT,
  is_correct BOOLEAN,
  score INTEGER,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT check_question_type CHECK (
    (question_id IS NOT NULL AND interview_question_id IS NULL) OR
    (question_id IS NULL AND interview_question_id IS NOT NULL)
  )
);

-- Enable RLS for user_answers
ALTER TABLE public.user_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own answers" 
ON public.user_answers 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.user_quiz_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

CREATE POLICY "Users can create their own answers" 
ON public.user_answers 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.user_quiz_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();