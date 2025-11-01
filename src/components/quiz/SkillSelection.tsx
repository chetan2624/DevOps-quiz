
import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types/quiz';
import { Button } from '@/components/ui/button'; 
import { ArrowLeft, Users, Target, Zap, Sparkles } from 'lucide-react';
import skillBg from '@/assets/skill-selection-bg.jpg';

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
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'Python programming fundamentals, scripting, and automation',
    questionCount: 90
  },
  {
    id: 'shell',
    name: 'Shell Scripting',
    icon: '📜',
    description: 'Bash scripting, automation, and command-line tools',
    questionCount: 100,
    comingSoon: true
  },
  {
    id: 'grafana',
    name: 'Grafana & Prometheus',
    icon: '📈',
    description: 'Monitoring, metrics, dashboards, and alerting',
    questionCount: 100,
    comingSoon: true
  },
  {
    id: 'azure',
    name: 'Azure',
    icon: '🔷',
    description: 'Microsoft Azure cloud services and infrastructure',
    questionCount: 100,
    comingSoon: true
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
    <div className="min-h-screen cosmic-gradient relative">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${skillBg})` }}
      />
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6 relative z-10"
      >
        <Button
          variant="ghost"
          onClick={handleBackClick}
          className="group text-foreground"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Button>
      </motion.nav>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-full px-5 py-2.5 mb-6"
          >
            <Target className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-semibold text-primary">Choose Your Path</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          >
            Choose Your <span className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">DevOps Skill</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Select a technology to test your knowledge with comprehensive interview-style questions.
            Each skill contains real-world scenarios you'll encounter in DevOps interviews.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }}
              whileHover={skill.comingSoon ? {} : { scale: 1.05, y: -5 }}
              className={`modern-card rounded-2xl p-6 ${skill.comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} group relative overflow-hidden ${skill.comingSoon ? 'blur-[2px]' : ''}`}
              onClick={() => !skill.comingSoon && onSelectSkill(skill.id)}
            >
              {skill.comingSoon && (
                <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm">
                  <div className="bg-background/90 border-2 border-primary rounded-xl px-6 py-3 shadow-2xl">
                    <span className="text-primary font-bold text-lg">Coming Soon</span>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={skill.comingSoon ? {} : { rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl mb-4"
                >
                  {skill.icon}
                </motion.div>
                
                <h3 className={`text-xl font-bold text-foreground mb-2 ${!skill.comingSoon && 'group-hover:text-primary'} transition-colors`}>
                  {skill.name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>
                
                <div className="inline-flex items-center text-xs text-primary font-semibold bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5">
                  <Zap className="w-3 h-3 mr-1" />
                  {skill.questionCount} Questions
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="modern-card rounded-2xl p-8 max-w-2xl mx-auto text-center bg-gradient-to-br from-card to-secondary border-primary/20"
        >
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-3">Why Practice DevOps Skills?</h3>
          <p className="text-muted-foreground leading-relaxed">
            Each skill section contains carefully curated questions that mirror real interview scenarios. 
            Practice with different question lengths and track your progress across all DevOps domains.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillSelection;
