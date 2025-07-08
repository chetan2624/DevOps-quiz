
import React, { useRef, useEffect } from 'react';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { EmailReport } from './EmailReport';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  testLength: number;
  onRestart: () => void;
  skillName?: string;
  skillIcon?: string;
  isInterviewMode?: boolean;
  interviewFeedback?: string[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  score, 
  totalQuestions, 
  testLength, 
  onRestart,
  skillName = "DevOps",
  skillIcon = "💻",
  isInterviewMode = false,
  interviewFeedback = []
}) => {
  const particlesRef = useRef<HTMLDivElement>(null);

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

  const getPerformanceMessage = () => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    if (isInterviewMode) {
      if (percentage >= 80) return `🏆 Outstanding! You're ready for ${skillName} interviews!`;
      if (percentage >= 60) return `🌟 Good performance! Practice more complex scenarios for ${skillName}`;
      if (percentage >= 40) return `👍 Basic understanding is there. Focus on technical depth and approach`;
      return `📚 Need more preparation! Study ${skillName} concepts and practice explanations`;
    }
    
    if (percentage >= 90) return `🏆 Outstanding! You're a ${skillName} expert!`;
    if (percentage >= 80) return `🌟 Excellent! You have strong ${skillName} knowledge!`;
    if (percentage >= 70) return `👍 Good job! You know your way around ${skillName}!`;
    if (percentage >= 60) return `👌 Not bad! Keep practicing to improve your ${skillName} skills!`;
    return `📚 Keep learning! ${skillName} mastery takes time!`;
  };

  const getInterviewStats = () => {
    if (!isInterviewMode) return null;
    
    const correct = interviewFeedback.filter(f => f === 'correct').length;
    const conditionalCorrect = interviewFeedback.filter(f => f === 'conditional_correct').length;
    const failed = interviewFeedback.filter(f => f === 'incorrect' || f === 'conditional_failed').length;
    
    return (
      <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Interview Performance Breakdown</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-500/20 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-400">{correct}</div>
            <div className="text-sm text-green-300">Direct Success</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">{conditionalCorrect}</div>
            <div className="text-sm text-yellow-300">Cleared Follow-up</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-400">{failed}</div>
            <div className="text-sm text-red-300">Need Improvement</div>
          </div>
        </div>
      </div>
    );
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Auth Header */}
      <div className="absolute top-4 right-4 z-20">
        <AuthHeader />
      </div>
      
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">
            🎉 {isInterviewMode ? 'Interview Practice' : `${skillName} Quiz`} Complete!
          </h2>
          
          <div className="text-6xl mb-4">
            {skillIcon}
          </div>
          
          <div className="text-8xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
            {score}/{totalQuestions}
          </div>
          
          <div className="text-6xl font-bold mb-6 text-marvel-gold">
            {percentage}%
          </div>
          
          {getInterviewStats()}
          
          <p className="text-2xl text-white mb-8">
            {getPerformanceMessage()}
          </p>
          
          <div className="text-lg text-gray-300 mb-8">
            Test Length: {testLength} questions
          </div>
          
          <div className="flex flex-col gap-4 items-center">
            <button
              onClick={onRestart}
              className="bg-gradient-to-r from-marvel-blue to-marvel-purple text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
            >
              Try Again
            </button>
            
            <EmailReport
              score={score}
              totalQuestions={totalQuestions}
              skillName={skillName}
              testLength={testLength}
              isInterviewMode={isInterviewMode}
              interviewFeedback={interviewFeedback}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
