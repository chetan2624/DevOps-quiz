import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Youtube, ExternalLink, Copy, Check } from 'lucide-react';
import guideBg from '@/assets/guide-bg.jpg';
import { toast } from '@/hooks/use-toast';

interface PracticeGuideProps {
  onBack: () => void;
}

const PracticeGuide: React.FC<PracticeGuideProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const mediumArticles = [
    {
      title: 'AWS Cloud Cost Optimization',
      description: 'Learn to identify and eliminate stale EBS snapshots to reduce cloud costs',
      url: 'https://medium.com/@khushboo.sah067/aws-cloud-cost-optimization-identifying-stale-resources-c25e8f96cb70',
      date: 'Jun 5',
      icon: '💰',
    },
    {
      title: 'Ansible for Beginners',
      description: 'Provisioning and configuration management project commonly asked in interviews',
      url: 'https://medium.com/@khushboo.sah067/ansible-project-for-beginners-asked-in-interviews-provisioning-configuration-management-ae19fb5c5e14',
      date: 'Sep 22',
      icon: '🔧',
    },
    {
      title: 'Complete DevOps Implementation',
      description: 'End-to-end DevOps practices implementation in one comprehensive project',
      url: 'https://medium.com/@khushboo.sah067/devopsify-complete-devops-implementation-in-one-project-a4d685463879',
      date: 'Sep 14',
      icon: '🚀',
    },
    {
      title: 'DevSecOps Three-Tier Project',
      description: 'Deploy a secure three-tier application with CI/CD pipeline integration',
      url: 'https://medium.com/@khushboo.sah067/devsecops-megaproject-series-three-tier-project-deployment-application-66816ae1e2f5',
      date: 'Sep 8',
      icon: '🔐',
    },
    {
      title: 'GitOps with ArgoCD',
      description: 'Build a secure CI/CD workflow for Kubernetes using ArgoCD and GitHub Actions',
      url: 'https://medium.com/@khushboo.sah067/gitops-with-argo-cd-and-github-actions-a-secure-ci-cd-workflow-for-kubernetes-8e43bc6cddc3',
      date: 'Aug 24',
      icon: '🔄',
    },
    {
      title: 'Kubernetes Autoscaling',
      description: 'Master HPA vs VPA: when to multiply pods and when to amplify resources',
      url: 'https://medium.com/@khushboo.sah067/kubernetes-autoscaling-hpa-vs-vpa-when-to-multiply-when-to-amplify-012f166c2e8f',
      date: 'Aug 15',
      icon: '📈',
    },
    {
      title: 'Observability DevOps Project',
      description: 'Implement OpenTelemetry demo application with full observability stack',
      url: 'https://medium.com/@khushboo.sah067/observability-devops-project-opentelemetry-demo-application-1b53cdd9bbf3',
      date: 'Aug 14',
      icon: '👁️',
    },
    {
      title: '3-Tier EKS Deployment',
      description: 'Deploy e-commerce application with 8 services and 2 databases on Amazon EKS',
      url: 'https://medium.com/@khushboo.sah067/deploying-3-tier-architecture-with-8-services-and-2-databases-on-amazon-eks-e-commerce-robot-shop-3af2cfa99895',
      date: 'Aug 13',
      icon: '🏪',
    },
    {
      title: 'Secure Static Website on AWS',
      description: 'Host websites on S3 with Route 53 DNS and CloudFront CDN',
      url: 'https://medium.com/@khushboo.sah067/host-a-secure-static-website-on-aws-s3-with-route-53-and-cloudfront-00e3a82f6034',
      date: 'Aug 5',
      icon: '🌐',
    },
    {
      title: 'Shell Scripting with AI',
      description: 'Master smarter, faster, and more reliable automation using AI-powered scripting',
      url: 'https://medium.com/@khushboo.sah067/mastering-shell-scripting-with-ai-smarter-faster-and-more-reliable-automation-5ea6fc4c5d53',
      date: 'Aug 31',
      icon: '🤖',
    },
  ];

  const videoProject = {
    title: 'DevOps Projects Playlist',
    description: 'Complete hands-on DevOps projects covering CI/CD, Docker, Kubernetes, and cloud deployment',
    url: 'https://youtube.com/playlist?list=PLOa-edppsqFnW0pQrnYf_2rEUI8mgfwuX&si=3-vZnKKodYcF2VYy',
    icon: '🎬',
    duration: 'Full Playlist',
  };

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
            💻
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Practice <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Guide</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hands-on projects and tutorials to apply your DevOps knowledge in real-world scenarios
          </p>
        </motion.div>

        {/* Video Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <Card className="modern-card rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-5xl">{videoProject.icon}</div>
                <Youtube className="w-8 h-8 text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">
                {videoProject.title}
              </CardTitle>
              <CardDescription className="text-base">
                {videoProject.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">⏱️ {videoProject.duration}</span>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  onClick={() => window.open(videoProject.url, '_blank')}
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  Watch Projects
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medium Articles Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Written <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Guides</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {mediumArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="modern-card rounded-2xl h-full group hover:shadow-2xl transition-all">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{article.icon}</div>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <CardTitle className="text-lg font-bold mb-2 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-3">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(article.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PracticeGuide;
