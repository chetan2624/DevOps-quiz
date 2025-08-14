
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Server, Container, Settings } from 'lucide-react';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { SonarQubeGuide } from '@/components/blog/SonarQubeGuide';
import { KubernetesGuide } from '@/components/blog/KubernetesGuide';
import { TerraformGuide } from '@/components/blog/TerraformGuide';
import { JenkinsGuide } from '@/components/blog/JenkinsGuide';
import { DockerGuide } from '@/components/blog/DockerGuide';

const Blog = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>('overview');

  const renderContent = () => {
    switch (selectedTopic) {
      case 'sonarqube':
        return <SonarQubeGuide />;
      case 'kubernetes':
        return <KubernetesGuide />;
      case 'terraform':
        return <TerraformGuide />;
      case 'jenkins':
        return <JenkinsGuide />;
      case 'docker':
        return <DockerGuide />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">DevOps Installation Guides</h1>
              <p className="text-muted-foreground text-lg">
                Step-by-step guides to install and configure essential DevOps tools
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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

              <Card 
                className="modern-card border-border hover:border-quiz-primary/40 transition-all cursor-pointer"
                onClick={() => setSelectedTopic('kubernetes')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Container className="h-5 w-5" />
                    Kubernetes Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Step-by-step installation of Kubernetes locally and on AWS EC2
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="modern-card border-border hover:border-quiz-primary/40 transition-all cursor-pointer"
                onClick={() => setSelectedTopic('terraform')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Settings className="h-5 w-5" />
                    Terraform Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete installation guide for Terraform on Linux, macOS, and Windows
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="modern-card border-border hover:border-quiz-primary/40 transition-all cursor-pointer"
                onClick={() => setSelectedTopic('jenkins')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Settings className="h-5 w-5" />
                    Jenkins Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete step-by-step installation of Jenkins on Ubuntu/Debian systems
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="modern-card border-border hover:border-quiz-primary/40 transition-all cursor-pointer"
                onClick={() => setSelectedTopic('docker')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Container className="h-5 w-5" />
                    Docker Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Complete installation guide for Docker on Ubuntu, CentOS, and other Linux distributions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen cosmic-gradient">
      <div className="mobile-container py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="border-quiz-primary text-quiz-primary hover:bg-quiz-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quiz
          </Button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-foreground" />
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">DevOps Blog</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:order-1 order-2">
            <BlogSidebar 
              selectedTopic={selectedTopic}
              onTopicSelect={setSelectedTopic}
            />
          </div>
          
          <main className="flex-1 lg:order-2 order-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Blog;
