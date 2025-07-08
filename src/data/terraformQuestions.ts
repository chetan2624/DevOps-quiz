
import { Question } from '@/types/quiz';

export const terraformQuestions: Question[] = [
  {
    question: "What is Terraform?",
    options: [
      "A cloud monitoring tool",
      "An Infrastructure as Code (IaC) tool",
      "A container orchestration platform",
      "A programming language"
    ],
    correct: 1,
    explanation: "Terraform is an Infrastructure as Code tool that allows you to build, change, and version infrastructure efficiently."
  },
  {
    question: "What is the Terraform configuration language called?",
    options: [
      "TCL",
      "HCL (HashiCorp Configuration Language)",
      "JSON",
      "YAML"
    ],
    correct: 1,
    explanation: "Terraform uses HCL (HashiCorp Configuration Language) for writing configuration files."
  },
  {
    question: "What is a Terraform provider?",
    options: [
      "A cloud service",
      "A plugin that enables Terraform to manage resources for a specific service",
      "A configuration file",
      "A command-line tool"
    ],
    correct: 1,
    explanation: "A provider is a plugin that enables Terraform to interact with cloud providers, SaaS providers, and other APIs."
  },
  {
    question: "What is the purpose of 'terraform init' command?",
    options: [
      "To apply configuration changes",
      "To initialize a Terraform working directory",
      "To destroy infrastructure",
      "To plan changes"
    ],
    correct: 1,
    explanation: "terraform init initializes a Terraform working directory by downloading providers and modules."
  },
  {
    question: "What does 'terraform plan' do?",
    options: [
      "Applies changes to infrastructure",
      "Creates an execution plan showing what actions Terraform will take",
      "Initializes the working directory",
      "Destroys infrastructure"
    ],
    correct: 1,
    explanation: "terraform plan creates an execution plan, showing what actions Terraform will take to achieve the desired state."
  },
  {
    question: "What is the Terraform state file?",
    options: [
      "A backup of configuration files",
      "A file that stores the current state of infrastructure",
      "A log file",
      "A configuration template"
    ],
    correct: 1,
    explanation: "The state file stores the current state of your infrastructure and maps real-world resources to your configuration."
  },
  {
    question: "What is a Terraform module?",
    options: [
      "A reusable configuration component",
      "A cloud service",
      "A command-line tool",
      "A monitoring system"
    ],
    correct: 0,
    explanation: "A module is a reusable configuration component that encapsulates a set of resources and their configurations."
  },
  {
    question: "What is the purpose of 'terraform apply' command?",
    options: [
      "To create an execution plan",
      "To apply the changes required to reach the desired state",
      "To initialize the working directory",
      "To validate configuration"
    ],
    correct: 1,
    explanation: "terraform apply executes the actions proposed in a Terraform plan to achieve the desired state."
  },
  {
    question: "What is remote state in Terraform?",
    options: [
      "State stored locally",
      "State stored in a remote backend for team collaboration",
      "A backup mechanism",
      "A monitoring feature"
    ],
    correct: 1,
    explanation: "Remote state allows teams to collaborate by storing the state file in a remote backend like S3, Azure Blob, or Terraform Cloud."
  },
  {
    question: "What is the purpose of Terraform variables?",
    options: [
      "To store secrets",
      "To make configurations more flexible and reusable",
      "To monitor infrastructure",
      "To manage providers"
    ],
    correct: 1,
    explanation: "Variables make Terraform configurations more flexible and reusable by allowing parameterization."
  },
  {
    question: "What is a Terraform data source?",
    options: [
      "A way to create new resources",
      "A way to fetch information about existing resources",
      "A monitoring tool",
      "A backup mechanism"
    ],
    correct: 1,
    explanation: "Data sources allow Terraform to fetch information about existing resources not managed by Terraform."
  },
  {
    question: "What is the purpose of 'terraform destroy' command?",
    options: [
      "To create resources",
      "To destroy all resources managed by Terraform",
      "To update resources",
      "To validate configuration"
    ],
    correct: 1,
    explanation: "terraform destroy removes all resources managed by Terraform in the current configuration."
  },
  {
    question: "What is Terraform workspace?",
    options: [
      "A development environment",
      "A way to manage multiple environments with the same configuration",
      "A cloud service",
      "A monitoring dashboard"
    ],
    correct: 1,
    explanation: "Workspaces allow you to manage multiple environments (dev, staging, prod) with the same configuration."
  },
  {
    question: "What is the purpose of output values in Terraform?",
    options: [
      "To export information about resources",
      "To import resources",
      "To store secrets",
      "To manage providers"
    ],
    correct: 0,
    explanation: "Output values export information about your infrastructure that can be used by other configurations or displayed to users."
  },
  {
    question: "What is Terraform Cloud?",
    options: [
      "A cloud provider",
      "A managed service for Terraform workflows",
      "A monitoring tool",
      "A programming language"
    ],
    correct: 1,
    explanation: "Terraform Cloud is a managed service that provides collaboration, governance, and automation features for Terraform."
  },
  {
    question: "What is the purpose of 'terraform validate' command?",
    options: [
      "To apply changes",
      "To validate the configuration syntax",
      "To create resources",
      "To destroy resources"
    ],
    correct: 1,
    explanation: "terraform validate checks whether the configuration is syntactically valid and internally consistent."
  },
  {
    question: "What is a Terraform backend?",
    options: [
      "A monitoring system",
      "A storage location for Terraform state",
      "A cloud provider",
      "A development tool"
    ],
    correct: 1,
    explanation: "A backend determines how state is loaded and how operations are executed (local, remote, cloud)."
  },
  {
    question: "What is the purpose of 'terraform import' command?",
    options: [
      "To import existing infrastructure into Terraform state",
      "To export configuration",
      "To create new resources",
      "To validate configuration"
    ],
    correct: 0,
    explanation: "terraform import allows you to import existing infrastructure into your Terraform state."
  },
  {
    question: "What is a Terraform provisioner?",
    options: [
      "A cloud service",
      "A way to execute scripts on resources after creation",
      "A monitoring tool",
      "A storage backend"
    ],
    correct: 1,
    explanation: "Provisioners are used to execute scripts on a local or remote machine as part of resource creation or destruction."
  },
  {
    question: "What is the difference between 'terraform plan' and 'terraform apply'?",
    options: [
      "No difference",
      "Plan shows what will happen, apply actually makes the changes",
      "Apply shows what will happen, plan makes the changes",
      "Both make changes"
    ],
    correct: 1,
    explanation: "terraform plan shows what changes will be made without applying them, while terraform apply actually makes the changes."
  }
];

