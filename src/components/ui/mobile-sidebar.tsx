import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from './sheet';

interface MobileSidebarProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

export function MobileSidebar({ children, trigger }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden text-foreground hover:bg-secondary"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
