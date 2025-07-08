import { useState } from 'react';
import { QuizState, Question, InterviewQuestion } from '@/types/quiz';
import { selectQuestions } from '@/data/questions';
import { allAwsQuestions } from '@/data/awsQuestions';
import { allGithubQuestions } from '@/data/githubQuestions';
import { allDockerQuestions } from '@/data/dockerQuestions';
import { allKubernetesQuestions } from '@/data/kubernetesQuestions';
import { allTerraformQuestions } from '@/data/terraformQuestions';
import { allJenkinsQuestions } from '@/data/jenkinsQuestions';
import { allDatadogQuestions } from '@/data/datadogQuestions';
import { allInterviewQuestions } from '@/data/interviewQuestions';

const getQuestionsBySkill = (skillId: string): Question[] => {
  switch (skillId) {
    case 'linux':
      return selectQuestions(100); // Use existing Linux questions
    case 'aws':
      return allAwsQuestions;
    case 'github':
      return allGithubQuestions;
    case 'docker':
      return allDockerQuestions;
    case 'kubernetes':
      return allKubernetesQuestions;
    case 'terraform':
      return allTerraformQuestions;
    case 'jenkins':
      return allJenkinsQuestions;
    case 'datadog':
      return allDatadogQuestions;
    default:
      return selectQuestions(100); // Fallback to Linux questions
  }
};

