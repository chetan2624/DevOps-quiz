import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { ArrowLeft, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DatabaseSkillSelectionProps {
  onSelectSkill: (skillId: string) => void;
  onBack: () => void;
  restartQuiz: () => void;
}

interface DatabaseCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
}

const DatabaseSkillSelection: React.FC<DatabaseSkillSelectionProps> = ({ onSelectSkill, onBack, restartQuiz }) => {
  const [categories, setCategories] = useState<DatabaseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('question_categories')
          .select('*')
          .order('name');

        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getSkillIcon = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    switch (name) {
      case 'linux': return '🐧';
      case 'aws': return '☁️';
      case 'github': return '🔗';
      case 'docker': return '🐳';
      case 'kubernetes': return '⚙️';
      case 'terraform': return '🏗️';
      case 'jenkins': return '🔧';
      case 'datadog': return '📊';
      case 'devops': return '🧠';
      default: return '💻';
    }
  };

  const getSkillDescription = (categoryName: string): string => {
    const name = categoryName.toLowerCase();
    switch (name) {
      case 'linux': return 'Command line, system administration, and shell scripting';
      case 'aws': return 'Cloud services, EC2, S3, Lambda, and scenario-based questions';
      case 'github': return 'Git version control, repositories, and collaboration';
      case 'docker': return 'Containerization, images, and container orchestration';
      case 'kubernetes': return 'Container orchestration, pods, services, and deployments';
      case 'terraform': return 'Infrastructure as Code, providers, and resource management';
      case 'jenkins': return 'CI/CD pipelines, build automation, and deployment';
      case 'datadog': return 'Monitoring, observability, and application performance';
      case 'devops': return 'Open-ended interview questions - Real interview experience';
      default: return 'DevOps related questions and scenarios';
    }
  };

  const handleBackClick = () => {
    restartQuiz();
  };

  if (loading) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold text-foreground">Loading skills...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Navigation Header */}
      <nav className="flex justify-between items-center p-6">
        <Button
          variant="outline"
          onClick={handleBackClick}
          className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your DevOps Skill
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a technology to test your knowledge with comprehensive interview-style questions.
            Each skill contains real-world scenarios you'll encounter in DevOps interviews.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="modern-card rounded-2xl p-6 hover:border-quiz-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => onSelectSkill(category.name.toLowerCase())}
            >
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon || getSkillIcon(category.name)}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-quiz-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {category.description || getSkillDescription(category.name)}
                </p>
                <div className="flex items-center justify-center text-xs text-quiz-primary font-medium bg-quiz-secondary rounded-full px-3 py-1">
                  <Users className="w-3 h-3 mr-1" />
                  Questions Available
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="modern-card rounded-2xl p-6 max-w-2xl mx-auto text-center">
          <h3 className="font-semibold text-foreground mb-3">Why Practice DevOps Skills?</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Each skill section contains carefully curated questions that mirror real interview scenarios. 
            Practice with different question lengths and track your progress across all DevOps domains.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSkillSelection;