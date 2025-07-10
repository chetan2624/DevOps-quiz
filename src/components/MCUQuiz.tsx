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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div ref={quizContainerRef} className="glass-effect rounded-3xl p-8 max-w-4xl mx-4 relative z-10 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold marvel-gradient bg-clip-text text-transparent mb-4">
              🧠 Mere waale questions - Interview Mode
            </h1>
            <div className="text-white text-lg">
              Progress: <span className="text-marvel-gold font-bold">{quiz.score}</span> / {quiz.interviewQuestions.length} 
              <span className="text-gray-300 ml-4">(Interview Practice)</span>
            </div>
          </div>

          {/* Question Navigation */}
          <QuestionNavigation
            currentQuestion={quiz.currentQuestion}
            totalQuestions={quiz.interviewQuestions.length}
            userAnswers={interviewAnswers}
            onJumpToQuestion={quiz.jumpToQuestion}
            onExit={quiz.exitQuiz}
          />

          {/* Progress Bar */}
          <div className="glass-effect rounded-2xl p-4 mb-8">
            <div className="bg-gray-700 rounded-xl h-6 overflow-hidden relative progress-shimmer">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-marvel-red via-marvel-gold to-marvel-blue rounded-xl"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Interview Question */}
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

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={quiz.prevQuestion}
              disabled={quiz.currentQuestion === 0}
              className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
            >
              Previous
            </button>
            
            <button
              onClick={quiz.nextQuestion}
              disabled={!quiz.answered}
              className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
            >
              {quiz.currentQuestion === quiz.interviewQuestions.length - 1 ? 'Finish Interview' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular MCQ Quiz interface
  const currentQ = quiz.selectedQuestions[quiz.currentQuestion];
  const isAnswered = quiz.userAnswers[quiz.currentQuestion] !== undefined;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div ref={quizContainerRef} className="glass-effect rounded-3xl p-8 max-w-4xl mx-4 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold marvel-gradient bg-clip-text text-transparent mb-4">
            {getSkillIcon(quiz.selectedSkill)} {getSkillName(quiz.selectedSkill)} Interview Quiz
          </h1>
          <div className="text-white text-lg">
            Score: <span className="text-marvel-gold font-bold">{quiz.score}</span> / {quiz.selectedQuestions.length} 
            <span className="text-gray-300 ml-4">({quiz.testLength} Question Test)</span>
          </div>
        </div>

        {/* Question Navigation */}
        <QuestionNavigation
          currentQuestion={quiz.currentQuestion}
          totalQuestions={quiz.selectedQuestions.length}
          userAnswers={quiz.userAnswers}
          onJumpToQuestion={quiz.jumpToQuestion}
          onExit={quiz.exitQuiz}
        />

        {/* Progress Bar */}
        <div className="glass-effect rounded-2xl p-4 mb-8">
          <div className="bg-gray-700 rounded-xl h-6 overflow-hidden relative progress-shimmer">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-marvel-red via-marvel-gold to-marvel-blue rounded-xl"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="glass-effect rounded-2xl p-8 mb-8">
          <div className="text-marvel-red font-bold text-xl mb-4">
            Question {quiz.currentQuestion + 1} of {quiz.selectedQuestions.length}
          </div>
          
          <h2 className="text-2xl text-white mb-8 font-medium">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 text-white font-medium ";
              
              if (isAnswered) {
                if (index === currentQ.correct) {
                  buttonClass += "bg-green-500/30 border-green-400 text-green-100";
                } else if (index === quiz.userAnswers[quiz.currentQuestion] && index !== currentQ.correct) {
                  buttonClass += "bg-red-500/30 border-red-400 text-red-100";
                } else {
                  buttonClass += "glass-effect border-gray-600 text-gray-300";
                }
              } else {
                buttonClass += "glass-effect border-gray-600 hover:border-marvel-gold hover:bg-white/10 hover:scale-105";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <span className="text-marvel-gold font-bold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          
          {/* Feedback */}
          {isAnswered && (
            <div className={`p-4 rounded-xl ${
              quiz.userAnswers[quiz.currentQuestion] === currentQ.correct 
                ? 'bg-green-500/20 border border-green-400 text-green-100' 
                : 'bg-red-500/20 border border-red-400 text-red-100'
            }`}>
              <div className="font-bold mb-2">
                {quiz.userAnswers[quiz.currentQuestion] === currentQ.correct ? '🎉 Correct!' : '❌ Incorrect'}
              </div>
              <div>{currentQ.explanation}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={quiz.prevQuestion}
            disabled={quiz.currentQuestion === 0}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
          >
            Previous
          </button>
          
          <button
            onClick={quiz.nextQuestion}
            disabled={!isAnswered}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
          >
            {quiz.currentQuestion === quiz.selectedQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCUQuiz;
