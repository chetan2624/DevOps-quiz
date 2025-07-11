
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
              <h1 className="text-4xl font-bold text-white mb-4">DevOps Installation Guides</h1>
              <p className="text-gray-300 text-lg">
                Step-by-step guides to install and configure essential DevOps tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="glass-effect border-white/20 hover:border-white/40 transition-all cursor-pointer"
                onClick={() => setSelectedTopic('sonarqube')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Server className="h-5 w-5" />
                    SonarQube Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">
                    Complete guide to install and configure SonarQube on AWS EC2 Ubuntu 22.04
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/20 opacity-60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Container className="h-5 w-5" />
                    Kubernetes Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Coming Soon</p>
                </CardContent>
              </Card>

              <Card className="glass-effect border-white/20 opacity-60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Settings className="h-5 w-5" />
                    Terraform Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Coming Soon</p>
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
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quiz
          </Button>
          <BookOpen className="h-6 w-6 text-white" />
          <h1 className="text-2xl font-bold text-white">DevOps Blog</h1>
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
