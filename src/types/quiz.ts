
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty?: DifficultyLevel;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  referenceAnswer: string;
  conditionalQuestion?: string;
  conditionalReferenceAnswer?: string;
  category: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answered: boolean;
  userAnswers: number[];
  showResults: boolean;
  quizStarted: boolean;
  testLength: number;
  selectedQuestions: Question[];
  showTestSelection: boolean;
  showSkillSelection: boolean;
  selectedSkill: string | null;
  selectedDifficulty: DifficultyLevel | null;
  // Interview mode specific
  isInterviewMode: boolean;
  interviewQuestions: InterviewQuestion[];
  userTextAnswers: string[];
  currentAnswer: string;
  showConditionalQuestion: boolean;
  conditionalAnswered: boolean;
  interviewFeedback: string[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  description: string;
  questionCount: number | string;
  comingSoon?: boolean;
}
