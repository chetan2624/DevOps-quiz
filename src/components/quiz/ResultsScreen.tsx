
import React from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { EmailReport } from './EmailReport';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  testLength: number;
  onRestart: () => void;
  skillName?: string;
  skillIcon?: string;
  isInterviewMode?: boolean;
  interviewFeedback?: string[];
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  score, 
  totalQuestions, 
  testLength, 
  onRestart,
  skillName = "DevOps",
  skillIcon = "💻",
  isInterviewMode = false,
  interviewFeedback = []
}) => {

  const getPerformanceMessage = () => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    if (isInterviewMode) {
      if (percentage >= 80) return `🏆 Outstanding! You're ready for ${skillName} interviews!`;
      if (percentage >= 60) return `🌟 Good performance! Practice more complex scenarios for ${skillName}`;
      if (percentage >= 40) return `👍 Basic understanding is there. Focus on technical depth and approach`;
      return `📚 Need more preparation! Study ${skillName} concepts and practice explanations`;
    }
    
    if (percentage >= 90) return `🏆 Outstanding! You're a ${skillName} expert!`;
    if (percentage >= 80) return `🌟 Excellent! You have strong ${skillName} knowledge!`;
    if (percentage >= 70) return `👍 Good job! You know your way around ${skillName}!`;
    if (percentage >= 60) return `👌 Not bad! Keep practicing to improve your ${skillName} skills!`;
    return `📚 Keep learning! ${skillName} mastery takes time!`;
  };

  const getInterviewStats = () => {
    if (!isInterviewMode) return null;
    
    const correct = interviewFeedback.filter(f => f === 'correct').length;
    const conditionalCorrect = interviewFeedback.filter(f => f === 'conditional_correct').length;
    const failed = interviewFeedback.filter(f => f === 'incorrect' || f === 'conditional_failed').length;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="modern-card rounded-2xl p-6 mb-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Interview Performance Breakdown
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-quiz-success/10 border border-quiz-success/30 rounded-xl p-4"
          >
            <CheckCircle2 className="w-6 h-6 text-quiz-success mx-auto mb-2" />
            <div className="text-3xl font-bold text-quiz-success mb-1">{correct}</div>
            <div className="text-xs text-quiz-success/80 font-medium">Direct Success</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-quiz-warning/10 border border-quiz-warning/30 rounded-xl p-4"
          >
            <Trophy className="w-6 h-6 text-quiz-warning mx-auto mb-2" />
            <div className="text-3xl font-bold text-quiz-warning mb-1">{conditionalCorrect}</div>
            <div className="text-xs text-quiz-warning/80 font-medium">Cleared Follow-up</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-quiz-error/10 border border-quiz-error/30 rounded-xl p-4"
          >
            <AlertCircle className="w-6 h-6 text-quiz-error mx-auto mb-2" />
            <div className="text-3xl font-bold text-quiz-error mb-1">{failed}</div>
            <div className="text-xs text-quiz-error/80 font-medium">Need Improvement</div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden cosmic-gradient">
      {/* Auth Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-4 right-4 z-20"
      >
        <AuthHeader />
      </motion.div>
      
      {/* Floating background elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
      />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="modern-card rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
          >
            🎉 {isInterviewMode ? 'Interview Practice' : `${skillName} Quiz`} Complete!
          </motion.h2>
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
            className="text-6xl mb-4"
          >
            {skillIcon}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-4"
          >
            <div className="text-7xl md:text-8xl font-bold bg-gradient-to-br from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent mb-2">
              {score}/{totalQuestions}
            </div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              className="h-3 bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] rounded-full mx-auto mb-4 max-w-md"
            />
            
            <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
              {percentage}%
            </div>
          </motion.div>
          
          {getInterviewStats()}
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl md:text-2xl text-foreground mb-6 font-medium"
          >
            {getPerformanceMessage()}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-muted-foreground mb-8 text-sm"
          >
            Test Length: {testLength} questions
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col gap-4 items-center"
          >
            <Button
              onClick={onRestart}
              size="lg"
              className="group"
            >
              Try Again
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <EmailReport
              score={score}
              totalQuestions={totalQuestions}
              skillName={skillName}
              testLength={testLength}
              isInterviewMode={isInterviewMode}
              interviewFeedback={interviewFeedback}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsScreen;
