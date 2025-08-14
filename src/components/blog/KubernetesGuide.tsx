import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Terminal, Download, Settings, Globe, Server, Cloud } from 'lucide-react';

export const KubernetesGuide: React.FC = () => {
  const CodeBlock: React.FC<{ children: React.ReactNode; description: string }> = ({ children, description }) => (
    <div className="mb-6">
      <p className="text-muted-foreground mb-2">{description}</p>
      <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-primary text-sm">{children}</code>
      </pre>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Kubernetes Installation Guide</h1>
        <p className="text-muted-foreground text-lg">
          Complete installation guide for Kubernetes locally and on AWS EC2
        </p>
      </div>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <CheckCircle className="h-5 w-5" />
            Prerequisites
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <ul className="space-y-2">
            <li>• Ubuntu 20.04+ or similar Linux distribution</li>
            <li>• At least 2 GB RAM and 2 vCPUs</li>
            <li>• Root or sudo privileges</li>
            <li>• Docker installed (for container runtime)</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Step 1: Update System and Install Dependencies
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Update your system packages:">
            sudo apt update && sudo apt upgrade -y
          </CodeBlock>
          
          <CodeBlock description="Install required packages:">
            sudo apt install -y apt-transport-https ca-certificates curl
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Download className="h-5 w-5" />
            Step 2: Install Docker (Container Runtime)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Add Docker's official GPG key:">
            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
          </CodeBlock>
          
          <CodeBlock description="Add Docker repository:">
            {`echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`}
          </CodeBlock>
          
          <CodeBlock description="Install Docker:">
            sudo apt update
            sudo apt install -y docker-ce docker-ce-cli containerd.io
          </CodeBlock>
          
          <CodeBlock description="Start and enable Docker:">
            sudo systemctl start docker
            sudo systemctl enable docker
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Step 3: Add Kubernetes Repository
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Add Kubernetes signing key:">
            curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
          </CodeBlock>
          
          <CodeBlock description="Add Kubernetes repository:">
            echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
          </CodeBlock>
          
          <CodeBlock description="Update package index:">
            sudo apt update
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Download className="h-5 w-5" />
            Step 4: Install Kubernetes Components
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Install kubelet, kubeadm, and kubectl:">
            sudo apt install -y kubelet kubeadm kubectl
          </CodeBlock>
          
          <CodeBlock description="Mark packages to prevent automatic updates:">
            sudo apt-mark hold kubelet kubeadm kubectl
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Server className="h-5 w-5" />
            Step 5: Initialize Kubernetes Cluster (Master Node)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Disable swap (required for Kubernetes):">
            sudo swapoff -a
            sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
          </CodeBlock>
          
          <CodeBlock description="Initialize the cluster:">
            sudo kubeadm init --pod-network-cidr=10.244.0.0/16
          </CodeBlock>
          
          <CodeBlock description="Configure kubectl for your user:">
            mkdir -p $HOME/.kube
            sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
            sudo chown $(id -u):$(id -g) $HOME/.kube/config
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5" />
            Step 6: Install Pod Network (Flannel)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Apply Flannel network addon:">
            kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
          </CodeBlock>
          
          <CodeBlock description="Verify node status:">
            kubectl get nodes
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cloud className="h-5 w-5" />
            AWS EC2 Specific Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">For AWS EC2 instances:</h4>
          </div>
          
          <CodeBlock description="Configure security groups to allow the following ports:">
            # Master node:
            # - 6443 (API server)
            # - 2379-2380 (etcd)
            # - 10250 (kubelet)
            # - 10251 (kube-scheduler)
            # - 10252 (kube-controller-manager)
            
            # Worker nodes:
            # - 10250 (kubelet)
            # - 30000-32767 (NodePort services)
          </CodeBlock>
          
          <CodeBlock description="Install AWS CLI and configure (if using AWS services):">
            curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
            unzip awscliv2.zip
            sudo ./aws/install
            aws configure
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Step 7: Verify Installation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Check cluster status:">
            kubectl cluster-info
          </CodeBlock>
          
          <CodeBlock description="List all pods in all namespaces:">
            kubectl get pods --all-namespaces
          </CodeBlock>
          
          <CodeBlock description="Test with a sample deployment:">
            kubectl create deployment nginx --image=nginx
            kubectl expose deployment nginx --port=80 --type=NodePort
            kubectl get services
          </CodeBlock>
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">🎉 Success!</h4>
            <p>Your Kubernetes cluster is now ready and running. You can start deploying your applications!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};