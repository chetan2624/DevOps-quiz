import { useState, useEffect } from 'react';

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

const CACHE_KEY = 'devops_jobs_cache';
const CACHE_TIMESTAMP_KEY = 'devops_jobs_cache_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useJobFetcher() {
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const checkCache = () => {
      const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedTimestamp) {
        const cacheTime = new Date(cachedTimestamp);
        const now = new Date();
        const timeDiff = now.getTime() - cacheTime.getTime();
        
        setLastFetch(cacheTime);
        
        // If cache is older than 24 hours, mark for refresh
        if (timeDiff > CACHE_DURATION) {
          setShouldRefresh(true);
        }
      } else {
        // No cache, fetch fresh data
        setShouldRefresh(true);
      }
    };

    checkCache();
  }, []);

  const updateCache = () => {
    const now = new Date();
    localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toISOString());
    setLastFetch(now);
    setShouldRefresh(false);
  };

  const forceRefresh = () => {
    setShouldRefresh(true);
  };

  return {
    lastFetch,
    shouldRefresh,
    updateCache,
    forceRefresh
  };
}
