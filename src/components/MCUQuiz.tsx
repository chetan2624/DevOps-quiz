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
  const [testLength, setTestLength] = useState<number>(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [showTestSelection, setShowTestSelection] = useState(false);
  
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const allQuestions: Question[] = [
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
    },
    {
      question: "What does the `ps aux` command display?",
      options: [
        "All processes for all users",
        "Only user processes",
        "Only system processes",
        "Only running processes"
      ],
      correct: 0,
      explanation: "ps aux displays all processes for all users with detailed information."
    },
    {
      question: "Which command is used to change user password?",
      options: ["password", "passwd", "chpass", "pwd"],
      correct: 1,
      explanation: "passwd command is used to change user passwords."
    },
    {
      question: "What does the `ln -s` command do?",
      options: [
        "Creates a hard link",
        "Creates a symbolic link",
        "Links networks",
        "Lists links"
      ],
      correct: 1,
      explanation: "ln -s creates a symbolic (soft) link to a file or directory."
    },
    {
      question: "Which command displays the first 10 lines of a file?",
      options: ["head", "top", "first", "begin"],
      correct: 0,
      explanation: "head command displays the first 10 lines of a file by default."
    },
    {
      question: "What does `cat /proc/cpuinfo` show?",
      options: [
        "CPU usage",
        "CPU temperature",
        "CPU information",
        "CPU processes"
      ],
      correct: 2,
      explanation: "/proc/cpuinfo contains detailed information about the CPU."
    },
    {
      question: "Which command is used to download files from the internet?",
      options: ["download", "get", "wget", "fetch"],
      correct: 2,
      explanation: "wget is used to download files from web servers."
    },
    {
      question: "What does `sort` command do?",
      options: [
        "Sorts files by size",
        "Sorts lines of text files",
        "Sorts directories",
        "Sorts processes"
      ],
      correct: 1,
      explanation: "sort command sorts lines of text files alphabetically or numerically."
    },
    {
      question: "Which file stores the system hostname?",
      options: ["/etc/hostname", "/etc/host", "/etc/name", "/etc/system"],
      correct: 0,
      explanation: "/etc/hostname file contains the system's hostname."
    },
    {
      question: "What does `diff` command do?",
      options: [
        "Shows differences between files",
        "Shows disk differences",
        "Shows directory differences",
        "Shows user differences"
      ],
      correct: 0,
      explanation: "diff command shows differences between two files line by line."
    },
    {
      question: "Which command shows the calendar?",
      options: ["date", "cal", "calendar", "time"],
      correct: 1,
      explanation: "cal command displays a calendar for the current month."
    },
    {
      question: "What does `uniq` command do?",
      options: [
        "Makes files unique",
        "Removes duplicate lines from sorted files",
        "Creates unique directories",
        "Shows unique processes"
      ],
      correct: 1,
      explanation: "uniq removes duplicate adjacent lines from sorted files."
    },
    {
      question: "Which command shows system architecture?",
      options: ["arch", "uname -m", "Both A and B", "system"],
      correct: 2,
      explanation: "Both arch and uname -m display the system architecture."
    },
    {
      question: "What does `cut` command do?",
      options: [
        "Cuts files into pieces",
        "Extracts sections from lines of files",
        "Cuts directories",
        "Cuts processes"
      ],
      correct: 1,
      explanation: "cut extracts specific columns or fields from lines of files."
    },
    {
      question: "Which directory contains temporary files?",
      options: ["/temp", "/tmp", "/temporary", "/var/temp"],
      correct: 1,
      explanation: "/tmp directory is used for temporary files."
    },
    {
      question: "What does `id` command show?",
      options: [
        "Process IDs",
        "User and group IDs",
        "File IDs",
        "System ID"
      ],
      correct: 1,
      explanation: "id command displays user ID (UID) and group ID (GID) information."
    },
    {
      question: "Which command copies files recursively?",
      options: ["cp", "cp -r", "copy", "rcopy"],
      correct: 1,
      explanation: "cp -r copies files and directories recursively."
    },
    {
      question: "What does `tr` command do?",
      options: [
        "Transfers files",
        "Translates or deletes characters",
        "Tracks processes",
        "Traces commands"
      ],
      correct: 1,
      explanation: "tr command translates or deletes characters from input."
    },
    {
      question: "Which command shows file type?",
      options: ["type", "file", "kind", "format"],
      correct: 1,
      explanation: "file command determines and displays the type of a file."
    },
    {
      question: "What does `tee` command do?",
      options: [
        "Splits output to multiple files",
        "Reads from input and writes to output and files",
        "Creates T-shaped pipes",
        "Tests files"
      ],
      correct: 1,
      explanation: "tee reads from input and writes to both standard output and files."
    },
    {
      question: "Which command shows the path of executable?",
      options: ["where", "which", "locate", "find"],
      correct: 1,
      explanation: "which command shows the full path of shell commands."
    },
    {
      question: "What does `basename` command do?",
      options: [
        "Shows base of numbers",
        "Strips directory path from filename",
        "Shows database names",
        "Shows base system info"
      ],
      correct: 1,
      explanation: "basename strips directory and suffix from filenames."
    },
    {
      question: "Which command shows directory name from path?",
      options: ["dirname", "directory", "dir", "path"],
      correct: 0,
      explanation: "dirname strips last component from file name, showing directory path."
    },
    {
      question: "What does `xargs` command do?",
      options: [
        "Shows extra arguments",
        "Builds command lines from standard input",
        "Archives files",
        "Extracts arguments"
      ],
      correct: 1,
      explanation: "xargs builds and executes command lines from standard input."
    },
    {
      question: "Which command shows system information?",
      options: ["sysinfo", "uname -a", "system", "info"],
      correct: 1,
      explanation: "uname -a displays comprehensive system information."
    },
    {
      question: "What does `stat` command show?",
      options: [
        "File statistics and metadata",
        "System statistics",
        "Process statistics",
        "Network statistics"
      ],
      correct: 0,
      explanation: "stat displays detailed file statistics and metadata."
    },
    {
      question: "Which command compares two directories?",
      options: ["diff -r", "compare", "dirdiff", "dircomp"],
      correct: 0,
      explanation: "diff -r recursively compares directories and their contents."
    },
    {
      question: "What does `watch` command do?",
      options: [
        "Watches files",
        "Executes a program periodically",
        "Monitors processes",
        "Watches users"
      ],
      correct: 1,
      explanation: "watch executes a command repeatedly and displays the output."
    },
    {
      question: "Which command shows loaded kernel modules?",
      options: ["modules", "lsmod", "modlist", "kernmod"],
      correct: 1,
      explanation: "lsmod shows currently loaded kernel modules."
    },
    {
      question: "What does `comm` command do?",
      options: [
        "Shows comments in files",
        "Compares two sorted files line by line",
        "Communicates between processes",
        "Shows common files"
      ],
      correct: 1,
      explanation: "comm compares two sorted files line by line."
    },
    {
      question: "Which command shows system call trace?",
      options: ["trace", "strace", "syscall", "calltrace"],
      correct: 1,
      explanation: "strace traces system calls and signals of a process."
    },
    {
      question: "What does `last` command show?",
      options: [
        "Last modified files",
        "Last login information",
        "Last commands",
        "Last processes"
      ],
      correct: 1,
      explanation: "last shows listing of last logged in users."
    },
    {
      question: "Which command shows open network ports?",
      options: ["netstat -l", "ports", "openports", "netports"],
      correct: 0,
      explanation: "netstat -l shows listening network ports."
    },
    {
      question: "What does `split` command do?",
      options: [
        "Splits terminal windows",
        "Splits files into pieces",
        "Splits processes",
        "Splits directories"
      ],
      correct: 1,
      explanation: "split command splits files into smaller pieces."
    },
    {
      question: "Which command shows file permissions in octal?",
      options: ["chmod", "stat -c '%a'", "perm", "octal"],
      correct: 1,
      explanation: "stat -c '%a' shows file permissions in octal format."
    },
    {
      question: "What does `factor` command do?",
      options: [
        "Shows system factors",
        "Factorizes numbers into primes",
        "Shows file factors",
        "Calculates factors"
      ],
      correct: 1,
      explanation: "factor command factorizes numbers into prime factors."
    },
    {
      question: "Which command shows system boot time?",
      options: ["boottime", "uptime", "who -b", "last reboot"],
      correct: 2,
      explanation: "who -b shows the system boot time."
    },
    {
      question: "What does `yes` command do?",
      options: [
        "Always answers yes",
        "Outputs 'y' or given string repeatedly",
        "Confirms commands",
        "Validates input"
      ],
      correct: 1,
      explanation: "yes outputs 'y' or a given string repeatedly until killed."
    },
    {
      question: "Which command shows reverse DNS lookup?",
      options: ["nslookup", "dig -x", "host", "All of the above"],
      correct: 3,
      explanation: "nslookup, dig -x, and host can all perform reverse DNS lookups."
    },
    {
      question: "What does `seq` command do?",
      options: [
        "Shows sequences",
        "Generates sequence of numbers",
        "Sequences files",
        "Shows file sequences"
      ],
      correct: 1,
      explanation: "seq generates sequences of numbers."
    },
    {
      question: "Which command shows current runlevel?",
      options: ["runlevel", "level", "init", "systemctl"],
      correct: 0,
      explanation: "runlevel command shows the current and previous system runlevel."
    },
    {
      question: "What does `timeout` command do?",
      options: [
        "Sets system timeout",
        "Runs command with time limit",
        "Shows timeout values",
        "Times out processes"
      ],
      correct: 1,
      explanation: "timeout runs a command with a time limit."
    },
    {
      question: "Which command shows shared library dependencies?",
      options: ["libs", "ldd", "depends", "shared"],
      correct: 1,
      explanation: "ldd shows shared library dependencies of an executable."
    },
    {
      question: "What does `shred` command do?",
      options: [
        "Shreds files into pieces",
        "Securely deletes files by overwriting",
        "Compresses files",
        "Encrypts files"
      ],
      correct: 1,
      explanation: "shred securely deletes files by overwriting them multiple times."
    },
    {
      question: "What does `cut` command do?",
      options: [
        "Cuts files into pieces",
        "Extracts sections from lines of files",
        "Cuts directories",
        "Cuts processes"
      ],
      correct: 1,
      explanation: "cut extracts specific columns or fields from lines of files."
    },
    {
      question: "Which command shows file access times?",
      options: ["access", "stat", "time", "atime"],
      correct: 1,
      explanation: "stat command shows file access, modify, and change times."
    },
    {
      question: "What does `expr` command do?",
      options: [
        "Expresses opinions",
        "Evaluates expressions",
        "Extracts text",
        "Exports variables"
      ],
      correct: 1,
      explanation: "expr evaluates mathematical and string expressions."
    },
    {
      question: "Which command shows system load average?",
      options: ["load", "uptime", "top", "Both B and C"],
      correct: 3,
      explanation: "Both uptime and top commands show system load average."
    },
    {
      question: "What does `nl` command do?",
      options: [
        "Creates new lines",
        "Numbers lines of files",
        "Shows null values",
        "Lists networks"
      ],
      correct: 1,
      explanation: "nl command numbers lines of files."
    }
  ];

  // Shuffle function to randomize questions
  const shuffleArray = (array: Question[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Select random questions based on test length
  const selectQuestions = (length: number) => {
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, length);
  };

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
      const progress = ((currentQuestion + 1) / selectedQuestions.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentQuestion, selectedQuestions.length]);

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

  const startTestSelection = () => {
    setShowTestSelection(true);
  };

  const selectTest = (length: number) => {
    setTestLength(length);
    setSelectedQuestions(selectQuestions(length));
    setShowTestSelection(false);
    setQuizStarted(true);
  };

  const selectAnswer = (selectedIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedIndex;
    setUserAnswers(newUserAnswers);
    
    if (selectedIndex === selectedQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
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
    setShowTestSelection(false);
    setTestLength(0);
    setSelectedQuestions([]);
  };

  const getPerformanceMessage = () => {
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    if (percentage >= 90) return "🏆 Outstanding! You're a Linux expert!";
    if (percentage >= 80) return "🌟 Excellent! You have strong Linux knowledge!";
    if (percentage >= 70) return "👍 Good job! You know your way around Linux!";
    if (percentage >= 60) return "👌 Not bad! Keep practicing to improve!";
    return "📚 Keep learning! Linux mastery takes time!";
  };

  // Start screen
  if (!showTestSelection && !quizStarted) {
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
            <p>💻 100+ Linux interview questions</p>
            <p>⚡ Choose your test length: 20, 30, or 50 questions</p>
            <p>🔀 Questions are randomly shuffled each time</p>
            <p>🏆 Perfect preparation for Linux interviews</p>
          </div>
          
          <button
            onClick={startTestSelection}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-marvel-red/50"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Test selection screen
  if (showTestSelection && !quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">Choose Your Test</h2>
          <p className="text-xl text-gray-300 mb-12">
            Select the number of questions for your Linux interview practice
          </p>
          
          <div className="grid gap-6 mb-8">
            <button
              onClick={() => selectTest(20)}
              className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold text-marvel-gold mb-2">20 Questions</div>
              <div className="text-lg">Quick Practice • 15-20 minutes</div>
              <div className="text-sm text-gray-300 mt-2">Perfect for a quick review</div>
            </button>
            
            <button
              onClick={() => selectTest(30)}
              className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold text-marvel-gold mb-2">30 Questions</div>
              <div className="text-lg">Standard Test • 25-30 minutes</div>
              <div className="text-sm text-gray-300 mt-2">Balanced practice session</div>
            </button>
            
            <button
              onClick={() => selectTest(50)}
              className="glass-effect border-2 border-gray-600 hover:border-marvel-gold p-6 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold text-marvel-gold mb-2">50 Questions</div>
              <div className="text-lg">Full Challenge • 40-50 minutes</div>
              <div className="text-sm text-gray-300 mt-2">Complete interview preparation</div>
            </button>
          </div>
          
          <button
            onClick={() => setShowTestSelection(false)}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transform transition-all duration-300"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const percentage = Math.round((score / selectedQuestions.length) * 100);
    
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">🎉 Quiz Complete!</h2>
          
          <div className="text-8xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
            {score}/{selectedQuestions.length}
          </div>
          
          <div className="text-6xl font-bold mb-6 text-marvel-gold">
            {percentage}%
          </div>
          
          <p className="text-2xl text-white mb-8">
            {getPerformanceMessage()}
          </p>
          
          <div className="text-lg text-gray-300 mb-8">
            Test Length: {testLength} questions
          </div>
          
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

  // Quiz interface
  const currentQ = selectedQuestions[currentQuestion];
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
            Score: <span className="text-marvel-gold font-bold">{score}</span> / {selectedQuestions.length} 
            <span className="text-gray-300 ml-4">({testLength} Question Test)</span>
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
            Question {currentQuestion + 1} of {selectedQuestions.length}
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
            {currentQuestion === selectedQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCUQuiz;
