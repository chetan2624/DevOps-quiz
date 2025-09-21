
import MCUQuiz from "@/components/MCUQuiz";
import { MigrationButton } from "@/components/MigrationButton";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="relative">
      {/* Show migration button only for logged-in users */}
      {isLoggedIn && (
        <div className="fixed top-4 right-4 z-50">
          <MigrationButton />
        </div>
      )}
      <MCUQuiz />
    </div>
  );
};

export default Index;
