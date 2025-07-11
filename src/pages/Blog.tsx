
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Server, Container, Settings } from 'lucide-react';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { SonarQubeGuide } from '@/components/blog/SonarQubeGuide';

const Blog = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>('overview');

  const renderContent = () => {
    switch (selectedTopic) {
      case 'sonarqube':
        return <SonarQubeGuide />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">DevOps Installation Guides</h1>
              <p className="text-muted-foreground text-lg">
                Step-by-step guides to install and configure essential DevOps tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="modern-card border-border hover:border-quiz-primary/40 transition-all cursor-pointer"
                onClick={() => setSelectedTopic('sonarqube')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Server className="h-5 w-5" />
                    SonarQube Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete guide to install and configure SonarQube on AWS EC2 Ubuntu 22.04
                  </p>
                </CardContent>
              </Card>

              <Card className="modern-card border-border opacity-60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Container className="h-5 w-5" />
                    Kubernetes Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Coming Soon</p>
                </CardContent>
              </Card>

              <Card className="modern-card border-border opacity-60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Settings className="h-5 w-5" />
                    Terraform Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Coming Soon</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen cosmic-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quiz
          </Button>
          <BookOpen className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold text-foreground">DevOps Blog</h1>
        </div>

        <div className="flex gap-8">
          <BlogSidebar 
            selectedTopic={selectedTopic}
            onTopicSelect={setSelectedTopic}
          />
          
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Blog;
