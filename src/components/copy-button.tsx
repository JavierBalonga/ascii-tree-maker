import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success('Event has been created'))
      .catch(() => toast.error('Failed to copy text'));
  };

  return (
    <Button onClick={handleCopy} size="icon" className={className} {...props}>
      <CopyIcon />
    </Button>
  );
}
