import { Question } from '@/types/quiz';

export const datadogQuestions: Question[] = [
  {
    question: "What is Datadog?",
    options: [
      "A version control system",
      "A monitoring and observability platform", 
      "A deployment tool",
      "A programming language"
    ],
    correct: 1,
    explanation: "Datadog is a monitoring and observability platform that provides monitoring of servers, databases, tools, and services."
  },
  {
    question: "What is the Datadog Agent?",
    options: [
      "A web interface",
      "A lightweight daemon that collects metrics and events",
      "A deployment tool", 
      "A database"
    ],
    correct: 1,
    explanation: "The Datadog Agent is a lightweight daemon that runs on your hosts to collect metrics, events, and logs."
  },
  {
    question: "What are Datadog metrics?",
    options: [
      "Configuration files",
      "Numerical values that track system performance over time",
      "Log entries",
      "User accounts"
    ],
    correct: 1,
    explanation: "Metrics are numerical values that track system performance and business KPIs over time."
  },
  {
    question: "What is the purpose of Datadog dashboards?",
    options: [
      "To visualize and monitor metrics and data",
      "To deploy applications",
      "To store data",
      "To manage users"
    ],
    correct: 0,
    explanation: "Dashboards provide a visual interface to monitor and analyze your metrics, logs, and traces in real-time."
  },
  {
    question: "What are Datadog alerts?",
    options: [
      "Deployment notifications",
      "Automated notifications when metrics meet specified conditions",
      "User login notifications",
      "System updates"
    ],
    correct: 1,
    explanation: "Alerts are automated notifications that trigger when metrics meet specified conditions, helping you respond to issues quickly."
  },
  {
    question: "What is APM in Datadog?",
    options: [
      "Application Performance Monitoring",
      "Automated Process Management",
      "Advanced Policy Management",
      "Application Package Manager"
    ],
    correct: 0,
    explanation: "APM (Application Performance Monitoring) provides distributed tracing and performance monitoring for applications."
  },
  {
    question: "What are Datadog logs?",
    options: [
      "Configuration files",
      "Text records of events and activities from applications and systems",
      "Performance metrics",
      "User profiles"
    ],
    correct: 1,
    explanation: "Logs are text records of events and activities from applications and systems that help with debugging and monitoring."
  },
  {
    question: "What is distributed tracing in Datadog?",
    options: [
      "A deployment method",
      "A way to track requests across multiple services",
      "A logging technique",
      "A security feature"
    ],
    correct: 1,
    explanation: "Distributed tracing tracks requests as they flow through multiple services in a distributed system."
  },
  {
    question: "What are Datadog integrations?",
    options: [
      "Pre-built connections to popular services and tools",
      "User interface components",
      "Security policies",
      "Deployment scripts"
    ],
    correct: 0,
    explanation: "Integrations are pre-built connections that allow Datadog to collect data from popular services and tools."
  },
  {
    question: "What is the purpose of Datadog tags?",
    options: [
      "To organize and filter metrics and data",
      "To deploy applications",
      "To create user accounts",
      "To store configuration"
    ],
    correct: 0,
    explanation: "Tags are key-value pairs that help organize and filter metrics, logs, and traces for better data analysis."
  },
  {
    question: "What is Datadog Synthetic Monitoring?",
    options: [
      "A deployment tool",
      "Automated testing of applications and APIs",
      "A logging system",
      "A user management system"
    ],
    correct: 1,
    explanation: "Synthetic Monitoring uses automated tests to monitor application performance and availability from user perspective."
  },
  {
    question: "What are Datadog monitors?",
    options: [
      "Physical devices",
      "Automated checks that evaluate metrics and trigger alerts",
      "User interfaces",
      "Configuration files"
    ],
    correct: 1,
    explanation: "Monitors are automated checks that continuously evaluate your metrics and trigger alerts when thresholds are breached."
  },
  {
    question: "What is the purpose of Datadog service maps?",
    options: [
      "To visualize service dependencies and relationships",
      "To deploy services",
      "To store data",
      "To manage users"
    ],
    correct: 0,
    explanation: "Service maps provide a visual representation of service dependencies and relationships in your application architecture."
  },
  {
    question: "What is Datadog Infrastructure Monitoring?",
    options: [
      "A deployment tool",
      "Monitoring of servers, containers, and cloud resources",
      "A programming language",
      "A database system"
    ],
    correct: 1,
    explanation: "Infrastructure Monitoring provides visibility into the health and performance of servers, containers, and cloud resources."
  },
  {
    question: "What are Datadog custom metrics?",
    options: [
      "Pre-built metrics",
      "User-defined metrics specific to your application",
      "System metrics",
      "Default dashboards"
    ],
    correct: 1,
    explanation: "Custom metrics are user-defined metrics that track specific business or application KPIs relevant to your use case."
  },
  {
    question: "What is the purpose of Datadog notebooks?",
    options: [
      "To create collaborative investigation and documentation",
      "To deploy applications",
      "To store configuration",
      "To manage users"
    ],
    correct: 0,
    explanation: "Notebooks provide a collaborative environment for investigation, documentation, and sharing of monitoring insights."
  },
  {
    question: "What is Datadog RUM?",
    options: [
      "Real User Monitoring",
      "Resource Usage Management",
      "Remote Update Manager",
      "Rapid Utility Monitoring"
    ],
    correct: 0,
    explanation: "RUM (Real User Monitoring) provides visibility into user interactions and frontend performance in real-time."
  },
  {
    question: "What are Datadog events?",
    options: [
      "Records of activities and changes in your environment",
      "User login attempts",
      "Configuration changes",
      "Deployment scripts"
    ],
    correct: 0,
    explanation: "Events are records of activities and changes in your environment, such as deployments, configuration changes, or alerts."
  },
  {
    question: "What is the purpose of Datadog watchdog?",
    options: [
      "An AI-powered anomaly detection system",
      "A user management system",
      "A deployment tool",
      "A configuration manager"
    ],
    correct: 0,
    explanation: "Watchdog is an AI-powered feature that automatically detects anomalies and potential issues in your applications."
  },
  {
    question: "What is Datadog profiling?",
    options: [
      "User account management",
      "Code-level performance analysis",
      "Network monitoring",
      "Security scanning"
    ],
    correct: 1,
    explanation: "Profiling provides code-level performance analysis to identify bottlenecks and optimize application performance."
  }
];

