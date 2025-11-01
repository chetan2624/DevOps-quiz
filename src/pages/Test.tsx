import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TestSelection from '@/components/quiz/TestSelection';

const Test: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const skill = location.state?.skill;

  React.useEffect(() => {
    if (!skill) {
      navigate('/skills');
    }
  }, [skill, navigate]);

  const handleSelectDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    navigate('/quiz', { state: { skill, difficulty } });
  };

  const handleBack = () => {
    navigate('/skills');
  };

  if (!skill) {
    return null;
  }

  return (
    <TestSelection
      onSelectTest={handleSelectDifficulty}
      onBack={handleBack}
      selectedSkill={skill}
    />
  );
};

export default Test;
