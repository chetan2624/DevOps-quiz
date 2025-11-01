import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MCUQuiz from '@/components/MCUQuiz';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { skill, difficulty, isInterviewMode } = location.state || {};

  React.useEffect(() => {
    if (!skill && !isInterviewMode) {
      navigate('/skills');
    }
  }, [skill, isInterviewMode, navigate]);

  const handleExit = () => {
    navigate('/skills');
  };

  if (!skill && !isInterviewMode) {
    return null;
  }

  return (
    <MCUQuiz
      initialSkill={skill}
      initialDifficulty={difficulty}
      isInterviewMode={isInterviewMode}
      onExit={handleExit}
    />
  );
};

export default QuizPage;
