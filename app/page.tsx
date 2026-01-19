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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X /> : <Menu />}
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
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          Now Live for HVAC Businesses
        </div>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          Never Miss Another HVAC Call <span className="text-cta block mt-2">Even After Hours</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          We install a 24/7 AI receptionist that answers calls, books jobs, and notifies you via SMS — fully managed for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#contact" className="w-full sm:w-auto bg-cta text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2">
            Get Your AI Receptionist <span aria-hidden="true">→</span>
          </a>
          <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" /> 48-Hour Setup
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
                desc: "Calls after hours are automatically forwarded to the AI.",
                step: "01"
              },
              {
                icon: Bot,
                title: "AI Engagement",
                desc: "AI answers, captures customer info, and identifies service needs.",
                step: "02"
              },
              {
                icon: MessageSquare,
                title: "Lead Dispatch",
                desc: "You get an instant SMS with the call transcript and details.",
                step: "03"
              },
              {
                icon: UserCheck,
                title: "Safety",
                desc: "Unsure? The AI triggers a fallback to ensure zero leads are lost.",
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
              { icon: ShieldAlert, title: "Reliable Fallbacks", desc: "Intelligent routing to humans if the AI gets stuck." },
              { icon: CheckCircle2, title: "White-Glove Setup", desc: "We handle the scripting, prompt tuning, and phone setup." },
              { icon: UserCheck, title: "Spam Filtering", desc: "AI automatically screens out robocalls and solicitors." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-2xl hover:bg-bg-gray transition-colors">
                <div className="w-12 h-12 shrink-0 bg-orange-100 text-cta rounded-full flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
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
          </div>
        </div>
      </footer>
    </div>
  );
}
