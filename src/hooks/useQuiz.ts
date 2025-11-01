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

// Shuffle answer options for a question while keeping track of correct answer
const shuffleQuestionOptions = (question: Question): Question => {
  const optionsWithIndices = question.options.map((option, index) => ({
    option,
    originalIndex: index,
  }));
  
  // Fisher-Yates shuffle
  for (let i = optionsWithIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
  }
  
  // Find new index of correct answer
  const newCorrectIndex = optionsWithIndices.findIndex(
    item => item.originalIndex === question.correct
  );
  
  return {
    ...question,
    options: optionsWithIndices.map(item => item.option),
    correct: newCorrectIndex,
  };
};

const shuffleInterviewQuestions = (array: InterviewQuestion[]): InterviewQuestion[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Enhanced answer evaluation function for "Mere waale questions"
const evaluateAnswer = (userAnswer: string, referenceAnswer: string, questionText: string): { isValid: boolean; score: number } => {
  const userText = userAnswer.toLowerCase().trim();
  const questionLower = questionText.toLowerCase();
  
  console.log('=== Answer Evaluation Debug ===');
  console.log('User Answer:', userAnswer.substring(0, 150) + '...');
  console.log('Answer Length:', userAnswer.length);
  
  // Check for invalid responses first
  const invalidResponses = [
    'nhi pata', 'nhi aata', 'dont know', 'no idea', 'not sure', 
    'idk', 'dunno', 'nope', 'na', 'nahi', 'nothing', 'kuch nhi',
    'kuch nahi', 'pata nahi', 'malum nahi', 'samajh nahi aaya'
  ];
  
  // If answer is too short or contains invalid responses
  if (userText.length < 20 || invalidResponses.some(invalid => userText.includes(invalid))) {
    console.log('❌ Rejected: Too short or invalid response');
    return { isValid: false, score: 0 };
  }
  
  // Check for step-wise or point-wise structure (KEY REQUIREMENT)
  const stepPatterns = [
    /step\s*\d+/gi,           // "step 1", "step 2"
    /\d+\.\s+/g,              // "1. ", "2. "
    /point\s*\d+/gi,          // "point 1", "point 2"
    /pehle/gi,                // "pehle" (first in Hindi)
    /phir/gi,                 // "phir" (then in Hindi)
    /baad\s*me/gi,            // "baad me" (later in Hindi)
    /→|->|\|/g                // Arrow symbols or pipes
  ];
  
  const hasStepStructure = stepPatterns.some(pattern => pattern.test(userAnswer));
  const stepMatches = userAnswer.match(/step\s*\d+|pehle|phir|baad\s*me|\d+\./gi) || [];
  const hasMultipleSteps = stepMatches.length >= 2;
  
  console.log('Step Structure Check:', { hasStepStructure, stepMatches, hasMultipleSteps });
  
  // Check for Hinglish language patterns
  const hinglishPatterns = [
    // Common Hinglish words
    /\b(hai|hota|hote|karte|karna|banate|banana|use|kar|sakte|matlab|sabse|zyada|chhota|basic|mai|me|se|ke|ka|ki|aur|ya|jo|jaise|sath|through|provide|share|run|create|example|command)\b/gi,
    // Technical + Hindi mixed
    /kubernetes\s+(mai|me|ka|ke)/gi,
    /container\s+(hai|hote|karte)/gi,
    /pod\s+(hai|hota|kya)/gi,
    /command\s+(hai|hota)/gi
  ];
  
  const hinglishMatches = hinglishPatterns.reduce((count, pattern) => {
    const matches = userAnswer.match(pattern) || [];
    return count + matches.length;
  }, 0);
  
  const hasHinglishTone = hinglishMatches >= 3; // At least 3 Hinglish patterns
  
  console.log('Hinglish Check:', { hinglishMatches, hasHinglishTone });
  
  // Check for technical terms related to the question
  const technicalTerms = [
    ...userText.match(/\b(pod|container|kubernetes|docker|service|deployment|image|command|kubectl|run|nginx|yaml|network|storage|volume|namespace|cluster|node)\b/gi) || [],
    ...userText.match(/\b(aws|s3|bucket|ec2|lambda|git|github|push|pull|merge|branch|commit|terraform|jenkins|pipeline|ci|cd|monitoring|datadog)\b/gi) || []
  ];
  
  const hasTechnicalContent = technicalTerms.length >= 2;
  
  console.log('Technical Content:', { technicalTerms: technicalTerms.slice(0, 5), hasTechnicalContent });
  
  // Check for commands or examples (important for DevOps questions)
  const hasCommandExample = /kubectl|docker|git|aws|terraform|jenkins/i.test(userAnswer) && 
                           (/```|`|command:|example:/i.test(userAnswer) || /kubectl\s+\w+|docker\s+\w+|git\s+\w+/i.test(userAnswer));
  
  console.log('Command/Example Check:', hasCommandExample);
  
  // Check if answer is relevant to the question topic
  const questionKeywords = [...questionLower.match(/\b(kubernetes|docker|aws|git|github|terraform|jenkins|datadog|pod|container|service|deployment)\b/gi) || []];
  const relevantToTopic = questionKeywords.length === 0 || 
                         questionKeywords.some(keyword => userText.includes(keyword.toLowerCase()));
  
  console.log('Topic Relevance:', { questionKeywords, relevantToTopic });
  
  // NEW SCORING LOGIC - More specific to "Mere waale questions" format
  let totalScore = 0;
  let maxScore = 100;
  
  // 1. Step-wise structure (40 points) - MOST IMPORTANT
  if (hasStepStructure && hasMultipleSteps) {
    totalScore += 40;
    console.log('✅ +40 points: Good step structure');
  } else if (hasStepStructure) {
    totalScore += 20;
    console.log('✅ +20 points: Some step structure');
  } else {
    console.log('❌ 0 points: No step structure');
  }
  
  // 2. Hinglish tone (25 points) - VERY IMPORTANT
  if (hasHinglishTone) {
    totalScore += 25;
    console.log('✅ +25 points: Good Hinglish tone');
  } else {
    console.log('❌ 0 points: No Hinglish tone');
  }
  
  // 3. Technical content (20 points)
  if (hasTechnicalContent) {
    totalScore += 20;
    console.log('✅ +20 points: Good technical content');
  } else {
    console.log('❌ 0 points: Lacks technical content');
  }
  
  // 4. Command/Example (10 points)
  if (hasCommandExample) {
    totalScore += 10;
    console.log('✅ +10 points: Includes command/example');
  }
  
  // 5. Topic relevance (5 points)
  if (relevantToTopic) {
    totalScore += 5;
    console.log('✅ +5 points: Relevant to topic');
  }
  
  const finalScore = Math.round((totalScore / maxScore) * 100);
  
  // ACCEPTANCE CRITERIA for "Mere waale questions":
  // Must have step structure + Hinglish tone + basic technical content
  const meetsBasicRequirements = hasStepStructure && hasHinglishTone && hasTechnicalContent && relevantToTopic;
  const meetsMinimumScore = totalScore >= 60; // At least 60/100 points
  
  const isValid = meetsBasicRequirements && meetsMinimumScore;
  
  console.log('=== Final Evaluation ===');
  console.log('Total Score:', totalScore, '/ 100');
  console.log('Meets Basic Requirements:', meetsBasicRequirements);
  console.log('Meets Minimum Score:', meetsMinimumScore);
  console.log('Final Decision:', isValid ? '✅ ACCEPTED' : '❌ REJECTED');
  console.log('========================');
  
  return {
    isValid,
    score: finalScore
  };
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
    selectedDifficulty: null,
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
    if (skillId === 'interview') {
      // Skip test selection for interview mode and start directly
      const shuffledQuestions = shuffleInterviewQuestions([...allInterviewQuestions]);
      const selectedQuestions = shuffledQuestions.slice(0, 10);
      
      setQuizState(prev => ({
        ...prev,
        selectedSkill: skillId,
        showSkillSelection: false,
        showTestSelection: false, // Skip test selection
        testLength: selectedQuestions.length,
        interviewQuestions: selectedQuestions,
        userTextAnswers: new Array(selectedQuestions.length).fill(''),
        interviewFeedback: new Array(selectedQuestions.length).fill(''),
        quizStarted: true,
        isInterviewMode: true,
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        selectedSkill: skillId,
        showSkillSelection: false,
        showTestSelection: true,
      }));
    }
  };

  const selectTest = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!quizState.selectedSkill) return;
    
    // Regular MCQ mode
    const allQuestions = getQuestionsBySkill(quizState.selectedSkill);
    // Filter by difficulty if questions have difficulty property, otherwise use all
    const filteredQuestions = allQuestions.filter(q => !q.difficulty || q.difficulty === difficulty);
    const shuffledQuestions = shuffleArray(filteredQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, 20).map(q => shuffleQuestionOptions(q));
    
    setQuizState(prev => ({
      ...prev,
      testLength: 20,
      selectedQuestions,
      selectedDifficulty: difficulty,
      showTestSelection: false,
      quizStarted: true,
      isInterviewMode: false,
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

  const submitTextAnswer = () => {
    if (quizState.isInterviewMode && quizState.currentAnswer.trim()) {
      const currentQ = quizState.interviewQuestions[quizState.currentQuestion];
      const evaluation = evaluateAnswer(quizState.currentAnswer, currentQ.referenceAnswer, currentQ.question);
      
      const newTextAnswers = [...quizState.userTextAnswers];
      newTextAnswers[quizState.currentQuestion] = quizState.currentAnswer;
      
      const newFeedback = [...quizState.interviewFeedback];
      
      if (evaluation.isValid) {
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
        // Show conditional question for better evaluation
        setQuizState(prev => ({
          ...prev,
          userTextAnswers: newTextAnswers,
          showConditionalQuestion: true,
          currentAnswer: '',
        }));
      } else {
        // Final attempt failed or no conditional question
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
      const evaluation = currentQ.conditionalReferenceAnswer ? 
        evaluateAnswer(quizState.currentAnswer, currentQ.conditionalReferenceAnswer, currentQ.conditionalQuestion || currentQ.question) : 
        { isValid: false, score: 0 };
      
      const newFeedback = [...quizState.interviewFeedback];
      newFeedback[quizState.currentQuestion] = evaluation.isValid ? 'conditional_correct' : 'conditional_failed';
      
      setQuizState(prev => ({
        ...prev,
        interviewFeedback: newFeedback,
        answered: true,
        conditionalAnswered: true,
        score: evaluation.isValid ? prev.score + 1 : prev.score,
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
    if (quizState.isInterviewMode) {
      if (questionIndex >= 0 && questionIndex < quizState.interviewQuestions.length) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: questionIndex,
          answered: prev.interviewFeedback[questionIndex] !== '',
          showConditionalQuestion: false,
        }));
      }
    } else {
      if (questionIndex >= 0 && questionIndex < quizState.selectedQuestions.length) {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: questionIndex,
          answered: prev.userAnswers[questionIndex] !== undefined,
        }));
      }
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
      selectedDifficulty: null,
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
      selectedDifficulty: null,
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
