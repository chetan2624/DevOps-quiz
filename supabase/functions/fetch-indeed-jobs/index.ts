import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JobInput {
  position?: string;
  location?: string;
  country?: string;
  maxItems?: number;
  parseCompanyDetails?: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const APIFY_API_KEY = Deno.env.get('APIFY_API_KEY');
    if (!APIFY_API_KEY) {
      throw new Error('APIFY_API_KEY is not set');
    }

    const { positions, locations, maxItems = 50 } = await req.json();
    
    console.log('Fetching jobs with params:', { positions, locations, maxItems });

    // Prepare input for the Apify Indeed Scraper
    const input: JobInput = {
      position: positions?.join(' OR ') || 'DevOps Engineer',
      location: locations?.join(' OR ') || 'India',
      country: 'IN',
      maxItems,
      parseCompanyDetails: true,
    };

    // Start the Apify actor run
    const runResponse = await fetch(
      `https://api.apify.com/v2/acts/misceres~indeed-scraper/runs?token=${APIFY_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      }
    );

    if (!runResponse.ok) {
      const errorText = await runResponse.text();
      console.error('Apify run failed:', errorText);
      throw new Error(`Failed to start Apify run: ${runResponse.status} - ${errorText}`);
    }

    const runData = await runResponse.json();
    const runId = runData.data.id;
    console.log('Started Apify run:', runId);

    // Wait for the run to complete (with timeout)
    let attempts = 0;
    const maxAttempts = 60; // 60 attempts * 2 seconds = 2 minutes max
    let runStatus = 'RUNNING';

    while (runStatus === 'RUNNING' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const statusResponse = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_API_KEY}`
      );

      const statusData = await statusResponse.json();
      runStatus = statusData.data.status;
      attempts++;
      console.log(`Run status: ${runStatus} (attempt ${attempts})`);
    }

    if (runStatus !== 'SUCCEEDED') {
      throw new Error(`Apify run did not succeed. Final status: ${runStatus}`);
    }

    // Fetch the results
    const datasetId = runData.data.defaultDatasetId;
    const resultsResponse = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_API_KEY}`
    );

    if (!resultsResponse.ok) {
      throw new Error(`Failed to fetch results from Apify: ${resultsResponse.status}`);
    }

    const jobs = await resultsResponse.json();
    console.log(`Fetched ${jobs.length} jobs`);

    // Transform the data to match our format
    const transformedJobs = jobs.map((job: any) => ({
      id: job.id || crypto.randomUUID(),
      title: job.positionName || job.title,
      company: job.company,
      location: job.location,
      description: job.description || job.jobDescription || '',
      companyAbout: job.companyDescription || '',
      applyUrl: job.url || '',
      careersUrl: job.companyUrl || '',
      postedDate: job.postedAt || job.posted || new Date().toISOString(),
      salary: job.salary || '',
      type: determineJobType(job.positionName || job.title, job.description || ''),
      platform: 'Indeed',
    }));

    return new Response(
      JSON.stringify({ jobs: transformedJobs, count: transformedJobs.length }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in fetch-indeed-jobs:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function determineJobType(title: string, description: string): 'internship' | 'fresher' | 'experience' {
  const titleLower = title.toLowerCase();
  const descLower = description.toLowerCase();
  const combined = titleLower + ' ' + descLower;

  if (combined.includes('intern') || combined.includes('internship')) {
    return 'internship';
  }
  
  if (combined.includes('fresher') || combined.includes('entry level') || 
      combined.includes('0-1 year') || combined.includes('0 year')) {
    return 'fresher';
  }

  return 'experience';
}
