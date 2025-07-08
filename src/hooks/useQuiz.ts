
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
  if (userText.length < 15 || invalidResponses.some(invalid => userText.includes(invalid))) {
    return { isValid: false, score: 0 };
  }
  
  // Extract key technical terms from question and reference answer
  const questionKeywords = [...questionLower.match(/\b(kubernetes|docker|aws|s3|pod|container|bucket|service|deployment|node|cluster|linux|git|github|jenkins|terraform|datadog|monitoring|ci|cd|devops|merge|rebase|pipeline|declarative|scripted|state|file|process|dns|discovery|microservice|testing|zero-downtime|blue-green|rolling)\b/gi) || []];
  
  // Get broader technical vocabulary from both question and reference
  const technicalTerms = [
    // Kubernetes terms
    ...userText.match(/\b(pod|container|service|deployment|namespace|configmap|secret|ingress|nodeport|clusterip|loadbalancer|replica|scale|kubectl|yaml|manifest|endpoint|selector|label|annotation|volume|persistentvolume|storageclass|statefulset|daemonset|job|cronjob)\b/gi) || [],
    // AWS terms
    ...userText.match(/\b(s3|bucket|ec2|instance|lambda|cloudformation|iam|role|policy|vpc|subnet|security|group|load|balancer|route53|cloudfront|rds|dynamodb|elasticache|eks|fargate|ecs)\b/gi) || [],
    // Docker terms
    ...userText.match(/\b(container|image|dockerfile|docker|compose|volume|network|port|expose|bind|mount|registry|hub|build|run|exec|logs|inspect)\b/gi) || [],
    // Git terms
    ...userText.match(/\b(git|commit|push|pull|merge|rebase|branch|checkout|clone|fork|remote|origin|upstream|conflict|resolve|stash|cherry-pick|squash|reset|head|master|main)\b/gi) || [],
    // DevOps terms
    ...userText.match(/\b(ci|cd|pipeline|build|deploy|test|automation|monitoring|logging|alert|dashboard|infrastructure|terraform|ansible|jenkins|github|actions|workflow)\b/gi) || [],
    // Linux terms
    ...userText.match(/\b(linux|ubuntu|centos|bash|shell|command|file|directory|permission|chmod|chown|ps|top|grep|awk|sed|pipe|redirect|cron|systemctl|service|process|daemon)\b/gi) || []
  ];
  
  // Check for structured answer patterns
  const stepPatterns = userText.match(/\b(step\s*\d+|first|second|third|fourth|fifth|then|next|after|finally|lastly|\d+\.|•|→|->|pehle|phir|baad|me|fir)\b/gi) || [];
  const hasMultipleLines = userText.split(/[\n.]/).filter(line => line.trim().length > 10).length >= 3;
  const hasStructuredFormat = stepPatterns.length >= 2 || hasMultipleLines;
  
  // Check for action/process words
  const actionWords = [...userText.match(/\b(create|banate|configure|setup|install|deploy|run|start|enable|connect|expose|mount|scale|update|delete|add|modify|use|implement|apply|execute|manage|monitor|check|verify|troubleshoot|debug|resolve|handle|process|build|test|validate)\b/gi) || []];
  
  // Topic relevance check - ensure answer is about the right topic
  let topicRelevance = 0;
  if (questionKeywords.length > 0) {
    const matchedKeywords = questionKeywords.filter(keyword => userText.includes(keyword.toLowerCase()));
    topicRelevance = matchedKeywords.length / questionKeywords.length;
  } else {
    // If no specific keywords, check if answer is generally DevOps related
    topicRelevance = technicalTerms.length > 0 ? 1 : 0;
  }
  
  // Concept understanding check
  const conceptScore = technicalTerms.length / Math.max(1, userText.split(' ').length * 0.1); // Normalize by answer length
  const actionScore = actionWords.length >= 2 ? 1 : actionWords.length * 0.5;
  const structureScore = hasStructuredFormat ? 1 : 0.3;
  
  // Enhanced scoring with better weights
  const overallScore = (topicRelevance * 0.4) + (conceptScore * 0.3) + (structureScore * 0.2) + (actionScore * 0.1);
  
  // More flexible validation criteria
  const hasRelevantConcepts = technicalTerms.length >= 2 || topicRelevance >= 0.5;
  const hasProperStructure = hasStructuredFormat && userText.length >= 50;
  const isTopicRelevant = topicRelevance >= 0.3; // More lenient topic matching
  const hasMinimumDepth = userText.split(' ').length >= 20; // At least 20 words
  
  // Accept answer if it meets these criteria
  const isValid = (hasRelevantConcepts && hasProperStructure && isTopicRelevant && hasMinimumDepth) || 
                  (overallScore >= 0.4 && hasMinimumDepth && isTopicRelevant);
  
  console.log('Answer Evaluation Debug:', {
    userText: userText.substring(0, 100) + '...',
    technicalTerms: technicalTerms.slice(0, 5),
    questionKeywords,
    topicRelevance,
    conceptScore,
    structureScore,
    actionScore,
    overallScore,
    isValid,
    hasRelevantConcepts,
    hasProperStructure,
    isTopicRelevant,
    hasMinimumDepth
  });
  
  return {
    isValid,
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
