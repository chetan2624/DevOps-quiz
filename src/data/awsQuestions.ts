
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
  },
  {
    question: "Your startup needs to run a web application but wants to minimize infrastructure management. You need automatic scaling and load balancing. Which service would you choose?",
    options: [
      "Amazon EC2 with Auto Scaling",
      "AWS Elastic Beanstalk",
      "Amazon ECS",
      "AWS Lambda"
    ],
    correct: 1,
    explanation: "AWS Elastic Beanstalk provides an easy way to deploy web applications with automatic scaling and load balancing without managing infrastructure."
  },
  {
    question: "You need to process large amounts of data for analytics. The data comes in batches and processing can take several hours. Which service would be most cost-effective?",
    options: [
      "AWS Lambda",
      "Amazon EC2 Spot Instances",
      "AWS Fargate",
      "Amazon ECS"
    ],
    correct: 1,
    explanation: "EC2 Spot Instances offer significant cost savings (up to 90%) for batch processing workloads that can tolerate interruptions."
  },
  {
    question: "Your application needs to send notifications to mobile devices, email, and SMS based on events. Which AWS service would you use?",
    options: [
      "Amazon SQS",
      "Amazon SNS",
      "Amazon SES",
      "AWS Lambda"
    ],
    correct: 1,
    explanation: "Amazon SNS (Simple Notification Service) can send notifications to multiple endpoints including mobile devices, email, and SMS."
  },
  {
    question: "You need to decouple components of your application to improve reliability. Messages should be processed in order and duplicates should be avoided. Which service would you choose?",
    options: [
      "Amazon SQS Standard Queue",
      "Amazon SQS FIFO Queue",
      "Amazon SNS",
      "Amazon Kinesis"
    ],
    correct: 1,
    explanation: "SQS FIFO queues ensure messages are processed in order and provide exactly-once processing to avoid duplicates."
  },
  {
    question: "Your company wants to implement a data warehouse solution for business intelligence. Which AWS service would you recommend?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon Aurora"
    ],
    correct: 2,
    explanation: "Amazon Redshift is a fully managed data warehouse service optimized for business intelligence and analytics workloads."
  },
  {
    question: "You need to run containers in production but don't want to manage the underlying infrastructure. Which AWS service would you choose?",
    options: [
      "Amazon ECS with EC2",
      "Amazon EKS",
      "AWS Fargate",
      "Amazon EC2"
    ],
    correct: 2,
    explanation: "AWS Fargate is a serverless compute engine for containers that eliminates the need to manage underlying infrastructure."
  },
  {
    question: "Your application needs to store user session data with sub-millisecond latency. Which AWS service would be most appropriate?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon ElastiCache",
      "Amazon S3"
    ],
    correct: 2,
    explanation: "Amazon ElastiCache provides in-memory caching with sub-millisecond latency, perfect for session data storage."
  },
  {
    question: "You need to ensure your application can automatically failover to another region in case of a disaster. Which AWS services would you use?",
    options: [
      "Amazon Route 53 + Multi-AZ deployment",
      "Amazon Route 53 Health Checks + DNS failover",
      "AWS Auto Scaling + Load Balancer",
      "Amazon CloudFront + S3"
    ],
    correct: 1,
    explanation: "Route 53 Health Checks with DNS failover can automatically route traffic to a healthy region in case of disasters."
  },
  {
    question: "Your company needs to analyze streaming data from IoT devices in real-time to detect anomalies. Which AWS service combination would you use?",
    options: [
      "Amazon Kinesis + Amazon Kinesis Analytics",
      "Amazon S3 + AWS Lambda",
      "Amazon SQS + Amazon EC2",
      "Amazon DynamoDB + AWS Lambda"
    ],
    correct: 0,
    explanation: "Amazon Kinesis can ingest streaming data from IoT devices, and Kinesis Analytics can analyze it in real-time for anomaly detection."
  },
  {
    question: "You need to provide temporary access to your S3 bucket for external users without creating AWS accounts. What would you use?",
    options: [
      "IAM Users",
      "S3 Bucket Policies",
      "Pre-signed URLs",
      "AWS STS"
    ],
    correct: 2,
    explanation: "Pre-signed URLs provide temporary access to S3 objects without requiring AWS credentials or account creation."
  },
  {
    question: "Your application needs to process files uploaded to S3, but processing can take 10-15 minutes. Which service would you use?",
    options: [
      "AWS Lambda",
      "Amazon SQS + EC2",
      "AWS Step Functions",
      "Amazon ECS"
    ],
    correct: 1,
    explanation: "Lambda has a 15-minute timeout limit, so SQS + EC2 would be better for longer processing times, providing more flexibility."
  },
  {
    question: "You need to implement a solution that processes orders from an e-commerce website. The solution should handle order validation, payment processing, and inventory update. Which service would best orchestrate this workflow?",
    options: [
      "AWS Lambda",
      "AWS Step Functions",
      "Amazon SQS",
      "Amazon EC2"
    ],
    correct: 1,
    explanation: "AWS Step Functions can orchestrate complex workflows with multiple steps, error handling, and state management."
  },
  {
    question: "Your application needs to store large amounts of unstructured data like images, videos, and documents. Which storage service would be most appropriate?",
    options: [
      "Amazon EBS",
      "Amazon EFS",
      "Amazon S3",
      "Amazon FSx"
    ],
    correct: 2,
    explanation: "Amazon S3 is designed for storing large amounts of unstructured data with high durability and availability."
  },
  {
    question: "You need to implement a solution for code deployment that supports blue-green deployments and automatic rollback. Which service would you use?",
    options: [
      "AWS CodeDeploy",
      "AWS CodePipeline",
      "AWS CodeBuild",
      "AWS CodeCommit"
    ],
    correct: 0,
    explanation: "AWS CodeDeploy supports various deployment strategies including blue-green deployments and automatic rollback capabilities."
  },
  {
    question: "Your application needs to search through large amounts of text data with complex queries. Which AWS service would you choose?",
    options: [
      "Amazon RDS",
      "Amazon DynamoDB",
      "Amazon Elasticsearch Service",
      "Amazon Redshift"
    ],
    correct: 2,
    explanation: "Amazon Elasticsearch Service (now OpenSearch) is designed for full-text search and complex queries on large datasets."
  },
  {
    question: "You need to monitor your AWS infrastructure and applications, set up alarms, and collect logs. Which service would provide this functionality?",
    options: [
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "AWS Config",
      "AWS Systems Manager"
    ],
    correct: 1,
    explanation: "Amazon CloudWatch provides monitoring, alerting, and log collection for AWS resources and applications."
  },
  {
    question: "Your company wants to implement a machine learning model to predict customer churn. You have limited ML expertise. Which AWS service would you recommend?",
    options: [
      "Amazon SageMaker",
      "Amazon Rekognition",
      "Amazon Comprehend",
      "AWS Machine Learning"
    ],
    correct: 0,
    explanation: "Amazon SageMaker provides a complete platform for machine learning with pre-built algorithms and easy-to-use tools."
  },
  {
    question: "You need to ensure that your database can handle read-heavy workloads with automatic scaling. Which AWS database service would you choose?",
    options: [
      "Amazon RDS",
      "Amazon Aurora",
      "Amazon DynamoDB",
      "Amazon Redshift"
    ],
    correct: 1,
    explanation: "Amazon Aurora provides automatic scaling for read replicas and is optimized for read-heavy workloads."
  },
  {
    question: "Your application needs to process streaming video content and extract metadata. Which AWS service would be most appropriate?",
    options: [
      "Amazon Kinesis Video Streams",
      "Amazon S3",
      "AWS Lambda",
      "Amazon EC2"
    ],
    correct: 0,
    explanation: "Amazon Kinesis Video Streams is specifically designed for streaming video processing and analysis."
  },
  {
    question: "You need to implement a caching layer for your database to improve performance. Which AWS service would you use?",
    options: [
      "Amazon S3",
      "Amazon EFS",
      "Amazon ElastiCache",
      "Amazon EBS"
    ],
    correct: 2,
    explanation: "Amazon ElastiCache provides in-memory caching to improve database performance and reduce latency."
  },
  {
    question: "Your startup needs to build a mobile app backend with user authentication, real-time data sync, and push notifications. Which AWS service would simplify this?",
    options: [
      "Amazon API Gateway + Lambda",
      "AWS Amplify",
      "Amazon Cognito",
      "AWS AppSync"
    ],
    correct: 1,
    explanation: "AWS Amplify provides a complete platform for building mobile and web app backends with built-in authentication and real-time features."
  }
];

