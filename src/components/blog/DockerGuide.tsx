import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Terminal, Download, Settings, Globe, Container, Shield } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export const DockerGuide: React.FC = () => {

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Docker Installation Guide</h1>
        <p className="text-muted-foreground text-lg">
          Complete installation guide for Docker on Ubuntu, CentOS, and other Linux distributions
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
            <li>• 64-bit Linux distribution</li>
            <li>• Kernel version 3.10 or higher</li>
            <li>• At least 1 GB RAM</li>
            <li>• Root or sudo privileges</li>
            <li>• Internet connection for downloading packages</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Method 1: Install on Ubuntu/Debian
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Update your system packages:">
            sudo apt update && sudo apt upgrade -y
          </CodeBlock>
          
          <CodeBlock description="Install required packages:">
            sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
          </CodeBlock>
          
          <CodeBlock description="Add Docker's official GPG key:">
            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
          </CodeBlock>
          
          <CodeBlock description="Add Docker repository:">
            {`echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`}
          </CodeBlock>
          
          <CodeBlock description="Install Docker Engine:">
            sudo apt update
            sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Download className="h-5 w-5" />
            Method 2: Install on CentOS/RHEL/Fedora
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Install required packages:">
            sudo yum install -y yum-utils
          </CodeBlock>
          
          <CodeBlock description="Add Docker repository:">
            sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
          </CodeBlock>
          
          <CodeBlock description="Install Docker Engine:">
            sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
          </CodeBlock>
          
          <CodeBlock description="For Fedora, use dnf instead:">
            sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Step 3: Start and Enable Docker
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Start Docker service:">
            sudo systemctl start docker
          </CodeBlock>
          
          <CodeBlock description="Enable Docker to start on boot:">
            sudo systemctl enable docker
          </CodeBlock>
          
          <CodeBlock description="Check Docker service status:">
            sudo systemctl status docker
          </CodeBlock>
          
          <CodeBlock description="Verify Docker installation:">
            sudo docker --version
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5" />
            Step 4: Configure User Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Add your user to the docker group:">
            sudo usermod -aG docker $USER
          </CodeBlock>
          
          <CodeBlock description="Apply the group changes (logout and login again, or run):">
            newgrp docker
          </CodeBlock>
          
          <CodeBlock description="Test Docker without sudo:">
            docker run hello-world
          </CodeBlock>
          
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">⚠️ Security Note:</h4>
            <p className="text-sm">Adding users to the docker group grants them root-level privileges on the host. Only add trusted users to this group.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Container className="h-5 w-5" />
            Step 5: Test Docker Installation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Run the hello-world container:">
            docker run hello-world
          </CodeBlock>
          
          <CodeBlock description="Download and run Ubuntu container:">
            docker run -it ubuntu bash
          </CodeBlock>
          
          <CodeBlock description="List running containers:">
            docker ps
          </CodeBlock>
          
          <CodeBlock description="List all containers (including stopped):">
            docker ps -a
          </CodeBlock>
          
          <CodeBlock description="List downloaded images:">
            docker images
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5" />
            Step 6: Install Docker Compose
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Modern Docker installations include Compose v2 by default</h4>
            <p className="text-sm">If you need the standalone version or older systems:</p>
          </div>
          
          <CodeBlock description="Download Docker Compose (check for latest version):">
            sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
          </CodeBlock>
          
          <CodeBlock description="Make it executable:">
            sudo chmod +x /usr/local/bin/docker-compose
          </CodeBlock>
          
          <CodeBlock description="Verify Docker Compose installation:">
            docker-compose --version
          </CodeBlock>
          
          <CodeBlock description="Or use the newer plugin syntax:">
            docker compose version
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Step 7: Basic Docker Commands
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-6">
            <p className="text-muted-foreground mb-2">Essential Docker commands to get you started:</p>
            <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
              <code className="text-primary text-sm">{`# Container Management
docker run <image>          # Run a container
docker stop <container>     # Stop a running container
docker start <container>    # Start a stopped container
docker restart <container>  # Restart a container
docker rm <container>       # Remove a container

# Image Management  
docker pull <image>         # Download an image
docker build -t <name> .    # Build image from Dockerfile
docker rmi <image>          # Remove an image
docker tag <image> <tag>    # Tag an image

# System Information
docker info                 # Display system information
docker version             # Show Docker version
docker system df           # Show disk usage
docker system prune        # Clean up unused resources`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Container className="h-5 w-5" />
            Step 8: Create Your First Dockerfile
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-6">
            <p className="text-muted-foreground mb-2">Create a simple Dockerfile example:</p>
            <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
              <code className="text-primary text-sm">{`# Use official nginx image
FROM nginx:alpine

# Copy custom HTML file
COPY index.html /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]`}</code>
            </pre>
          </div>
          
          <CodeBlock description="Create a simple index.html file:">
            {`echo '<h1>Hello from Docker!</h1>' > index.html`}
          </CodeBlock>
          
          <CodeBlock description="Build your custom image:">
            docker build -t my-nginx .
          </CodeBlock>
          
          <CodeBlock description="Run your custom container:">
            docker run -d -p 8080:80 my-nginx
          </CodeBlock>
          
          <CodeBlock description="Access your application:">
            curl http://localhost:8080
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Step 9: Docker Configuration and Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Configure Docker daemon (create/edit /etc/docker/daemon.json):">
            {`sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF`}
          </CodeBlock>
          
          <CodeBlock description="Restart Docker after configuration changes:">
            sudo systemctl restart docker
          </CodeBlock>
          
          <div className="mt-4 space-y-2">
            <p className="font-semibold">Docker Best Practices:</p>
            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
              <li>Use official base images when possible</li>
              <li>Keep images small and focused</li>
              <li>Use .dockerignore to exclude unnecessary files</li>
              <li>Run containers as non-root users</li>
              <li>Use specific image tags instead of 'latest'</li>
              <li>Regularly update base images and dependencies</li>
              <li>Monitor resource usage and set limits</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">🎉 Docker Installation Complete!</h4>
            <p>Docker is now installed and ready to containerize your applications. Start building and deploying containers!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};