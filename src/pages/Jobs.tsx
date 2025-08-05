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

  // Sample job data - in real app, this would come from an API
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Junior DevOps Engineer',
      company: 'TCS',
      location: selectedCity,
      type: 'fresher',
      platform: 'LinkedIn',
      description: 'We are looking for a passionate Junior DevOps Engineer to join our cloud infrastructure team. You will work with AWS, Docker, Kubernetes, and CI/CD pipelines to automate deployment processes.',
      companyAbout: 'TCS is a global leader in IT services, digital and business solutions that partners with its clients to simplify, strengthen and transform their businesses.',
      applyUrl: 'https://linkedin.com/jobs',
      careersUrl: 'https://tcs.com/careers',
      postedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'Cloud Engineer',
      company: 'Infosys',
      location: selectedCity,
      type: 'fresher',
      platform: 'Naukri.com',
      description: 'Join our cloud team to design, implement, and manage cloud infrastructure solutions. Experience with AWS, Azure, and automation tools preferred.',
      companyAbout: 'Infosys is a global leader in next-generation digital services and consulting, enabling clients in 46 countries to navigate their digital transformation.',
      applyUrl: 'https://naukri.com',
      careersUrl: 'https://infosys.com/careers',
      postedDate: '1 week ago'
    },
    {
      id: '3',
      title: 'Site Reliability Engineer',
      company: 'Wipro',
      location: selectedCity,
      type: 'experience',
      platform: 'Indeed',
      description: 'Looking for an experienced SRE to ensure the reliability, availability, and performance of our production systems. Strong Linux and monitoring skills required.',
      companyAbout: 'Wipro Limited is a leading global information technology, consulting and business process services company.',
      applyUrl: 'https://indeed.com',
      careersUrl: 'https://wipro.com/careers',
      postedDate: '3 days ago'
    },
    {
      id: '4',
      title: 'DevOps Intern',
      company: 'Razorpay',
      location: selectedCity,
      type: 'internship',
      platform: 'Internshala',
      description: 'Internship opportunity to learn DevOps practices, CI/CD, containerization, and cloud technologies in a fast-paced fintech environment.',
      companyAbout: 'Razorpay is India\'s only converged payments solution company, allowing businesses to accept, process and disburse payments.',
      applyUrl: 'https://internshala.com',
      careersUrl: 'https://razorpay.com/careers',
      postedDate: '5 days ago'
    },
    {
      id: '5',
      title: 'AWS Cloud Engineer',
      company: 'Zomato',
      location: selectedCity,
      type: 'experience',
      platform: 'AngelList',
      description: 'We need an AWS Cloud Engineer to design and implement scalable cloud solutions for our food delivery platform. Expertise in AWS services required.',
      companyAbout: 'Zomato is an Indian multinational restaurant aggregator and food delivery company, serving millions of customers daily.',
      applyUrl: 'https://angel.co',
      careersUrl: 'https://zomato.com/careers',
      postedDate: '1 day ago'
    },
    {
      id: '6',
      title: 'Kubernetes Engineer',
      company: 'Swiggy',
      location: selectedCity,
      type: 'experience',
      platform: 'GeeksforGeeks',
      description: 'Join our platform team to manage and optimize Kubernetes clusters for our food delivery infrastructure at scale.',
      companyAbout: 'Swiggy is India\'s leading on-demand delivery platform, connecting millions of consumers, delivery partners and restaurant partners.',
      applyUrl: 'https://geeksforgeeks.org/jobs',
      careersUrl: 'https://swiggy.com/careers',
      postedDate: '4 days ago'
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <nav className="flex justify-between items-center p-6 relative z-10">
        <Button
          onClick={handleBackToHome}
          variant="ghost"
          className="text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthHeader />
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-88px)]">
        {/* Sidebar - only show when city is selected */}
        {selectedCity && !selectedJob && (
          <div className="w-64 border-r border-border bg-background/50 backdrop-blur-sm">
            <div className="p-6">
              <h2 className="font-semibold text-foreground mb-4">Cities</h2>
              <div className="space-y-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
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
        {selectedJob ? renderJobDetail() :
         selectedType ? renderJobsList() :
         selectedCity ? renderJobTypes() :
         renderCitySelection()}
      </div>
    </div>
  );
};

export default Jobs;