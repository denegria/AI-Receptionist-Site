'use client';

import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Call Recording</h3>
            <p className="text-sm text-slate-500">(814) 893-1268 • Feb 5, 10:30 AM</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
            <Volume2 size={20} />
          </div>
        </div>

        {/* Waveform Mockup */}
        <div className="h-16 flex items-center justify-between gap-1 px-2">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                i < progress ? 'bg-indigo-500' : 'bg-slate-100'
              }`}
              style={{ 
                height: `${20 + Math.random() * 80}%`,
                opacity: i < progress ? 1 : 0.6
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span>0:45</span>
            <span>2:15</span>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
