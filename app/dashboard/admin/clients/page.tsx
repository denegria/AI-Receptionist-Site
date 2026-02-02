import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { ClientsTable } from '@/components/admin/ClientsTable';

const ClientManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-slate-500 text-sm">View, manage and monitor your active clients.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          Add New Client
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search business name, phone, or ID..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <select className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 focus:outline-none transition-colors">
            <option>All Tiers</option>
            <option>$249 Basic</option>
            <option>$399 Full</option>
          </select>
        </div>
      </div>

      <ClientsTable />
    </div>
  );
};

export default ClientManagementPage;
