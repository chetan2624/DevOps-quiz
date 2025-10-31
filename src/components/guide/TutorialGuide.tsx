import React from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Youtube, PlayCircle } from 'lucide-react';
import guideBg from '@/assets/guide-bg.jpg';

interface TutorialGuideProps {
  onBack: () => void;
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({ onBack }) => {
  const tutorials = [
    {
      title: 'Linux Fundamentals',
      description: 'Master the basics of Linux operating system, command line, and shell scripting essential for DevOps',
      url: 'https://youtu.be/e01GGTKmtpc?si=sGKfsdo0to1SYlTT',
      icon: '🐧',
      duration: '4+ hours',
    },
    {
      title: 'AWS Cloud Platform',
      description: 'Complete AWS training covering EC2, S3, VPC, IAM, and essential cloud services',
      url: 'https://youtube.com/playlist?list=PL6XT0grm_TfgtwtwUit305qS-HhDvb4du&si=glPriiys4egg7WNC',
      icon: '☁️',
      duration: 'Full Course',
    },
    {
      title: 'GitHub & Version Control',
      description: 'Learn Git workflows, branching strategies, pull requests, and collaborative development',
      url: 'https://www.youtube.com/live/DyqAdz96mok?si=aRftEocs8P_QS18-',
      icon: '🔀',
      duration: 'Live Session',
    },
    {
      title: 'Docker Containerization',
      description: 'Build, ship, and run applications in containers. Learn Dockerfiles, images, and container orchestration',
      url: 'https://youtu.be/9bSbNNH4Nqw?si=61mLCQBB7GKK2-iU',
      icon: '🐳',
      duration: '3+ hours',
    },
    {
      title: 'Kubernetes Orchestration',
      description: 'Master container orchestration with K8s: pods, deployments, services, and cluster management',
      url: 'https://youtu.be/W04brGNgxN4?si=_mgB_3iYwUd8DVYx',
      icon: '☸️',
      duration: '6+ hours',
    },
    {
      title: 'Terraform IaC',
      description: 'Infrastructure as Code with Terraform: provision, manage, and version your cloud infrastructure',
      url: 'https://youtube.com/playlist?list=PL6XT0grm_TfgdaAjTmLb4QedMCCMQHISm&si=tv0VfMK5hItDRPM9',
      icon: '🏗️',
      duration: 'Full Playlist',
    },
    {
      title: 'Jenkins CI/CD',
      description: 'Automate your build, test, and deployment pipelines with Jenkins continuous integration',
      url: 'https://youtu.be/NVaP8qtLm6Q?si=9-KktTmJWw6pqeIx',
      icon: '⚙️',
      duration: '4+ hours',
    },
    {
      title: 'Grafana & Prometheus',
      description: 'Monitor and visualize your infrastructure with Prometheus metrics and Grafana dashboards',
      url: 'https://youtu.be/DXZUunEeHqM?si=d3V37TTk-MY_10YC',
      icon: '📊',
      duration: '2+ hours',
    },
  ];

  return (
    <div className="min-h-screen cosmic-gradient relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 dark:opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${guideBg})` }}
      />
      
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center p-6 relative z-10"
      >
        <Button variant="ghost" onClick={onBack} className="group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Guides
        </Button>
        <AuthHeader />
      </motion.nav>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            🎓
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tutorial <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Guide</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated video tutorials to build your DevOps expertise from the ground up
          </p>
        </motion.div>

        {/* Tutorial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Card className="modern-card rounded-2xl h-full group hover:shadow-2xl transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{tutorial.icon}</div>
                    <Youtube className="w-6 h-6 text-red-500" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground">⏱️ {tutorial.duration}</span>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    onClick={() => window.open(tutorial.url, '_blank')}
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialGuide;
