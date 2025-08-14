import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Terminal, Download, Settings, Globe, Server, Shield } from 'lucide-react';

export const JenkinsGuide: React.FC = () => {
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Jenkins Installation Guide</h1>
        <p className="text-muted-foreground text-lg">
          Complete step-by-step installation of Jenkins on Ubuntu/Debian systems
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
            <li>• Ubuntu 20.04+ or Debian-based system</li>
            <li>• At least 2 GB RAM and 1 vCPU</li>
            <li>• Java 11 or Java 17 installed</li>
            <li>• Root or sudo privileges</li>
            <li>• Port 8080 available for Jenkins web interface</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Step 1: Update System and Install Java
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Update your system packages:">
            sudo apt update && sudo apt upgrade -y
          </CodeBlock>
          
          <CodeBlock description="Install OpenJDK 11 (recommended for Jenkins):">
            sudo apt install openjdk-11-jdk -y
          </CodeBlock>
          
          <CodeBlock description="Verify Java installation:">
            java -version
          </CodeBlock>
          
          <CodeBlock description="Set JAVA_HOME environment variable:">
            echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64' | sudo tee -a /etc/environment
            source /etc/environment
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Download className="h-5 w-5" />
            Step 2: Add Jenkins Repository
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Download and add Jenkins GPG key:">
            {`curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null`}
          </CodeBlock>
          
          <CodeBlock description="Add Jenkins repository to sources list:">
            {`echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null`}
          </CodeBlock>
          
          <CodeBlock description="Update package index:">
            sudo apt update
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Server className="h-5 w-5" />
            Step 3: Install Jenkins
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Install Jenkins:">
            sudo apt install jenkins -y
          </CodeBlock>
          
          <CodeBlock description="Start Jenkins service:">
            sudo systemctl start jenkins
          </CodeBlock>
          
          <CodeBlock description="Enable Jenkins to start on boot:">
            sudo systemctl enable jenkins
          </CodeBlock>
          
          <CodeBlock description="Check Jenkins service status:">
            sudo systemctl status jenkins
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Step 4: Configure Firewall (if UFW is enabled)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Allow Jenkins port through firewall:">
            sudo ufw allow 8080
          </CodeBlock>
          
          <CodeBlock description="Check firewall status:">
            sudo ufw status
          </CodeBlock>
          
          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">AWS EC2 Users:</h4>
            <p className="text-sm">Don't forget to add port 8080 to your EC2 security group inbound rules!</p>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5" />
            Step 5: Access Jenkins Web Interface
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Get the initial admin password:">
            sudo cat /var/lib/jenkins/secrets/initialAdminPassword
          </CodeBlock>
          
          <div className="mt-4 mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Access Jenkins:</h4>
            <p className="text-sm">Open your web browser and navigate to:</p>
            <code className="bg-muted px-2 py-1 rounded text-primary">http://your-server-ip:8080</code>
          </div>
          
          <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">First-time Setup:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Paste the initial admin password from the previous command</li>
              <li>Choose "Install suggested plugins" for basic setup</li>
              <li>Create your first admin user account</li>
              <li>Configure Jenkins URL (usually keep default)</li>
              <li>Start using Jenkins!</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5" />
            Step 6: Basic Security Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Important Security Steps:</h4>
          </div>
          
          <CodeBlock description="Change Jenkins user password (optional security enhancement):">
            sudo passwd jenkins
          </CodeBlock>
          
          <CodeBlock description="Backup Jenkins configuration:">
            sudo cp -r /var/lib/jenkins /var/lib/jenkins-backup-$(date +%Y%m%d)
          </CodeBlock>
          
          <div className="mt-4 space-y-2">
            <p className="font-semibold">Additional Security Recommendations:</p>
            <ul className="text-sm space-y-1 list-disc list-inside ml-4">
              <li>Configure Jenkins behind a reverse proxy (Nginx/Apache)</li>
              <li>Enable HTTPS with SSL certificates</li>
              <li>Set up role-based access control</li>
              <li>Regularly update Jenkins and plugins</li>
              <li>Configure backup strategies</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Step 7: Install Additional Tools (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Install Git (for source code management):">
            sudo apt install git -y
          </CodeBlock>
          
          <CodeBlock description="Install Docker (for containerized builds):">
            sudo apt install docker.io -y
            sudo systemctl start docker
            sudo systemctl enable docker
            sudo usermod -aG docker jenkins
          </CodeBlock>
          
          <CodeBlock description="Install Node.js and npm (for JavaScript projects):">
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt install -y nodejs
          </CodeBlock>
          
          <CodeBlock description="Restart Jenkins after installing additional tools:">
            sudo systemctl restart jenkins
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Step 8: Verify Installation and Create First Job
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Create a Test Job:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Click "New Item" on Jenkins dashboard</li>
              <li>Enter job name and select "Freestyle project"</li>
              <li>In "Build" section, add "Execute shell" build step</li>
              <li>Add command: echo "Hello Jenkins!"</li>
              <li>Save and run the job</li>
            </ol>
          </div>
          
          <CodeBlock description="Check Jenkins logs for troubleshooting:">
            sudo journalctl -u jenkins
          </CodeBlock>
          
          <CodeBlock description="View Jenkins system information:">
            {`# Navigate to: Manage Jenkins → System Information
# Or check the installation directory:
ls -la /var/lib/jenkins/`}
          </CodeBlock>
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">🎉 Installation Complete!</h4>
            <p>Jenkins is now installed and ready to automate your CI/CD pipelines. Start creating jobs and integrating with your development workflow!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};