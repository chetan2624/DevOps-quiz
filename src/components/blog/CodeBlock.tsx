import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CodeBlockProps {
  children: React.ReactNode;
  description: string;
  id?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, description, id }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = typeof children === 'string' ? children : String(children);
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-muted-foreground text-sm md:text-base">{description}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="shrink-0"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-primary text-sm">{children}</code>
      </pre>
    </div>
  );
};
