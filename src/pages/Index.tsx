import StartScreen from "@/components/quiz/StartScreen";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return <StartScreen onStartTestSelection={() => navigate('/skills')} />;
};

export default Index;
