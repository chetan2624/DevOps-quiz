
import React from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, CheckCircle, Users, Target, Sparkles } from 'lucide-react';

interface TestSelectionProps {
  onSelectTest: (length: number) => void;
  onBack: () => void;
  skillName?: string;
  skillIcon?: string;
}

const TestSelection: React.FC<TestSelectionProps> = ({ 
  onSelectTest, 
  onBack, 
  skillName = "DevOps",
  skillIcon = "💻"
}) => {
  const testOptions = [
    {
      questions: 20,
      duration: "15-20 minutes",
      title: "Quick Practice",
      description: "Perfect for a quick review session",
      icon: Clock,
      recommended: false
    },
    {
      questions: 30,
      duration: "25-30 minutes", 
      title: "Standard Test",
      description: "Balanced practice session",
      icon: Target,
      recommended: true
    },
    {
      questions: 50,
      duration: "40-50 minutes",
      title: "Full Challenge", 
      description: "Complete interview preparation",
      icon: Users,
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
            {skillName} <span className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">Quiz</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Select the number of questions for your {skillName} interview practice. 
            Choose the option that best fits your available time and learning goals.
          </motion.p>
        </motion.div>

        {/* Test Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {testOptions.map((option, index) => (
            <motion.div 
              key={option.questions}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="modern-card rounded-3xl p-8 text-center cursor-pointer relative group"
              onClick={() => onSelectTest(option.questions)}
            >
              {option.recommended && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Recommended
                  </div>
                </motion.div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20"
                >
                  <option.icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <div className="text-5xl font-bold bg-gradient-to-br from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent mb-2">
                  {option.questions}
                </div>
                <div className="text-sm text-muted-foreground mb-4 font-medium">Questions</div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {option.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {option.description}
                </p>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  {option.duration}
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTest(option.questions);
                  }}
                >
                  Start {option.questions} Questions
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
          className="modern-card rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold text-foreground text-lg">What to Expect</span>
          </div>
          <ul className="text-muted-foreground space-y-3 text-left max-w-md mx-auto">
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="flex items-start"
            >
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Questions are randomly shuffled each time
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex items-start"
            >
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Real interview-style scenarios and problems
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex items-start"
            >
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Detailed explanations for better learning
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="flex items-start"
            >
              <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Track your progress and improvement
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default TestSelection;
