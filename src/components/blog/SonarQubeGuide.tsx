
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Terminal, User, Download, Settings, Globe } from 'lucide-react';

export const SonarQubeGuide: React.FC = () => {
  const CodeBlock: React.FC<{ children: React.ReactNode; description: string }> = ({ children, description }) => (
    <div className="mb-6">
      <p className="text-gray-300 mb-2">{description}</p>
      <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
        <code className="text-green-400 text-sm">{children}</code>
      </pre>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">SonarQube Installation Guide</h1>
        <p className="text-gray-300 text-lg">
          Complete step-by-step installation of SonarQube on AWS EC2 Ubuntu 22.04
        </p>
      </div>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <CheckCircle className="h-5 w-5" />
            Prerequisites
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <ul className="space-y-2">
            <li>• AWS EC2 instance running Ubuntu 22.04</li>
            <li>• At least 2 GB RAM and 1 vCPU</li>
            <li>• SSH access to your server</li>
            <li>• Root or sudo privileges</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Terminal className="h-5 w-5" />
            Step 1: Update System Packages
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <CodeBlock description="First, update your system packages to ensure you have the latest security patches:">
            sudo apt update && sudo apt upgrade -y
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5" />
            Step 2: Install Java 17
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <CodeBlock description="SonarQube requires Java 17. Install OpenJDK 17:">
            sudo apt install openjdk-17-jdk -y
          </CodeBlock>
          
          <CodeBlock description="Verify Java installation:">
            java -version
          </CodeBlock>
          
          <CodeBlock description="Set JAVA_HOME environment variable:">
            echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' | sudo tee -a /etc/environment
          </CodeBlock>
          
          <CodeBlock description="Source the environment file:">
            source /etc/environment
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="h-5 w-5" />
            Step 3: Create SonarQube User
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <CodeBlock description="Create a dedicated user for SonarQube (security best practice):">
            sudo adduser --system --no-create-home --group --disabled-login sonarqube
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Download className="h-5 w-5" />
            Step 4: Download and Extract SonarQube
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <CodeBlock description="Navigate to the /opt directory:">
            cd /opt
          </CodeBlock>
          
          <CodeBlock description="Download SonarQube Community Edition (latest LTS version):">
            sudo wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.9.0.65466.zip
          </CodeBlock>
          
          <CodeBlock description="Install unzip utility if not already installed:">
            sudo apt install unzip -y
          </CodeBlock>
          
          <CodeBlock description="Extract the SonarQube archive:">
            sudo unzip sonarqube-9.9.0.65466.zip
          </CodeBlock>
          
          <CodeBlock description="Rename the directory for easier management:">
            sudo mv sonarqube-9.9.0.65466 sonarqube
          </CodeBlock>
          
          <CodeBlock description="Change ownership to the sonarqube user:">
            sudo chown -R sonarqube:sonarqube /opt/sonarqube
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Settings className="h-5 w-5" />
            Step 5: Configure System Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <CodeBlock description="Set system limits for SonarQube user:">
            echo 'sonarqube   -   nofile   65536' | sudo tee -a /etc/security/limits.conf
          </CodeBlock>
          
          <CodeBlock description="Configure kernel parameters:">
            echo 'vm.max_map_count=262144' | sudo tee -a /etc/sysctl.conf
          </CodeBlock>
          
          <CodeBlock description="Apply the kernel parameter changes:">
            sudo sysctl -p
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Terminal className="h-5 w-5" />
            Step 6: Create SystemD Service
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <CodeBlock description="Create a systemd service file for SonarQube:">
            sudo nano /etc/systemd/system/sonarqube.service
          </CodeBlock>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-2">Add the following content to the service file:</p>
            <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm">{`[Unit]
Description=SonarQube service
After=syslog.target network.target

[Service]
Type=forking
ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
User=sonarqube
Group=sonarqube
Restart=always
LimitNOFILE=65536
LimitNPROC=4096

[Install]
WantedBy=multi-user.target`}</code>
            </pre>
          </div>
          
          <CodeBlock description="Reload systemd daemon:">
            sudo systemctl daemon-reload
          </CodeBlock>
          
          <CodeBlock description="Enable SonarQube service to start on boot:">
            sudo systemctl enable sonarqube
          </CodeBlock>
          
          <CodeBlock description="Start SonarQube service:">
            sudo systemctl start sonarqube
          </CodeBlock>
          
          <CodeBlock description="Check service status:">
            sudo systemctl status sonarqube
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="h-5 w-5" />
            Step 7: Access SonarQube
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <p className="mb-4">SonarQube runs on port 9000 by default. Access it through your browser:</p>
          
          <CodeBlock description="Open your web browser and navigate to:">
            http://your-server-ip:9000
          </CodeBlock>
          
          <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/50 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">Default Login Credentials:</h4>
            <p>Username: <code className="bg-gray-800 px-2 py-1 rounded">admin</code></p>
            <p>Password: <code className="bg-gray-800 px-2 py-1 rounded">admin</code></p>
            <p className="text-yellow-300 text-sm mt-2">⚠️ Change the default password immediately after first login!</p>
          </div>
          
          <div className="mt-4 p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
            <h4 className="font-semibold text-green-300 mb-2">🎉 Congratulations!</h4>
            <p>SonarQube is now successfully installed and running on your Ubuntu 22.04 server.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
