import React from 'react';
import { Play, User, Calendar, Clock, MoreVertical, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function VoicemailsPage() {
  const voicemails = [
    {
      id: 1,
      caller: '(555) 123-4567',
      name: 'John Smith',
      date: 'Feb 2, 2026',
      time: '2:15 PM',
      duration: '0:45',
      transcript: "Hello, I'm calling because my AC unit is making a loud banging noise. I'd like to schedule a repair as soon as possible.",
      isNew: true,
    },
    {
      id: 2,
      caller: '(555) 987-6543',
      name: 'Sarah Johnson',
      date: 'Feb 2, 2026',
      time: '11:05 AM',
      duration: '0:32',
      transcript: "Hi, I have a question about my last maintenance bill. Please call me back when you can.",
      isNew: true,
    },
    {
      id: 3,
      caller: '(555) 444-5555',
      name: 'Unknown Caller',
      date: 'Feb 1, 2026',
      time: '4:30 PM',
      duration: '1:12',
      transcript: "I'm interested in getting a quote for a new furnace for my home. My address is 123 Maple St.",
      isNew: false,
    },
    {
      id: 4,
      caller: '(555) 222-3333',
      name: 'Mike Brown',
      date: 'Jan 31, 2026',
      time: '9:20 AM',
      duration: '0:25',
      transcript: "Checking to see if you have any availability for tomorrow morning for a quick inspection.",
      isNew: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Voicemails</h1>
        <p className="text-slate-500 mt-1">Listen to and read transcriptions of messages left by callers.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {voicemails.map((vm) => (
          <Card key={vm.id} className={cn("transition-all hover:border-slate-300", vm.isNew && "border-blue-200 ring-1 ring-blue-50")}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-stretch">
                {/* Left side: Play button & Info */}
                <div className="p-6 md:w-64 bg-slate-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "p-3 rounded-full flex items-center justify-center",
                        vm.isNew ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                      )}>
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-slate-900 truncate">{vm.name}</h3>
                      <p className="text-sm text-slate-500">{vm.caller}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{vm.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{vm.time} ({vm.duration})</span>
                    </div>
                  </div>
                </div>
                
                {/* Right side: Transcription */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Transcription</span>
                    {vm.isNew && (
                      <span className="ml-auto text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">New</span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed italic">
                    "{vm.transcript}"
                  </p>
                  <div className="mt-auto pt-6 flex items-center justify-end gap-3">
                    <button className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-transparent hover:border-slate-200 transition-all">
                      Archive
                    </button>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all">
                      Call Back
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