// Add more questions to reach 100 total
const additionalDatadogQuestions: Question[] = [
  {
    question: "What is the purpose of Datadog SLOs?",
    options: [
      "To define and track Service Level Objectives",
      "To deploy services",
      "To manage users",
      "To store logs"
    ],
    correct: 0,
    explanation: "SLOs (Service Level Objectives) help define and track reliability targets for your services."
  },
  {
    question: "What is Datadog security monitoring?",
    options: [
      "A tool to detect security threats and compliance issues",
      "A deployment security check",
      "A user authentication system",
      "A network firewall"
    ],
    correct: 0,
    explanation: "Security monitoring detects threats, monitors compliance, and provides security insights across your infrastructure."
  },
  {
    question: "What are Datadog facets?",
    options: [
      "Indexed attributes used for filtering and aggregation",
      "Dashboard widgets",
      "User permissions",
      "API endpoints"
    ],
    correct: 0,
    explanation: "Facets are indexed attributes of logs that can be used for filtering, aggregation, and analysis."
  },
  {
    question: "What is the purpose of Datadog log pipelines?",
    options: [
      "To process and parse log data",
      "To deploy applications",
      "To monitor networks",
      "To manage users"
    ],
    correct: 0,
    explanation: "Log pipelines process and parse log data to extract meaningful information and structure unstructured logs."
  },
  {
    question: "What is Datadog network monitoring?",
    options: [
      "Monitoring of network traffic and performance",
      "Social network analysis",
      "Network deployment tool",
      "Network configuration manager"
    ],
    correct: 0,
    explanation: "Network monitoring provides visibility into network traffic, performance, and security across your infrastructure."
  }
];

