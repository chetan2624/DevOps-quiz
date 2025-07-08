
import { Question } from '@/types/quiz';

export const jenkinsQuestions: Question[] = [
  {
    question: "What is Jenkins?",
    options: [
      "A version control system",
      "An open-source automation server for CI/CD",
      "A cloud platform",
      "A programming language"
    ],
    correct: 1,
    explanation: "Jenkins is an open-source automation server that enables developers to build, test, and deploy applications through CI/CD pipelines."
  },
  {
    question: "What is a Jenkins pipeline?",
    options: [
      "A deployment strategy",
      "A series of automated steps for building, testing, and deploying code",
      "A monitoring tool",
      "A security feature"
    ],
    correct: 1,
    explanation: "A Jenkins pipeline is a suite of plugins that supports implementing and integrating continuous delivery pipelines."
  },
  {
    question: "What are the two types of Jenkins pipelines?",
    options: [
      "Scripted and Declarative",
      "Manual and Automatic",
      "Simple and Complex",
      "Local and Remote"
    ],
    correct: 0,
    explanation: "Jenkins supports two types of pipelines: Scripted (using Groovy DSL) and Declarative (using a simpler, structured syntax)."
  },
  {
    question: "What is a Jenkinsfile?",
    options: [
      "A configuration file",
      "A text file containing pipeline definition stored in source control",
      "A log file",
      "A security certificate"
    ],
    correct: 1,
    explanation: "A Jenkinsfile is a text file that contains the definition of a Jenkins pipeline and is stored in source control."
  },
  {
    question: "What is the purpose of Jenkins agents (slaves)?",
    options: [
      "To monitor builds",
      "To execute build jobs on different machines",
      "To store artifacts",
      "To manage security"
    ],
    correct: 1,
    explanation: "Jenkins agents (formerly called slaves) are machines that execute build jobs, allowing distributed builds across multiple machines."
  },
  {
    question: "What is a Jenkins job?",
    options: [
      "A single task or process that Jenkins can execute",
      "A user account",
      "A server instance",
      "A monitoring metric"
    ],
    correct: 0,
    explanation: "A Jenkins job is a task or process that Jenkins can execute, such as building code, running tests, or deploying applications."
  },
  {
    question: "What is the purpose of Jenkins plugins?",
    options: [
      "To extend Jenkins functionality",
      "To reduce Jenkins size",
      "To secure Jenkins",
      "To monitor Jenkins"
    ],
    correct: 0,
    explanation: "Jenkins plugins extend the functionality of Jenkins by adding new features, integrations, and capabilities."
  },
  {
    question: "What is a Jenkins workspace?",
    options: [
      "The Jenkins user interface",
      "A directory where Jenkins stores job files and performs builds",
      "A cloud service",
      "A monitoring dashboard"
    ],
    correct: 1,
    explanation: "A Jenkins workspace is a directory on the file system where Jenkins stores job files and performs builds."
  },
  {
    question: "What is the purpose of Jenkins Blue Ocean?",
    options: [
      "A cloud service",
      "A modern user interface for Jenkins pipelines",
      "A monitoring tool",
      "A security feature"
    ],
    correct: 1,
    explanation: "Blue Ocean is a modern, intuitive user interface for Jenkins that provides a visual representation of pipelines."
  },
  {
    question: "What is a Jenkins build trigger?",
    options: [
      "A mechanism that starts a build job",
      "A deployment tool",
      "A monitoring alert",
      "A security feature"
    ],
    correct: 0,
    explanation: "A build trigger is a mechanism that automatically starts a Jenkins build job based on specific conditions or events."
  },
  {
    question: "What is the difference between Freestyle and Pipeline jobs in Jenkins?",
    options: [
      "No difference",
      "Freestyle uses GUI configuration, Pipeline uses code",
      "Pipeline is older than Freestyle",
      "Freestyle is for testing, Pipeline is for deployment"
    ],
    correct: 1,
    explanation: "Freestyle jobs use GUI-based configuration, while Pipeline jobs use code (Jenkinsfile) to define the build process."
  },
  {
    question: "What is Jenkins shared library?",
    options: [
      "A code storage system",
      "Reusable pipeline code that can be shared across multiple pipelines",
      "A monitoring tool",
      "A security feature"
    ],
    correct: 1,
    explanation: "A Jenkins shared library allows you to define reusable pipeline code that can be shared across multiple pipelines."
  },
  {
    question: "What is the purpose of Jenkins artifacts?",
    options: [
      "To store build outputs and deliverables",
      "To monitor builds",
      "To manage security",
      "To configure jobs"
    ],
    correct: 0,
    explanation: "Jenkins artifacts are files generated during a build that are preserved for later use, such as compiled binaries or test reports."
  },
  {
    question: "What is a Jenkins webhook?",
    options: [
      "A security feature",
      "An HTTP callback that triggers Jenkins builds",
      "A monitoring tool",
      "A deployment mechanism"
    ],
    correct: 1,
    explanation: "A webhook is an HTTP callback that can trigger Jenkins builds when specific events occur, such as code commits."
  },
  {
    question: "What is the purpose of Jenkins environment variables?",
    options: [
      "To store configuration values and build information",
      "To monitor performance",
      "To manage security",
      "To store user data"
    ],
    correct: 0,
    explanation: "Environment variables in Jenkins store configuration values and build information that can be used throughout the build process."
  },
  {
    question: "What is Jenkins Matrix build?",
    options: [
      "A security feature",
      "A way to run the same build with different configurations",
      "A monitoring tool",
      "A deployment strategy"
    ],
    correct: 1,
    explanation: "Matrix builds allow you to run the same build job with different configurations, such as different operating systems or versions."
  },
  {
    question: "What is the purpose of Jenkins credentials?",
    options: [
      "To securely store sensitive information like passwords and API keys",
      "To monitor builds",
      "To configure jobs",
      "To manage plugins"
    ],
    correct: 0,
    explanation: "Jenkins credentials provide a secure way to store and manage sensitive information like passwords, API keys, and certificates."
  },
  {
    question: "What is a Jenkins node?",
    options: [
      "A monitoring point",
      "A machine that can execute Jenkins jobs",
      "A configuration file",
      "A security policy"
    ],
    correct: 1,
    explanation: "A Jenkins node is a machine that can execute Jenkins jobs, including the master node and agent nodes."
  },
  {
    question: "What is the purpose of Jenkins SCM polling?",
    options: [
      "To automatically check for changes in source code repositories",
      "To monitor system performance",
      "To manage security",
      "To deploy applications"
    ],
    correct: 0,
    explanation: "SCM polling allows Jenkins to automatically check source code repositories for changes and trigger builds when changes are detected."
  },
  {
    question: "What is Jenkins pipeline as code?",
    options: [
      "A monitoring approach",
      "Defining build pipelines using code instead of GUI",
      "A security feature",
      "A deployment strategy"
    ],
    correct: 1,
    explanation: "Pipeline as code means defining build pipelines using code (Jenkinsfile) instead of GUI configuration, enabling version control and code review."
  }
];

