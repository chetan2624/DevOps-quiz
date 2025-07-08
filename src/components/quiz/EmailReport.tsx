
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Mail, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

  const handleEmailReport = async () => {
    setIsSending(true);
    
    try {
      // Simulate email sending (you can integrate with EmailJS or similar service)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would send the email here
      const reportData = {
        userEmail: user.email,
        userName: user.name,
        score,
        totalQuestions,
        skillName,
        testLength,
        percentage: Math.round((score / totalQuestions) * 100),
        isInterviewMode,
        interviewFeedback,
        timestamp: new Date().toISOString(),
      };
      
      console.log('Email report data:', reportData);
      
      setIsEmailSent(true);
      toast({
        title: "Report sent successfully!",
        description: `Your ${skillName} quiz report has been sent to ${user.email}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send report",
        description: "Please try again later.",
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
    <Button
      onClick={handleEmailReport}
      disabled={isSending}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full"
    >
      <Mail className="mr-2 h-4 w-4" />
      {isSending ? 'Sending Report...' : 'Email this report to me'}
    </Button>
  );
};