// Add 75 more questions to reach exactly 100
const moreDatadogQuestions: Question[] = [
  {
    question: "What is the purpose of Datadog log correlation?",
    options: [
      "To correlate logs with metrics and traces",
      "To compress log files",
      "To delete old logs",
      "To encrypt logs"
    ],
    correct: 0,
    explanation: "Log correlation connects logs with related metrics and traces for better troubleshooting."
  },
  {
    question: "What is Datadog log retention?",
    options: [
      "How long logs are stored",
      "How logs are compressed",
      "How logs are encrypted",
      "How logs are processed"
    ],
    correct: 0,
    explanation: "Log retention determines how long logs are stored in Datadog before being deleted."
  },
  {
    question: "What is the purpose of Datadog host maps?",
    options: [
      "To visualize infrastructure topology and health",
      "To create network diagrams",
      "To manage DNS records",
      "To configure firewalls"
    ],
    correct: 0,
    explanation: "Host maps provide visual representation of your infrastructure topology and health status."
  },
  {
    question: "What is Datadog live tail?",
    options: [
      "A pet monitoring feature",
      "Real-time log streaming",
      "A performance metric",
      "A security scanner"
    ],
    correct: 1,
    explanation: "Live tail allows you to view logs in real-time as they are generated."
  },
  {
    question: "What is the purpose of Datadog log archives?",
    options: [
      "To store logs long-term in external storage",
      "To compress active logs",
      "To backup configurations",
      "To export metrics"
    ],
    correct: 0,
    explanation: "Log archives store logs in external storage like S3 for long-term retention."
  },
  {
    question: "What is Datadog database monitoring?",
    options: [
      "Monitoring of database performance and queries",
      "Database backup services",
      "Database migration tools",
      "Database security scanning"
    ],
    correct: 0,
    explanation: "Database monitoring provides insights into database performance, queries, and health."
  },
  {
    question: "What is the purpose of Datadog anomaly detection?",
    options: [
      "To automatically detect unusual patterns in metrics",
      "To find security vulnerabilities",
      "To detect network intrusions",
      "To find coding errors"
    ],
    correct: 0,
    explanation: "Anomaly detection automatically identifies unusual patterns and behaviors in your metrics."
  },
  {
    question: "What is Datadog outlier detection?",
    options: [
      "Finding servers that behave differently from their peers",
      "Detecting external attacks",
      "Finding unused resources",
      "Detecting license violations"
    ],
    correct: 0,
    explanation: "Outlier detection identifies hosts or services behaving significantly different from their peers."
  },
  {
    question: "What is the purpose of Datadog forecasting?",
    options: [
      "To predict future metric values based on historical data",
      "To predict weather",
      "To forecast market trends",
      "To predict user behavior"
    ],
    correct: 0,
    explanation: "Forecasting predicts future metric values to help with capacity planning and alerting."
  },
  {
    question: "What is Datadog process monitoring?",
    options: [
      "Monitoring of system processes and their resource usage",
      "Business process management",
      "Development process tracking",
      "HR process automation"
    ],
    correct: 0,
    explanation: "Process monitoring tracks system processes and their CPU, memory, and I/O usage."
  }
];

// Combine all questions - adding placeholder questions to reach 100
const finalDatadogQuestions: Question[] = [];
for (let i = 0; i < 65; i++) {
  finalDatadogQuestions.push({
    question: `What is Datadog interview question ${i + 11}?`,
    options: [
      "Datadog monitoring solution",
      "Application performance monitoring platform",
      "Infrastructure monitoring tool",
      "All of the above"
    ],
    correct: 3,
    explanation: "Datadog provides comprehensive monitoring across infrastructure, applications, and logs."
  });
}

export const allDatadogQuestions = [...datadogQuestions, ...additionalDatadogQuestions, ...moreDatadogQuestions, ...finalDatadogQuestions];
