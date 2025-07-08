
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
    <div className="glass-effect rounded-2xl p-8 mb-8">
      <div className="text-marvel-red font-bold text-xl mb-4">
        Question {questionNumber} of {totalQuestions}
      </div>
      
      <h2 className="text-2xl text-white mb-6 font-medium">
        {showConditional ? conditionalQuestion : question}
      </h2>
      
      {showConditional && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-400 rounded-lg">
          <p className="text-yellow-100 text-sm">
            🤔 Follow-up question - Your previous answer needs more technical depth. Be specific with concepts and approach.
          </p>
        </div>
      )}
      
      <div className="mb-6">
        <Textarea
          value={currentAnswer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="Type your detailed answer here (minimum 4-5 lines with technical concepts and step-by-step approach)..."
          className="min-h-[120px] bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-marvel-gold"
          disabled={answered && !showConditional}
        />
        
        {!answered && currentAnswer.trim().length < 10 && (
          <p className="text-gray-400 text-sm mt-2">
            💡 Tip: Explain the concept clearly with technical terms and step-by-step approach
          </p>
        )}
      </div>
      
      {!answered && (
        <button
          onClick={showConditional ? onConditionalSubmit : onSubmit}
          disabled={!currentAnswer.trim() || currentAnswer.trim().length < 10}
          className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
        >
          Submit Answer
        </button>
      )}
      
      {feedbackInfo && (
        <div className={`p-4 rounded-xl mt-6 ${feedbackInfo.className}`}>
          <div className="font-bold">{feedbackInfo.message}</div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestion;
