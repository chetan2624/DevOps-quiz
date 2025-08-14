
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Server, Container, Settings } from 'lucide-react';

interface BlogSidebarProps {
  selectedTopic: string;
  onTopicSelect: (topic: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ selectedTopic, onTopicSelect }) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <Card className="modern-card border-border sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Package className="h-5 w-5" />
            Installation Guides
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[70vh] overflow-y-auto">
          <Button
            variant={selectedTopic === 'overview' ? 'default' : 'ghost'}
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => onTopicSelect('overview')}
          >
            Overview
          </Button>
          <Button
            variant={selectedTopic === 'sonarqube' ? 'default' : 'ghost'}
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => onTopicSelect('sonarqube')}
          >
            <Server className="h-4 w-4 mr-2" />
            SonarQube Installation
          </Button>
          <Button
            variant={selectedTopic === 'kubernetes' ? 'default' : 'ghost'}
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => onTopicSelect('kubernetes')}
          >
            <Container className="h-4 w-4 mr-2" />
            Kubernetes Installation
          </Button>
          <Button
            variant={selectedTopic === 'terraform' ? 'default' : 'ghost'}
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => onTopicSelect('terraform')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Terraform Installation
          </Button>
          <Button
            variant={selectedTopic === 'jenkins' ? 'default' : 'ghost'}
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => onTopicSelect('jenkins')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Jenkins Installation
          </Button>
          <Button
            variant={selectedTopic === 'docker' ? 'default' : 'ghost'}
            className="w-full justify-start text-foreground hover:bg-muted"
            onClick={() => onTopicSelect('docker')}
          >
            <Container className="h-4 w-4 mr-2" />
            Docker Installation
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};
