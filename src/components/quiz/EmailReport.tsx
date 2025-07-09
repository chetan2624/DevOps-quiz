
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Mail, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

interface EmailReportProps {
  score: number;
  totalQuestions: number;
  skillName: string;
  testLength: number;
  isInterviewMode?: boolean;
  interviewFeedback?: string[];
}

export const EmailReport: React.FC<EmailReportProps> = ({
  score,
  totalQuestions,
  skillName,
  testLength,
  isInterviewMode = false,
  interviewFeedback = []
}) => {
  const { user, isLoggedIn } = useAuth();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isLoggedIn || !user) {
    return null;
  }

  const getPerformanceAnalysis = () => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    let performance = "";
    let improvements = "";
    
    if (percentage >= 90) {
      performance = "Outstanding! You have excellent knowledge of " + skillName;
      improvements = "Keep practicing advanced scenarios to maintain your expertise.";
    } else if (percentage >= 80) {
      performance = "Excellent! You have strong " + skillName + " knowledge";
      improvements = "Focus on advanced concepts and real-world implementations.";
    } else if (percentage >= 70) {
      performance = "Good! You have a solid understanding of " + skillName;
      improvements = "Practice more complex scenarios and deepen your understanding of core concepts.";
    } else if (percentage >= 60) {
      performance = "Fair! You have basic " + skillName + " knowledge";
      improvements = "Study fundamental concepts more thoroughly and practice hands-on exercises.";
    } else {
      performance = "Needs improvement! More study required for " + skillName;
      improvements = "Focus on learning basic concepts first, then gradually move to advanced topics.";
    }
    
    return { performance, improvements };
  };

  const handleEmailReport = async () => {
    setIsSending(true);
    
    try {
      const { performance, improvements } = getPerformanceAnalysis();
      const percentage = Math.round((score / totalQuestions) * 100);
      
      // EmailJS template parameters
      const templateParams = {
        to_name: user.name,
        to_email: user.email,
        skill_name: skillName,
        test_score: score,
        total_questions: totalQuestions,
        percentage: percentage,
        test_length: testLength,
        performance_analysis: performance,
        improvements: improvements,
        test_type: isInterviewMode ? 'Interview Practice' : 'Quiz Test',
        date: new Date().toLocaleDateString(),
      };

      console.log('Sending email to:', user.email);
      console.log('Template parameters:', templateParams);
      
      // Initialize EmailJS with your public key
      emailjs.init("tZWe34s-MZA-q5zwB");
      
      console.log('Sending email with service_q5gogur and template_ra1rago');
      
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_q5gogur",
        "template_ra1rago",
        templateParams
      );
      
      console.log('Email sent successfully:', result);
      
      setIsEmailSent(true);
      toast({
        title: "Report sent successfully!",
        description: `Your ${skillName} quiz report has been sent to ${user.email}`,
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Failed to send report",
        description: "There was an error sending your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isEmailSent) {
    return (
      <Button 
        disabled 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full"
      >
        <Check className="mr-2 h-4 w-4" />
        Report Sent to {user.email}
      </Button>
    );
  }

  return (
    <div className="text-center">
      <p className="text-gray-300 text-sm mb-3">
        Get your detailed performance report via email
      </p>
      <Button
        onClick={handleEmailReport}
        disabled={isSending}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full"
      >
        <Mail className="mr-2 h-4 w-4" />
        {isSending ? 'Sending Report...' : 'Email this report to me'}
      </Button>
    </div>
  );
};
