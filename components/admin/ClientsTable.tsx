import React from 'react';
import { MoreHorizontal, Eye, Edit2, Ban, ShieldCheck, Shield } from 'lucide-react';

interface Client {
  id: string;
  businessName: string;
  phone: string;
  status: 'active' | 'trial' | 'suspended';
  tier: '$249' | '$399';
  callsThisMonth: number;
}

const clients: Client[] = [
  {
    id: '1',
    businessName: 'Elite Law Firm',
    phone: '+1 (555) 123-4567',
    status: 'active',
    tier: '$399',
    callsThisMonth: 142,
  },
  {
    id: '2',
    businessName: 'Downtown Dental',
    phone: '+1 (555) 987-6543',
    status: 'trial',
    tier: '$249',
    callsThisMonth: 12,
  },
  {
    id: '3',
    businessName: 'Ace Automotive',
    phone: '+1 (555) 555-0199',
    status: 'suspended',
    tier: '$249',
    callsThisMonth: 0,
  },
  {
    id: '4',
    businessName: 'Luxe Real Estate',
    phone: '+1 (555) 777-8888',
    status: 'active',
    tier: '$399',
    callsThisMonth: 89,
  },
];

const StatusBadge = ({ status }: { status: Client['status'] }) => {
  const styles = {
    active: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    trial: 'text-blue-700 bg-blue-50 border-blue-200',
    suspended: 'text-rose-700 bg-rose-50 border-rose-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const TierBadge = ({ tier }: { tier: Client['tier'] }) => {
  const isFull = tier === '$399';
  return (
    <span className={`flex items-center gap-1 text-sm font-medium ${isFull ? 'text-purple-600' : 'text-slate-600'}`}>
      {isFull ? <ShieldCheck className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
      {tier === '$399' ? 'Full ($399)' : 'Basic ($249)'}
    </span>
  );
};

export const ClientsTable = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Business Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tier</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Calls (Mo)</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-900">{client.businessName}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 font-mono">{client.phone}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={client.status} />
                </td>
                <td className="px-6 py-4">
                  <TierBadge tier={client.tier} />
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-medium text-slate-700">{client.callsThisMonth}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="View">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Suspend">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
