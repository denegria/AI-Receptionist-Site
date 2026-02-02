import React from 'react';
import { Phone, UserPlus, CreditCard, AlertCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'call' | 'signup' | 'payment' | 'alert';
  title: string;
  description: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'New Call Completed',
    description: 'Sunshine Bakery - 4m 12s duration',
    timestamp: '2 mins ago',
  },
  {
    id: '2',
    type: 'signup',
    title: 'New Client Registered',
    description: 'Green Valley Garden Center joined the Full plan',
    timestamp: '1 hour ago',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    description: 'Invoice #INV-2024-012 for $399',
    timestamp: '3 hours ago',
  },
  {
    id: '4',
    type: 'alert',
    title: 'High Latency Detected',
    description: 'Region us-east-1 experiencing higher than normal delay',
    timestamp: '5 hours ago',
  },
];

const getIcon = (type: Activity['type']) => {
  switch (type) {
    case 'call':
      return <Phone className="w-4 h-4 text-blue-500" />;
    case 'signup':
      return <UserPlus className="w-4 h-4 text-emerald-500" />;
    case 'payment':
      return <CreditCard className="w-4 h-4 text-purple-500" />;
    case 'alert':
      return <AlertCircle className="w-4 h-4 text-rose-500" />;
  }
};

export const ActivityFeed = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-bottom border-slate-100 bg-slate-50/50">
        <h3 className="font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900 truncate">{activity.title}</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50/50 border-t border-slate-100">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 w-full text-center">
          View All Activity
        </button>
      </div>
    </div>
  );
};
