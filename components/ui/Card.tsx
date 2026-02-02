import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }: CardProps) => (
  <div className={cn('px-6 py-4 border-b border-slate-100', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }: CardProps) => (
  <h3 className={cn('text-lg font-semibold text-slate-800', className)} {...props}>
    {children}
  </h3>
);

export const CardContent = ({ children, className, ...props }: CardProps) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }: CardProps) => (
  <div className={cn('px-6 py-4 bg-slate-50 border-t border-slate-100', className)} {...props}>
    {children}
  </div>
);
