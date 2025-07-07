
import React, { useRef, useEffect } from 'react';

interface TestSelectionProps {
  onSelectTest: (length: number) => void;
  onBack: () => void;
}

const TestSelection: React.FC<TestSelectionProps> = ({ onSelectTest, onBack }) => {
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-8">Choose Your Test</h2>
        <p className="text-xl text-gray-300 mb-12">
          Select the number of questions for your Linux interview practice
        </p>
        
        <div className="grid gap-6 mb-8">
          <button
            onClick={() => onSelectTest(20)}
            className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl font-bold text-marvel-gold mb-2">20 Questions</div>
            <div className="text-lg">Quick Practice • 15-20 minutes</div>
            <div className="text-sm text-gray-300 mt-2">Perfect for a quick review</div>
          </button>
          
          <button
            onClick={() => onSelectTest(30)}
            className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl font-bold text-marvel-gold mb-2">30 Questions</div>
            <div className="text-lg">Standard Test • 25-30 minutes</div>
            <div className="text-sm text-gray-300 mt-2">Balanced practice session</div>
          </button>
          
          <button
            onClick={() => onSelectTest(50)}
            className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl font-bold text-marvel-gold mb-2">50 Questions</div>
            <div className="text-lg">Full Challenge • 40-50 minutes</div>
            <div className="text-sm text-gray-300 mt-2">Complete interview preparation</div>
          </button>
        </div>
        
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transform transition-all duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default TestSelection;
