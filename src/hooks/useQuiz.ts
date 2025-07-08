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

const shuffleInterviewQuestions = (array: InterviewQuestion[]): InterviewQuestion[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Enhanced answer evaluation function
const evaluateAnswer = (userAnswer: string, referenceAnswer: string): { isValid: boolean; score: number } => {
  const userText = userAnswer.toLowerCase().trim();
  const referenceText = referenceAnswer.toLowerCase();
  
  // Check for invalid responses
  const invalidResponses = [
    'nhi pata', 'nhi aata', 'dont know', 'no idea', 'not sure', 
    'idk', 'dunno', 'nope', 'na', 'nahi', 'nothing', 'kuch nhi',
    'kuch nahi', 'pata nahi', 'malum nahi', 'samajh nahi aaya'
  ];
  
  // If answer is too short or contains invalid responses
  if (userText.length < 10 || invalidResponses.some(invalid => userText.includes(invalid))) {
    return { isValid: false, score: 0 };
  }
  
  // Extract key technical terms from reference answer
  const technicalTerms = referenceText.match(/\b(kubernetes|docker|aws|s3|pod|container|bucket|service|deployment|node|cluster|yaml|json|api|cli|command|server|database|network|security|access|permission|policy|role|user|group|instance|volume|storage|memory|cpu|load|balancer|proxy|gateway|endpoint|port|protocol|http|https|ssl|tls|certificate|key|token|authentication|authorization|configuration|environment|variable|script|pipeline|build|deploy|monitor|log|metric|alert|dashboard|backup|restore|scale|replicate|sync|async|queue|cache|cdn|dns|domain|subdomain|firewall|vpc|subnet|route|table|elastic|lambda|ec2|rds|iam|cloudformation|terraform|ansible|jenkins|github|git|commit|push|pull|merge|branch|tag|release|version|ci|cd|devops|automation|orchestration|microservice|monolith|architecture|pattern|design|best|practice|troubleshoot|debug|error|exception|timeout|retry|circuit|breaker)\b/gi) || [];
  
  // Extract action words and concepts
  const actionWords = referenceText.match(/\b(create|configure|setup|install|deploy|run|execute|start|stop|restart|update|upgrade|delete|remove|add|modify|change|edit|enable|disable|connect|disconnect|attach|detach|mount|unmount|expose|publish|bind|link|join|leave|scale|resize|migrate|backup|restore|clone|fork|merge|rebase|commit|push|pull|fetch|checkout|switch|branch|tag|release|build|compile|test|validate|verify|check|monitor|observe|track|trace|log|audit|secure|encrypt|decrypt|authenticate|authorize|grant|revoke|allow|deny|block|permit|restrict|limit|throttle|queue|cache|store|retrieve|fetch|query|search|filter|sort|group|aggregate|transform|parse|serialize|deserialize|encode|decode|compress|decompress|optimize|tune|configure|customize|integrate|implement|develop|code|script|automate|orchestrate|manage|administer|maintain|support|troubleshoot|debug|fix|resolve|handle|process|execute|invoke|trigger|schedule|batch|stream|async|sync|parallel|concurrent|sequential|linear|recursive|iterative)\b/gi) || [];
  
  const userWords = userText.split(/\s+/);
  const referenceWords = referenceText.split(/\s+/);
  
  // Check for technical concept match
  const technicalMatch = technicalTerms.filter(term => 
    userWords.some(userWord => userWord.includes(term.toLowerCase()) || term.toLowerCase().includes(userWord))
  ).length;
  
  // Check for approach/action match
  const actionMatch = actionWords.filter(action => 
    userWords.some(userWord => userWord.includes(action.toLowerCase()) || action.toLowerCase().includes(userWord))
  ).length;
  
  // Calculate score based on matches
  const technicalScore = technicalMatch / Math.max(1, technicalTerms.length);
  const actionScore = actionMatch / Math.max(1, actionWords.length);
  const overallScore = (technicalScore + actionScore) / 2;
  
  // Minimum thresholds for acceptance
  const minScore = 0.3;
  const hasBasicConcepts = technicalMatch >= 1;
  const hasApproach = actionMatch >= 1 || userText.includes('step') || userText.includes('first') || userText.includes('then');
  
  return {
    isValid: overallScore >= minScore && hasBasicConcepts && hasApproach,
    score: Math.round(overallScore * 100)
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
      const shuffledQuestions = shuffleInterviewQuestions([...allInterviewQuestions]);
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
      const evaluation = evaluateAnswer(quizState.currentAnswer, currentQ.referenceAnswer);
      
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
        evaluateAnswer(quizState.currentAnswer, currentQ.conditionalReferenceAnswer) : 
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
