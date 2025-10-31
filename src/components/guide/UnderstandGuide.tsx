import React from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Clock } from 'lucide-react';
import guideBg from '@/assets/guide-bg.jpg';

interface UnderstandGuideProps {
  onBack: () => void;
}

const UnderstandGuide: React.FC<UnderstandGuideProps> = ({ onBack }) => {
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

      <div className="container mx-auto px-6 py-12 relative z-10 flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          <Card className="modern-card rounded-3xl p-12 text-center">
            <CardHeader>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="text-8xl mb-6"
              >
                🚧
              </motion.div>
              
              <CardTitle className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </CardTitle>
              
              <CardDescription className="text-lg leading-relaxed">
                We're working hard to bring you comprehensive content on problem analysis, 
                Root Cause Analysis (RCA), and prevention strategies
              </CardDescription>
            </CardHeader>
            
            <CardContent className="mt-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-left p-4 bg-purple-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Problem Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn systematic approaches to identify and understand system issues
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-left p-4 bg-indigo-500/10 rounded-lg">
                  <Clock className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Root Cause Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Master RCA techniques to find the true source of production incidents
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 text-left p-4 bg-purple-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Prevention Strategies</h3>
                    <p className="text-sm text-muted-foreground">
                      Implement best practices to prevent recurring issues and build resilience
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/20">
                <p className="text-sm text-muted-foreground">
                  Stay tuned! This section will include real-world case studies, 
                  interactive scenarios, and expert insights
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UnderstandGuide;
