
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
const evaluateAnswer = (userAnswer: string, referenceAnswer: string, questionText: string): { isValid: boolean; score: number } => {
  const userText = userAnswer.toLowerCase().trim();
  const referenceText = referenceAnswer.toLowerCase();
  const questionLower = questionText.toLowerCase();
  
  // Check for invalid responses
  const invalidResponses = [
    'nhi pata', 'nhi aata', 'dont know', 'no idea', 'not sure', 
    'idk', 'dunno', 'nope', 'na', 'nahi', 'nothing', 'kuch nhi',
    'kuch nahi', 'pata nahi', 'malum nahi', 'samajh nahi aaya'
  ];
  
  // If answer is too short or contains invalid responses
  if (userText.length < 20 || invalidResponses.some(invalid => userText.includes(invalid))) {
    return { isValid: false, score: 0 };
  }
  
  // Extract key technical terms from reference answer and question
  const technicalTerms = [...referenceText.match(/\b(kubernetes|docker|aws|s3|pod|container|bucket|service|deployment|node|cluster|yaml|json|api|cli|command|server|database|network|security|access|permission|policy|role|user|group|instance|volume|storage|memory|cpu|load|balancer|proxy|gateway|endpoint|port|protocol|http|https|ssl|tls|certificate|key|token|authentication|authorization|configuration|environment|variable|script|pipeline|build|deploy|monitor|log|metric|alert|dashboard|backup|restore|scale|replicate|sync|async|queue|cache|cdn|dns|domain|subdomain|firewall|vpc|subnet|route|table|elastic|lambda|ec2|rds|iam|cloudformation|terraform|ansible|jenkins|github|git|commit|push|pull|merge|branch|tag|release|version|ci|cd|devops|automation|orchestration|microservice|monolith|architecture|pattern|design|best|practice|troubleshoot|debug|error|exception|timeout|retry|circuit|breaker|linux|ubuntu|centos|redhat|shell|bash|script|file|directory|permission|chmod|chown|systemctl|service|process|thread|memory|disk|network|iptables|firewall|cron|log|syslog)\b/gi) || []];
  
  // Extract key terms from question to ensure relevance
  const questionTerms = [...questionLower.match(/\b(kubernetes|docker|aws|s3|pod|container|bucket|service|deployment|node|cluster|linux|git|github|jenkins|terraform|datadog|monitoring|ci|cd|devops)\b/gi) || []];
  
  // Extract action words and step-wise indicators
  const stepIndicators = userText.match(/\b(step\s*\d+|first|second|third|fourth|fifth|then|next|after|finally|lastly|\d+\.|•|→|->)\b/gi) || [];
  const actionWords = [...userText.match(/\b(create|configure|setup|install|deploy|run|execute|start|stop|restart|update|upgrade|delete|remove|add|modify|change|edit|enable|disable|connect|disconnect|attach|detach|mount|unmount|expose|publish|bind|link|join|leave|scale|resize|migrate|backup|restore|clone|fork|merge|rebase|commit|push|pull|fetch|checkout|switch|branch|tag|release|build|compile|test|validate|verify|check|monitor|observe|track|trace|log|audit|secure|encrypt|decrypt|authenticate|authorize|grant|revoke|allow|deny|block|permit|restrict|limit|throttle|queue|cache|store|retrieve|fetch|query|search|filter|sort|group|aggregate|transform|parse|serialize|deserialize|encode|decode|compress|decompress|optimize|tune|configure|customize|integrate|implement|develop|code|script|automate|orchestrate|manage|administer|maintain|support|troubleshoot|debug|fix|resolve|handle|process|execute|invoke|trigger|schedule|batch|stream|async|sync|parallel|concurrent|sequential|linear|recursive|iterative)\b/gi) || []];
  
  const userWords = userText.split(/\s+/);
  
  // Check for technical concept match
  const technicalMatch = technicalTerms.filter(term => 
    userWords.some(userWord => userWord.includes(term.toLowerCase()) || term.toLowerCase().includes(userWord))
  ).length;
  
  // Check if answer is relevant to the question topic
  const topicRelevance = questionTerms.length > 0 ? 
    questionTerms.filter(term => userText.includes(term)).length / questionTerms.length : 0;
  
  // Check for approach/action match
  const actionMatch = actionWords.filter(action => 
    userWords.some(userWord => userWord.includes(action.toLowerCase()) || action.toLowerCase().includes(userWord))
  ).length;
  
  // Check for structured response (step-wise explanation)
  const hasStructure = stepIndicators.length >= 2 || userText.split('\n').length >= 3;
  
  // Calculate scores
  const technicalScore = technicalMatch / Math.max(1, technicalTerms.length);
  const actionScore = actionMatch / Math.max(1, actionWords.length);
  const structureScore = hasStructure ? 0.3 : 0;
  const relevanceScore = topicRelevance;
  
  // Overall score calculation with weights
  const overallScore = (technicalScore * 0.4) + (actionScore * 0.3) + (structureScore * 0.2) + (relevanceScore * 0.1);
  
  // Enhanced validation criteria
  const minScore = 0.25;
  const hasBasicConcepts = technicalMatch >= 1;
  const hasApproach = actionMatch >= 1 || stepIndicators.length >= 1;
  const isRelevant = topicRelevance >= 0.5 || questionTerms.length === 0; // If no specific terms, assume general question
  const hasMinimumLength = userText.length >= 50; // Increased minimum length
  
  return {
    isValid: overallScore >= minScore && hasBasicConcepts && hasApproach && isRelevant && hasMinimumLength,
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

  const selectTest = (length: number) => {
    if (!quizState.selectedSkill) return;
    
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