const shuffleArray = (array: Question[]): Question[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Simple answer evaluation function
const evaluateAnswer = (userAnswer: string, referenceAnswer: string): boolean => {
  const userWords = userAnswer.toLowerCase().split(/\s+/);
  const referenceWords = referenceAnswer.toLowerCase().split(/\s+/);
  
  // Extract key concepts from reference answer
  const keyWords = referenceWords.filter(word => 
    word.length > 3 && 
    !['kaise', 'karta', 'karte', 'karke', 'hote', 'hota', 'hai', 'the', 'and', 'for', 'with'].includes(word)
  );
  
  // Check if user answer contains at least 40% of key concepts
  const matchedWords = keyWords.filter(word => 
    userWords.some(userWord => userWord.includes(word) || word.includes(userWord))
  );
  
  return matchedWords.length >= Math.max(2, keyWords.length * 0.4);
};

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
    showSkillSelection: false,
    selectedSkill: null,
    // Interview mode
    isInterviewMode: false,
    interviewQuestions: [],
    userTextAnswers: [],
    currentAnswer: '',
    showConditionalQuestion: false,
    conditionalAnswered: false,
    interviewFeedback: [],
  });

  const startSkillSelection = () => {
    setQuizState(prev => ({ ...prev, showSkillSelection: true }));
  };

  const selectSkill = (skillId: string) => {
    setQuizState(prev => ({
      ...prev,
      selectedSkill: skillId,
      showSkillSelection: false,
      showTestSelection: true,
    }));
  };

  const selectTest = (length: number) => {
    if (!quizState.selectedSkill) return;
    
    if (quizState.selectedSkill === 'interview') {
      // Interview mode setup
      const shuffledQuestions = shuffleArray([...allInterviewQuestions]);
      const selectedQuestions = shuffledQuestions.slice(0, Math.min(10, length));
      
      setQuizState(prev => ({
        ...prev,
        testLength: selectedQuestions.length,
        interviewQuestions: selectedQuestions,
        userTextAnswers: new Array(selectedQuestions.length).fill(''),
        interviewFeedback: new Array(selectedQuestions.length).fill(''),
        showTestSelection: false,
        quizStarted: true,
        isInterviewMode: true,
      }));
    } else {
      // Regular MCQ mode
      const allQuestions = getQuestionsBySkill(quizState.selectedSkill);
      const shuffledQuestions = shuffleArray(allQuestions);
      const selectedQuestions = shuffledQuestions.slice(0, length);
      
      setQuizState(prev => ({
        ...prev,
        testLength: length,
        selectedQuestions,
        showTestSelection: false,
        quizStarted: true,
        isInterviewMode: false,
      }));
    }
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

  const submitTextAnswer = () => {
    if (quizState.isInterviewMode && quizState.currentAnswer.trim()) {
      const currentQ = quizState.interviewQuestions[quizState.currentQuestion];
      const isCorrect = evaluateAnswer(quizState.currentAnswer, currentQ.referenceAnswer);
      
      const newTextAnswers = [...quizState.userTextAnswers];
      newTextAnswers[quizState.currentQuestion] = quizState.currentAnswer;
      
      const newFeedback = [...quizState.interviewFeedback];
      
      if (isCorrect) {
        newFeedback[quizState.currentQuestion] = 'correct';
        setQuizState(prev => ({
          ...prev,
          userTextAnswers: newTextAnswers,
          interviewFeedback: newFeedback,
          answered: true,
          score: prev.score + 1,
          currentAnswer: '',
        }));
      } else if (currentQ.conditionalQuestion && !quizState.showConditionalQuestion) {
        // Show conditional question
        setQuizState(prev => ({
          ...prev,
          userTextAnswers: newTextAnswers,
          showConditionalQuestion: true,
          currentAnswer: '',
        }));
      } else {
        // Final attempt or no conditional question
        newFeedback[quizState.currentQuestion] = quizState.showConditionalQuestion ? 'conditional_failed' : 'incorrect';
        setQuizState(prev => ({
          ...prev,
          userTextAnswers: newTextAnswers,
          interviewFeedback: newFeedback,
          answered: true,
          currentAnswer: '',
          showConditionalQuestion: false,
        }));
      }
    }
  };

  const submitConditionalAnswer = () => {
    if (quizState.isInterviewMode && quizState.currentAnswer.trim()) {
      const currentQ = quizState.interviewQuestions[quizState.currentQuestion];
      const isCorrect = currentQ.conditionalReferenceAnswer ? 
        evaluateAnswer(quizState.currentAnswer, currentQ.conditionalReferenceAnswer) : false;
      
      const newFeedback = [...quizState.interviewFeedback];
      newFeedback[quizState.currentQuestion] = isCorrect ? 'conditional_correct' : 'conditional_failed';
      
      setQuizState(prev => ({
        ...prev,
        interviewFeedback: newFeedback,
        answered: true,
        conditionalAnswered: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        currentAnswer: '',
        showConditionalQuestion: false,
      }));
    }
  };

  const updateCurrentAnswer = (answer: string) => {
    setQuizState(prev => ({ ...prev, currentAnswer: answer }));
  };

  const nextQuestion = () => {
    if (quizState.isInterviewMode) {
      if (quizState.currentQuestion < quizState.interviewQuestions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          answered: prev.interviewFeedback[prev.currentQuestion + 1] !== '',
          showConditionalQuestion: false,
          conditionalAnswered: false,
        }));
      } else {
        setQuizState(prev => ({ ...prev, showResults: true }));
      }
    } else {
      if (quizState.currentQuestion < quizState.selectedQuestions.length - 1) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          answered: prev.userAnswers[prev.currentQuestion + 1] !== undefined,
        }));
      } else {
        setQuizState(prev => ({ ...prev, showResults: true }));
      }
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
      showSkillSelection: false,
      selectedSkill: null,
      isInterviewMode: false,
      interviewQuestions: [],
      userTextAnswers: [],
      currentAnswer: '',
      showConditionalQuestion: false,
      conditionalAnswered: false,
      interviewFeedback: [],
    });
  };

  const backToSkillSelection = () => {
    setQuizState(prev => ({
      ...prev,
      showTestSelection: false,
      showSkillSelection: true,
      selectedSkill: null,
    }));
  };

  return {
    ...quizState,
    startSkillSelection,
    selectSkill,
    selectTest,
    selectAnswer,
    submitTextAnswer,
    submitConditionalAnswer,
    updateCurrentAnswer,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    exitQuiz,
    restartQuiz,
    backToSkillSelection,
  };
};
