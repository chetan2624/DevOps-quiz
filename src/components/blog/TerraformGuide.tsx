import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Terminal, Download, Settings, Globe, Server, Cloud } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export const TerraformGuide: React.FC = () => {

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Terraform Installation Guide</h1>
        <p className="text-muted-foreground text-lg">
          Complete installation guide for Terraform on Linux, macOS, and Windows
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
            <li>• Linux, macOS, or Windows operating system</li>
            <li>• Command line access</li>
            <li>• Internet connection for downloading</li>
            <li>• Cloud provider account (AWS, Azure, GCP) for practice</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Download className="h-5 w-5" />
            Method 1: Install on Linux (Ubuntu/Debian)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Update system packages:">
            sudo apt update && sudo apt upgrade -y
          </CodeBlock>
          
          <CodeBlock description="Install required packages:">
            sudo apt install -y gnupg software-properties-common curl
          </CodeBlock>
          
          <CodeBlock description="Add HashiCorp GPG key:">
            curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
          </CodeBlock>
          
          <CodeBlock description="Add HashiCorp repository:">
            sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
          </CodeBlock>
          
          <CodeBlock description="Install Terraform:">
            sudo apt update
            sudo apt install terraform
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Download className="h-5 w-5" />
            Method 2: Manual Installation (All Platforms)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Download Terraform (replace version as needed):">
            wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
          </CodeBlock>
          
          <CodeBlock description="Install unzip if not available:">
            sudo apt install unzip
          </CodeBlock>
          
          <CodeBlock description="Extract and install Terraform:">
            unzip terraform_1.6.0_linux_amd64.zip
            sudo mv terraform /usr/local/bin/
          </CodeBlock>
          
          <CodeBlock description="Make it executable:">
            sudo chmod +x /usr/local/bin/terraform
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Server className="h-5 w-5" />
            Method 3: Install on macOS
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Using Homebrew (recommended):">
            brew tap hashicorp/tap
            brew install hashicorp/tap/terraform
          </CodeBlock>
          
          <CodeBlock description="Alternative: Manual download for macOS:">
            curl -O https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_darwin_amd64.zip
            unzip terraform_1.6.0_darwin_amd64.zip
            sudo mv terraform /usr/local/bin/
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Method 4: Install on Windows
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Using Chocolatey:</h4>
          </div>
          
          <CodeBlock description="Install via Chocolatey package manager:">
            choco install terraform
          </CodeBlock>
          
          <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">Manual Installation:</h4>
            <p className="text-sm">1. Download the Windows zip file from HashiCorp releases</p>
            <p className="text-sm">2. Extract to C:\terraform\</p>
            <p className="text-sm">3. Add C:\terraform to your PATH environment variable</p>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Terminal className="h-5 w-5" />
            Step 5: Verify Installation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Check Terraform version:">
            terraform --version
          </CodeBlock>
          
          <CodeBlock description="Verify installation and see available commands:">
            terraform --help
          </CodeBlock>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cloud className="h-5 w-5" />
            Step 6: Configure AWS Provider (Example)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Install AWS CLI:">
            curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
            unzip awscliv2.zip
            sudo ./aws/install
          </CodeBlock>
          
          <CodeBlock description="Configure AWS credentials:">
            aws configure
          </CodeBlock>
          
          <div className="mb-6">
            <p className="text-muted-foreground mb-2">Create a simple main.tf file to test AWS integration:</p>
            <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
              <code className="text-primary text-sm">{`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "example" {
  bucket = "my-terraform-test-bucket-12345"
}

resource "aws_s3_bucket_versioning" "versioning_example" {
  bucket = aws_s3_bucket.example.id
  versioning_configuration {
    status = "Enabled"
  }
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Globe className="h-5 w-5" />
            Step 7: Test Your First Terraform Deployment
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <CodeBlock description="Initialize Terraform in your project directory:">
            terraform init
          </CodeBlock>
          
          <CodeBlock description="Validate your configuration:">
            terraform validate
          </CodeBlock>
          
          <CodeBlock description="Plan your deployment (dry run):">
            terraform plan
          </CodeBlock>
          
          <CodeBlock description="Apply your configuration:">
            terraform apply
          </CodeBlock>
          
          <CodeBlock description="Destroy resources when done testing:">
            terraform destroy
          </CodeBlock>
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">🎉 Congratulations!</h4>
            <p>Terraform is now installed and ready to manage your infrastructure as code!</p>
          </div>
        </CardContent>
      </Card>

      <Card className="modern-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5" />
            Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <ul className="space-y-2">
            <li>• Always use version control for your Terraform configurations</li>
            <li>• Use remote state storage (S3, Terraform Cloud) for team collaboration</li>
            <li>• Enable state locking to prevent concurrent modifications</li>
            <li>• Use variables and modules for reusable configurations</li>
            <li>• Always run `terraform plan` before `terraform apply`</li>
            <li>• Use `.terraform` and `*.tfstate*` in your `.gitignore`</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};