// Add more questions to reach 100 total
const additionalJenkinsQuestions: Question[] = [
  {
    question: "What is the purpose of Jenkins post-build actions?",
    options: [
      "Actions executed after the main build steps",
      "Actions executed before builds",
      "Security checks",
      "Performance monitoring"
    ],
    correct: 0,
    explanation: "Post-build actions are steps that execute after the main build steps complete, such as sending notifications or archiving artifacts."
  },
  {
    question: "What is Jenkins multibranch pipeline?",
    options: [
      "A pipeline that automatically creates jobs for each branch in a repository",
      "A pipeline with multiple steps",
      "A pipeline for multiple projects",
      "A distributed pipeline"
    ],
    correct: 0,
    explanation: "Multibranch pipeline automatically creates and manages separate pipeline jobs for each branch in a source code repository."
  },
  {
    question: "What is the purpose of Jenkins build parameters?",
    options: [
      "To pass input values to builds",
      "To monitor builds",
      "To secure builds",
      "To schedule builds"
    ],
    correct: 0,
    explanation: "Build parameters allow you to pass input values to builds, making builds more flexible and configurable."
  },
  {
    question: "What is Jenkins distributed builds?",
    options: [
      "Running builds across multiple machines",
      "Running multiple builds simultaneously",
      "Backing up builds",
      "Monitoring builds"
    ],
    correct: 0,
    explanation: "Distributed builds allow Jenkins to execute builds across multiple machines (agents) to improve performance and scalability."
  },
  {
    question: "What is the purpose of Jenkins build history?",
    options: [
      "To track and display information about previous builds",
      "To backup builds",
      "To schedule builds",
      "To secure builds"
    ],
    correct: 0,
    explanation: "Build history tracks and displays information about previous builds, including status, duration, and changes."
  }
];

export const allJenkinsQuestions = [...jenkinsQuestions, ...additionalJenkinsQuestions];
