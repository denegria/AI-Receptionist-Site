'use client';

import React, { useState } from 'react';
import { Search, Filter, FileText, Download, Phone } from 'lucide-react';
import { DataTable } from '@/components/ui/DataTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function CallsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data
  const callLogs = [
    {
      id: '1',
      date: '2026-02-02 14:32',
      caller: '(555) 123-4567',
      duration: '4:20',
      status: 'Completed',
      intent: 'Repair Request',
      sentiment: 'Neutral',
    },
    {
      id: '2',
      date: '2026-02-02 11:15',
      caller: '(555) 987-6543',
      duration: '2:45',
      status: 'Completed',
      intent: 'Quote Inquiry',
      sentiment: 'Positive',
    },
    {
      id: '3',
      date: '2026-02-01 16:40',
      caller: '(555) 444-5555',
      duration: '0:45',
      status: 'Dropped',
      intent: 'Wrong Number',
      sentiment: 'Neutral',
    },
    {
      id: '4',
      date: '2026-02-01 09:20',
      caller: '(555) 222-3333',
      duration: '6:12',
      status: 'Completed',
      intent: 'Maintenance',
      sentiment: 'Positive',
    },
    {
      id: '5',
      date: '2026-01-31 15:10',
      caller: 'Anonymous',
      duration: '1:30',
      status: 'Voicemail',
      intent: 'Complaint',
      sentiment: 'Negative',
    },
  ];

  const columns = [
    {
      header: 'Date & Time',
      accessor: 'date' as const,
      className: 'font-medium',
    },
    {
      header: 'Caller',
      accessor: 'caller' as const,
    },
    {
      header: 'Duration',
      accessor: 'duration' as const,
    },
    {
      header: 'Status',
      accessor: (item: any) => (
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full border",
          item.status === 'Completed' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
          item.status === 'Dropped' ? "bg-rose-50 text-rose-700 border-rose-100" :
          "bg-amber-50 text-amber-700 border-amber-100"
        )}>
          {item.status}
        </span>
      ),
    },
    {
      header: 'Intent',
      accessor: 'intent' as const,
    },
    {
      header: 'Transcript',
      accessor: (item: any) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert(`Opening transcript for call ${item.id}`);
          }}
          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Call Logs</h1>
          <p className="text-slate-500 mt-1">Review and manage your assistant's call history.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 text-slate-500" />
            Export
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 bg-white">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search callers, intents, or dates..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                <Filter className="w-4 h-4 text-slate-500" />
                Filter
              </button>
              <div className="h-8 w-px bg-slate-200 mx-1" />
              <div className="flex items-center gap-1 text-xs font-medium text-slate-500 px-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                Assistant Online
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns} 
            data={callLogs} 
            onRowClick={(item) => console.log('Row clicked:', item)}
          />
        </CardContent>
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <p>Showing 5 of 124 calls</p>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 bg-white border border-slate-200 rounded disabled:opacity-50">Prev</button>
            <button className="px-2 py-1 bg-white border border-slate-200 rounded">Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
