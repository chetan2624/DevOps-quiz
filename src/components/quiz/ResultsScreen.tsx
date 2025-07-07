
import React, { useRef, useEffect } from 'react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  testLength: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  score, 
  totalQuestions, 
  testLength, 
  onRestart 
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
    if (percentage >= 90) return "🏆 Outstanding! You're a Linux expert!";
    if (percentage >= 80) return "🌟 Excellent! You have strong Linux knowledge!";
    if (percentage >= 70) return "👍 Good job! You know your way around Linux!";
    if (percentage >= 60) return "👌 Not bad! Keep practicing to improve!";
    return "📚 Keep learning! Linux mastery takes time!";
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-8">🎉 Quiz Complete!</h2>
        
        <div className="text-8xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
          {score}/{totalQuestions}
        </div>
        
        <div className="text-6xl font-bold mb-6 text-marvel-gold">
          {percentage}%
        </div>
        
        <p className="text-2xl text-white mb-8">
          {getPerformanceMessage()}
        </p>
        
        <div className="text-lg text-gray-300 mb-8">
          Test Length: {testLength} questions
        </div>
        
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-marvel-blue to-marvel-purple text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
