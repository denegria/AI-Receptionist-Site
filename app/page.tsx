"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  MessageSquare,
  UserCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Bot,
  Zap,
  Menu,
  X,
  FileText
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      company: formData.get("company"),
      lead_source: "web",
    };

    try {
      const response = await fetch("/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      console.error(error);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen font-body text-primary bg-white selection:bg-cta/20">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="text-white w-6 h-6" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">HVAC AI Receptionist</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium hover:text-cta transition-colors">How It Works</a>
              <a href="#features" className="text-sm font-medium hover:text-cta transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium hover:text-cta transition-colors">Pricing</a>
              <a href="#contact" className="bg-cta text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                Get Started
              </a>
            </div>

            {/* Mobile Nav Controls */}
            <div className="flex items-center gap-4 md:hidden">
              <a href="#contact" className="bg-cta text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20">
                Get Started
              </a>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4">
            <a href="#how-it-works" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>How It Works</a>
            <a href="#features" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="block text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="block w-full text-center bg-cta text-white px-5 py-3 rounded-lg font-bold" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto text-center relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#bae6fd,transparent)] opacity-20"></div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          Now Live for HVAC Businesses
        </div>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          Never Miss Another HVAC Call <span className="text-cta block mt-2">Even After Hours</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          We install a 24/7 AI receptionist that answers calls, books jobs, and notifies you via SMS. <br className="hidden md:inline" />
          <span className="font-bold text-slate-800">Try it 30 days, cancel anytime — no risk, only leads.</span>
        </p>

        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <a href="#contact" className="w-full sm:w-auto bg-cta text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2">
              Start Your Risk-Free Pilot <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Trust Stats Row */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-sm font-bold text-slate-600 bg-white/50 backdrop-blur-sm py-4 px-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cta" />
              <span>48-Hour Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cta" />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cta" />
              <span>100% Call Capture</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Signals */}
      <section className="py-10 border-y border-slate-50 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by Forward-Thinking HVAC Pros</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {/* Placeholders for logos - using text for now to avoid image dependencies */}
            <span className="font-headline text-xl font-bold text-slate-700">ServicePro</span>
            <span className="font-headline text-xl font-bold text-slate-700">CoolAir Tech</span>
            <span className="font-headline text-xl font-bold text-slate-700">HVAC Masters</span>
            <span className="font-headline text-xl font-bold text-slate-700">ClimateRight</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">How it Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Seamless integration with your existing workflow.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            {[
              {
                icon: PhoneCall,
                title: "Forwarding",
                desc: "Calls auto-forward to AI after hours.",
                step: "01"
              },
              {
                icon: Bot,
                title: "AI Engagement",
                desc: "AI answers, captures info, and books jobs.",
                step: "02"
              },
              {
                icon: MessageSquare,
                title: "Lead Dispatch",
                desc: "Instant SMS with transcript sent to you.",
                step: "03"
              },
              {
                icon: UserCheck,
                title: "Human Fallback",
                desc: "Unsure? AI routes to human. Zero lost leads.",
                step: "04"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-6 text-xl font-bold shadow-lg shadow-slate-900/10 z-10 relative">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="absolute top-6 right-6 text-6xl font-headline font-bold text-slate-50 opacity-10 select-none">
                  {item.step}
                </div>
                <h3 className="font-headline text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Built for Reliability</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything you need to automate your front desk.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, title: "AI Conversations", desc: "Natural, human-like dialogue trained on HVAC terminology." },
              { icon: Zap, title: "Instant SMS Alerts", desc: "Get notified immediately when a new lead is captured." },
              { icon: FileText, title: "Voicemail Transcripts", desc: "Read voicemail contents instead of listening to audio." },
              { icon: ShieldAlert, title: "Reliable Fallbacks", desc: "Intelligent routing to humans if the AI gets stuck.", badge: "Safety First" },
              { icon: CheckCircle2, title: "White-Glove Setup", desc: "We handle the scripting, prompt tuning, and phone setup." },
              { icon: UserCheck, title: "Spam Filtering", desc: "AI automatically screens out robocalls and solicitors.", badge: "Save Time" }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-bg-gray transition-colors relative overflow-hidden group">
                <div className="w-12 h-12 shrink-0 bg-orange-100 text-cta rounded-full flex items-center justify-center group-hover:bg-cta group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-headline font-bold text-lg">{feature.title}</h3>
                    {feature.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Switching / Comparison Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Already Using an Answering Service?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Most HVAC businesses have something in place—but they’re still frustrated. Here’s why they switch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* The Pain */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200"></div>
              <h3 className="font-headline text-2xl font-bold mb-6 text-slate-800 flex items-center gap-3">
                <span className="p-2 bg-slate-100 rounded-lg"><X className="w-5 h-5 text-slate-500" /></span>
                The Old Way
              </h3>
              <ul className="space-y-4">
                {[
                  "Voicemail: 70% of customers hang up without leaving a message.",
                  "On-Call Techs: Burnout, missed calls, and sleep deprivation.",
                  "Answering Services: Generic reps who don't know HVAC and sound robotic.",
                  "Inconsistency: Missed details leads to wrong parts or wasted trips."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* The Solution */}
            <div className="bg-white p-8 rounded-3xl border border-orange-100 shadow-lg shadow-orange-500/5 relative overflow-hidden ring-1 ring-orange-500/20">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-cta"></div>
              <h3 className="font-headline text-2xl font-bold mb-6 text-primary flex items-center gap-3">
                <span className="p-2 bg-orange-100 rounded-lg"><CheckCircle2 className="w-5 h-5 text-cta" /></span>
                The AI Upgrade
              </h3>
              <ul className="space-y-4">
                {[
                  "Every Call Answered: 24/7/365, zero wait times.",
                  "HVAC-Trained: Understands 'capacitor', 'compressor', and 'freon'.",
                  "Instant Visibility: You get SMS transcripts immediately.",
                  "Reliable Fallback: Voicemail + transcription + safety routing.",
                  "No Human Issues: No burnout, no attitude, no sick days."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-cta shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Switching Steps */}
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

            <h3 className="font-headline text-2xl md:text-3xl font-bold mb-10">Switching is Simple</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-10 relative z-10">
              {[
                { title: "Step 1", desc: "Sign up for the 30-day pilot." },
                { title: "Step 2", desc: "We set up your script & number in 48 hours." },
                { title: "Step 3", desc: "Forward your calls. Done." }
              ].map((step, i) => (
                <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <div className="text-cta font-bold text-sm tracking-wider uppercase mb-2">{step.title}</div>
                  <div className="font-bold text-lg">{step.desc}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#contact" className="bg-cta text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25">
                Start Risk-Free Pilot
              </a>
            </div>
            <p className="mt-6 text-slate-400 text-sm">
              Keep your existing number. Run alongside your current service to compare. <br className="hidden md:inline" />
              A modern replacement for voicemail and answering services — built specifically for HVAC.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-lg mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-cta text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
              POPULAR
            </div>

            <h2 className="font-headline text-3xl font-bold mb-2">Standard Plan</h2>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold">$247</span>
              <span className="text-slate-400">/month</span>
            </div>

            <p className="text-slate-300 mb-8 pb-8 border-b border-white/10">
              Perfect for growing HVAC businesses wanting 24/7 coverage.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "24/7 Call Answering",
                "Instant SMS Lead Alerts",
                "Custom AI Training for Your Business",
                "Dedicated Local Business Number",
                "30-Day Pilot / Cancel Anytime"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-cta shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a href="#contact" className="block w-full text-center bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Start Your Pilot
            </a>

            <p className="text-center text-slate-400 text-sm mt-6">
              Includes dedicated local number setup.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-headline text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2">How long does setup take?</h3>
              <p className="text-slate-600">We can have your AI receptionist live within 48 hours. We handle all the technical configuration, prompt engineering, and testing.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">What if the AI makes a mistake?</h3>
              <p className="text-slate-600">Our system uses a "Human-in-the-Loop" safety mechanism. If the AI detects low confidence or confusion, it automatically routes the call to your fallback number or takes a message to ensure no lead is lost.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Do I need to be technical?</h3>
              <p className="text-slate-600">Not at all. This is a "No-Tech-Headache" service. We manage the infrastructure, updates, and maintenance. You just receive the leads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section id="contact" className="py-24 bg-bg-gray">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="font-headline text-3xl font-bold mb-2 text-center">Get Started Today</h2>
            <p className="text-center text-slate-600 mb-8">Fill out the form below to schedule your setup.</p>

            {formStatus === "success" ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-2">Request Received!</h3>
                <p>We'll be in touch shortly to configure your AI.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                  <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all" placeholder="John Doe" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all" placeholder="(555) 123-4567" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                  <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all" placeholder="john@hvac-pros.com" />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-1">Company Name</label>
                  <input required name="company" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all" placeholder="HVAC Pros LLC" />
                </div>

                {/* Honeypot for simple spam protection */}
                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

                <button
                  disabled={formStatus === "submitting"}
                  type="submit"
                  className="w-full bg-cta text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "submitting" ? "Sending..." : "Request Setup"}
                </button>

                <p className="text-xs text-slate-400 text-center mt-4">
                  By submitting, you agree to receive calls and SMS about your service request.
                  Calls may be recorded for quality assurance.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <footer className="bg-primary text-slate-400 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-cta" />
            <span className="font-bold text-white">HVAC AI Receptionist</span>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} AI Receptionist Services. All rights reserved.</p>
            <p className="text-xs mt-1 text-slate-500">Call recording disclosure: Calls to our AI system may be monitored and recorded.</p>
            <a href="#" className="hidden md:inline-block text-[10px] text-slate-300 hover:text-slate-400 mt-2 transition-colors">
              Partner with us
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 md:hidden z-40 flex items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="text-xs font-medium text-slate-500">
          <span className="block font-bold text-slate-900 text-sm">30-Day Pilot</span>
          No risk, cancel anytime.
        </div>
        <a href="#contact" className="bg-cta text-white px-6 py-3 rounded-lg font-bold text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition-transform">
          Get Started
        </a>
      </div>
    </div>
  );
}
