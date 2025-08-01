
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Trophy, Clock, ChevronRight, Play, Star, Target } from 'lucide-react';

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
      <nav className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-quiz-primary rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">DevOps Quiz</span>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button
            onClick={() => navigate('/blog')}
            variant="outline"
            size="sm"
            className="border-primary text-foreground hover:text-primary hover:border-primary hover:bg-primary/10"
          >
            Blog
          </Button>
          <AuthHeader />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 relative">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center bg-quiz-secondary border border-quiz-primary/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-quiz-accent mr-2" />
            <span className="text-sm font-medium text-quiz-primary">Master DevOps Skills</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            DevOps Quiz
            <span className="block text-quiz-primary">Interview Mastery</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Master DevOps skills with comprehensive interview questions. 
            Practice with real scenarios and boost your confidence for technical interviews.
          </p>

          <Button
            onClick={onStartTestSelection}
            size="lg"
            className="btn-primary text-lg px-8 py-4 rounded-full shadow-modern hover:shadow-modern-hover group"
          >
            <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Start Quiz Challenge
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-quiz-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="modern-card rounded-2xl p-6 text-center hover:border-quiz-primary/30 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-quiz-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-quiz-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="modern-card rounded-3xl p-8 md:p-12 text-center quiz-gradient-light border-quiz-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Test Your Skills?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join thousands of developers who have improved their DevOps knowledge through our comprehensive quiz platform.
          </p>
          <Button
            onClick={onStartTestSelection}
            size="lg"
            className="btn-primary text-lg px-8 py-4 rounded-full"
          >
            Begin Your Journey
          </Button>
        </div>

        {/* Non-sticky floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-quiz-accent/10 rounded-full float-animation"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-quiz-primary/10 rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-quiz-success/10 rounded-full float-animation" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-quiz-secondary rounded-full float-animation" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default StartScreen;
