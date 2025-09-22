import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useQuizDatabase } from '@/hooks/useQuizDatabase';
import StartScreen from './quiz/StartScreen';
import DatabaseSkillSelection from './quiz/DatabaseSkillSelection';
import TestSelection from './quiz/TestSelection';
import ResultsScreen from './quiz/ResultsScreen';
import InterviewQuestion from './quiz/InterviewQuestion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DatabaseMCUQuiz: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const {
    quizState,
    setQuizState,
    fetchQuestionsByCategory,
    fetchInterviewQuestionsByCategory,
    saveQuizSession,
    saveAnswer,
    migrateBakedDataToDatabase,
    loading,
    error
  } = useQuizDatabase();
  
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const [migrationExecuted, setMigrationExecuted] = React.useState(false);

  // Auto-execute migration on first load
  useEffect(() => {
    const executeMigration = async () => {
      if (migrationExecuted) return;
      
      try {
        await migrateBakedDataToDatabase();
        setMigrationExecuted(true);
        console.log('Database migration completed successfully');
      } catch (err) {
        console.error('Migration failed:', err);
        toast({
          title: "Migration Error",
          description: "Failed to populate database with questions",
          variant: "destructive"
        });
      }
    };

    executeMigration();
  }, [migrateBakedDataToDatabase, migrationExecuted, toast]);

  useEffect(() => {
    if (quizState.quizStarted) {
      gsap.fromTo(quizContainerRef.current, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [quizState.quizStarted]);

  useEffect(() => {
    if (quizState.quizStarted && questionCardRef.current) {
      gsap.fromTo(questionCardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [quizState.currentQuestion, quizState.quizStarted]);

  useEffect(() => {
    if (progressBarRef.current) {
      const progress = quizState.isInterviewMode 
        ? ((quizState.currentQuestion + 1) / quizState.interviewQuestions.length) * 100
        : ((quizState.currentQuestion + 1) / quizState.selectedQuestions.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [quizState.currentQuestion, quizState.selectedQuestions.length, quizState.interviewQuestions.length, quizState.isInterviewMode]);

  const startSkillSelection = () => {
    setQuizState(prev => ({
      ...prev,
      showSkillSelection: true,
      showTestSelection: false,
      quizStarted: false,
      showResults: false
    }));
  };

  const selectSkill = async (skillId: string) => {
    try {
      const isInterview = skillId === 'interview';
      
      if (isInterview) {
        const questions = await fetchInterviewQuestionsByCategory('DevOps');
        setQuizState(prev => ({
          ...prev,
          selectedSkill: skillId,
          isInterviewMode: true,
          interviewQuestions: questions.slice(0, 10),
          showSkillSelection: false,
          showTestSelection: false,
          quizStarted: true,
          testLength: 10
        }));
      } else {
        setQuizState(prev => ({
          ...prev,
          selectedSkill: skillId,
          isInterviewMode: false,
          showSkillSelection: false,
          showTestSelection: true
        }));
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load questions",
        variant: "destructive"
      });
    }
  };

  const selectTest = async (length: number) => {
    if (!quizState.selectedSkill) return;
    
    try {
      const questions = await fetchQuestionsByCategory(quizState.selectedSkill);
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, length);

      setQuizState(prev => ({
        ...prev,
        testLength: length,
        selectedQuestions: selected,
        showTestSelection: false,
        quizStarted: true,
        userAnswers: new Array(length).fill(undefined),
        currentQuestion: 0,
        score: 0,
        answered: false
      }));
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to start quiz",
        variant: "destructive"
      });
    }
  };

  const exitQuiz = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: 0,
      score: 0,
      answered: false,
      userAnswers: [],
      showResults: false,
      quizStarted: false,
      testLength: 10,
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
      interviewFeedback: []
    }));
  };

  const getSkillIcon = (skillId: string | null): string => {
    switch (skillId) {
      case 'linux': return '🐧';
      case 'aws': return '☁️';
      case 'github': return '🔗';
      case 'docker': return '🐳';
      case 'kubernetes': return '⚙️';
      case 'terraform': return '🏗️';
      case 'jenkins': return '🔧';
      case 'datadog': return '📊';
      case 'interview': return '🧠';
      default: return '💻';
    }
  };

  const getSkillName = (skillId: string | null): string => {
    switch (skillId) {
      case 'linux': return 'Linux';
      case 'aws': return 'AWS';
      case 'github': return 'GitHub';
      case 'docker': return 'Docker';
      case 'kubernetes': return 'Kubernetes';
      case 'terraform': return 'Terraform';
      case 'jenkins': return 'Jenkins';
      case 'datadog': return 'DataDog';
      case 'interview': return 'Interview Practice';
      default: return 'DevOps';
    }
  };

  if (loading && !migrationExecuted) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚡</div>
          <div className="text-xl font-semibold text-foreground">Setting up your quiz platform...</div>
          <div className="text-muted-foreground mt-2">Migrating questions to database</div>
        </div>
      </div>
    );
  }

  // Start screen
  if (!quizState.showSkillSelection && !quizState.showTestSelection && !quizState.quizStarted) {
    return <StartScreen onStartTestSelection={startSkillSelection} />;
  }

  // Skill selection screen
  if (quizState.showSkillSelection && !quizState.quizStarted) {
    return (
      <DatabaseSkillSelection 
        onSelectSkill={selectSkill}
        onBack={exitQuiz}
        restartQuiz={exitQuiz}
      />
    );
  }

  // Test selection screen
  if (quizState.showTestSelection && !quizState.quizStarted) {
    return (
      <TestSelection 
        onSelectTest={selectTest}
        onBack={() => setQuizState(prev => ({ ...prev, showTestSelection: false, showSkillSelection: true }))}
        skillName={getSkillName(quizState.selectedSkill)}
        skillIcon={getSkillIcon(quizState.selectedSkill)}
      />
    );
  }

  // Results screen
  if (quizState.showResults) {
    return (
      <ResultsScreen 
        score={quizState.score}
        totalQuestions={quizState.isInterviewMode ? quizState.interviewQuestions.length : quizState.selectedQuestions.length}
        testLength={quizState.testLength}
        onRestart={exitQuiz}
        skillName={getSkillName(quizState.selectedSkill)}
        skillIcon={getSkillIcon(quizState.selectedSkill)}
        isInterviewMode={quizState.isInterviewMode}
        interviewFeedback={quizState.interviewFeedback}
      />
    );
  }

  // Interview mode implementation would go here
  if (quizState.isInterviewMode) {
    // ... interview implementation
    return <div>Interview mode coming soon...</div>;
  }

  // Regular MCQ Quiz interface
  const currentQ = quizState.selectedQuestions[quizState.currentQuestion];
  if (!currentQ) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-foreground">Loading questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Basic quiz interface - simplified for now */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Question {quizState.currentQuestion + 1}</h2>
          <div className="bg-card rounded-lg p-6 mb-4">
            <p className="text-lg mb-4">{currentQ.question}</p>
            <div className="space-y-2">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded border hover:bg-muted"
                  onClick={() => {
                    // Handle answer selection
                    const newAnswers = [...quizState.userAnswers];
                    newAnswers[quizState.currentQuestion] = index;
                    const isCorrect = index === currentQ.correct;
                    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
                    
                    setQuizState(prev => ({
                      ...prev,
                      userAnswers: newAnswers,
                      score: newScore,
                      answered: true
                    }));
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button 
              onClick={exitQuiz}
              className="px-4 py-2 border rounded hover:bg-muted"
            >
              Exit
            </button>
            <button 
              onClick={() => {
                if (quizState.currentQuestion < quizState.selectedQuestions.length - 1) {
                  setQuizState(prev => ({
                    ...prev,
                    currentQuestion: prev.currentQuestion + 1,
                    answered: false
                  }));
                } else {
                  setQuizState(prev => ({ ...prev, showResults: true }));
                }
              }}
              disabled={!quizState.answered}
              className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
            >
              {quizState.currentQuestion === quizState.selectedQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseMCUQuiz;