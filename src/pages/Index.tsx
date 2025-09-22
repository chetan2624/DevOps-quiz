
import DatabaseMCUQuiz from "@/components/DatabaseMCUQuiz";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { AuthHeader } from "@/components/auth/AuthHeader";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">DevOps Quiz Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            <AuthHeader />
            <ThemeToggle />
          </div>
        </div>
        
        <DatabaseMCUQuiz />
      </div>
    </div>
  );
}
