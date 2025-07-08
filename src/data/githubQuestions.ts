
import { Question } from '@/types/quiz';

export const githubQuestions: Question[] = [
  {
    question: "Which command creates a new Git repository?",
    options: ["git create", "git init", "git new", "git start"],
    correct: 1,
    explanation: "git init initializes a new Git repository in the current directory."
  },
  {
    question: "What does 'git pull' do?",
    options: [
      "Downloads changes from remote repository",
      "Fetches and merges changes from remote repository",
      "Pushes changes to remote repository",
      "Creates a new branch"
    ],
    correct: 1,
    explanation: "git pull fetches changes from the remote repository and merges them into the current branch."
  },
  {
    question: "Which command shows the commit history?",
    options: ["git history", "git log", "git commits", "git show"],
    correct: 1,
    explanation: "git log displays the commit history for the current branch."
  },
  {
    question: "What is a Pull Request in GitHub?",
    options: [
      "A request to download code",
      "A request to merge changes from one branch to another",
      "A request to delete a repository",
      "A request to create a new repository"
    ],
    correct: 1,
    explanation: "A Pull Request is a request to merge changes from one branch into another, allowing code review and discussion."
  },
  {
    question: "Which command creates a new branch?",
    options: ["git branch new-feature", "git create new-feature", "git new-branch new-feature", "git make new-feature"],
    correct: 0,
    explanation: "git branch <branch-name> creates a new branch with the specified name."
  },
  {
    question: "What does 'git status' show?",
    options: [
      "Repository statistics",
      "Current working directory status",
      "Git version",
      "Remote repository status"
    ],
    correct: 1,
    explanation: "git status shows the state of the working directory and staging area."
  },
  {
    question: "Which command switches to a different branch?",
    options: ["git switch", "git checkout", "git change", "Both A and B"],
    correct: 3,
    explanation: "Both git switch and git checkout can be used to switch between branches."
  },
  {
    question: "What is the staging area in Git?",
    options: [
      "Where commits are stored",
      "A temporary area where changes are prepared for commit",
      "The remote repository",
      "The working directory"
    ],
    correct: 1,
    explanation: "The staging area is where changes are prepared before being committed to the repository."
  },
  {
    question: "Which command undoes the last commit but keeps changes in working directory?",
    options: ["git revert HEAD", "git reset HEAD~1", "git undo", "git remove HEAD"],
    correct: 1,
    explanation: "git reset HEAD~1 undoes the last commit while keeping changes in the working directory."
  },
  {
    question: "What is a fork in GitHub?",
    options: [
      "A branch in a repository",
      "A copy of a repository under your account",
      "A merge conflict",
      "A commit message"
    ],
    correct: 1,
    explanation: "A fork is a copy of a repository that you can modify independently under your own account."
  }
];

// Add more GitHub questions to reach 100
const additionalGithubQuestions: Question[] = [
  {
    question: "What is the default branch name in new Git repositories?",
    options: ["master", "main", "default", "trunk"],
    correct: 1,
    explanation: "The default branch name in new Git repositories is 'main'."
  },
  {
    question: "Which file is used to ignore files in Git?",
    options: [".ignore", ".gitignore", ".exclude", ".gitexclude"],
    correct: 1,
    explanation: ".gitignore file is used to specify which files Git should ignore."
  },
  {
    question: "What does 'git clone' do?",
    options: [
      "Creates a copy of a local repository",
      "Downloads a remote repository to local machine",
      "Duplicates a branch",
      "Copies files between directories"
    ],
    correct: 1,
    explanation: "git clone downloads a complete copy of a remote repository to your local machine."
  },
  {
    question: "Which command shows differences between commits?",
    options: ["git diff", "git compare", "git changes", "git delta"],
    correct: 0,
    explanation: "git diff shows differences between commits, branches, or working directory changes."
  },
  {
    question: "What is a merge conflict?",
    options: [
      "When Git cannot automatically merge changes",
      "When a repository is corrupted",
      "When a branch is deleted",
      "When a commit fails"
    ],
    correct: 0,
    explanation: "A merge conflict occurs when Git cannot automatically resolve differences between branches being merged."
  }
];

export const allGithubQuestions = [...githubQuestions, ...additionalGithubQuestions];
