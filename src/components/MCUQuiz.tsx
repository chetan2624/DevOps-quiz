import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useQuiz } from '@/hooks/useQuiz';
import StartScreen from './quiz/StartScreen';
import SkillSelection from './quiz/SkillSelection';
import TestSelection from './quiz/TestSelection';
import ResultsScreen from './quiz/ResultsScreen';
import QuestionNavigation from './quiz/QuestionNavigation';
import InterviewQuestion from './quiz/InterviewQuestion';

const MCUQuiz: React.FC = () => {
  const quiz = useQuiz();
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quiz.quizStarted) {
      gsap.fromTo(quizContainerRef.current, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [quiz.quizStarted]);

  useEffect(() => {
    if (quiz.quizStarted && questionCardRef.current) {
      gsap.fromTo(questionCardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [quiz.currentQuestion, quiz.quizStarted]);

  useEffect(() => {
    if (progressBarRef.current) {
      const progress = quiz.isInterviewMode 
        ? ((quiz.currentQuestion + 1) / quiz.interviewQuestions.length) * 100
        : ((quiz.currentQuestion + 1) / quiz.selectedQuestions.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [quiz.currentQuestion, quiz.selectedQuestions.length, quiz.interviewQuestions.length, quiz.isInterviewMode]);

  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesRef.current.appendChild(particle);
      }
    }
  };

  const handleOptionClick = (index: number) => {
    quiz.selectAnswer(index);
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
      case 'interview': return 'Mere waale questions';
      default: return 'DevOps';
    }
  };

  // Start screen
  if (!quiz.showSkillSelection && !quiz.showTestSelection && !quiz.quizStarted) {
    return <StartScreen onStartTestSelection={quiz.startSkillSelection} />;
  }

  // Skill selection screen
  if (quiz.showSkillSelection && !quiz.quizStarted) {
    return (
      <SkillSelection 
        onSelectSkill={quiz.selectSkill}
        onBack={() => quiz.exitQuiz()}
        restartQuiz={quiz.restartQuiz}
      />
    );
  }

  // Test selection screen
  if (quiz.showTestSelection && !quiz.quizStarted) {
    return (
      <TestSelection 
        onSelectTest={quiz.selectTest}
        onBack={quiz.backToSkillSelection}
        skillName={getSkillName(quiz.selectedSkill)}
        skillIcon={getSkillIcon(quiz.selectedSkill)}
      />
    );
  }

  // Results screen
  if (quiz.showResults) {
    return (
      <ResultsScreen 
        score={quiz.score}
        totalQuestions={quiz.isInterviewMode ? quiz.interviewQuestions.length : quiz.selectedQuestions.length}
        testLength={quiz.testLength}
        onRestart={quiz.restartQuiz}
        skillName={getSkillName(quiz.selectedSkill)}
        skillIcon={getSkillIcon(quiz.selectedSkill)}
        isInterviewMode={quiz.isInterviewMode}
        interviewFeedback={quiz.interviewFeedback}
      />
    );
  }

  // Quiz interface
  if (quiz.isInterviewMode) {
    const currentQ = quiz.interviewQuestions[quiz.currentQuestion];
    const currentFeedback = quiz.interviewFeedback[quiz.currentQuestion];
    
    // Create interview answers array for navigation (mark failed conditional questions as failed)
    const interviewAnswers = quiz.interviewFeedback.map((feedback, index) => {
      if (feedback === 'conditional_failed' || feedback === 'incorrect') {
        return -1; // Mark as failed (red)
      } else if (feedback === 'correct' || feedback === 'conditional_correct') {
        return index; // Mark as answered
      }
      return undefined; // Not answered yet
    });
    
    return (
      <div className="min-h-screen cosmic-gradient">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center p-6 border-b border-border/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={quiz.exitQuiz}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/20 text-muted-foreground hover:text-foreground hover:border-quiz-primary/30 transition-all"
            >
              <span>←</span> Exit Interview
            </button>
            <div className="text-foreground font-semibold">
              🧠 Interview Practice
            </div>
          </div>
          <div className="text-sm text-muted-foreground bg-card/50 rounded-full px-4 py-2 border border-border/20">
            Question {quiz.currentQuestion + 1} of {quiz.interviewQuestions.length}
          </div>
        </div>

        <div className="mobile-container py-8">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-foreground">
                Interview Practice
              </h1>
              <div className="text-right">
                <div className="text-2xl font-bold text-quiz-primary">{quiz.score}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>
            
            <div className="modern-card rounded-xl p-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(((quiz.currentQuestion + 1) / quiz.interviewQuestions.length) * 100)}%</span>
              </div>
              <div className="progress-modern h-3">
                <div
                  ref={progressBarRef}
                  className="progress-bar h-full"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>

          {/* Interview Question */}
          <div ref={questionCardRef} className="animate-fade-in">
            <InterviewQuestion
              question={currentQ.question}
              conditionalQuestion={currentQ.conditionalQuestion}
              currentAnswer={quiz.currentAnswer}
              onAnswerChange={quiz.updateCurrentAnswer}
              onSubmit={quiz.submitTextAnswer}
              onConditionalSubmit={quiz.submitConditionalAnswer}
              showConditional={quiz.showConditionalQuestion}
              answered={quiz.answered}
              feedback={currentFeedback}
              questionNumber={quiz.currentQuestion + 1}
              totalQuestions={quiz.interviewQuestions.length}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4 mt-8">
            <button
              onClick={quiz.prevQuestion}
              disabled={quiz.currentQuestion === 0}
              className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all min-w-[120px] border border-border/20 bg-card text-foreground hover:bg-muted"
            >
              ← Previous
            </button>
            
            <button
              onClick={quiz.nextQuestion}
              disabled={!quiz.answered}
              className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all min-w-[120px]"
            >
              {quiz.currentQuestion === quiz.interviewQuestions.length - 1 ? 'Finish Interview →' : 'Next →'}
            </button>
          </div>

          {/* Question Navigation Grid */}
          <div className="mt-8 modern-card rounded-xl p-4">
            <div className="text-sm font-semibold text-foreground mb-3">Question Navigation</div>
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: quiz.interviewQuestions.length }, (_, index) => {
                const isAnswered = interviewAnswers[index] !== undefined;
                const isCurrent = index === quiz.currentQuestion;
                
                let buttonClass = "w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-200 ";
                
                if (isCurrent) {
                  buttonClass += "bg-quiz-primary text-primary-foreground border-2 border-quiz-primary";
                } else if (isAnswered) {
                  if (interviewAnswers[index] === -1) {
                    buttonClass += "bg-quiz-error/20 text-quiz-error border border-quiz-error/50";
                  } else {
                    buttonClass += "bg-quiz-success/20 text-quiz-success border border-quiz-success/50";
                  }
                } else {
                  buttonClass += "border border-border text-muted-foreground hover:bg-muted hover:text-foreground";
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => quiz.jumpToQuestion(index)}
                    className={buttonClass}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-3">
              <span>Answered: {interviewAnswers.filter(a => a !== undefined).length}</span>
              <span>Remaining: {quiz.interviewQuestions.length - interviewAnswers.filter(a => a !== undefined).length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular MCQ Quiz interface
  const currentQ = quiz.selectedQuestions[quiz.currentQuestion];
  const isAnswered = quiz.userAnswers[quiz.currentQuestion] !== undefined;

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center p-6 border-b border-border/10 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={quiz.exitQuiz}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/20 text-muted-foreground hover:text-foreground hover:border-quiz-primary/30 transition-all"
          >
            <span>←</span> Exit Quiz
          </button>
          <div className="text-foreground font-semibold">
            {getSkillIcon(quiz.selectedSkill)} {getSkillName(quiz.selectedSkill)} Quiz
          </div>
        </div>
        <div className="text-sm text-muted-foreground bg-card/50 rounded-full px-4 py-2 border border-border/20">
          Question {quiz.currentQuestion + 1} of {quiz.selectedQuestions.length}
        </div>
      </div>

      <div className="mobile-container py-8">
        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              Test Your Knowledge
            </h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-quiz-primary">{quiz.score}</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
          
          <div className="modern-card rounded-xl p-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(((quiz.currentQuestion + 1) / quiz.selectedQuestions.length) * 100)}%</span>
            </div>
            <div className="progress-modern h-3">
              <div
                ref={progressBarRef}
                className="progress-bar h-full"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div ref={questionCardRef} className="modern-card rounded-2xl p-6 sm:p-8 mb-8 animate-fade-in">
          <div className="mb-6">
            <div className="text-quiz-primary font-semibold text-sm mb-3">
              Question {quiz.currentQuestion + 1}
            </div>
            <h2 className="text-xl sm:text-2xl text-foreground font-semibold leading-relaxed">
              {currentQ.question}
            </h2>
          </div>
          
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium relative group ";
              
              if (isAnswered) {
                if (index === currentQ.correct) {
                  buttonClass += "success-state border-quiz-success bg-quiz-success/10";
                } else if (index === quiz.userAnswers[quiz.currentQuestion] && index !== currentQ.correct) {
                  buttonClass += "error-state border-quiz-error bg-quiz-error/10";
                } else {
                  buttonClass += "border-border text-muted-foreground bg-muted/20";
                }
              } else {
                buttonClass += "border-border text-foreground hover:border-quiz-primary hover:bg-quiz-primary/5 hover:scale-[1.02] active:scale-[0.98]";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-quiz-primary font-bold bg-quiz-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="mobile-text leading-relaxed">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Feedback */}
          {isAnswered && (
            <div className={`modern-card rounded-xl p-4 animate-fade-in ${
              quiz.userAnswers[quiz.currentQuestion] === currentQ.correct 
                ? 'success-state' 
                : 'error-state'
            }`}>
              <div className="flex items-center gap-2 font-semibold mb-2">
                {quiz.userAnswers[quiz.currentQuestion] === currentQ.correct ? '✅' : '❌'}
                {quiz.userAnswers[quiz.currentQuestion] === currentQ.correct ? 'Correct!' : 'Incorrect'}
              </div>
              <div className="mobile-text leading-relaxed opacity-90">{currentQ.explanation}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <button
            onClick={quiz.prevQuestion}
            disabled={quiz.currentQuestion === 0}
            className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all min-w-[120px] border border-border/20 bg-card text-foreground hover:bg-muted"
          >
            ← Previous
          </button>
          
          <button
            onClick={quiz.nextQuestion}
            disabled={!isAnswered}
            className="btn-primary px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all min-w-[120px]"
          >
            {quiz.currentQuestion === quiz.selectedQuestions.length - 1 ? 'Finish Quiz →' : 'Next →'}
          </button>
        </div>

        {/* Question Navigation Grid */}
        <div className="mt-8 modern-card rounded-xl p-4">
          <div className="text-sm font-semibold text-foreground mb-3">Question Navigation</div>
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: quiz.selectedQuestions.length }, (_, index) => {
              const isAnswered = quiz.userAnswers[index] !== undefined;
              const isCurrent = index === quiz.currentQuestion;
              
              let buttonClass = "w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-200 ";
              
              if (isCurrent) {
                buttonClass += "bg-quiz-primary text-primary-foreground border-2 border-quiz-primary";
              } else if (isAnswered) {
                buttonClass += "bg-quiz-success/20 text-quiz-success border border-quiz-success/50 hover:bg-quiz-success/30";
              } else {
                buttonClass += "border border-border text-muted-foreground hover:bg-muted hover:text-foreground";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => quiz.jumpToQuestion(index)}
                  className={buttonClass}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-3">
            <span>Answered: {quiz.userAnswers.filter(a => a !== undefined).length}</span>
            <span>Remaining: {quiz.selectedQuestions.length - quiz.userAnswers.filter(a => a !== undefined).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCUQuiz;
