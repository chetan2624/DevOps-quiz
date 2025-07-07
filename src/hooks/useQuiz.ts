
import { useState } from 'react';
import { QuizState, Question } from '@/types/quiz';
import { selectQuestions } from '@/data/questions';

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answered: false,
    userAnswers: [],
    showResults: false,
    quizStarted: false,
    testLength: 0,
    selectedQuestions: [],
    showTestSelection: false,
  });

  const startTestSelection = () => {
    setQuizState(prev => ({ ...prev, showTestSelection: true }));
  };

  const selectTest = (length: number) => {
    setQuizState(prev => ({
      ...prev,
      testLength: length,
      selectedQuestions: selectQuestions(length),
      showTestSelection: false,
      quizStarted: true,
    }));
  };

  const selectAnswer = (selectedIndex: number) => {
    if (quizState.answered) return;
    
    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentQuestion] = selectedIndex;
    
    const isCorrect = selectedIndex === quizState.selectedQuestions[quizState.currentQuestion].correct;
    
    setQuizState(prev => ({
      ...prev,
      answered: true,
      userAnswers: newUserAnswers,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < quizState.selectedQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answered: prev.userAnswers[prev.currentQuestion + 1] !== undefined,
      }));
    } else {
      setQuizState(prev => ({ ...prev, showResults: true }));
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        answered: prev.userAnswers[prev.currentQuestion - 1] !== undefined,
      }));
    }
  };

  const jumpToQuestion = (questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < quizState.selectedQuestions.length) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: questionIndex,
        answered: prev.userAnswers[questionIndex] !== undefined,
      }));
    }
  };

  const exitQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answered: false,
      userAnswers: [],
      showResults: false,
      quizStarted: false,
      testLength: 0,
      selectedQuestions: [],
      showTestSelection: false,
    });
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answered: false,
      userAnswers: [],
      showResults: false,
      quizStarted: false,
      testLength: 0,
      selectedQuestions: [],
      showTestSelection: false,
    });
  };

  return {
    ...quizState,
    startTestSelection,
    selectTest,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    exitQuiz,
    restartQuiz,
  };
};
