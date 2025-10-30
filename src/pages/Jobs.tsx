import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Building2, Clock, ExternalLink, Users, Briefcase, GraduationCap, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileSidebar } from '@/components/ui/mobile-sidebar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import jobsBg from '@/assets/jobs-bg.jpg';

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
  salary?: string;
}

const CACHE_KEY = 'indeed_jobs_cache';
const CACHE_TIMESTAMP_KEY = 'indeed_jobs_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const Jobs = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('Pune');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // Load cached jobs on mount
  useEffect(() => {
    const loadCachedJobs = () => {
      const cached = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cached && timestamp) {
        const cacheAge = Date.now() - parseInt(timestamp);
        if (cacheAge < CACHE_DURATION) {
          setJobs(JSON.parse(cached));
          return true;
        }
      }
      return false;
    };

    const hasCache = loadCachedJobs();
    if (!hasCache) {
      fetchJobs();
    }
  }, []);

  // Fetch fresh jobs when city changes
  useEffect(() => {
    if (selectedCity) {
      fetchJobs();
    }
  }, [selectedCity]);

  const fetchJobs = async () => {
    setIsFetching(true);
    toast.loading('Fetching latest jobs from Indeed...');
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-indeed-jobs', {
        body: {
          positions: ['DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer', 'Platform Engineer'],
          locations: [selectedCity || 'Pune'],
          maxItems: 50
        }
      });

      if (error) throw error;

      if (data?.jobs) {
        setJobs(data.jobs);
        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.jobs));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        toast.success(`Fetched ${data.jobs.length} latest jobs!`);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs. Please try again later.');
    } finally {
      setIsFetching(false);
      toast.dismiss();
    }
  };

  const handleRefresh = () => {
    fetchJobs();
  };

  const cities = ['Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Delhi', 'Noida', 'Gurgaon', 'Chennai'];

  const jobTypes = [
    { id: 'internship', title: 'Internships', icon: GraduationCap, color: 'text-blue-500' },
    { id: 'fresher', title: "Fresher's Jobs", icon: Users, color: 'text-green-500' },
    { id: 'experience', title: "Experience's Jobs", icon: Briefcase, color: 'text-purple-500' }
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

  const sidebarContent = (
    <div className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">Cities</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isFetching}
          className="h-8 w-8"
          title="Refresh job listings"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <div className="space-y-2">
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
  );

  return (
    <div className="min-h-screen cosmic-gradient relative">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${jobsBg})` }}
      />
      {/* Navigation Header */}
      <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 sm:p-6 relative z-10">
        <div className="flex items-center gap-2">
          {selectedCity && !selectedJob && (
            <MobileSidebar>
              {sidebarContent}
            </MobileSidebar>
          )}
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="text-foreground hover:bg-primary hover:text-black"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthHeader />
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-88px)]">
        {/* Desktop Sidebar - only show when city is selected */}
        {selectedCity && !selectedJob && (
          <div className="hidden lg:block w-64 border-r border-border bg-background/50 backdrop-blur-sm">
            {sidebarContent}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
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