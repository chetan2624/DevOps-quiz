import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Starting question migration...');

    // DevOps Questions
    const devopsQuestions = [
      {
        question: "What does the command `chmod 755 filename` do?",
        options: ["Gives read, write, and execute permission to everyone", "Sets file permission to read and write only for the owner", "Gives full permission to owner, and read/execute to others", "Removes execute permission from the owner"],
        correct: 2,
        explanation: "755 gives rwx (7) to owner, rx (5) to group, and rx (5) to others."
      },
      {
        question: "Which command is used to display the current working directory?",
        options: ["cd", "pwd", "ls", "whoami"],
        correct: 1,
        explanation: "pwd (print working directory) shows the current directory path."
      },
      {
        question: "What does the `grep` command do?",
        options: ["Creates a new file", "Searches for patterns in files", "Copies files to another location", "Changes file permissions"],
        correct: 1,
        explanation: "grep searches for text patterns within files and outputs matching lines."
      }
    ];

    // AWS Questions
    const awsQuestions = [
      {
        question: "You have a web application running on EC2 instances behind an Application Load Balancer. The application experiences high traffic during business hours (9 AM - 6 PM). What AWS service would you use to automatically scale the number of EC2 instances based on demand?",
        options: ["AWS Lambda", "Amazon CloudWatch", "AWS Auto Scaling", "Amazon Route 53"],
        correct: 2,
        explanation: "AWS Auto Scaling automatically adjusts the number of EC2 instances based on defined policies and metrics like CPU utilization or request count."
      },
      {
        question: "Your company needs to store backup files that are accessed infrequently but must be available within 12 hours when needed. Which S3 storage class would be most cost-effective?",
        options: ["S3 Standard", "S3 Standard-IA", "S3 Glacier", "S3 Glacier Deep Archive"],
        correct: 2,
        explanation: "S3 Glacier is designed for archival storage with retrieval times of 1-12 hours, making it cost-effective for infrequently accessed data."
      }
    ];

    // Docker Questions
    const dockerQuestions = [
      {
        question: "What is the primary purpose of Docker?",
        options: ["Virtual machine management", "Container orchestration", "Application containerization", "Network configuration"],
        correct: 2,
        explanation: "Docker is primarily used for application containerization, packaging applications with their dependencies."
      }
    ];

    // Get category IDs
    const { data: categories } = await supabase
      .from('question_categories')
      .select('id, name');

    if (!categories) {
      throw new Error('Failed to fetch categories');
    }

    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.name] = cat.id;
      return acc;
    }, {} as Record<string, string>);

    // Insert questions for each category
    const questionsToInsert = [
      ...devopsQuestions.map(q => ({
        category_id: categoryMap['DevOps'],
        question: q.question,
        options: JSON.stringify(q.options),
        correct_answer: q.correct,
        explanation: q.explanation,
        difficulty: 'medium'
      })),
      ...awsQuestions.map(q => ({
        category_id: categoryMap['AWS'],
        question: q.question,
        options: JSON.stringify(q.options),
        correct_answer: q.correct,
        explanation: q.explanation,
        difficulty: 'medium'
      })),
      ...dockerQuestions.map(q => ({
        category_id: categoryMap['Docker'],
        question: q.question,
        options: JSON.stringify(q.options),
        correct_answer: q.correct,
        explanation: q.explanation,
        difficulty: 'medium'
      }))
    ];

    // Check if questions already exist
    const { data: existingQuestions } = await supabase
      .from('questions')
      .select('question')
      .limit(1);

    if (existingQuestions && existingQuestions.length > 0) {
      console.log('Questions already exist in database');
      return new Response(JSON.stringify({ 
        message: 'Questions already migrated',
        status: 'already_exists'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Insert questions
    const { error: questionsError } = await supabase
      .from('questions')
      .insert(questionsToInsert);

    if (questionsError) {
      console.error('Error inserting questions:', questionsError);
      throw questionsError;
    }

    // Sample interview questions
    const interviewQuestions = [
      {
        category_id: categoryMap['DevOps'],
        question: "Explain the concept of Infrastructure as Code and its benefits.",
        reference_answer: "Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools. Benefits include version control, reproducibility, scalability, and reduced manual errors."
      },
      {
        category_id: categoryMap['AWS'],
        question: "How would you design a highly available web application on AWS?",
        reference_answer: "Design would include multiple AZs, load balancers, auto scaling groups, RDS with Multi-AZ deployment, CloudFront for content delivery, Route 53 for DNS, and proper monitoring with CloudWatch."
      }
    ];

    const { error: interviewError } = await supabase
      .from('interview_questions')
      .insert(interviewQuestions);

    if (interviewError) {
      console.error('Error inserting interview questions:', interviewError);
      throw interviewError;
    }

    console.log('Migration completed successfully');

    return new Response(JSON.stringify({ 
      message: 'Questions migrated successfully',
      questionsCount: questionsToInsert.length,
      interviewQuestionsCount: interviewQuestions.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Migration error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});