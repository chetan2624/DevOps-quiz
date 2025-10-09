import React, { useState } from 'react';
import { ArrowLeft, MapPin, Building2, Clock, ExternalLink, Users, Briefcase, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'fresher' | 'experience';
  platform: string;
  description: string;
  companyAbout: string;
  applyUrl: string;
  careersUrl: string;
  postedDate: string;
}

const Jobs = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const cities = ['Indore', 'Pune', 'Nagpur', 'Ahmedabad', 'Vadodara'];

  const jobTypes = [
    { id: 'internship', title: 'Internships', icon: GraduationCap, color: 'text-blue-500' },
    { id: 'fresher', title: "Fresher's Jobs", icon: Users, color: 'text-green-500' },
    { id: 'experience', title: "Experience's Jobs", icon: Briefcase, color: 'text-purple-500' }
  ];

  // Comprehensive job data with real descriptions and proper apply URLs
  const jobs: Job[] = [
    // DevOps Engineer roles
    {
      id: '1',
      title: 'DevOps Engineer',
      company: 'DHL',
      location: selectedCity,
      type: 'experience',
      platform: 'LinkedIn',
      description: `Your IT Future, Delivered.

DevOps Engineer

Open to candidates PAN India.

With a global team of 5800 IT professionals, DHL IT Services connects people and keeps the global economy running by continuously innovating and creating sustainable digital solutions. We work beyond global borders and push boundaries across all dimensions of logistics.

At IT Services, we are passionate about delivering innovative and scalable software solutions that drive business growth and enhance customer experiences. As a DevOps engineer at DHL IT Services, specializing in Java, Kafka, and public cloud, you are an integral part of the development team.

Key Responsibilities:
• Participate in agile meetings and collaborate with development teams
• Develop and enhance microservices-based applications using Java and Kafka
• Design and implement cloud-native architectures on Azure
• Implement and maintain CI/CD pipelines using Jenkins or GitLab CI
• Manage containerized applications with Docker and Kubernetes
• Utilize Helm for package management within Kubernetes environment

Requirements:
• Strong development skills in Java
• Experience with Kafka and distributed systems
• Proficiency in Docker and Kubernetes
• Good understanding of software development best practices
• Advanced English communication skills

Benefits:
• Hybrid work arrangements
• 42 days annual leave apart from public holidays
• Medical insurance for self + spouse + 2 children
• Professional and technical training certifications`,
      companyAbout: 'DHL is the leading global brand in the logistics industry. Our divisions offer an unrivaled portfolio of logistics services ranging from national and international parcel delivery, e-commerce shipping and fulfillment solutions, international express, road, air and ocean transport to industrial supply chain management. DHL is part of DHL Group with 10,001+ employees globally.',
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=DevOps%20Engineer%20DHL&location=${selectedCity}`,
      careersUrl: 'https://group.dhl.com/en/careers.html',
      postedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'Junior DevOps Engineer',
      company: 'TCS',
      location: selectedCity,
      type: 'fresher',
      platform: 'LinkedIn',
      description: `Join TCS as a Junior DevOps Engineer and kickstart your career in cloud infrastructure and automation.

About the Role:
We are looking for passionate Junior DevOps Engineers to join our cloud infrastructure team. You will work with cutting-edge technologies including AWS, Docker, Kubernetes, and CI/CD pipelines to automate deployment processes and ensure reliable, scalable systems.

Key Responsibilities:
• Support CI/CD pipeline development and maintenance
• Assist in containerization using Docker and orchestration with Kubernetes
• Monitor and maintain cloud infrastructure on AWS
• Collaborate with development teams on deployment automation
• Participate in incident response and troubleshooting
• Learn and implement DevOps best practices

Requirements:
• Bachelor's degree in Computer Science, IT, or related field
• Basic understanding of Linux/Unix systems
• Familiarity with cloud platforms (AWS preferred)
• Knowledge of scripting languages (Python, Bash)
• Strong problem-solving skills and eagerness to learn

What We Offer:
• Comprehensive training programs
• Career growth opportunities
• Competitive salary and benefits
• Work on global projects with cutting-edge technology`,
      companyAbout: 'TCS is a global leader in IT services, digital and business solutions that partners with its clients to simplify, strengthen and transform their businesses. TCS offers a consulting-led, cognitive powered, integrated portfolio of business, technology and engineering services and solutions.',
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=Junior%20DevOps%20Engineer%20TCS&location=${selectedCity}`,
      careersUrl: 'https://www.tcs.com/careers',
      postedDate: '1 day ago'
    },
    {
      id: '3',
      title: 'Cloud Engineer',
      company: 'Infosys',
      location: selectedCity,
      type: 'fresher',
      platform: 'Naukri.com',
      description: `Cloud Engineer - Digital Infrastructure

Join our cloud transformation team to design, implement, and manage cloud infrastructure solutions that power digital innovation for global enterprises.

About the Role:
We are seeking talented Cloud Engineers to join our growing cloud practice. You'll work with leading cloud platforms including AWS, Azure, and Google Cloud to build scalable, secure, and cost-effective solutions for our clients.

Key Responsibilities:
• Design and deploy cloud infrastructure using Infrastructure as Code
• Implement cloud security best practices and compliance standards
• Optimize cloud costs and performance
• Automate deployment and management processes
• Support cloud migration projects
• Collaborate with cross-functional teams on cloud adoption strategies

Required Skills:
• Experience with cloud platforms (AWS, Azure, or GCP)
• Knowledge of Infrastructure as Code tools (Terraform, CloudFormation)
• Understanding of networking, security, and automation
• Scripting skills in Python, PowerShell, or Bash
• Strong analytical and problem-solving abilities

Benefits:
• Comprehensive health insurance
• Professional certification support
• Flexible work arrangements
• Global exposure and career advancement opportunities`,
      companyAbout: 'Infosys is a global leader in next-generation digital services and consulting. We enable clients in 46 countries to navigate their digital transformation. With over three decades of experience in managing the systems and workings of global enterprises.',
      applyUrl: `https://www.naukri.com/jobs-in-${selectedCity.toLowerCase()}?k=Cloud%20Engineer%20Infosys`,
      careersUrl: 'https://www.infosys.com/careers',
      postedDate: '3 days ago'
    },
    {
      id: '4',
      title: 'Site Reliability Engineer',
      company: 'Wipro',
      location: selectedCity,
      type: 'experience',
      platform: 'Indeed',
      description: `Site Reliability Engineer - Platform Engineering

Join Wipro's SRE team to ensure the reliability, availability, and performance of mission-critical production systems serving millions of users globally.

About the Role:
We are looking for experienced Site Reliability Engineers to join our platform engineering team. You'll be responsible for building and maintaining highly reliable systems, implementing monitoring and alerting solutions, and driving automation initiatives.

Key Responsibilities:
• Design and implement monitoring, alerting, and observability solutions
• Manage incident response and post-mortem processes
• Build automation tools to reduce operational overhead
• Optimize system performance and capacity planning
• Implement disaster recovery and business continuity plans
• Collaborate with development teams on reliability improvements

Required Experience:
• 3+ years of experience in SRE or similar roles
• Strong expertise in Linux systems administration
• Experience with monitoring tools (Prometheus, Grafana, ELK stack)
• Proficiency in scripting and automation (Python, Go, Bash)
• Knowledge of cloud platforms and container orchestration
• Experience with incident management and troubleshooting

Technical Skills:
• Container technologies (Docker, Kubernetes)
• Infrastructure as Code (Terraform, Ansible)
• CI/CD pipelines and version control
• Database administration and performance tuning
• Network troubleshooting and security principles`,
      companyAbout: 'Wipro Limited is a leading global information technology, consulting and business process services company. We harness the power of cognitive computing, hyper-automation, robotics, cloud, analytics and emerging technologies to help our clients adapt to the digital world.',
      applyUrl: `https://www.indeed.com/jobs?q=Site%20Reliability%20Engineer%20Wipro&l=${selectedCity}`,
      careersUrl: 'https://careers.wipro.com',
      postedDate: '5 days ago'
    },
    {
      id: '5',
      title: 'DevOps Intern',
      company: 'Razorpay',
      location: selectedCity,
      type: 'internship',
      platform: 'Internshala',
      description: `DevOps Engineering Internship - FinTech Innovation

Join Razorpay's engineering team as a DevOps intern and gain hands-on experience with cutting-edge financial technology infrastructure.

About the Internship:
This is an exciting opportunity to learn DevOps practices, CI/CD, containerization, and cloud technologies in a fast-paced fintech environment. You'll work alongside experienced engineers on real-world projects that impact millions of merchants and customers.

What You'll Learn:
• CI/CD pipeline development using Jenkins and GitLab
• Container orchestration with Docker and Kubernetes
• Cloud infrastructure management on AWS
• Infrastructure monitoring and logging
• Security best practices in fintech
• Agile development methodologies

Internship Projects:
• Build automated deployment pipelines
• Implement monitoring and alerting systems
• Contribute to infrastructure automation
• Participate in incident response and resolution
• Document processes and create technical guides

Requirements:
• Currently pursuing BE/BTech in Computer Science or related field
• Basic knowledge of Linux and command line
• Understanding of software development lifecycle
• Interest in cloud technologies and automation
• Strong problem-solving and communication skills

Internship Benefits:
• Stipend of ₹40,000 per month
• Mentorship from senior engineers
• Certificate of completion
• Potential for full-time offer
• Access to Razorpay's learning resources`,
      companyAbout: 'Razorpay is India\'s only converged payments solution company, allowing businesses to accept, process and disburse payments with its product suite. We are building India\'s most developer-friendly platform to help businesses transact easily and safely.',
      applyUrl: `https://internshala.com/internships/keywords-devops%20razorpay/location-${selectedCity.toLowerCase()}`,
      careersUrl: 'https://razorpay.com/careers',
      postedDate: '1 week ago'
    },
    {
      id: '6',
      title: 'AWS Cloud Engineer',
      company: 'Zomato',
      location: selectedCity,
      type: 'experience',
      platform: 'AngelList',
      description: `AWS Cloud Engineer - Food Tech Infrastructure

Join Zomato's infrastructure team to design and implement scalable cloud solutions that power one of India's largest food delivery platforms.

About the Role:
We are seeking an experienced AWS Cloud Engineer to architect, deploy, and manage cloud infrastructure that serves millions of customers daily. You'll work on high-scale distributed systems and contribute to our cloud-first strategy.

Key Responsibilities:
• Design and implement scalable AWS infrastructure
• Manage auto-scaling, load balancing, and disaster recovery
• Implement security best practices and compliance standards
• Optimize cloud costs and resource utilization
• Build Infrastructure as Code using Terraform and CloudFormation
• Monitor and troubleshoot production systems

Technical Requirements:
• 2+ years of hands-on AWS experience
• Expertise in EC2, RDS, S3, VPC, CloudFront, Lambda
• Experience with container services (ECS, EKS)
• Proficiency in Infrastructure as Code tools
• Strong knowledge of networking and security
• Experience with monitoring tools (CloudWatch, DataDog)

What Makes This Role Exciting:
• Work on systems serving 100M+ customers
• Cutting-edge food tech infrastructure challenges
• Collaboration with product and engineering teams
• Opportunity to shape cloud architecture strategy
• Fast-paced startup environment with global scale

Benefits:
• Competitive salary with equity options
• Health insurance for family
• Flexible work arrangements
• Learning and development budget
• Free meals and exclusive Zomato benefits`,
      companyAbout: 'Zomato is an Indian multinational restaurant aggregator and food delivery company. Founded in 2008, Zomato provides information, menus and user-reviews of restaurants as well as food delivery options from partner restaurants in select cities.',
      applyUrl: `https://angel.co/jobs?role=r%3Aaws-cloud-engineer&location=l%3A${selectedCity}`,
      careersUrl: 'https://www.zomato.com/careers',
      postedDate: '4 days ago'
    },
    {
      id: '7',
      title: 'Kubernetes Engineer',
      company: 'Swiggy',
      location: selectedCity,
      type: 'experience',
      platform: 'GeeksforGeeks',
      description: `Kubernetes Engineer - Platform Infrastructure

Join Swiggy's platform team to manage and optimize Kubernetes clusters powering India's leading food delivery infrastructure at massive scale.

About the Role:
We are looking for a skilled Kubernetes Engineer to join our platform engineering team. You'll be responsible for managing large-scale Kubernetes deployments that handle millions of orders daily across multiple cities.

Key Responsibilities:
• Design and manage production Kubernetes clusters
• Implement cluster security, networking, and storage solutions
• Develop custom operators and controllers
• Optimize cluster performance and resource utilization
• Implement GitOps workflows and deployment strategies
• Monitor cluster health and implement alerting

Technical Expertise Required:
• 3+ years of production Kubernetes experience
• Deep understanding of Kubernetes networking (CNI, Ingress)
• Experience with Helm charts and custom operators
• Proficiency in Go or Python for automation
• Knowledge of service mesh technologies (Istio, Linkerd)
• Experience with monitoring stack (Prometheus, Grafana)

Infrastructure Technologies:
• Container runtime optimization (containerd, CRI-O)
• Storage solutions (persistent volumes, CSI drivers)
• CI/CD integration with Kubernetes
• Multi-cluster management and federation
• Security tools (OPA, Falco, Pod Security Standards)

Scale & Impact:
• Manage clusters serving 200M+ API calls daily
• Support 500+ microservices across multiple environments
• Handle traffic spikes during peak ordering hours
• Ensure 99.9% uptime for critical business services`,
      companyAbout: 'Swiggy is India\'s leading on-demand delivery platform, connecting millions of consumers, delivery partners and restaurant partners. We are committed to elevating the complete food ordering and delivery experience through technology.',
      applyUrl: `https://www.geeksforgeeks.org/jobs/?search=Kubernetes%20Engineer%20Swiggy&location=${selectedCity}`,
      careersUrl: 'https://careers.swiggy.com',
      postedDate: '2 days ago'
    },
    {
      id: '8',
      title: 'Infrastructure Engineer',
      company: 'PhonePe',
      location: selectedCity,
      type: 'experience',
      platform: 'LinkedIn',
      description: `Infrastructure Engineer - FinTech Scale

Join PhonePe's infrastructure team to build and scale systems that handle India's largest digital payments platform with 400M+ registered users.

About the Role:
We are seeking experienced Infrastructure Engineers to design, build, and operate highly scalable and reliable infrastructure that processes billions of transactions. You'll work on cutting-edge financial technology at unprecedented scale.

Key Responsibilities:
• Design and implement large-scale distributed systems
• Build automation for infrastructure provisioning and management
• Implement security controls for financial data protection
• Optimize system performance for low-latency transactions
• Design disaster recovery and business continuity solutions
• Collaborate with product teams on scalability requirements

Technical Stack:
• Cloud platforms: AWS, with multi-region deployments
• Container orchestration: Kubernetes at massive scale
• Monitoring: Custom metrics, Prometheus, Grafana
• Databases: PostgreSQL, MongoDB, Redis clusters
• Message queues: Kafka, RabbitMQ for event processing
• Load balancing: HAProxy, NGINX, AWS ALB

Scale Challenges:
• Handle 10B+ API calls per day
• Process millions of concurrent transactions
• Maintain sub-second response times
• Ensure 99.99% uptime for payment systems
• Scale during festival seasons (10x traffic spikes)

Requirements:
• 4+ years of infrastructure engineering experience
• Experience with high-availability system design
• Strong knowledge of networking and security
• Proficiency in automation tools and scripting
• Experience with financial/payment systems preferred`,
      companyAbout: 'PhonePe is India\'s leading digital payments platform with over 400 million registered users. We are the largest UPI player in India processing more than 5 billion transactions monthly. PhonePe is built on a foundation of security, trust and reliability.',
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=Infrastructure%20Engineer%20PhonePe&location=${selectedCity}`,
      careersUrl: 'https://www.phonepe.com/careers',
      postedDate: '6 days ago'
    },
    {
      id: '9',
      title: 'CI/CD Engineer',
      company: 'Freshworks',
      location: selectedCity,
      type: 'fresher',
      platform: 'Naukri.com',
      description: `CI/CD Engineer - Developer Platform

Join Freshworks' developer platform team to build and maintain continuous integration and deployment pipelines that enable rapid, reliable software delivery.

About the Role:
We are looking for a CI/CD Engineer to join our platform engineering team. You'll be responsible for designing, implementing, and maintaining CI/CD pipelines that support our global SaaS products serving over 50,000 businesses worldwide.

Key Responsibilities:
• Design and implement CI/CD pipelines using Jenkins, GitLab CI, or GitHub Actions
• Automate build, test, and deployment processes
• Implement infrastructure as code for pipeline infrastructure
• Integrate security scanning and quality gates
• Monitor pipeline performance and reliability
• Support development teams with pipeline optimization

Technical Skills:
• Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)
• Knowledge of containerization (Docker) and orchestration (Kubernetes)
• Proficiency in scripting languages (Python, Bash, PowerShell)
• Understanding of version control systems (Git)
• Familiarity with cloud platforms (AWS, Azure, GCP)
• Experience with monitoring and observability tools

Pipeline Technologies:
• Build tools: Maven, Gradle, npm, pip
• Testing frameworks integration
• Artifact repositories: Nexus, Artifactory
• Security scanning: SAST, DAST, dependency scanning
• Infrastructure deployment: Terraform, Ansible
• Notification systems: Slack, email, webhooks

Growth Opportunities:
• Work with multiple programming languages and frameworks
• Learn advanced DevOps practices and cloud technologies
• Collaborate with global engineering teams
• Contribute to open source projects
• Attend conferences and training programs`,
      companyAbout: 'Freshworks Inc. is a software company that provides business software to make it easy for teams to acquire, close and keep their customers for life. Freshworks products are used by over 50,000 businesses around the world.',
      applyUrl: `https://www.naukri.com/jobs-in-${selectedCity.toLowerCase()}?k=CI%20CD%20Engineer%20Freshworks`,
      careersUrl: 'https://www.freshworks.com/company/careers',
      postedDate: '1 day ago'
    },
    {
      id: '10',
      title: 'Linux System Administrator',
      company: 'Cognizant',
      location: selectedCity,
      type: 'experience',
      platform: 'Indeed',
      description: `Linux System Administrator - Enterprise Infrastructure

Join Cognizant's infrastructure services team to manage and maintain enterprise Linux environments for global clients across various industries.

About the Role:
We are seeking an experienced Linux System Administrator to manage large-scale Linux infrastructures. You'll be responsible for system optimization, security hardening, and automation of routine administrative tasks.

Key Responsibilities:
• Administer and maintain Red Hat/CentOS/Ubuntu servers
• Implement security policies and patch management
• Monitor system performance and capacity planning
• Automate system administration tasks using scripts
• Troubleshoot system issues and provide technical support
• Manage backup and disaster recovery procedures

Technical Requirements:
• 3+ years of Linux administration experience
• Proficiency in shell scripting (Bash, Python)
• Experience with configuration management (Ansible, Puppet)
• Knowledge of networking concepts and troubleshooting
• Understanding of security best practices
• Experience with virtualization technologies

System Administration Skills:
• Package management (yum, apt, zypper)
• File system management and storage solutions
• Network services configuration (DNS, DHCP, NFS)
• Web server administration (Apache, Nginx)
• Database administration basics (MySQL, PostgreSQL)
• Log analysis and troubleshooting

Automation & Monitoring:
• System monitoring tools (Nagios, Zabbix, Prometheus)
• Log management solutions (ELK stack)
• Backup solutions and disaster recovery testing
• Performance tuning and optimization
• Incident response and documentation

Career Development:
• Work with Fortune 500 clients
• Exposure to diverse technology stacks
• Certification support (RHCE, LPIC)
• Global project opportunities`,
      companyAbout: 'Cognizant is a multinational corporation that provides IT services, including digital, technology, consulting, and operations services. We help clients modernize technology, reimagine processes and transform experiences.',
      applyUrl: `https://www.indeed.com/jobs?q=Linux%20System%20Administrator%20Cognizant&l=${selectedCity}`,
      careersUrl: 'https://careers.cognizant.com',
      postedDate: '3 days ago'
    },
    {
      id: '11',
      title: 'Monitoring Engineer',
      company: 'Accenture',
      location: selectedCity,
      type: 'fresher',
      platform: 'LinkedIn',
      description: `Monitoring Engineer - Observability Platform

Join Accenture's cloud operations team to build and maintain comprehensive monitoring and observability solutions for enterprise clients.

About the Role:
We are looking for a Monitoring Engineer to design, implement, and maintain monitoring solutions that provide visibility into complex distributed systems. You'll work with cutting-edge observability tools and technologies.

Key Responsibilities:
• Design and implement monitoring strategies for cloud and on-premise infrastructure
• Configure alerting rules and notification systems
• Create dashboards and reports for system visibility
• Implement application performance monitoring (APM)
• Automate monitoring deployment and configuration
• Analyze system metrics and provide performance insights

Monitoring Technologies:
• Infrastructure monitoring: Prometheus, Nagios, Zabbix
• Application monitoring: New Relic, Datadog, AppDynamics
• Log management: ELK Stack (Elasticsearch, Logstash, Kibana)
• Visualization: Grafana, Kibana, custom dashboards
• Cloud monitoring: CloudWatch, Azure Monitor, Google Cloud Monitoring
• Synthetic monitoring: Pingdom, Uptime Robot

Technical Skills:
• Experience with time-series databases
• Proficiency in query languages (PromQL, KQL, SQL)
• Understanding of microservices architecture
• Knowledge of networking protocols and services
• Scripting abilities for automation (Python, Bash)
• Familiarity with cloud platforms

Observability Focus Areas:
• Metrics collection and analysis
• Distributed tracing implementation
• Log aggregation and correlation
• SLI/SLO definition and monitoring
• Incident detection and alerting
• Performance optimization recommendations

Growth Path:
• SRE and platform engineering opportunities
• Cloud architecture and DevOps roles
• Specialization in specific monitoring platforms
• Client-facing consulting positions`,
      companyAbout: 'Accenture is a global professional services company with leading capabilities in digital, cloud and security. Combining unmatched experience and specialized skills across more than 40 industries.',
      applyUrl: `https://www.linkedin.com/jobs/search/?keywords=Monitoring%20Engineer%20Accenture&location=${selectedCity}`,
      careersUrl: 'https://www.accenture.com/us-en/careers',
      postedDate: '5 days ago'
    },
    {
      id: '12',
      title: 'DevOps Engineer',
      company: 'Deqode',
      location: selectedCity,
      type: 'experience',
      platform: 'Wellfound',
      description: `AWS DevOps Engineer - Cloud Native Solutions

Join Deqode's cloud engineering team to architect and implement AWS-based solutions using cutting-edge containerization and orchestration technologies.

About the Role:
We are seeking an experienced AWS DevOps Engineer to design, deploy, and manage cloud-native applications. You'll work with Docker, Kubernetes, and various AWS services to build scalable, resilient systems for our clients.

Key Responsibilities:
• Design and implement AWS cloud architectures
• Deploy and manage containerized applications using Docker and Kubernetes
• Build and maintain CI/CD pipelines for automated deployments
• Implement infrastructure as code using Terraform and CloudFormation
• Monitor application and infrastructure performance
• Ensure security best practices and compliance

AWS Technologies:
• Compute: EC2, ECS, EKS, Lambda, Fargate
• Storage: S3, EBS, EFS, Storage Gateway
• Database: RDS, DynamoDB, ElastiCache
• Networking: VPC, Route 53, CloudFront, Load Balancers
• Security: IAM, Secrets Manager, WAF, GuardDuty
• Monitoring: CloudWatch, X-Ray, Systems Manager

Container & Orchestration:
• Docker containerization and multi-stage builds
• Kubernetes cluster management and networking
• Helm charts for application deployment
• Service mesh implementation (Istio/Linkerd)
• Container security scanning and compliance
• Microservices architecture patterns

DevOps Practices:
• GitOps workflows with ArgoCD/Flux
• Blue-green and canary deployment strategies
• Infrastructure monitoring and alerting
• Automated testing and quality gates
• Disaster recovery and backup strategies
• Cost optimization and resource management

Requirements:
• 2+ years of AWS DevOps experience
• Strong expertise in Docker and Kubernetes
• Proficiency in infrastructure as code
• Experience with monitoring and observability tools
• Knowledge of security best practices`,
      companyAbout: 'Deqode is a technology consulting company specializing in cloud solutions, DevOps automation, and digital transformation. We help businesses leverage modern cloud technologies to accelerate their digital journey.',
      applyUrl: `https://wellfound.com/jobs?role=DevOps%20Engineer&location=${selectedCity}&company=Deqode`,
      careersUrl: 'https://deqode.com/careers',
      postedDate: '2 days ago'
    }
  ];

  const filteredJobs = jobs.filter(job => 
    job.location === selectedCity && job.type === selectedType
  );

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSelectedType('');
    setSelectedJob(null);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setSelectedJob(null);
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleBack = () => {
    if (selectedJob) {
      setSelectedJob(null);
    } else if (selectedType) {
      setSelectedType('');
    } else if (selectedCity) {
      setSelectedCity('');
    }
  };

  const renderJobDetail = () => (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="mb-6 text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Jobs
        </Button>
        
        <Card className="modern-card p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">{selectedJob?.title}</h1>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span className="font-semibold text-primary">{selectedJob?.company}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {selectedJob?.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedJob?.postedDate}
              </div>
            </div>
            <Badge variant="secondary" className="mb-6">
              {selectedJob?.platform}
            </Badge>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Job Description</h2>
              <p className="text-muted-foreground leading-relaxed">{selectedJob?.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">About {selectedJob?.company}</h2>
              <p className="text-muted-foreground leading-relaxed">{selectedJob?.companyAbout}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => window.open(selectedJob?.applyUrl, '_blank')}
                className="btn-primary flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
              <Button
                onClick={() => window.open(selectedJob?.careersUrl, '_blank')}
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Company Careers Page
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderJobsList = () => (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {jobTypes.find(t => t.id === selectedType)?.title} in {selectedCity}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card 
              key={job.id} 
              className="modern-card p-6 cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
              onClick={() => handleJobSelect(job)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{job.title}</h3>
                  <p className="text-primary font-medium mb-2">{job.company}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {job.platform}
                </Badge>
                <span className="text-xs text-muted-foreground">{job.postedDate}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJobTypes = () => (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cities
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Jobs in {selectedCity}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {jobTypes.map((type) => (
            <Card 
              key={type.id}
              className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
              onClick={() => handleTypeSelect(type.id)}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center`}>
                <type.icon className={`w-8 h-8 ${type.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{type.title}</h3>
              <p className="text-muted-foreground text-sm">
                {type.id === 'internship' ? 'Learn and grow with us' : 
                 type.id === 'fresher' ? 'Start your DevOps journey' : 
                 'Advanced DevOps positions'}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCitySelection = () => (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Find DevOps Jobs</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Discover exciting DevOps opportunities in major Indian cities
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cities.map((city) => (
            <Card 
              key={city}
              className="modern-card p-8 text-center cursor-pointer hover:border-primary/30 transition-all hover:shadow-lg"
              onClick={() => handleCitySelect(city)}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{city}</h3>
              <p className="text-muted-foreground text-sm">View available positions</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Navigation Header */}
      <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 relative z-10">
        <Button
          onClick={handleBackToHome}
          variant="ghost"
          className="text-foreground hover:bg-primary hover:text-black"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthHeader />
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-88px)]">
        {/* Sidebar - only show when city is selected */}
        {selectedCity && !selectedJob && (
          <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-border bg-background/50 backdrop-blur-sm order-2 lg:order-1">
            <div className="p-4 sm:p-6">
              <h2 className="font-semibold text-foreground mb-4">Cities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2 lg:space-x-0">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left p-3 rounded-lg transition-colors text-sm sm:text-base ${
                      selectedCity === city 
                        ? 'bg-primary text-white' 
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 order-1 lg:order-2">
          {selectedJob ? renderJobDetail() :
           selectedType ? renderJobsList() :
           selectedCity ? renderJobTypes() :
           renderCitySelection()}
        </div>
      </div>
    </div>
  );
};

export default Jobs;