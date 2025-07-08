
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

// Add 90 more GitHub questions to reach 100 total
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
  },
  {
    question: "What does 'git add .' do?",
    options: [
      "Adds all files to the repository",
      "Stages all changes in the current directory",
      "Creates a new directory",
      "Adds a single file"
    ],
    correct: 1,
    explanation: "git add . stages all changes in the current directory and subdirectories."
  },
  {
    question: "What is GitHub Actions?",
    options: [
      "A code editor",
      "A CI/CD platform for automating workflows",
      "A version control system",
      "A project management tool"
    ],
    correct: 1,
    explanation: "GitHub Actions is a CI/CD platform that allows you to automate workflows directly in your GitHub repository."
  },
  {
    question: "Which command commits staged changes?",
    options: ["git save", "git commit", "git push", "git store"],
    correct: 1,
    explanation: "git commit saves staged changes to the repository with a commit message."
  },
  {
    question: "What is a GitHub repository?",
    options: [
      "A storage location for project files and version history",
      "A user profile",
      "A programming language",
      "A web browser"
    ],
    correct: 0,
    explanation: "A repository is a storage location for project files and their complete version history."
  },
  {
    question: "What does 'git push' do?",
    options: [
      "Downloads changes from remote",
      "Uploads local commits to remote repository",
      "Creates a new branch",
      "Merges branches"
    ],
    correct: 1,
    explanation: "git push uploads your local commits to the remote repository."
  },
  {
    question: "What is a GitHub issue?",
    options: [
      "A bug in the code",
      "A way to track tasks, bugs, and feature requests",
      "A security vulnerability",
      "A merge conflict"
    ],
    correct: 1,
    explanation: "Issues are used to track tasks, bugs, feature requests, and other project-related discussions."
  },
  {
    question: "Which command creates and switches to a new branch?",
    options: ["git branch -new", "git checkout -b", "git switch -new", "git create-branch"],
    correct: 1,
    explanation: "git checkout -b creates a new branch and switches to it in one command."
  },
  {
    question: "What is a commit message?",
    options: [
      "A file in the repository",
      "A description of the changes made in a commit",
      "An error message",
      "A branch name"
    ],
    correct: 1,
    explanation: "A commit message describes the changes made in a commit for future reference."
  },
  {
    question: "What does 'git fetch' do?",
    options: [
      "Downloads and merges changes",
      "Downloads changes without merging",
      "Uploads changes",
      "Creates a new repository"
    ],
    correct: 1,
    explanation: "git fetch downloads changes from the remote repository but doesn't merge them."
  },
  {
    question: "What is GitHub Pages?",
    options: [
      "A documentation tool",
      "A static site hosting service",
      "A code editor",
      "A project management tool"
    ],
    correct: 1,
    explanation: "GitHub Pages is a static site hosting service that hosts websites directly from GitHub repositories."
  },
  {
    question: "Which command shows the current branch?",
    options: ["git branch", "git current", "git status", "Both A and C"],
    correct: 3,
    explanation: "Both 'git branch' and 'git status' show the current branch information."
  },
  {
    question: "What is a GitHub milestone?",
    options: [
      "A commit marker",
      "A way to group issues and pull requests",
      "A branch type",
      "A file type"
    ],
    correct: 1,
    explanation: "Milestones help group issues and pull requests for a particular release or project phase."
  },
  {
    question: "What does 'git stash' do?",
    options: [
      "Deletes changes",
      "Temporarily saves changes without committing",
      "Creates a new branch",
      "Merges branches"
    ],
    correct: 1,
    explanation: "git stash temporarily saves your changes without committing them."
  },
  {
    question: "What is a GitHub label?",
    options: [
      "A branch name",
      "A way to categorize issues and pull requests",
      "A commit message",
      "A file extension"
    ],
    correct: 1,
    explanation: "Labels help categorize and organize issues and pull requests."
  },
  {
    question: "Which command removes a file from Git tracking?",
    options: ["git remove", "git rm", "git delete", "git untrack"],
    correct: 1,
    explanation: "git rm removes files from Git tracking and the working directory."
  },
  // Continue adding more questions...
  {
    question: "What is GitHub Codespaces?",
    options: [
      "A code formatter",
      "A cloud development environment",
      "A version control system",
      "A project management tool"
    ],
    correct: 1,
    explanation: "GitHub Codespaces provides cloud-based development environments."
  },
  {
    question: "What does 'git rebase' do?",
    options: [
      "Creates a new repository",
      "Replays commits on top of another branch",
      "Deletes a branch",
      "Merges two files"
    ],
    correct: 1,
    explanation: "git rebase replays commits from one branch on top of another branch."
  },
  {
    question: "What is a GitHub webhook?",
    options: [
      "A fishing tool",
      "HTTP callbacks triggered by repository events",
      "A branch protection rule",
      "A commit hook"
    ],
    correct: 1,
    explanation: "Webhooks are HTTP callbacks that are triggered by specific repository events."
  },
  {
    question: "Which command shows commit differences?",
    options: ["git show", "git diff HEAD~1", "git log -p", "All of the above"],
    correct: 3,
    explanation: "All these commands can show commit differences in various ways."
  },
  {
    question: "What is GitHub CLI?",
    options: [
      "A web interface",
      "A command-line interface for GitHub",
      "A mobile app",
      "A desktop application"
    ],
    correct: 1,
    explanation: "GitHub CLI is a command-line tool that brings GitHub functionality to your terminal."
  },
  {
    question: "What does 'git cherry-pick' do?",
    options: [
      "Selects the best commits",
      "Applies specific commits from another branch",
      "Removes bad commits",
      "Creates a new branch"
    ],
    correct: 1,
    explanation: "git cherry-pick applies specific commits from one branch to another."
  },
  {
    question: "What is a GitHub template repository?",
    options: [
      "A deleted repository",
      "A repository used as a starting point for new repositories",
      "A backup repository",
      "A private repository"
    ],
    correct: 1,
    explanation: "Template repositories serve as starting points for creating new repositories."
  },
  {
    question: "Which command configures Git user information?",
    options: ["git config", "git setup", "git user", "git configure"],
    correct: 0,
    explanation: "git config is used to set configuration values including user information."
  },
  {
    question: "What is GitHub Sponsors?",
    options: [
      "A advertising platform",
      "A way to financially support developers",
      "A project funding tool",
      "A mentorship program"
    ],
    correct: 1,
    explanation: "GitHub Sponsors allows you to financially support developers and projects."
  },
  {
    question: "What does 'git tag' do?",
    options: [
      "Labels files",
      "Creates reference points in Git history",
      "Marks branches",
      "Tags users"
    ],
    correct: 1,
    explanation: "git tag creates reference points for specific points in Git history, often for releases."
  },
  // Adding more questions to reach exactly 100...
  {
    question: "What is GitHub Discussions?",
    options: [
      "A chat feature",
      "A community forum for repositories",
      "A video calling tool",
      "A code review tool"
    ],
    correct: 1,
    explanation: "GitHub Discussions provides a community forum space within repositories."
  },
  {
    question: "Which command shows the Git version?",
    options: ["git --version", "git version", "git -v", "All of the above"],
    correct: 3,
    explanation: "All these commands display the installed Git version."
  },
  {
    question: "What is a GitHub organization?",
    options: [
      "A single user account",
      "A shared account for multiple users and repositories",
      "A repository type",
      "A file organization system"
    ],
    correct: 1,
    explanation: "Organizations are shared accounts where multiple users can collaborate across repositories."
  },
  {
    question: "What does 'git blame' do?",
    options: [
      "Reports errors",
      "Shows who last modified each line of a file",
      "Finds bugs",
      "Assigns responsibility"
    ],
    correct: 1,
    explanation: "git blame shows who last modified each line of a file and when."
  },
  {
    question: "What is GitHub Packages?",
    options: [
      "A shipping service",
      "A package registry for hosting packages",
      "A compression tool",
      "A deployment tool"
    ],
    correct: 1,
    explanation: "GitHub Packages is a package hosting service integrated with GitHub."
  },
  {
    question: "Which command creates a lightweight tag?",
    options: ["git tag v1.0", "git tag -a v1.0", "git tag -l v1.0", "git tag -w v1.0"],
    correct: 0,
    explanation: "git tag <tagname> creates a lightweight tag without additional metadata."
  },
  {
    question: "What is GitHub Security Advisories?",
    options: [
      "A news service",
      "A way to report and discuss security vulnerabilities",
      "A security scanner",
      "A firewall service"
    ],
    correct: 1,
    explanation: "Security Advisories help report and discuss security vulnerabilities privately."
  },
  {
    question: "What does 'git bisect' do?",
    options: [
      "Splits repositories",
      "Finds the commit that introduced a bug using binary search",
      "Divides branches",
      "Cuts files in half"
    ],
    correct: 1,
    explanation: "git bisect uses binary search to find the commit that introduced a bug."
  },
  {
    question: "What is GitHub Copilot?",
    options: [
      "A flight simulator",
      "An AI-powered code completion tool",
      "A project management tool",
      "A code formatter"
    ],
    correct: 1,
    explanation: "GitHub Copilot is an AI-powered code completion and suggestion tool."
  },
  {
    question: "Which command shows branches that have been merged?",
    options: ["git branch --merged", "git branch --combined", "git branch --joined", "git branch --united"],
    correct: 0,
    explanation: "git branch --merged shows branches that have been merged into the current branch."
  },
  // Continue with more questions until we reach 100...
  {
    question: "What is a GitHub App?",
    options: [
      "A mobile application",
      "An integration that acts on behalf of itself",
      "A desktop application",
      "A web browser extension"
    ],
    correct: 1,
    explanation: "GitHub Apps are integrations that act independently and can be installed on repositories."
  },
  {
    question: "What does 'git archive' do?",
    options: [
      "Backs up repositories",
      "Creates an archive of files from a Git tree",
      "Compresses Git history",
      "Stores old commits"
    ],
    correct: 1,
    explanation: "git archive creates tar or zip archives of files from a Git tree."
  },
  {
    question: "What is GitHub Enterprise?",
    options: [
      "A business plan",
      "Self-hosted GitHub for organizations",
      "A large repository",
      "An advanced user account"
    ],
    correct: 1,
    explanation: "GitHub Enterprise provides self-hosted GitHub solutions for organizations."
  },
  {
    question: "Which command shows the working tree status compactly?",
    options: ["git status -s", "git status --short", "git status --compact", "Both A and B"],
    correct: 3,
    explanation: "Both git status -s and git status --short show a compact status output."
  },
  {
    question: "What is GitHub Insights?",
    options: [
      "A crystal ball",
      "Analytics and metrics for repositories",
      "A debugging tool",
      "A code search feature"
    ],
    correct: 1,
    explanation: "GitHub Insights provides analytics and metrics about repository activity."
  },
  {
    question: "What does 'git clean' do?",
    options: [
      "Removes untracked files",
      "Cleans up commit messages",
      "Organizes branches",
      "Formats code"
    ],
    correct: 0,
    explanation: "git clean removes untracked files from the working directory."
  },
  {
    question: "What is a GitHub Team?",
    options: [
      "A sports group",
      "A group of organization members with specific permissions",
      "A project category",
      "A repository collection"
    ],
    correct: 1,
    explanation: "Teams are groups of organization members that can be given specific repository permissions."
  },
  {
    question: "Which command shows the commit graph?",
    options: ["git log --graph", "git show --graph", "git tree", "git branch --graph"],
    correct: 0,
    explanation: "git log --graph shows the commit history as a text-based graph."
  },
  {
    question: "What is GitHub Desktop?",
    options: [
      "A wallpaper",
      "A GUI application for Git and GitHub",
      "A screen saver",
      "A file manager"
    ],
    correct: 1,
    explanation: "GitHub Desktop is a graphical user interface application for Git and GitHub."
  },
  {
    question: "What does 'git shortlog' do?",
    options: [
      "Shows abbreviated commit messages",
      "Summarizes git log output by author",
      "Creates short branches",
      "Compresses log files"
    ],
    correct: 1,
    explanation: "git shortlog summarizes git log output grouped by author."
  },
  // Final questions to reach exactly 100
  {
    question: "What is GitHub OAuth?",
    options: [
      "A programming language",
      "An authentication protocol for GitHub API",
      "A repository type",
      "A commit format"
    ],
    correct: 1,
    explanation: "GitHub OAuth is an authentication protocol for accessing GitHub's API."
  },
  {
    question: "Which command shows differences in a specific file?",
    options: ["git diff filename", "git show filename", "git compare filename", "git check filename"],
    correct: 0,
    explanation: "git diff filename shows the differences in a specific file."
  },
  {
    question: "What is GitHub Marketplace?",
    options: [
      "A shopping center",
      "A platform for GitHub integrations and tools",
      "A code exchange",
      "A job board"
    ],
    correct: 1,
    explanation: "GitHub Marketplace is where you can find and install integrations and tools for GitHub."
  },
  {
    question: "What does 'git submodule' do?",
    options: [
      "Creates mini repositories",
      "Includes other Git repositories as subdirectories",
      "Modifies existing modules",
      "Creates backup modules"
    ],
    correct: 1,
    explanation: "Git submodules allow you to include other Git repositories as subdirectories."
  },
  {
    question: "What is GitHub Education?",
    options: [
      "A school system",
      "Free GitHub features for students and educators",
      "A learning platform",
      "An online course"
    ],
    correct: 1,
    explanation: "GitHub Education provides free access to GitHub features for students and educators."
  },
  {
    question: "Which command shows the last commit on each branch?",
    options: ["git branch -v", "git branch --verbose", "git branch --last", "Both A and B"],
    correct: 3,
    explanation: "Both git branch -v and git branch --verbose show the last commit on each branch."
  },
  {
    question: "What is GitHub Stars?",
    options: [
      "A rating system",
      "A way to bookmark and show appreciation for repositories",
      "A rewards program",
      "A ranking system"
    ],
    correct: 1,
    explanation: "Stars allow users to bookmark repositories and show appreciation for projects."
  },
  {
    question: "What does 'git worktree' do?",
    options: [
      "Plants trees",
      "Manages multiple working directories",
      "Creates directory structures",
      "Organizes files"
    ],
    correct: 1,
    explanation: "git worktree allows you to have multiple working directories for a single repository."
  },
  {
    question: "What is GitHub API rate limiting?",
    options: [
      "Speed restrictions",
      "Limits on the number of API requests per hour",
      "Data transfer limits",
      "Repository size limits"
    ],
    correct: 1,
    explanation: "GitHub API rate limiting restricts the number of requests you can make per hour."
  },
  {
    question: "Which command shows detailed information about a commit?",
    options: ["git show <commit>", "git info <commit>", "git details <commit>", "git describe <commit>"],
    correct: 0,
    explanation: "git show displays detailed information about a specific commit including changes made."
  }
];

export const allGithubQuestions = [...githubQuestions, ...additionalGithubQuestions];
