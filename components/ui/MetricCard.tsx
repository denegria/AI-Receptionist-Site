import React from 'react';
import { Card, CardContent } from './Card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export const MetricCard = ({
  label,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}: MetricCardProps) => {
  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    'text-xs font-medium px-1.5 py-0.5 rounded-full',
                    trend.isPositive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  )}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-slate-400 ml-1.5">vs last month</span>
              </div>
            )}
            
            {description && !trend && (
              <p className="text-xs text-slate-400 mt-1">{description}</p>
            )}
          </div>
          
          <div className={cn('p-3 rounded-lg bg-slate-50', iconClassName)}>
            <Icon className="w-6 h-6 text-slate-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
