import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useQuizDatabase } from '@/hooks/useQuizDatabase';
import { toast } from '@/hooks/use-toast';
import { Database, Upload, Check } from 'lucide-react';

export const MigrationButton: React.FC = () => {
  const [migrated, setMigrated] = useState(false);
  const { migrateBakedDataToDatabase, loading } = useQuizDatabase();

  const handleMigration = async () => {
    try {
      const result = await migrateBakedDataToDatabase();
      
      if (result.status === 'already_exists') {
        toast({
          title: "Questions already migrated",
          description: "Your questions are already in the database.",
        });
      } else {
        toast({
          title: "Migration successful!",
          description: `${result.questionsCount} questions and ${result.interviewQuestionsCount} interview questions migrated.`,
        });
      }
      
      setMigrated(true);
    } catch (error) {
      toast({
        title: "Migration failed",
        description: "Please try again or check the console for errors.",
        variant: "destructive",
      });
    }
  };

  if (migrated) {
    return (
      <Button disabled className="bg-green-500 hover:bg-green-600">
        <Check className="mr-2 h-4 w-4" />
        Questions Migrated
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleMigration} 
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600"
    >
      {loading ? (
        <>
          <Upload className="mr-2 h-4 w-4 animate-spin" />
          Migrating...
        </>
      ) : (
        <>
          <Database className="mr-2 h-4 w-4" />
          Migrate Questions to Database
        </>
      )}
    </Button>
  );
};