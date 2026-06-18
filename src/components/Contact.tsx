import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Landmark, Sparkles, HelpCircle, Globe } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('alliance');
  const [message, setMessage] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in the required fields to send your feedback.");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      const code = `CON-REF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessReference(code);
      
      // Clear values
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Decorative Blur and grid lines */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-orange-600 dark:bg-orange-500/5 rounded-full blur-3.5xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-3.5 py-1.5 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            CONTACT CENTER
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            Connect With Our Compliance Board
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed">
            Have questions about CSR eligibility, branch operations, or donation verification stamps? File an immediate dispatch to our main administrative desks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-2">
          
          {/* General Information Details List - 5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E293B] dark:text-white mb-2">Administrative Headquarters</h3>
              
              <div className="space-y-4 font-sans text-xs sm:text-sm">
                
                {/* Office address */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 ml-1 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#fbbf24] flex-shrink-0">
                    <MapPin className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B] dark:text-white text-xs sm:text-sm uppercase tracking-wide font-mono mb-1">Central Building</h4>
                    <p className="text-[#334155] dark:text-slate-300 leading-normal font-sans">
                      Amra Manush Building<br />
                      59 Debaipukur Road, Hindmotor, Sreerampore<br />
                      Hooghly, West Bengal – 712233, India
                    </p>
                  </div>
                </div>

                {/* Email address */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 ml-1 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#fbbf24] flex-shrink-0">
                    <Mail className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B] dark:text-white text-xs sm:text-sm uppercase tracking-wide font-mono mb-1">Direct Correspondence</h4>
                    <p className="text-[#334155] dark:text-slate-300 font-mono text-xs select-all">
                      amramanushfoundation@gmail.com
                    </p>
                  </div>
                </div>

                {/* Website address */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 ml-1 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#fbbf24] flex-shrink-0">
                    <Globe className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B] dark:text-white text-xs sm:text-sm uppercase tracking-wide font-mono mb-1">Official Portal</h4>
                    <a href="https://amramanushfoundation.co.in" target="_blank" rel="noopener noreferrer" className="text-[#fbbf24] font-mono text-xs hover:underline block">
                      amramanushfoundation.co.in ↗
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
                  <div className="p-2 ml-1 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 text-[#fbbf24] flex-shrink-0">
                    <Clock className="h-5.5 w-5.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B] dark:text-white text-xs sm:text-sm uppercase tracking-wide font-mono mb-1">Operational Hours</h4>
                    <p className="text-[#334155] dark:text-slate-300 leading-normal">
                      Monday – Saturday: 9:00 AM – 6:00 PM (IST)<br />
                      Administrative auditing desks active.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Structured Google Maps stylized mockup design */}
            <div className="h-44 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A2332] relative overflow-hidden flex items-center justify-center p-4">
              
              {/* Premium dark abstract vector graphic map representation */}
              <div className="absolute inset-0 opacity-15 select-none pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#64748B] dark:text-slate-400" fill="none" stroke="currentColor" strokeWidth="0.5">
                  {/* Abstract stylized grid roads */}
                  <line x1="0" y1="20" x2="100" y2="30" />
                  <line x1="0" y1="40" x2="100" y2="45" />
                  <line x1="0" y1="75" x2="100" y2="70" />
                  
                  <line x1="20" y1="0" x2="30" y2="100" strokeWidth="2" />
                  <line x1="50" y1="0" x2="55" y2="100" />
                  <line x1="85" y1="0" x2="80" y2="100" />

                  <circle cx="28" cy="42" r="15" />
                  <circle cx="82" cy="71" r="25" />
                </svg>
              </div>

              {/* Centered address plaque */}
              <div className="relative z-10 glass-panel p-3.5 rounded-xl border border-blue-600/20 dark:border-cyan-400/30 flex items-center gap-3 max-w-sm">
                <div className="h-7 w-7 rounded-lg bg-[linear-gradient(135deg,#0056D2_0%,#2563EB_50%,#FF9933_100%)] text-white border-0 flex items-center justify-center text-white">
                  <Landmark className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#1E293B] dark:text-white">Central Admin Office</h4>
                  <p className="text-[10px] text-[#64748B] dark:text-slate-400 font-sans">Hindmotor, Hooghly, WB – 712233</p>
                  <a 
                    href="https://maps.google.com/?q=Amra+Manush+Building+59+Debaipukur+Road+Hindmotor+Hooghly" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[9px] font-mono font-bold text-[#1E3A8A] dark:text-orange-400 hover:underline block mt-0.5"
                  >
                    Launch Google Maps Navigation ↗
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Dispatch Form - 7 columns */}
          <div className="lg:col-span-12 xl:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d4af37] uppercase tracking-widest font-extrabold mb-3">
                <Mail className="h-4.5 w-4.5" /> SECURE DISPATCH MODULE
              </div>
              
              <h3 className="font-display font-semibold text-lg text-[#1E293B] dark:text-white mb-1">Send Inquiry or Feedback</h3>
              <p className="text-xs text-slate-450 font-sans leading-normal mb-8">
                Request further administrative registers, share your experience, or provide constructive feedback directly to our regulatory desk.
              </p>

              <AnimatePresence mode="wait">
                {!successReference ? (
                  <motion.form key="con-form" onSubmit={handleContactSubmit} className="space-y-4 text-xs font-sans">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5 font-bold">Contact Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Shibam Das"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600/20 dark:border-cyan-400/30 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5 font-bold">E-mail Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="shibam@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600/20 dark:border-cyan-400/30 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5">Primary Inquiry Domain</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600/20 dark:border-cyan-400/30 rounded-lg px-4 py-2.5 text-[#0F172A] dark:text-slate-200 outline-none text-xs"
                      >
                        <option value="alliance">CSR Sponsoring Alliance</option>
                        <option value="audits">Audit & Governance Request</option>
                        <option value="feedback">General Feedback & Suggestions</option>
                        <option value="general">General Inquiry / Greeting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#334155] dark:text-slate-300 font-semibold mb-1.5 font-bold">Inquiry Message *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Incribe your questions or remarks in complete detail..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 focus:border-blue-600/20 dark:border-cyan-400/30 rounded-lg px-3 py-2.5 text-[#0F172A] dark:text-white outline-none placeholder:text-[#64748B] dark:text-slate-400 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-3.5 bg-indian-flag text-white font-extrabold rounded-lg shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          <Mail className="h-4.5 w-4.5 animate-bounce fill-white" /> Sending dispatch...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send Secure Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="con-success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="p-5 bg-orange-600 dark:bg-orange-500/10 border border-emerald-500/20 rounded-xl space-y-4 text-center text-xs"
                  >
                    <div className="mx-auto h-12 w-12 rounded-full bg-orange-600 dark:bg-orange-500/10 flex items-center justify-center border border-emerald-500/35">
                      <CheckCircle2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1E293B] dark:text-white text-sm">Automated Inquiry Logged</h4>
                      <p className="text-slate-305 font-sans mt-0.5">
                        Your secure dispatch has bypassed queueing. Thank you for connecting.
                      </p>
                    </div>

                    <div className="p-3 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-lg font-mono">
                      <span className="text-[10px] text-[#64748B] dark:text-slate-400 uppercase block tracking-wider">TICKET_REFERENCE_HASH</span>
                      <strong className="text-blue-600 dark:text-cyan-400 text-sm tracking-widest block mt-0.5">{successReference}</strong>
                    </div>

                    <p className="text-[10px] text-[#64748B] dark:text-slate-400">
                      Our main regulatory board will review your remarks and file an electronic callback within <strong className="text-[#0F172A] dark:text-white">24 working hours</strong>.
                    </p>

                    <button
                      onClick={() => setSuccessReference(null)}
                      className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:text-[#0F172A] dark:text-white underline cursor-pointer"
                    >
                      File separate administrative inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Note signature */}
            <div className="border-t border-slate-200 dark:border-slate-800/60 pt-4 mt-6 text-[10.5px] text-[#64748B] dark:text-slate-400 font-mono text-center">
              Registrar Desk: Amra Manush Building Sreerampore.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
