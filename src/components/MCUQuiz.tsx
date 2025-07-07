import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MCUQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = [
    {
      question: "What does the command `chmod 755 filename` do?",
      options: [
        "Gives read, write, and execute permission to everyone",
        "Sets file permission to read and write only for the owner",
        "Gives full permission to owner, and read/execute to others",
        "Removes execute permission from the owner"
      ],
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
      options: [
        "Creates a new file",
        "Searches for patterns in files",
        "Copies files to another location",
        "Changes file permissions"
      ],
      correct: 1,
      explanation: "grep searches for text patterns within files and outputs matching lines."
    },
    {
      question: "Which signal does `kill -9` send to a process?",
      options: ["SIGTERM", "SIGKILL", "SIGINT", "SIGHUP"],
      correct: 1,
      explanation: "kill -9 sends SIGKILL, which forcefully terminates a process."
    },
    {
      question: "What is the default shell in most Linux distributions?",
      options: ["csh", "zsh", "bash", "fish"],
      correct: 2,
      explanation: "bash (Bourne Again Shell) is the default shell in most Linux distributions."
    },
    {
      question: "Which command shows running processes?",
      options: ["ls", "ps", "df", "du"],
      correct: 1,
      explanation: "ps displays information about running processes."
    },
    {
      question: "What does `sudo` stand for?",
      options: [
        "Super User Do",
        "Switch User Do",
        "System User Do",
        "Substitute User Do"
      ],
      correct: 3,
      explanation: "sudo stands for 'substitute user do' or 'switch user do'."
    },
    {
      question: "Which file contains user account information?",
      options: ["/var/log/syslog", "/etc/passwd", "/etc/shadow", "/etc/group"],
      correct: 1,
      explanation: "/etc/passwd contains user account information like username, UID, GID, etc."
    },
    {
      question: "What does the `tar` command do?",
      options: [
        "Archives files into a single file",
        "Transfers files over network",
        "Tracks file changes",
        "Terminates running processes"
      ],
      correct: 0,
      explanation: "tar (tape archive) is used to archive multiple files into a single file."
    },
    {
      question: "Which command displays disk usage of directories?",
      options: ["df", "du", "ls -l", "fdisk"],
      correct: 1,
      explanation: "du (disk usage) shows the disk space used by directories and files."
    },
    {
      question: "What is the root directory in Linux?",
      options: ["/root", "/home", "/", "/usr"],
      correct: 2,
      explanation: "/ is the root directory - the top-level directory in Linux file system."
    },
    {
      question: "Which command is used to create a hard link?",
      options: ["ln", "link", "cp", "mv"],
      correct: 0,
      explanation: "ln creates hard links between files (ln -s creates symbolic links)."
    },
    {
      question: "What does `crontab -e` do?",
      options: [
        "Edits the cron table for scheduling tasks",
        "Executes cron jobs immediately",
        "Enables cron service",
        "Exports cron configuration"
      ],
      correct: 0,
      explanation: "crontab -e opens the cron table for editing scheduled tasks."
    },
    {
      question: "Which command shows network connections?",
      options: ["netstat", "ping", "wget", "ssh"],
      correct: 0,
      explanation: "netstat displays network connections, routing tables, and network statistics."
    },
    {
      question: "What does the `umask` command control?",
      options: [
        "User mask for login",
        "Default file permissions",
        "Memory usage mask",
        "Network subnet mask"
      ],
      correct: 1,
      explanation: "umask sets the default permissions for newly created files and directories."
    },
    {
      question: "Which command compresses files using gzip?",
      options: ["compress", "zip", "gzip", "tar"],
      correct: 2,
      explanation: "gzip compresses files using the gzip compression algorithm."
    },
    {
      question: "What is the purpose of `/etc/hosts` file?",
      options: [
        "Store user passwords",
        "Map hostnames to IP addresses",
        "Configure network interfaces",
        "Store system logs"
      ],
      correct: 1,
      explanation: "/etc/hosts maps hostnames to IP addresses for local name resolution."
    },
    {
      question: "Which command mounts a filesystem?",
      options: ["mount", "fsck", "fdisk", "mkfs"],
      correct: 0,
      explanation: "mount attaches a filesystem to the directory tree."
    },
    {
      question: "What does `awk` do?",
      options: [
        "Archives files",
        "Processes text and data",
        "Manages packages",
        "Configures network"
      ],
      correct: 1,
      explanation: "awk is a programming language for processing text and data extraction."
    },
    {
      question: "Which command shows system memory usage?",
      options: ["mem", "free", "ram", "memory"],
      correct: 1,
      explanation: "free displays the amount of free and used memory in the system."
    },
    {
      question: "What does `sed` command do?",
      options: [
        "Secure delete files",
        "Stream editor for filtering and transforming text",
        "System editor",
        "Set environment variables"
      ],
      correct: 1,
      explanation: "sed is a stream editor for filtering and transforming text."
    },
    {
      question: "Which file contains user group information?",
      options: ["/etc/passwd", "/etc/group", "/etc/shadow", "/etc/users"],
      correct: 1,
      explanation: "/etc/group contains information about user groups."
    },
    {
      question: "What does the `which` command do?",
      options: [
        "Shows which user is logged in",
        "Locates a command in PATH",
        "Shows which files are open",
        "Displays system information"
      ],
      correct: 1,
      explanation: "which locates the executable file associated with a command in PATH."
    },
    {
      question: "Which command changes file ownership?",
      options: ["chmod", "chown", "chgrp", "attr"],
      correct: 1,
      explanation: "chown changes the ownership of files and directories."
    },
    {
      question: "What does `tail -f` do?",
      options: [
        "Shows the last 10 lines of a file",
        "Follows a file as it grows",
        "Finds files by name",
        "Fixes file permissions"
      ],
      correct: 1,
      explanation: "tail -f continuously displays new lines as they are added to a file."
    },
    {
      question: "Which command creates a new directory?",
      options: ["makedir", "mkdir", "newdir", "createdir"],
      correct: 1,
      explanation: "mkdir (make directory) creates new directories."
    },
    {
      question: "What does `uptime` command show?",
      options: [
        "System uptime and load average",
        "User login time",
        "Process runtime",
        "Network uptime"
      ],
      correct: 0,
      explanation: "uptime shows how long the system has been running and load averages."
    },
    {
      question: "Which command removes empty directories?",
      options: ["rm", "rmdir", "delete", "remove"],
      correct: 1,
      explanation: "rmdir removes empty directories (rm -r removes directories with contents)."
    },
    {
      question: "What does `wc` command do?",
      options: [
        "Word count - counts lines, words, and characters",
        "Web crawler",
        "Window control",
        "Write cache"
      ],
      correct: 0,
      explanation: "wc (word count) counts lines, words, and characters in files."
    },
    {
      question: "Which command displays the end of a file?",
      options: ["head", "tail", "end", "bottom"],
      correct: 1,
      explanation: "tail displays the last part of a file (head shows the beginning)."
    },
    {
      question: "What is the difference between hard link and soft link?",
      options: [
        "Hard links can cross filesystems, soft links cannot",
        "Soft links can cross filesystems, hard links cannot",
        "Both are identical",
        "Hard links are faster than soft links"
      ],
      correct: 1,
      explanation: "Soft links (symbolic links) can cross filesystems, hard links cannot."
    },
    {
      question: "Which command displays running processes in real-time?",
      options: ["ps", "top", "jobs", "bg"],
      correct: 1,
      explanation: "top displays running processes in real-time with system resource usage."
    },
    {
      question: "What does the `find` command do?",
      options: [
        "Finds text in files",
        "Searches for files and directories",
        "Finds running processes",
        "Finds network connections"
      ],
      correct: 1,
      explanation: "find searches for files and directories in the filesystem hierarchy."
    },
    {
      question: "Which directory contains device files in Linux?",
      options: ["/etc", "/var", "/dev", "/usr"],
      correct: 2,
      explanation: "/dev contains device files that represent hardware devices."
    },
    {
      question: "What does `df` command show?",
      options: [
        "Directory files",
        "Disk free space",
        "Data files",
        "Default files"
      ],
      correct: 1,
      explanation: "df (disk free) shows filesystem disk space usage."
    },
    {
      question: "Which signal is sent by Ctrl+C?",
      options: ["SIGTERM", "SIGKILL", "SIGINT", "SIGHUP"],
      correct: 2,
      explanation: "Ctrl+C sends SIGINT (interrupt signal) to terminate a process."
    },
    {
      question: "What is the purpose of `/etc/fstab` file?",
      options: [
        "File system table for mounting",
        "File system backup",
        "File system check",
        "File system logs"
      ],
      correct: 0,
      explanation: "/etc/fstab contains information about filesystems and their mount points."
    },
    {
      question: "Which command changes the group ownership of a file?",
      options: ["chmod", "chown", "chgrp", "usermod"],
      correct: 2,
      explanation: "chgrp changes the group ownership of files and directories."
    },
    {
      question: "What does the `lsof` command do?",
      options: [
        "Lists open files",
        "Lists system files",
        "Lists log files",
        "Lists object files"
      ],
      correct: 0,
      explanation: "lsof (list open files) shows which files are opened by which processes."
    },
    {
      question: "Which command shows the last few lines of system log?",
      options: ["head /var/log/syslog", "tail /var/log/syslog", "cat /var/log/syslog", "less /var/log/syslog"],
      correct: 1,
      explanation: "tail /var/log/syslog shows the last few lines of the system log file."
    },
    {
      question: "What does `alias` command do?",
      options: [
        "Creates shortcuts for commands",
        "Shows user aliases",
        "Creates file aliases",
        "Shows command history"
      ],
      correct: 0,
      explanation: "alias creates shortcuts or alternative names for commands."
    },
    {
      question: "Which command shows disk partitions?",
      options: ["fdisk -l", "df -h", "du -h", "mount"],
      correct: 0,
      explanation: "fdisk -l lists all disk partitions on the system."
    },
    {
      question: "What is the default permission for newly created files?",
      options: ["644", "755", "666", "777"],
      correct: 0,
      explanation: "Default permission for files is typically 644 (rw-r--r--)."
    },
    {
      question: "Which command displays environment variables?",
      options: ["env", "var", "export", "set"],
      correct: 0,
      explanation: "env displays all environment variables in the current session."
    },
    {
      question: "What does `history` command show?",
      options: [
        "File history",
        "System history",
        "Command history",
        "Login history"
      ],
      correct: 2,
      explanation: "history displays the command history of the current user session."
    },
    {
      question: "Which command shows currently logged-in users?",
      options: ["users", "who", "w", "All of the above"],
      correct: 3,
      explanation: "users, who, and w all show information about currently logged-in users."
    },
    {
      question: "What does `nohup` command do?",
      options: [
        "Runs commands immune to hangups",
        "No help command",
        "Network operation",
        "No output command"
      ],
      correct: 0,
      explanation: "nohup runs commands that continue running even after the terminal is closed."
    },
    {
      question: "Which file contains encrypted user passwords?",
      options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/gshadow"],
      correct: 1,
      explanation: "/etc/shadow contains encrypted user passwords and password aging information."
    },
    {
      question: "What does `jobs` command show?",
      options: [
        "Available jobs",
        "System jobs",
        "Background jobs in current shell",
        "Cron jobs"
      ],
      correct: 2,
      explanation: "jobs displays active background jobs in the current shell session."
    },
    {
      question: "Which command is used to archive and compress files simultaneously?",
      options: ["tar -czf", "gzip", "zip", "compress"],
      correct: 0,
      explanation: "tar -czf creates a compressed archive using gzip compression."
    }
  ];

  useEffect(() => {
    if (quizStarted) {
      // GSAP entrance animation for quiz container
      gsap.fromTo(quizContainerRef.current, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [quizStarted]);

  useEffect(() => {
    if (quizStarted && questionCardRef.current) {
      // GSAP animation for question transitions
      gsap.fromTo(questionCardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [currentQuestion, quizStarted]);

  useEffect(() => {
    if (progressBarRef.current) {
      // GSAP animation for progress bar
      const progress = ((currentQuestion + 1) / questions.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentQuestion]);

  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesRef.current.appendChild(particle);
      }
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const selectAnswer = (selectedIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedIndex;
    setUserAnswers(newUserAnswers);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(userAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setUserAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const getPerformanceMessage = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage >= 90) return "🏆 Outstanding! You're a Linux expert!";
    if (percentage >= 80) return "🌟 Excellent! You have strong Linux knowledge!";
    if (percentage >= 70) return "👍 Good job! You know your way around Linux!";
    if (percentage >= 60) return "👌 Not bad! Keep practicing to improve!";
    return "📚 Keep learning! Linux mastery takes time!";
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Cosmic Background */}
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10 animate-pulse-glow">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
              🐧 LINUX QUIZ
            </h1>
            <h2 className="text-3xl font-bold text-white mb-2">INTERVIEW CHALLENGE</h2>
            <p className="text-xl text-gray-300">
              Test your Linux knowledge with interview questions
            </p>
          </div>
          
          <div className="mb-8 text-lg text-gray-200">
            <p>💻 50 Questions about Linux commands and concepts</p>
            <p>⚡ From basic to intermediate Linux knowledge</p>
            <p>🏆 Perfect preparation for Linux interviews</p>
          </div>
          
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-marvel-red/50"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">🎉 Quiz Complete!</h2>
          
          <div className="text-8xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
            {score}/{questions.length}
          </div>
          
          <div className="text-6xl font-bold mb-6 text-marvel-gold">
            {percentage}%
          </div>
          
          <p className="text-2xl text-white mb-8">
            {getPerformanceMessage()}
          </p>
          
          <button
            onClick={restartQuiz}
            className="bg-gradient-to-r from-marvel-blue to-marvel-purple text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = userAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div ref={quizContainerRef} className="glass-effect rounded-3xl p-8 max-w-4xl mx-4 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold marvel-gradient bg-clip-text text-transparent mb-4">
            🐧 Linux Interview Quiz
          </h1>
          <div className="text-white text-lg">
            Score: <span className="text-marvel-gold font-bold">{score}</span> / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-effect rounded-2xl p-4 mb-8">
          <div className="bg-gray-700 rounded-xl h-6 overflow-hidden relative progress-shimmer">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-marvel-red via-marvel-gold to-marvel-blue rounded-xl"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="glass-effect rounded-2xl p-8 mb-8">
          <div className="text-marvel-red font-bold text-xl mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <h2 className="text-2xl text-white mb-8 font-medium">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 text-white font-medium ";
              
              if (isAnswered) {
                if (index === currentQ.correct) {
                  buttonClass += "bg-green-500/30 border-green-400 text-green-100";
                } else if (index === userAnswers[currentQuestion] && index !== currentQ.correct) {
                  buttonClass += "bg-red-500/30 border-red-400 text-red-100";
                } else {
                  buttonClass += "glass-effect border-gray-600 text-gray-300";
                }
              } else {
                buttonClass += "glass-effect border-gray-600 hover:border-marvel-gold hover:bg-white/10 hover:scale-105";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <span className="text-marvel-gold font-bold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          
          {/* Feedback */}
          {isAnswered && (
            <div className={`p-4 rounded-xl ${
              userAnswers[currentQuestion] === currentQ.correct 
                ? 'bg-green-500/20 border border-green-400 text-green-100' 
                : 'bg-red-500/20 border border-red-400 text-red-100'
            }`}>
              <div className="font-bold mb-2">
                {userAnswers[currentQuestion] === currentQ.correct ? '🎉 Correct!' : '❌ Incorrect'}
              </div>
              <div>{currentQ.explanation}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
          >
            Previous
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCUQuiz;