// Add more questions to reach 100 total
const additionalTerraformQuestions: Question[] = [
  {
    question: "What is Terraform's dependency graph?",
    options: [
      "A monitoring dashboard",
      "A visual representation of resource dependencies",
      "A backup mechanism",
      "A security feature"
    ],
    correct: 1,
    explanation: "Terraform builds a dependency graph to determine the order in which resources should be created, updated, or destroyed."
  },
  {
    question: "What is the purpose of 'terraform refresh' command?",
    options: [
      "To update the state file with real infrastructure",
      "To create new resources",
      "To destroy resources",
      "To validate configuration"
    ],
    correct: 0,
    explanation: "terraform refresh updates the state file with the current real-world state of infrastructure."
  },
  {
    question: "What is a Terraform local value?",
    options: [
      "A computed value that can be referenced multiple times",
      "A variable from user input",
      "A cloud resource",
      "A monitoring metric"
    ],
    correct: 0,
    explanation: "Local values are computed values that can be referenced multiple times within a configuration to avoid repetition."
  },
  {
    question: "What is the purpose of 'terraform fmt' command?",
    options: [
      "To format Terraform configuration files",
      "To create resources",
      "To destroy resources",
      "To validate configuration"
    ],
    correct: 0,
    explanation: "terraform fmt formats Terraform configuration files to a canonical format and style."
  },
  {
    question: "What is Terraform's null resource?",
    options: [
      "A resource that does nothing",
      "A resource that exists only to run provisioners",
      "A deleted resource",
      "An error state"
    ],
    correct: 1,
    explanation: "The null resource is a placeholder that exists primarily to run provisioners that aren't directly associated with a specific resource."
  }
];

export const allTerraformQuestions = [...terraformQuestions, ...additionalTerraformQuestions];
