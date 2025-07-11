
import React from 'react';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, CheckCircle, Users, Target } from 'lucide-react';

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
      color: "quiz-success",
      recommended: false
    },
    {
      questions: 30,
      duration: "25-30 minutes", 
      title: "Standard Test",
      description: "Balanced practice session",
      icon: Target,
      color: "quiz-primary",
      recommended: true
    },
    {
      questions: 50,
      duration: "40-50 minutes",
      title: "Full Challenge", 
      description: "Complete interview preparation",
      icon: Users,
      color: "quiz-accent",
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Navigation Header */}
      <nav className="flex justify-between items-center p-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Skills
        </Button>
        <AuthHeader />
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">{skillIcon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {skillName} Quiz
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select the number of questions for your {skillName} interview practice. 
            Choose the option that best fits your available time and learning goals.
          </p>
        </div>

        {/* Test Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {testOptions.map((option, index) => (
            <div 
              key={option.questions}
              className="modern-card rounded-3xl p-8 text-center hover:border-quiz-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer relative animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onSelectTest(option.questions)}
            >
              {option.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-quiz-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                </div>
              )}
              
              <div className="w-16 h-16 bg-quiz-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <option.icon className="w-8 h-8 text-quiz-primary" />
              </div>
              
              <div className="text-4xl font-bold text-quiz-primary mb-2">
                {option.questions}
              </div>
              <div className="text-sm text-muted-foreground mb-4">Questions</div>
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {option.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {option.description}
              </p>
              
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4 mr-2" />
                {option.duration}
              </div>
              
              <Button 
                className="w-full btn-primary rounded-xl"
                onClick={() => onSelectTest(option.questions)}
              >
                Start {option.questions} Questions
              </Button>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="modern-card rounded-2xl p-6 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-quiz-success mr-2" />
            <span className="font-semibold text-foreground">What to Expect</span>
          </div>
          <ul className="text-muted-foreground space-y-2 text-left max-w-md mx-auto">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-quiz-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Questions are randomly shuffled each time
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-quiz-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Real interview-style scenarios and problems
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-quiz-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Detailed explanations for better learning
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-quiz-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
              Track your progress and improvement
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestSelection;
