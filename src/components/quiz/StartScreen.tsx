
import React, { useRef, useEffect } from 'react';
import { AuthHeader } from '@/components/auth/AuthHeader';

interface StartScreenProps {
  onStartTestSelection: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartTestSelection }) => {
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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Auth Header */}
      <div className="absolute top-4 right-4 z-20">
        <AuthHeader />
      </div>
      
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Cosmic Background */}
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10 animate-pulse-glow">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
              🚀 DEVOPS QUIZ
            </h1>
            <h2 className="text-3xl font-bold text-white mb-2">INTERVIEW MASTERY CHALLENGE</h2>
            <p className="text-xl text-gray-300">
              Master DevOps skills with comprehensive interview questions
            </p>
          </div>
          
          <div className="mb-8 text-lg text-gray-200">
            <p>💻 8 DevOps Skills: Linux, AWS, GitHub, Docker, Kubernetes, Terraform, Jenkins, DataDog</p>
            <p>📚 100+ Interview questions per skill</p>
            <p>⚡ Choose your test length: 20, 30, or 50 questions</p>
            <p>🔀 Questions are randomly shuffled each time</p>
            <p>🏆 Perfect preparation for DevOps interviews</p>
          </div>
          
          <button
            onClick={onStartTestSelection}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-marvel-red/50"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
