import React from 'react';
import { useNavigate } from 'react-router-dom';
import SkillSelection from '@/components/quiz/SkillSelection';

const Skills: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectSkill = (skillId: string) => {
    if (skillId === 'interview') {
      navigate('/quiz', { state: { skill: skillId, isInterviewMode: true } });
    } else {
      navigate('/test', { state: { skill: skillId } });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <SkillSelection
      onSelectSkill={handleSelectSkill}
      onBack={handleBack}
      restartQuiz={handleBack}
    />
  );
};

export default Skills;
