import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Server, Container, Settings, Package } from 'lucide-react';
import { SonarQubeGuide } from '@/components/blog/SonarQubeGuide';
import { KubernetesGuide } from '@/components/blog/KubernetesGuide';
import { TerraformGuide } from '@/components/blog/TerraformGuide';
import { JenkinsGuide } from '@/components/blog/JenkinsGuide';
import { DockerGuide } from '@/components/blog/DockerGuide';
import { MobileSidebar } from '@/components/ui/mobile-sidebar';
import blogBg from '@/assets/blog-bg.jpg';

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
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">DevOps Installation Guides</h1>
              <p className="text-muted-foreground text-lg">
                Step-by-step guides to install and configure essential DevOps tools
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card 
                className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
                onClick={() => setSelectedTopic('sonarqube')}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">SonarQube Installation</h3>
                <p className="text-muted-foreground text-sm">
                  Complete guide to install and configure SonarQube on AWS EC2 Ubuntu 22.04
                </p>
              </Card>

              <Card 
                className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
                onClick={() => setSelectedTopic('kubernetes')}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                  <Container className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Kubernetes Installation</h3>
                <p className="text-muted-foreground text-sm">
                  Step-by-step installation of Kubernetes locally and on AWS EC2
                </p>
              </Card>

              <Card 
                className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
                onClick={() => setSelectedTopic('terraform')}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Terraform Installation</h3>
                <p className="text-muted-foreground text-sm">
                  Complete installation guide for Terraform on Linux, macOS, and Windows
                </p>
              </Card>

              <Card 
                className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
                onClick={() => setSelectedTopic('jenkins')}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Jenkins Installation</h3>
                <p className="text-muted-foreground text-sm">
                  Complete step-by-step installation of Jenkins on Ubuntu/Debian systems
                </p>
              </Card>

              <Card 
                className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
                onClick={() => setSelectedTopic('docker')}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                  <Container className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Docker Installation</h3>
                <p className="text-muted-foreground text-sm">
                  Complete installation guide for Docker on Ubuntu, CentOS, and other Linux distributions
                </p>
              </Card>
            </div>
          </div>
        );
    }
  };

  const sidebarContent = (
    <div className="p-4 sm:p-6">
      <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Package className="h-5 w-5" />
        Installation Guides
      </h2>
      <div className="space-y-2">
        <button
          onClick={() => setSelectedTopic('overview')}
          className={`w-full text-left p-3 rounded-lg transition-all text-sm sm:text-base ${
            selectedTopic === 'overview' 
              ? 'bg-primary text-white' 
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setSelectedTopic('sonarqube')}
          className={`w-full text-left p-3 rounded-lg transition-all text-sm sm:text-base flex items-center gap-2 ${
            selectedTopic === 'sonarqube' 
              ? 'bg-primary text-white' 
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Server className="h-4 w-4" />
          SonarQube Installation
        </button>
        <button
          onClick={() => setSelectedTopic('kubernetes')}
          className={`w-full text-left p-3 rounded-lg transition-all text-sm sm:text-base flex items-center gap-2 ${
            selectedTopic === 'kubernetes' 
              ? 'bg-primary text-white' 
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Container className="h-4 w-4" />
          Kubernetes Installation
        </button>
        <button
          onClick={() => setSelectedTopic('terraform')}
          className={`w-full text-left p-3 rounded-lg transition-all text-sm sm:text-base flex items-center gap-2 ${
            selectedTopic === 'terraform' 
              ? 'bg-primary text-white' 
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Settings className="h-4 w-4" />
          Terraform Installation
        </button>
        <button
          onClick={() => setSelectedTopic('jenkins')}
          className={`w-full text-left p-3 rounded-lg transition-all text-sm sm:text-base flex items-center gap-2 ${
            selectedTopic === 'jenkins' 
              ? 'bg-primary text-white' 
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Settings className="h-4 w-4" />
          Jenkins Installation
        </button>
        <button
          onClick={() => setSelectedTopic('docker')}
          className={`w-full text-left p-3 rounded-lg transition-all text-sm sm:text-base flex items-center gap-2 ${
            selectedTopic === 'docker' 
              ? 'bg-primary text-white' 
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Container className="h-4 w-4" />
          Docker Installation
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen cosmic-gradient overflow-x-hidden relative">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${blogBg})` }}
      />
      {/* Navigation Header */}
      <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 relative z-10">
        <div className="flex items-center gap-2">
          <MobileSidebar>
            {sidebarContent}
          </MobileSidebar>
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-foreground hover:bg-primary hover:text-black"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Quiz
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-foreground" />
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">DevOps Blog</h1>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-88px)] overflow-x-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-r border-border bg-background/50 backdrop-blur-sm">
          {sidebarContent}
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Blog;
