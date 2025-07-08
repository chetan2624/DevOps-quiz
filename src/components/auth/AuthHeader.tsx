
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { User, LogOut } from 'lucide-react';

export const AuthHeader: React.FC = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-white text-sm">Hi, {user.name}! 👋</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowLoginModal(true)}
        className="text-white hover:bg-white/10"
      >
        Login
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSignupModal(true)}
        className="text-white border-white hover:bg-white hover:text-gray-900"
      >
        Sign Up
      </Button>
      
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      <SignupModal open={showSignupModal} onOpenChange={setShowSignupModal} />
    </div>
  );
};
