
import React from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Target, Flame, Sparkles } from 'lucide-react';

interface TestSelectionProps {
  onSelectTest: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onBack: () => void;
  skillName?: string;
  skillIcon?: string;
  selectedSkill?: string;
}

const TestSelection: React.FC<TestSelectionProps> = ({ 
  onSelectTest, 
  onBack, 
  skillName = "DevOps",
  skillIcon = "💻"
}) => {
  const difficultyOptions = [
    {
      difficulty: 'easy' as const,
      title: "Easy Level",
      description: "Foundation concepts with clear explanations",
      details: "Perfect for beginners and quick revision",
      icon: Zap,
      iconColor: "text-green-500",
      buttonClass: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      recommended: false
    },
    {
      difficulty: 'medium' as const,
      title: "Medium Level",
      description: "Advanced topics and tricky scenarios",
      details: "Challenge yourself with complex questions",
      icon: Target,
      iconColor: "text-orange-500",
      buttonClass: "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700",
      recommended: true
    },
    {
      difficulty: 'hard' as const,
      title: "Hard Level",
      description: "Real-world scenarios and multi-skill problems",
      details: "Expert level for 1-2 years experience",
      icon: Flame,
      iconColor: "text-red-500",
      buttonClass: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700",
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6"
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="group text-foreground"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Skills
        </Button>
        <AuthHeader />
      </motion.nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            {skillIcon}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          >
            Choose Your <span className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">Challenge Level</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Select your difficulty level for {skillName}. Each level contains 20 questions designed to match your expertise.
          </motion.p>
        </motion.div>

        {/* Difficulty Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {difficultyOptions.map((option, index) => (
            <motion.div 
              key={option.difficulty}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="modern-card rounded-3xl p-8 text-center cursor-pointer relative group"
              onClick={() => onSelectTest(option.difficulty)}
            >
              {option.recommended && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <div className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Recommended
                  </div>
                </motion.div>
              )}
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-muted"
                >
                  <option.icon className={`w-10 h-10 ${option.iconColor}`} />
                </motion.div>
                
                <h3 className={`text-3xl font-bold ${option.iconColor} mb-2`}>
                  {option.title}
                </h3>
                
                <p className="text-foreground mb-3 leading-relaxed font-semibold text-base">
                  {option.description}
                </p>
                
                <p className="text-muted-foreground mb-6 text-sm">
                  {option.details}
                </p>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground mb-1">20</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                
                <Button 
                  className={`w-full ${option.buttonClass} text-white border-0 shadow-lg`}
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTest(option.difficulty);
                  }}
                >
                  Start {option.title}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="modern-card rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-green-500 font-bold text-lg mb-2">Easy Level</div>
              <p className="text-muted-foreground text-sm">Clear questions with straightforward options</p>
            </div>
            <div>
              <div className="text-orange-500 font-bold text-lg mb-2">Medium Level</div>
              <p className="text-muted-foreground text-sm">Advanced topics with confusing options</p>
            </div>
            <div>
              <div className="text-red-500 font-bold text-lg mb-2">Hard Level</div>
              <p className="text-muted-foreground text-sm">Multi-skill scenarios for experienced professionals</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestSelection;
