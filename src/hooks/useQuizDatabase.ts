import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Question, InterviewQuestion, QuizState } from '@/types/quiz';
import { Json } from '@/integrations/supabase/types';

interface DatabaseQuestion {
  id: string;
  question: string;
  options: Json;
  correct_answer: number;
  explanation: string;
  difficulty: string;
  category_id: string;
  created_at: string;
}

interface DatabaseInterviewQuestion {
  id: string;
  question: string;
  reference_answer: string;
  conditional_question?: string;
  conditional_reference_answer?: string;
}

export const useQuizDatabase = () => {
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answered: false,
    userAnswers: [],
    showResults: false,
    quizStarted: false,
    testLength: 10,
    selectedQuestions: [],
    showTestSelection: false,
    showSkillSelection: true,
    selectedSkill: null,
    isInterviewMode: false,
    interviewQuestions: [],
    userTextAnswers: [],
    currentAnswer: '',
    showConditionalQuestion: false,
    conditionalAnswered: false,
    interviewFeedback: [],
  });

  const fetchQuestionsByCategory = useCallback(async (categoryName: string): Promise<Question[]> => {
    try {
      setLoading(true);
      setError(null);

      // Get category ID
      const { data: category, error: categoryError } = await supabase
        .from('question_categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (categoryError) throw categoryError;

      // Fetch questions for this category
      const { data: dbQuestions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('category_id', category.id);

      if (questionsError) throw questionsError;

      // Transform database questions to Question type
      const questions: Question[] = dbQuestions.map((q) => ({
        question: q.question,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options as string),
        correct: q.correct_answer,
        explanation: q.explanation,
      }));

      return questions;
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInterviewQuestionsByCategory = useCallback(async (categoryName: string): Promise<InterviewQuestion[]> => {
    try {
      setLoading(true);
      setError(null);

      // Get category ID
      const { data: category, error: categoryError } = await supabase
        .from('question_categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (categoryError) throw categoryError;

      // Fetch interview questions for this category
      const { data: dbQuestions, error: questionsError } = await supabase
        .from('interview_questions')
        .select('*')
        .eq('category_id', category.id);

      if (questionsError) throw questionsError;

      // Transform database questions to InterviewQuestion type
      const questions: InterviewQuestion[] = dbQuestions.map((q: DatabaseInterviewQuestion, index: number) => ({
        id: q.id,
        question: q.question,
        referenceAnswer: q.reference_answer,
        conditionalQuestion: q.conditional_question,
        conditionalReferenceAnswer: q.conditional_reference_answer,
        category: categoryName,
      }));

      return questions;
    } catch (err) {
      console.error('Error fetching interview questions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch interview questions');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const saveQuizSession = useCallback(async (categoryName: string, quizType: 'multiple_choice' | 'interview', totalQuestions: number, score?: number) => {
    if (!isLoggedIn || !user) return null;

    try {
      // Get category ID
      const { data: category, error: categoryError } = await supabase
        .from('question_categories')
        .select('id')
        .eq('name', categoryName)
        .single();

      if (categoryError) throw categoryError;

      // Create quiz session
      const { data: session, error: sessionError } = await supabase
        .from('user_quiz_sessions')
        .insert({
          user_id: user.id,
          category_id: category.id,
          quiz_type: quizType,
          total_questions: totalQuestions,
          score: score,
          completed_at: score !== undefined ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      return session.id;
    } catch (err) {
      console.error('Error saving quiz session:', err);
      return null;
    }
  }, [isLoggedIn, user]);

  const saveAnswer = useCallback(async (sessionId: string, questionId: string | null, interviewQuestionId: string | null, selectedOption?: number, textAnswer?: string, isCorrect?: boolean, score?: number) => {
    if (!isLoggedIn) return;

    try {
      await supabase
        .from('user_answers')
        .insert({
          session_id: sessionId,
          question_id: questionId,
          interview_question_id: interviewQuestionId,
          selected_option: selectedOption,
          text_answer: textAnswer,
          is_correct: isCorrect,
          score: score,
        });
    } catch (err) {
      console.error('Error saving answer:', err);
    }
  }, [isLoggedIn]);

  const migrateBakedDataToDatabase = useCallback(async () => {
    try {
      setLoading(true);
      const response = await supabase.functions.invoke('migrate-questions');
      
      if (response.error) {
        throw response.error;
      }

      console.log('Migration completed:', response.data);
      return response.data;
    } catch (err) {
      console.error('Migration error:', err);
      setError(err instanceof Error ? err.message : 'Migration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    quizState,
    setQuizState,
    fetchQuestionsByCategory,
    fetchInterviewQuestionsByCategory,
    saveQuizSession,
    saveAnswer,
    migrateBakedDataToDatabase,
    loading,
    error,
  };
};