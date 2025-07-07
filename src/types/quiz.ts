
export interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
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
}
