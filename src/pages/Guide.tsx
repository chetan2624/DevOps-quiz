import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Code2, Shield, Youtube, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import guideBg from '@/assets/guide-bg.jpg';
import TutorialGuide from '@/components/guide/TutorialGuide';
import PracticeGuide from '@/components/guide/PracticeGuide';
import UnderstandGuide from '@/components/guide/UnderstandGuide';

type GuideSection = 'main' | 'tutorial' | 'practice' | 'understand';

const Guide = () => {
  const [activeSection, setActiveSection] = useState<GuideSection>('main');

  const guides = [
    {
      id: 'tutorial' as GuideSection,
      title: 'Tutorial Guide',
      description: 'Master DevOps fundamentals through curated video tutorials and playlists',
      icon: Youtube,
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'practice' as GuideSection,
      title: 'Practice Guide',
      description: 'Hands-on projects and real-world scenarios to solidify your skills',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'understand' as GuideSection,
      title: 'Understand Guide',
      description: 'Deep dive into problem analysis, RCA, and prevention strategies',
      icon: Shield,
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  if (activeSection !== 'main') {
    return (
      <>
        {activeSection === 'tutorial' && <TutorialGuide onBack={() => setActiveSection('main')} />}
        {activeSection === 'practice' && <PracticeGuide onBack={() => setActiveSection('main')} />}
        {activeSection === 'understand' && <UnderstandGuide onBack={() => setActiveSection('main')} />}
      </>
    );
  }

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
        <Link to="/">
          <Button variant="ghost" className="group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>
        <AuthHeader />
      </motion.nav>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
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
            📚
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight"
          >
            DevOps Learning <span className="bg-gradient-to-r from-[hsl(var(--gradient-primary-start))] to-[hsl(var(--gradient-primary-end))] bg-clip-text text-transparent">Guide</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Your comprehensive resource hub for mastering DevOps through tutorials, practice, and deep understanding
          </motion.p>
        </motion.div>

        {/* Guide Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <Card 
                className="modern-card rounded-3xl p-8 text-center cursor-pointer relative group h-full"
                onClick={() => setActiveSection(guide.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br ${guide.color} bg-opacity-20`}
                  >
                    <guide.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <CardTitle className="text-2xl font-bold mb-2">
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <Button 
                    className="w-full mt-4"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSection(guide.id);
                    }}
                  >
                    Explore {guide.title.split(' ')[0]}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="modern-card rounded-2xl p-8 max-w-3xl mx-auto mt-12"
        >
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-primary mr-2" />
            <span className="font-bold text-foreground text-lg">Learning Path Overview</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-br from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
                01
              </div>
              <p className="text-sm text-muted-foreground">Start with video tutorials to build foundation</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                02
              </div>
              <p className="text-sm text-muted-foreground">Practice with hands-on projects</p>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-br from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
                03
              </div>
              <p className="text-sm text-muted-foreground">Master problem-solving and RCA</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Guide;
