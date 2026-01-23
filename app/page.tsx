"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-4 glass shadow-saas" : "py-6 bg-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Bot className="text-white w-6 h-6" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight hidden sm:block">HVAC AI Receptionist</span>
            </motion.div>

            {/* Desktop Nav */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-8"
            >
              <a href="#how-it-works" className="text-sm font-semibold hover:text-cta transition-colors">How It Works</a>
              <a href="#pricing" className="text-sm font-semibold hover:text-cta transition-colors">Pricing</a>
              <a href="#contact" className="bg-cta text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-cta-glow">
                Get Started
              </a>
            </motion.div>

            {/* Mobile Nav Controls */}
            <div className="flex items-center gap-4 md:hidden">
              <a href="#contact" className="bg-cta text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-orange-600 transition-all shadow-cta-glow">
                Get Started
              </a>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 glass rounded-lg">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#how-it-works" className="block text-base font-bold" onClick={() => setIsMenuOpen(false)}>How It Works</a>
                <a href="#pricing" className="block text-base font-bold" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                <a href="#contact" className="block w-full text-center bg-cta text-white px-5 py-3 rounded-xl font-bold shadow-cta-glow" onClick={() => setIsMenuOpen(false)}>
                  Get Started Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 px-4 max-w-7xl mx-auto text-center relative">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(186,230,253,0.15),transparent_70%)] mt-[-100px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm text-blue-700 text-xs font-bold uppercase tracking-widest mb-10 border border-blue-100/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          Now Live for HVAC Businesses
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-10 tracking-tight text-gradient"
        >
          Never Miss Another HVAC Call <span className="text-cta block mt-2 drop-shadow-sm">— Even After Hours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          A modern replacement for voicemail and answering services, fully managed for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-16"
        >
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
            <a href="#contact" className="w-full sm:w-auto bg-cta text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-cta-glow flex items-center justify-center gap-3">
              Replace Your Answering Service <span aria-hidden="true">→</span>
            </a>
            <a href="#how-it-works" className="w-full sm:w-auto bg-white text-primary border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
              See Why Companies Switch
            </a>
          </div>

          {/* Trust Stats Row */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-black text-slate-700 glass py-5 px-10 rounded-3xl shadow-saas border-slate-100">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-cta" />
              <span>48-Hour Setup</span>
            </div>
            <div className="flex items-center gap-3 border-x border-slate-100 px-12 hidden md:flex">
              <Bot className="w-6 h-6 text-cta" />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-3 md:hidden">
              <Bot className="w-6 h-6 text-cta" />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-cta" />
              <span>100% Call Capture</span>
            </div>
          </div>
        </motion.div>
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

      {/* Integrated How It Works & Features Flow */}
      <section id="how-it-works" className="py-24 bg-bg-gray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 tracking-tight">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">A complete front-office automation built specifically for HVAC pros.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Forward Your After-Hours Calls",
                benefit: "You never miss a call — even when your team is off the clock.",
                features: ["Dedicated local phone number", "Fully managed setup in 48 hours", "No dashboards or tech to learn"],
                icon: PhoneCall,
                color: "bg-blue-600"
              },
              {
                step: "02",
                title: "AI Engages the Caller",
                benefit: "Every customer gets a professional interaction — first impression guaranteed.",
                features: ["HVAC-specific conversation flow", "Natural voice, human-like responses", "Spam filtering to keep irrelevant calls out"],
                icon: Bot,
                color: "bg-primary"
              },
              {
                step: "03",
                title: "Capture & Notify",
                benefit: "You stay in control and can follow up immediately without missing revenue.",
                features: ["Instant SMS alerts with customer info", "Voicemail + full transcript for context", "Leads stored securely for easy reference"],
                icon: Zap,
                color: "bg-cta"
              },
              {
                step: "04",
                title: "Human Fallback When Needed",
                benefit: "No calls fall through the cracks, so you never lose a paying customer.",
                features: ["Smart fallback to your team or operator", "Continuous learning for improved accuracy", "24/7 technical monitoring"],
                icon: UserCheck,
                color: "bg-green-600"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-10 rounded-[32px] shadow-saas border border-slate-100 relative group flex flex-col h-full"
              >
                <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg z-10 relative group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>

                <div className="absolute top-8 right-10 text-7xl font-headline font-black text-slate-100 opacity-20 select-none group-hover:text-slate-200 transition-colors">
                  {item.step}
                </div>

                <div className="flex-grow">
                  <h3 className="font-headline text-2xl font-black mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-primary font-bold text-lg mb-6 leading-snug">{item.benefit}</p>

                  <div className="space-y-4 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Features supporting this step:</p>
                    <ul className="space-y-3">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                          <CheckCircle2 className="w-5 h-5 text-cta shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Switching / Comparison Section */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 tracking-tight text-gradient">Already Using an Answering Service?</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-xl font-medium leading-relaxed">
              Most HVAC companies already have voicemail, on-call technicians, or third-party answering services.
              While they cover calls, they don't solve the real problems:
            </p>
          </motion.div>

          {/* Pain Points Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              { title: "Rushed Calls", desc: "Calls are misclassified or rushed as reps try to clear queues." },
              { title: "Emergency Gaps", desc: "Generic reps don't understand what constitutes a real HVAC emergency." },
              { title: "Missed Details", desc: "Important customer details are lost, leading to wrong parts or wasted trips." },
              { title: "Poor First Impression", desc: "Customers don't feel reassured and hang up to call the next company." },
              { title: "Overwhelmed Techs", desc: "Wake up to sleep-deprived technicians who missed opportunities." }
            ].map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-start gap-4"
              >
                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center">
                  <X className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline font-black text-lg mb-2">{pain.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{pain.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-16">
            <h3 className="font-headline text-3xl font-black mb-4">Why Companies Switch</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {[
              { title: "Instant Answer", desc: "Every call is answered instantly, 24/7/365.", icon: Zap },
              { title: "HVAC-Trained", desc: "Conversations handled by AI trained specifically for HVAC.", icon: Bot },
              { title: "Instant Visibility", desc: "Get SMS notifications and full transcripts immediately.", icon: MessageSquare },
              { title: "Smart Fallback", desc: "Complex calls automatically escalate to your team.", icon: UserCheck },
              { title: "No Burnout", desc: "Replace sleep-deprived techs with tireless AI.", icon: ShieldAlert },
              { title: "Professional Tone", desc: "Consistent, knowledgeable responses every single time.", icon: UserCheck }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-primary/5 p-8 rounded-[32px] border border-primary/10 flex items-start gap-6 group hover:bg-primary/10 transition-all h-full"
              >
                <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform flex-shrink-0">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline font-black text-lg mb-2">{benefit.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-6">
            <a href="#contact" className="bg-cta text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 hover:scale-[1.05] active:scale-[0.98] transition-all shadow-cta-glow">
              Start Your 30-Day Pilot Today
            </a>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Zero Risk. Zero Setup Fees.</p>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 tracking-tight">Don't Take Our Word for It</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Real HVAC businesses are replacing their call centers with AI.</p>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {[
              {
                quote: "Before the AI, we were missing about 15% of our after-hours calls because our service was slow. Now, 100% are answered instantly. The lead info is so detailed our techs know exactly what they're walking into.",
                author: "Mike Thompson",
                role: "Owner, Thompson Heat & Air"
              },
              {
                quote: "The biggest relief is no longer waking up to missed-call voicemails or generic messages from our answering service that missed half the details. It's like having a top-tier dispatcher who never sleeps.",
                author: "Sarah Chen",
                role: "Operations Manager, ClimatePros HVAC"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-bg-gray p-10 rounded-[40px] border border-slate-100 flex flex-col gap-8 relative overflow-hidden h-full"
              >
                <div className="text-cta opacity-10 absolute top-4 right-8 font-black text-[120px] select-none text-right">"</div>
                <p className="text-xl text-primary font-bold leading-relaxed relative z-10 italic">
                  "{testimonial.quote}"
                </p>
                <div className="mt-auto">
                  <div className="font-black text-lg text-primary">{testimonial.author}</div>
                  <div className="text-slate-500 font-bold text-sm uppercase tracking-widest">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logos / Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <span className="font-headline text-2xl font-black">COOL AIR SQUAD</span>
            <span className="font-headline text-2xl font-black">FAST FIX HVAC</span>
            <span className="font-headline text-2xl font-black">ELITE CLIMATE</span>
            <span className="font-headline text-2xl font-black">PRIME HEATING</span>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-black mb-6 tracking-tight">Transparent Pricing — No Surprises</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">Everything included for a flat monthly fee. Cancel anytime.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Comparison Table */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-sm"
            >
              <h3 className="font-headline text-2xl font-black mb-8 text-center md:text-left">The Competition vs. AI Receptionist</h3>
              <div className="space-y-6">
                {[
                  { label: "Call Handling", old: "Missed details", new: "Full SMS + Transcripts" },
                  { label: "Reliability", old: "Human error/Burnout", new: "100% Consistent AI" },
                  { label: "Availability", old: "Limited or extra fees", new: "True 24/7/365 Coverage" },
                  { label: "Setup", old: "Weeks of training", new: "Live in 48 Hours" },
                  { label: "Cost", old: "Variable & Hidden fees", new: "$247 / Month Flat" }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 py-4 border-b border-white/5 last:border-0">
                    <div className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center">{row.label}</div>
                    <div className="text-slate-500 text-sm font-medium flex items-center line-through decoration-slate-600">{row.old}</div>
                    <div className="text-cta text-sm font-black flex items-center">{row.new}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-lg mx-auto bg-white text-primary rounded-[40px] p-10 md:p-16 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 bg-cta text-white text-[10px] font-black tracking-widest px-6 py-3 rounded-bl-3xl uppercase">
                POPULAR
              </div>

              <h2 className="font-headline text-4xl font-black mb-4 tracking-tight">Standard Plan</h2>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-black tracking-tighter">$247</span>
                <span className="text-slate-400 font-bold">/month</span>
              </div>

              <p className="text-slate-500 text-lg mb-10 pb-10 border-b border-slate-100 leading-relaxed font-medium">
                Flat fee for full after-hours coverage. <br />
                <span className="text-primary font-bold">30-day risk-free pilot included.</span>
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  "24/7 Call Answering",
                  "Instant SMS Lead Alerts",
                  "HVAC-Specific AI Training",
                  "Dedicated Local Number",
                  "Spam & Robocall Filtering",
                  "Live Handoff/Fallback Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold">
                    <CheckCircle2 className="w-6 h-6 text-cta shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="block w-full text-center bg-cta text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-cta-glow">
                Start Your 30-Day Pilot
              </a>

              <p className="text-center text-slate-400 text-sm mt-8 font-medium">
                Cancel anytime. No lock-in contracts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100"
          >
            <h2 className="font-headline text-3xl font-black mb-4 text-center text-gradient">Start Your Risk-Free Pilot</h2>
            <p className="text-center text-slate-600 mb-10 font-medium">Fill out the form below to begin your 48-hour setup.</p>

            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-2">Request Received!</h3>
                <p className="text-slate-600 font-medium">We'll reach out within 24 hours to begin your 48-hour setup.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">Full Name</label>
                  <input required name="name" type="text" className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all font-medium" placeholder="John Doe" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all font-medium" placeholder="(555) 123-4567" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">Email Address</label>
                  <input required name="email" type="email" className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all font-medium" placeholder="john@hvac-pros.com" />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-black text-slate-800 mb-2 uppercase tracking-tight">Company Name</label>
                  <input required name="company" type="text" className="w-full px-5 py-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-cta focus:ring-1 focus:ring-cta outline-none transition-all font-medium" placeholder="HVAC Pros LLC" />
                </div>

                {/* Honeypot for simple spam protection */}
                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

                <button
                  disabled={formStatus === "submitting"}
                  type="submit"
                  className="w-full bg-cta text-white font-black py-5 rounded-2xl hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-cta-glow disabled:opacity-50 disabled:cursor-not-allowed text-xl"
                >
                  {formStatus === "submitting" ? "Sending..." : "Request Setup Now"}
                </button>

                <p className="text-xs text-slate-400 text-center mt-6 font-medium">
                  By submitting, you agree to receive calls and SMS about your service request. <br />
                  <span className="opacity-70">Calls may be recorded for quality assurance.</span>
                </p>
              </form>
            )}
          </motion.div>
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
