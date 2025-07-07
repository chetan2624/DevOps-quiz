
import React from 'react';

interface QuestionNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  userAnswers: number[];
  onJumpToQuestion: (index: number) => void;
  onExit: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  currentQuestion,
  totalQuestions,
  userAnswers,
  onJumpToQuestion,
  onExit,
}) => {
  return (
    <div className="glass-effect rounded-2xl p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold">Question Navigator</h3>
        <button
          onClick={onExit}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          Exit Quiz
        </button>
      </div>
      
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const isAnswered = userAnswers[index] !== undefined;
          const isCurrent = index === currentQuestion;
          
          let buttonClass = "w-8 h-8 rounded text-sm font-bold transition-all duration-200 ";
          
          if (isCurrent) {
            buttonClass += "bg-marvel-gold text-black border-2 border-white";
          } else if (isAnswered) {
            buttonClass += "bg-green-600 text-white hover:bg-green-700";
          } else {
            buttonClass += "bg-gray-600 text-gray-300 hover:bg-gray-500";
          }
          
          return (
            <button
              key={index}
              onClick={() => onJumpToQuestion(index)}
              className={buttonClass}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      <div className="flex justify-between text-sm text-gray-300 mt-2">
        <span>Answered: {userAnswers.filter(a => a !== undefined).length}</span>
        <span>Remaining: {totalQuestions - userAnswers.filter(a => a !== undefined).length}</span>
      </div>
    </div>
  );
};

export default QuestionNavigation;
