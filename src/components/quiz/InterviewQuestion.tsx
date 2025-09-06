
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface InterviewQuestionProps {
  question: string;
  conditionalQuestion?: string;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onConditionalSubmit: () => void;
  showConditional: boolean;
  answered: boolean;
  feedback: string;
  questionNumber: number;
  totalQuestions: number;
}

const InterviewQuestion: React.FC<InterviewQuestionProps> = ({
  question,
  conditionalQuestion,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  onConditionalSubmit,
  showConditional,
  answered,
  feedback,
  questionNumber,
  totalQuestions,
}) => {
  const getFeedbackMessage = () => {
    switch (feedback) {
      case 'correct':
        return { 
          message: '✅ Excellent! Your answer shows good understanding of the concept and approach.', 
          className: 'bg-green-500/20 border border-green-400 text-green-100' 
        };
      case 'conditional_correct':
        return { 
          message: '✅ Great! Perfect explanation in follow-up. You understand the concept well.', 
          className: 'bg-green-500/20 border border-green-400 text-green-100' 
        };
      case 'conditional_failed':
        return { 
          message: '❌ Answer needs improvement. Concept understanding and approach are unclear.', 
          className: 'bg-red-500/20 border border-red-400 text-red-100' 
        };
      case 'incorrect':
        return { 
          message: '❌ Answer lacks technical depth. Need to explain concepts and approach clearly.', 
          className: 'bg-red-500/20 border border-red-400 text-red-100' 
        };
      default:
        return null;
    }
  };

  const feedbackInfo = getFeedbackMessage();

  return (
    <div className="modern-card rounded-2xl p-6 sm:p-8 mb-8">
      <div className="mb-6">
        <div className="text-quiz-primary font-semibold text-sm mb-3">
          Interview Question {questionNumber}
        </div>
        <h2 className="text-xl sm:text-2xl text-foreground font-semibold leading-relaxed">
          {showConditional ? conditionalQuestion : question}
        </h2>
      </div>
      
      {showConditional && (
        <div className="mb-4 modern-card rounded-xl p-4 border-l-4 border-quiz-warning bg-quiz-warning/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-quiz-warning rounded-full flex items-center justify-center text-white text-sm font-bold">!</div>
            <p className="text-foreground text-sm font-medium">
              Follow-up question - Your previous answer needs more technical depth. Be specific with concepts and approach.
            </p>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Your Answer (Hinglish is perfectly fine!)
        </label>
        <Textarea
          value={currentAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your detailed answer here (minimum 4-5 lines with technical concepts and step-by-step approach)..."
          className="min-h-[120px] bg-muted/50 border-border text-foreground placeholder:text-muted-foreground focus:border-quiz-primary focus:ring-2 focus:ring-quiz-primary/20"
          disabled={answered && !showConditional}
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            {currentAnswer.length} characters
          </div>
          {!answered && currentAnswer.trim().length < 10 && (
            <p className="text-quiz-warning text-xs font-medium">
              💡 Explain concepts clearly with technical terms
            </p>
          )}
        </div>
      </div>
      
      {!answered && (
        <button
          onClick={showConditional ? onConditionalSubmit : onSubmit}
          disabled={!currentAnswer.trim() || currentAnswer.trim().length < 10}
          className="btn-primary py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
        >
          Submit Answer
        </button>
      )}
      
      {feedbackInfo && (
        <div className={`modern-card rounded-xl p-4 mt-6 border-l-4 animate-fade-in ${
          feedback.includes('correct') 
            ? 'success-state border-quiz-success' 
            : 'error-state border-quiz-error'
        }`}>
          <div className="font-semibold">{feedbackInfo.message}</div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestion;
