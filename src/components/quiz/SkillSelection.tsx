
import React from 'react';
import { Skill } from '@/types/quiz';
import { Button } from '@/components/ui/button'; 
import { ArrowLeft, Users } from 'lucide-react';

interface SkillSelectionProps {
  onSelectSkill: (skillId: string) => void;
  onBack: () => void;
  restartQuiz: () => void;
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
    name: 'Interview Practice',
    icon: '🧠',
    description: 'Open-ended interview questions in Hinglish - Real interview experience',
    questionCount: '10 Interactive'
  }
];

const SkillSelection: React.FC<SkillSelectionProps> = ({ onSelectSkill, onBack, restartQuiz }) => {
  const handleBackClick = () => {
    restartQuiz();
  };

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Navigation Header */}
      <nav className="flex justify-between items-center p-6">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your DevOps Skill
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a technology to test your knowledge with comprehensive interview-style questions.
            Each skill contains real-world scenarios you'll encounter in DevOps interviews.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="modern-card rounded-2xl p-6 hover:border-quiz-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => onSelectSkill(skill.id)}
            >
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-quiz-primary transition-colors">
                  {skill.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>
                <div className="flex items-center justify-center text-xs text-quiz-primary font-medium bg-quiz-secondary rounded-full px-3 py-1">
                  <Users className="w-3 h-3 mr-1" />
                  {skill.questionCount} Questions
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="modern-card rounded-2xl p-6 max-w-2xl mx-auto text-center">
          <h3 className="font-semibold text-foreground mb-3">Why Practice DevOps Skills?</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Each skill section contains carefully curated questions that mirror real interview scenarios. 
            Practice with different question lengths and track your progress across all DevOps domains.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillSelection;
