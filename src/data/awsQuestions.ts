
import { Question } from '@/types/quiz';

export const awsQuestions: Question[] = [
  {
    question: "You have a web application running on EC2 instances behind an Application Load Balancer. The application experiences high traffic during business hours (9 AM - 6 PM). What AWS service would you use to automatically scale the number of EC2 instances based on demand?",
    options: [
      "AWS Lambda",
      "Amazon CloudWatch",
      "AWS Auto Scaling",
      "Amazon Route 53"
    ],
    correct: 2,
    explanation: "AWS Auto Scaling automatically adjusts the number of EC2 instances based on defined policies and metrics like CPU utilization or request count."
  },
  {
    question: "Your company needs to store backup files that are accessed infrequently but must be available within 12 hours when needed. Which S3 storage class would be most cost-effective?",
    options: [
      "S3 Standard",
      "S3 Standard-IA",
      "S3 Glacier",
      "S3 Glacier Deep Archive"
    ],
    correct: 2,
    explanation: "S3 Glacier is designed for archival storage with retrieval times of 1-12 hours, making it cost-effective for infrequently accessed data."
  },
  {
    question: "You are designing a serverless application that processes images uploaded to S3. When an image is uploaded, it should trigger a function to create thumbnails. Which AWS service would you use?",
    options: [
      "AWS Batch",
      "Amazon ECS",
      "AWS Lambda",
      "Amazon EC2"
    ],
    correct: 2,
    explanation: "AWS Lambda is perfect for event-driven, serverless computing. It can be triggered by S3 events and automatically process uploaded images."
  },
  {
    question: "Your application needs a database that can automatically scale read capacity and provides microsecond latency. Which AWS database service would you choose?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon Aurora"
    ],
    correct: 1,
    explanation: "DynamoDB is a NoSQL database that provides single-digit millisecond latency and can automatically scale read/write capacity."
  },
  {
    question: "You want to distribute your web application globally to reduce latency for users worldwide. Which AWS service would you use?",
    options: [
      "Amazon Route 53",
      "AWS Direct Connect",
      "Amazon CloudFront",
      "AWS Global Accelerator"
    ],
    correct: 2,
    explanation: "Amazon CloudFront is a CDN service that caches and delivers content from edge locations worldwide, reducing latency for global users."
  },
  {
    question: "Your company needs to ensure that all EC2 instances are patched regularly and comply with security policies. Which AWS service would help automate this?",
    options: [
      "AWS Config",
      "AWS Systems Manager",
      "AWS Inspector",
      "AWS CloudTrail"
    ],
    correct: 1,
    explanation: "AWS Systems Manager provides patch management capabilities and can automate the patching of EC2 instances."
  },
  {
    question: "You need to create a VPC with public and private subnets. Instances in the private subnet need internet access for updates. What component is required?",
    options: [
      "Internet Gateway",
      "NAT Gateway",
      "VPC Endpoint",
      "Direct Connect Gateway"
    ],
    correct: 1,
    explanation: "A NAT Gateway allows instances in private subnets to access the internet for outbound traffic while remaining private."
  },
  {
    question: "Your application generates log files that need to be analyzed in real-time for fraud detection. Which AWS service combination would you use?",
    options: [
      "S3 + Lambda",
      "CloudWatch + SNS",
      "Kinesis + Lambda",
      "SQS + EC2"
    ],
    correct: 2,
    explanation: "Amazon Kinesis can ingest real-time streaming data, and Lambda can process it in real-time for fraud detection."
  },
  {
    question: "You have a legacy application that needs to connect to AWS services securely without going over the internet. What would you implement?",
    options: [
      "VPN Connection",
      "AWS Direct Connect",
      "VPC Peering",
      "Internet Gateway"
    ],
    correct: 1,
    explanation: "AWS Direct Connect provides a dedicated network connection from on-premises to AWS, bypassing the internet."
  },
  {
    question: "Your web application needs to handle sudden traffic spikes. You want to ensure high availability across multiple AZs. Which deployment strategy would you use?",
    options: [
      "Single EC2 instance in one AZ",
      "Multiple EC2 instances in one AZ with Auto Scaling",
      "Multiple EC2 instances across multiple AZs with Auto Scaling and Load Balancer",
      "Lambda functions only"
    ],
    correct: 2,
    explanation: "Deploying across multiple AZs with Auto Scaling and Load Balancer ensures high availability and handles traffic spikes effectively."
  }
  // Add more AWS scenario-based questions here...
];

// Add more questions to reach 100 total
export const additionalAwsQuestions: Question[] = [
  {
    question: "What is the maximum size of an S3 object?",
    options: ["5 GB", "5 TB", "100 GB", "1 TB"],
    correct: 1,
    explanation: "The maximum size of an S3 object is 5 TB."
  },
  {
    question: "Which AWS service provides a managed Docker container registry?",
    options: ["Amazon ECS", "Amazon ECR", "Amazon EKS", "AWS Fargate"],
    correct: 1,
    explanation: "Amazon ECR (Elastic Container Registry) is a managed Docker container registry service."
  },
  {
    question: "What is the default VPC CIDR block size?",
    options: ["/16", "/20", "/24", "/28"],
    correct: 0,
    explanation: "The default VPC CIDR block size is /16, providing 65,536 IP addresses."
  },
  {
    question: "Which service would you use for DNS resolution in AWS?",
    options: ["CloudFront", "Route 53", "Direct Connect", "API Gateway"],
    correct: 1,
    explanation: "Amazon Route 53 is AWS's DNS web service for domain name resolution."
  },
  {
    question: "What is the minimum billable duration for AWS Lambda?",
    options: ["100ms", "1ms", "1 second", "No minimum"],
    correct: 0,
    explanation: "AWS Lambda has a minimum billable duration of 100 milliseconds."
  }
];

export const allAwsQuestions = [...awsQuestions, ...additionalAwsQuestions];
