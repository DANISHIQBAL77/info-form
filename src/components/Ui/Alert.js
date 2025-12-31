import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Alert({ type = 'info', message, className }) {
  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 flex-shrink-0" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="w-5 h-5 flex-shrink-0" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <AlertCircle className="w-5 h-5 flex-shrink-0" />
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="w-5 h-5 flex-shrink-0" />
    }
  };

  const config = types[type];

  return (
    <div
      className={cn(
        'flex items-center gap-2 p-4 border rounded-lg',
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      {config.icon}
      <span className="font-medium">{message}</span>
    </div>
  );
}