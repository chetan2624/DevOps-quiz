
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Server } from 'lucide-react';

interface BlogSidebarProps {
  selectedTopic: string;
  onTopicSelect: (topic: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ selectedTopic, onTopicSelect }) => {
  return (
    <aside className="w-64 flex-shrink-0">
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Package className="h-5 w-5" />
            Packages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedTopic === 'overview' ? 'default' : 'ghost'}
            className="w-full justify-start text-white hover:bg-white/10"
            onClick={() => onTopicSelect('overview')}
          >
            Overview
          </Button>
          <Button
            variant={selectedTopic === 'sonarqube' ? 'default' : 'ghost'}
            className="w-full justify-start text-white hover:bg-white/10"
            onClick={() => onTopicSelect('sonarqube')}
          >
            <Server className="h-4 w-4 mr-2" />
            SonarQube Installation
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};