// Add more AWS scenario-based questions to reach 100 total
const additionalAwsQuestions: Question[] = [
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
  },
  {
    question: "Your e-commerce application experiences traffic spikes during flash sales. You need to ensure the database can handle sudden increases in read requests without affecting write performance. What would you implement?",
    options: [
      "Increase the database instance size",
      "Implement Amazon Aurora with read replicas",
      "Use Amazon DynamoDB with auto-scaling",
      "Add an ElastiCache layer"
    ],
    correct: 1,
    explanation: "Aurora read replicas can automatically scale to handle read traffic spikes without affecting the primary database's write performance."
  },
  {
    question: "You need to process CSV files uploaded to S3. Each file contains millions of records that need to be validated and inserted into a database. What's the most cost-effective approach?",
    options: [
      "Use Lambda to process files directly",
      "Use SQS to queue file processing and EC2 Spot instances to process",
      "Use AWS Glue for ETL processing",
      "Use Amazon EMR for big data processing"
    ],
    correct: 2,
    explanation: "AWS Glue is specifically designed for ETL (Extract, Transform, Load) operations and can efficiently process large CSV files with automatic scaling."
  },
  {
    question: "Your application needs to handle user uploads of various file formats (images, videos, documents). You need to trigger different processing workflows based on file type. How would you architect this?",
    options: [
      "Use S3 event notifications with Lambda functions",
      "Use API Gateway with Lambda functions",
      "Use SQS with EC2 instances",
      "Use Step Functions with Lambda"
    ],
    correct: 0,
    explanation: "S3 event notifications can trigger different Lambda functions based on object prefixes or suffixes, allowing different processing workflows for different file types."
  },
  {
    question: "You're building a chat application that needs to support real-time messaging for thousands of concurrent users. Which AWS service combination would you use?",
    options: [
      "API Gateway + Lambda + DynamoDB",
      "API Gateway WebSocket + Lambda + DynamoDB",
      "Amazon AppSync + DynamoDB",
      "Amazon Kinesis + Lambda + DynamoDB"
    ],
    correct: 1,
    explanation: "API Gateway WebSocket APIs enable real-time bidirectional communication, perfect for chat applications with Lambda for processing and DynamoDB for storage."
  },
  {
    question: "Your company needs to migrate a large on-premises database to AWS with minimal downtime. The database is currently 10TB and actively used. What migration strategy would you use?",
    options: [
      "AWS Database Migration Service with ongoing replication",
      "Create a snapshot and restore to RDS",
      "Use AWS DataSync to transfer data",
      "Export to S3 and import to RDS"
    ],
    correct: 0,
    explanation: "AWS DMS supports ongoing replication, allowing you to migrate large databases with minimal downtime by keeping the target database in sync with the source."
  },
  {
    question: "You need to implement a disaster recovery solution for a critical application. The RTO (Recovery Time Objective) is 4 hours and RPO (Recovery Point Objective) is 1 hour. What strategy would you implement?",
    options: [
      "Backup and restore from S3",
      "Pilot light with automated scaling",
      "Warm standby in another region",
      "Multi-site active-active deployment"
    ],
    correct: 2,
    explanation: "A warm standby maintains a scaled-down version of the environment in another region, which can meet the 4-hour RTO requirement and 1-hour RPO with regular backups."
  },
  {
    question: "Your microservices architecture has services that need to communicate securely within a VPC. You want to avoid internet routing. What would you implement?",
    options: [
      "VPC Peering",
      "AWS PrivateLink",
      "VPN Gateway",
      "Internet Gateway with security groups"
    ],
    correct: 1,
    explanation: "AWS PrivateLink enables secure communication between services within a VPC without routing traffic over the internet."
  },
  {
    question: "You're building a data analytics platform that needs to process both batch and streaming data. The solution should be serverless and cost-effective. What combination would you use?",
    options: [
      "Amazon Kinesis + AWS Glue + Amazon Athena",
      "Amazon EMR + Amazon Redshift",
      "AWS Lambda + Amazon S3 + Amazon QuickSight",
      "Amazon Kinesis + Amazon EMR + Amazon Redshift"
    ],
    correct: 0,
    explanation: "Kinesis for streaming data, Glue for serverless ETL processing, and Athena for serverless querying provide a fully serverless and cost-effective analytics platform."
  },
  {
    question: "Your application needs to process financial transactions with ACID compliance and strong consistency. Which database service would you choose?",
    options: [
      "Amazon DynamoDB",
      "Amazon RDS with PostgreSQL",
      "Amazon ElastiCache",
      "Amazon S3"
    ],
    correct: 1,
    explanation: "RDS with PostgreSQL provides ACID compliance and strong consistency required for financial transactions, while DynamoDB offers eventual consistency by default."
  },
  {
    question: "You need to implement a content management system where users can upload, organize, and share large media files. What AWS services would you combine?",
    options: [
      "S3 + CloudFront + Lambda + API Gateway",
      "EFS + EC2 + ALB",
      "EBS + EC2 + CloudFront",
      "S3 + ECS + ALB"
    ],
    correct: 0,
    explanation: "S3 for storage, CloudFront for global distribution, Lambda for processing, and API Gateway for the API layer provide a scalable content management solution."
  },
  {
    question: "Your application needs to send emails to millions of users for marketing campaigns. You need to track bounce rates and complaints. Which service would you use?",
    options: [
      "Amazon SNS",
      "Amazon SES",
      "Amazon WorkMail",
      "AWS Lambda with third-party service"
    ],
    correct: 1,
    explanation: "Amazon SES (Simple Email Service) is designed for bulk email sending with built-in bounce and complaint tracking capabilities."
  },
  {
    question: "You're building a gaming application that needs to store player profiles and game state with single-digit millisecond latency globally. What would you implement?",
    options: [
      "Amazon RDS with read replicas",
      "Amazon DynamoDB with Global Tables",
      "Amazon Aurora Global Database",
      "Amazon ElastiCache with cross-region replication"
    ],
    correct: 1,
    explanation: "DynamoDB Global Tables provide single-digit millisecond latency globally with multi-region replication, perfect for gaming applications."
  },
  {
    question: "Your company needs to implement a CI/CD pipeline that supports multiple environments (dev, staging, prod) with approval workflows. What AWS services would you use?",
    options: [
      "CodeCommit + CodeBuild + CodeDeploy",
      "CodePipeline + CodeBuild + CodeDeploy + Lambda",
      "Jenkins on EC2 + S3",
      "GitHub Actions + Lambda"
    ],
    correct: 1,
    explanation: "CodePipeline orchestrates the entire CI/CD workflow, CodeBuild compiles code, CodeDeploy handles deployment, and Lambda can implement approval workflows."
  },
  {
    question: "You need to implement a search functionality for an e-commerce site with features like faceted search, auto-complete, and recommendations. Which service would you use?",
    options: [
      "Amazon RDS with full-text search",
      "Amazon OpenSearch Service",
      "Amazon CloudSearch",
      "Amazon DynamoDB with GSI"
    ],
    correct: 1,
    explanation: "Amazon OpenSearch Service (formerly Elasticsearch) provides advanced search capabilities including faceted search, auto-complete, and recommendation engines."
  },
  {
    question: "Your application needs to process IoT sensor data from millions of devices. The data comes in bursts and needs real-time analysis. What architecture would you implement?",
    options: [
      "Amazon Kinesis Data Streams + Kinesis Analytics + Lambda",
      "Amazon SQS + Lambda + DynamoDB",
      "Amazon API Gateway + Lambda + S3",
      "Amazon MSK + Lambda + Redshift"
    ],
    correct: 0,
    explanation: "Kinesis Data Streams can handle millions of IoT events, Kinesis Analytics provides real-time analysis, and Lambda can process results and trigger actions."
  },
  {
    question: "You need to implement a solution that automatically transcribes audio files uploaded to S3 and stores the text for search. What services would you combine?",
    options: [
      "Amazon Transcribe + Lambda + ElasticSearch",
      "Amazon Polly + Lambda + DynamoDB",
      "Amazon Comprehend + Lambda + S3",
      "Amazon Rekognition + Lambda + RDS"
    ],
    correct: 0,
    explanation: "Amazon Transcribe converts audio to text, Lambda can orchestrate the workflow, and ElasticSearch enables powerful text search capabilities."
  },
  {
    question: "Your startup needs to implement user authentication with social login, multi-factor authentication, and user management. What service would simplify this?",
    options: [
      "AWS Identity and Access Management (IAM)",
      "Amazon Cognito",
      "AWS Directory Service",
      "AWS Single Sign-On"
    ],
    correct: 1,
    explanation: "Amazon Cognito provides user authentication, social login integration, MFA, and user management specifically for web and mobile applications."
  },
  {
    question: "You need to implement a solution that automatically resizes images uploaded to S3 into multiple sizes for different devices. What would you build?",
    options: [
      "S3 event trigger + Lambda + ImageMagick",
      "S3 event trigger + Elastic Beanstalk + PIL",
      "CloudFront + Lambda@Edge + Sharp",
      "API Gateway + Lambda + Rekognition"
    ],
    correct: 0,
    explanation: "S3 event notifications can trigger Lambda functions that use ImageMagick or similar libraries to resize images automatically upon upload."
  },
  {
    question: "Your application needs to implement a recommendation engine that learns from user behavior in real-time. Which AWS service would you use?",
    options: [
      "Amazon Personalize",
      "Amazon Comprehend",
      "Amazon Rekognition",
      "Amazon Textract"
    ],
    correct: 0,
    explanation: "Amazon Personalize is specifically designed for building recommendation engines that learn from user behavior and provide real-time recommendations."
  },
  {
    question: "You need to implement a solution that monitors application logs for specific error patterns and automatically creates support tickets. What would you build?",
    options: [
      "CloudWatch Logs + CloudWatch Alarms + SNS + Lambda",
      "CloudTrail + CloudWatch + SES",
      "X-Ray + CloudWatch + Lambda",
      "Config + CloudWatch + SQS"
    ],
    correct: 0,
    explanation: "CloudWatch Logs can monitor log patterns, CloudWatch Alarms can trigger on specific patterns, SNS can send notifications, and Lambda can create support tickets."
  },
  {
    question: "Your company wants to implement a data lake that can store structured, semi-structured, and unstructured data with the ability to run analytics. What would you build?",
    options: [
      "S3 + Athena + Glue + QuickSight",
      "Redshift + Spectrum + S3",
      "EMR + HDFS + Hive",
      "RDS + Lambda + ElasticSearch"
    ],
    correct: 0,
    explanation: "S3 provides scalable storage for all data types, Glue catalogs and transforms data, Athena enables SQL queries, and QuickSight provides visualization."
  },
  {
    question: "You need to implement a solution that automatically backs up EC2 instances and retains backups for 7 years for compliance. What would you use?",
    options: [
      "AWS Backup with lifecycle policies",
      "EBS snapshots with Lambda scheduling",
      "AWS Systems Manager with S3 storage",
      "CloudFormation with S3 storage"
    ],
    correct: 0,
    explanation: "AWS Backup provides centralized backup management with lifecycle policies that can automatically manage retention periods including long-term compliance requirements."
  },
  {
    question: "Your application needs to implement real-time collaborative editing like Google Docs. What AWS services would you combine?",
    options: [
      "API Gateway WebSocket + Lambda + DynamoDB Streams",
      "AppSync + DynamoDB + Lambda",
      "SQS + Lambda + ElastiCache",
      "Kinesis + Lambda + RDS"
    ],
    correct: 0,
    explanation: "WebSocket APIs enable real-time bidirectional communication, Lambda processes operations, and DynamoDB Streams can propagate changes to all connected clients."
  },
  {
    question: "You need to implement a solution that processes credit card transactions with PCI DSS compliance. What AWS services would help ensure compliance?",
    options: [
      "AWS Config + CloudTrail + GuardDuty",
      "AWS Certificate Manager + KMS + CloudHSM",
      "AWS Shield + WAF + Inspector",
      "AWS Security Hub + Macie + Detective"
    ],
    correct: 1,
    explanation: "Certificate Manager handles SSL/TLS certificates, KMS manages encryption keys, and CloudHSM provides hardware security modules required for PCI DSS compliance."
  },
  {
    question: "Your application needs to implement a solution that automatically converts documents to different formats (PDF to Word, Excel to CSV, etc.). What would you build?",
    options: [
      "Lambda with document processing libraries",
      "EC2 with LibreOffice automation",
      "Amazon Textract + Lambda",
      "AWS Batch with document processing containers"
    ],
    correct: 3,
    explanation: "AWS Batch is ideal for document processing workloads that may take varying amounts of time and resources, allowing you to use specialized containers for different conversion tasks."
  }
];

export const allAwsQuestions = [...awsQuestions, ...additionalAwsQuestions];
