
import React, { useRef, useEffect } from 'react';
import { Skill } from '@/types/quiz';

interface SkillSelectionProps {
  onSelectSkill: (skillId: string) => void;
  onBack: () => void;
}

const skills: Skill[] = [
  {
    id: 'linux',
    name: 'Linux',
    icon: '🐧',
    description: 'Command line, system administration, and shell scripting',
    questionCount: 100
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: '☁️',
    description: 'Cloud services, EC2, S3, Lambda, and scenario-based questions',
    questionCount: 100
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🔗',
    description: 'Git version control, repositories, and collaboration',
    questionCount: 100
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    description: 'Containerization, images, and container orchestration',
    questionCount: 100
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '⚙️',
    description: 'Container orchestration, pods, services, and deployments',
    questionCount: 100
  },
  {
    id: 'terraform',
    name: 'Terraform',
    icon: '🏗️',
    description: 'Infrastructure as Code, providers, and resource management',
    questionCount: 100
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: '🔧',
    description: 'CI/CD pipelines, build automation, and deployment',
    questionCount: 100
  },
  {
    id: 'datadog',
    name: 'DataDog',
    icon: '📊',
    description: 'Monitoring, observability, and application performance',
    questionCount: 100
  },
  {
    id: 'interview',
    name: 'Mere waale questions',
    icon: '🧠',
    description: 'Open-ended interview questions in Hinglish - Real interview experience',
    questionCount: '10 Interactive'
  }
];

const SkillSelection: React.FC<SkillSelectionProps> = ({ onSelectSkill, onBack }) => {
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
      
      <div className="glass-effect rounded-3xl p-8 max-w-6xl mx-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your DevOps Skill</h2>
          <p className="text-xl text-gray-300">
            Select a technology to test your knowledge with interview-style questions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => onSelectSkill(skill.id)}
              className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <div className="text-xl font-bold text-marvel-gold mb-2">
                {skill.name}
              </div>
              <div className="text-sm text-gray-300 mb-3">
                {skill.description}
              </div>
              <div className="text-xs text-gray-400">
                {skill.questionCount} Questions Available
              </div>
            </button>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transform transition-all duration-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSelection;
