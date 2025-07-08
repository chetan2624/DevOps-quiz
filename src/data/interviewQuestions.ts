
import { InterviewQuestion } from '@/types/quiz';

export const allInterviewQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'Kubernetes mai pods kya hote hai? Basic concept explain karo.',
    referenceAnswer: 'Pods smallest deployable unit hai Kubernetes mai. Ek pod mai ek ya multiple containers hote hai jo same network aur storage share karte hai.',
    conditionalQuestion: 'Agar tumhe ek pod mai multiple containers run karne hai jo different services provide karte hai, kaise approach karoge?',
    conditionalReferenceAnswer: 'Multi-container pod pattern use karunga jaise sidecar, ambassador ya adapter pattern. Each container ka apna responsibility hoga but same network namespace share karenge.',
    category: 'Kubernetes'
  },
  {
    id: '2',
    question: 'AWS S3 mai static website kaise host karte hai? Step by step batao.',
    referenceAnswer: 'S3 bucket create karo, static website hosting enable karo, index.html upload karo, bucket policy set karo for public read access, aur CloudFront se CDN add kar sakte hai.',
    conditionalQuestion: 'Agar mujhe S3 mai kisi object ko public karna hai without making entire bucket public, to kya karoge?',
    conditionalReferenceAnswer: 'Object-level permissions use karunga. Specific object ke liye public-read ACL set karunga ya pre-signed URLs generate karunga time-limited access ke liye.',
    category: 'AWS'
  },
  {
    id: '3',
    question: 'Docker container aur virtual machine mai kya difference hai?',
    referenceAnswer: 'Container OS kernel share karta hai host ke saath while VM apna separate OS chalaata hai. Container lightweight aur fast startup, VM mai complete isolation aur security.',
    conditionalQuestion: 'Production mai Docker containers ko secure kaise karoge? Security best practices kya hai?',
    conditionalReferenceAnswer: 'Non-root user use karunga, image scanning karunga, secrets management properly karunga, network policies set karunga, aur runtime security tools use karunga.',
    category: 'Docker'
  },
  {
    id: '4',
    question: 'Git mai merge aur rebase mai kya difference hai?',
    referenceAnswer: 'Merge branches ko combine karta hai with merge commit, history preserve karta hai. Rebase commits ko replay karta hai, linear history banata hai without merge commits.',
    conditionalQuestion: 'Team collaboration mai kab merge use karna chahiye aur kab rebase?',
    conditionalReferenceAnswer: 'Public branches mai merge use karo to preserve history. Private feature branches mai rebase use karo to clean up commits before merging to main.',
    category: 'Git'
  },
  {
    id: '5',
    question: 'Jenkins pipeline mai declarative aur scripted pipeline mai kya difference hai?',
    referenceAnswer: 'Declarative pipeline structured syntax use karta hai with pipeline block, easy to read. Scripted pipeline Groovy script hai, more flexibility but complex.',
    conditionalQuestion: 'Production mai Jenkins pipeline fail ho raha hai intermittently. Debugging kaise karoge?',
    conditionalReferenceAnswer: 'Console logs check karunga, build history analyze karunga, resource utilization monitor karunga, network connectivity check karunga, aur retry mechanism implement karunga.',
    category: 'Jenkins'
  },
  {
    id: '6',
    question: 'Terraform state file kya hai aur kyun important hai?',
    referenceAnswer: 'State file current infrastructure ka record rakhti hai. Terraform isse use karke plan banata hai ki kya create, update ya delete karna hai.',
    conditionalQuestion: 'Team mai multiple developers Terraform use kar rahe hai. State management kaise handle karoge?',
    conditionalReferenceAnswer: 'Remote state backend use karunga like S3 with DynamoDB for locking. State file ko version control nahi karunga, remote storage mai rakh kar team sharing karunga.',
    category: 'Terraform'
  },
  {
    id: '7',
    question: 'Linux mai process monitoring kaise karte hai? Commands batao.',
    referenceAnswer: 'ps, top, htop commands use karte hai. ps aux sabhi processes dikhata hai, top real-time monitoring karta hai, htop interactive interface provide karta hai.',
    conditionalQuestion: 'Server mai high CPU usage aa rahi hai. Troubleshooting kaise karoge step by step?',
    conditionalReferenceAnswer: 'Top/htop se high CPU processes identify karunga, ps aux se detailed info dekhunga, strace se system calls monitor karunga, aur iotop se disk I/O check karunga.',
    category: 'Linux'
  },
  {
    id: '8',
    question: 'DataDog mai monitoring setup kaise karte hai application ke liye?',
    referenceAnswer: 'DataDog agent install karo server mai, application metrics configure karo, dashboards create karo, alerts setup karo for critical thresholds.',
    conditionalQuestion: 'Application mai slow API response time aa rahi hai. DataDog mai kaise debug karoge?',
    conditionalReferenceAnswer: 'APM traces dekhunga, database query performance monitor karunga, infrastructure metrics check karunga, error logs analyze karunga aur bottlenecks identify karunga.',
    category: 'DataDog'
  },
  {
    id: '9',
    question: 'Kubernetes mai service discovery kaise kaam karta hai?',
    referenceAnswer: 'Kubernetes DNS use karta hai service discovery ke liye. Services ko DNS names assign hote hai, pods services ke through communicate kar sakte hai.',
    conditionalQuestion: 'Microservices architecture mai service-to-service communication secure kaise karoge Kubernetes mai?',
    conditionalReferenceAnswer: 'Service mesh like Istio use karunga, mTLS enable karunga, network policies implement karunga, aur RBAC properly configure karunga.',
    category: 'Kubernetes'
  },
  {
    id: '10',
    question: 'CI/CD pipeline mai testing strategy kya honi chahiye?',
    referenceAnswer: 'Unit tests, integration tests, aur end-to-end tests include karne chahiye. Early feedback ke liye fast tests pehle run karo, slow tests parallel mai.',
    conditionalQuestion: 'Production deployment mai zero-downtime achieve karna hai. Strategy kya hogi?',
    conditionalReferenceAnswer: 'Blue-green deployment ya rolling deployment use karunga, health checks implement karunga, rollback strategy ready rakhunga, aur load balancer se traffic control karunga.',
    category: 'DevOps'
  }
];
