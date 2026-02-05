'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, Zap, Shield, Clock, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Zap className="text-white" size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Dispatcher AI</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#demo" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Live Demo</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Pricing</a>
          </div>
          <Link 
            href="/onboarding"
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -z-10 opacity-30">
          <div className="w-[800px] h-[800px] bg-indigo-100 rounded-full blur-[120px] -mr-40 -mt-40" />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-20">
          <div className="w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] -ml-40 -mb-40" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-6">
                <Zap size={14} className="animate-pulse" /> AI Powered Dispatching
              </span>
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Never miss a <span className="text-indigo-600">customer call</span> again.
              </h1>
              <p className="text-xl text-slate-500 mt-8 leading-relaxed max-w-xl">
                The AI-first dispatcher for modern home services. 
                Answer calls, book appointments, and sync with your CRM 24/7.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link 
                href="/onboarding"
                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-[2rem] text-lg font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="w-full sm:w-auto bg-white border border-slate-100 px-8 py-5 rounded-[2rem] shadow-xl shadow-slate-100/50 flex items-center justify-center gap-4 group">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Phone size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Demo</p>
                  <p className="text-lg font-black text-slate-900">(814) 893-1268</p>
                </div>
              </div>
            </motion.div>

            {/* Trusted By */}
            <div className="pt-10 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by 500+ Local Businesses</p>
              <div className="flex flex-wrap gap-10 opacity-40 grayscale">
                <span className="text-2xl font-black italic">ALPINE</span>
                <span className="text-2xl font-black italic">VORTEX</span>
                <span className="text-2xl font-black italic">FLARE</span>
                <span className="text-2xl font-black italic">NOVA</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[3rem] rotate-3 opacity-10" />
            <div className="bg-slate-950 rounded-[3rem] p-8 shadow-2xl shadow-slate-300 relative overflow-hidden">
              {/* Mock Dashboard UI */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 tracking-widest uppercase">Dispatcher_Console_v4</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { type: 'incoming', caller: '(814) 893-1268', time: 'Just now', status: 'Booked' },
                    { type: 'incoming', caller: '(814) 893-1268', time: '5m ago', status: 'Handled' },
                    { type: 'incoming', caller: '(814) 893-1268', time: '12m ago', status: 'Lead Gen' },
                  ].map((call, i) => (
                    <div key={i} className={`p-4 rounded-2xl border ${i === 0 ? 'bg-indigo-600/10 border-indigo-500/50' : 'bg-slate-900 border-slate-800'} flex justify-between items-center`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-white font-bold">{call.caller}</p>
                          <p className="text-xs text-slate-500 font-medium">{call.time}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${i === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                        {call.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl text-white space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-black uppercase tracking-widest opacity-70">Daily Savings</p>
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <p className="text-4xl font-black">$482.50</p>
                  <p className="text-xs font-medium opacity-70">+12% from yesterday</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built for scale. Designed for trust.</h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Dispatcher AI handles the complex logistics of call management so you can focus on growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Clock, 
                title: "24/7 Availability", 
                desc: "Never let a lead go to voicemail. Our AI answers every call, day or night, within seconds." 
              },
              { 
                icon: Shield, 
                title: "Reliable Integration", 
                desc: "Syncs directly with ServiceTitan, Housecall Pro, and Jobber to keep your schedule accurate." 
              },
              { 
                icon: MessageSquare, 
                title: "Human-Like Quality", 
                desc: "Our voice AI is trained specifically on trade-industry terminology and customer service." 
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6 hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] -mr-32 -mt-32" />
          
          <div className="relative space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Hear it in action.</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Call our live demo number and talk to our AI dispatcher. 
              Ask it questions, try to book a service, or just say hello.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 px-10 py-6 rounded-full text-white hover:scale-105 transition-all">
                <Phone size={24} className="text-indigo-400" fill="currentColor" />
                <span className="text-3xl font-black tracking-tight">(814) 893-1268</span>
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Available now for live calls</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">Dispatcher AI</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2026 Dispatcher AI Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600">Privacy</a>
            <a href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
