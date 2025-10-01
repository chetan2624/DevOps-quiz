
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Trophy, Clock, ChevronRight, Play, Star, Target, Sparkles } from 'lucide-react';

interface StartScreenProps {
  onStartTestSelection: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartTestSelection }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: "8 DevOps Skills", 
      description: "Linux, AWS, GitHub, Docker, Kubernetes, Terraform, Jenkins, DataDog"
    },
    {
      icon: Users,
      title: "100+ Questions", 
      description: "Comprehensive interview questions per skill"
    },
    {
      icon: Clock,
      title: "Flexible Tests", 
      description: "Choose 20, 30, or 50 questions based on your time"
    },
    {
      icon: Trophy,
      title: "Interview Ready", 
      description: "Perfect preparation for DevOps interviews"
    }
  ];

  const stats = [
    { number: "1000+", label: "Questions Available" },
    { number: "8", label: "DevOps Skills" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Available" }
  ];

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6 relative z-10"
      >
        <div className="flex items-center space-x-2">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] shadow-[0_4px_14px_hsl(var(--button-glow)/0.4)]"
          >
            <Target className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-2xl font-bold text-foreground tracking-tight">DevOps Quiz</span>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            onClick={() => navigate('/blog')}
            variant="outline"
            size="sm"
          >
            Blog
          </Button>
          <Button
            onClick={() => navigate('/jobs')}
            variant="outline"
            size="sm"
          >
            Jobs
          </Button>
          <AuthHeader />
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-full px-5 py-2.5 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary mr-2 animate-pulse" />
            <span className="text-sm font-semibold text-primary">Master DevOps Skills</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            DevOps Quiz
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="block bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent"
            >
              Interview Mastery
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Master DevOps skills with comprehensive interview questions. 
            Practice with real scenarios and boost your confidence for technical interviews.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button
              onClick={onStartTestSelection}
              size="lg"
              className="group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Quiz Challenge
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="modern-card rounded-2xl p-6 text-center group cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-all"
              >
                <feature.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-bold text-foreground mb-2 text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="modern-card rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-card to-secondary border-primary/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Test Your Skills?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Join thousands of developers who have improved their DevOps knowledge through our comprehensive quiz platform.
            </p>
            <Button
              onClick={onStartTestSelection}
              size="lg"
            >
              Begin Your Journey
            </Button>
          </div>
        </motion.div>

        {/* Floating decorative elements with motion */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute bottom-40 left-20 w-12 h-12 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          transition={{ 
            duration: 9, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/50 rounded-full blur-xl"
        />
      </div>
    </div>
  );
};

export default StartScreen;
