import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, ChevronRight, Copy, ExternalLink, Landmark, Printer, ShieldCheck, X } from 'lucide-react';

export default function UdyamCertificate() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const certDetails = {
    govHeader: "GOVERNMENT OF INDIA",
    ministry: "MINISTRY OF MICRO, SMALL & MEDIUM ENTERPRISES",
    title: "UDYAM REGISTRATION CERTIFICATE",
    regNumber: "UDYAM-WB-07-0130195",
    enterpriseName: "AMRA MANUSH FOUNDATION",
    enterpriseType: "Micro Enterprise",
    classificationYear: "2026-27",
    majorActivity: "SERVICES",
    socialCategory: "SC (Scheduled Caste Representative)",
    incorporationDate: "23/03/2026",
    commencementDate: "09/04/2026",
    address: "59, Amra Manhush Building, Debaipukur Road, Hindmotor, Sreerampore, Hooghly, West Bengal, Pin: 712233",
    nicCode: "88100 - Social work activities without accommodation for the elderly and disabled",
    url: "https://udyamregistration.gov.in"
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(certDetails.regNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* Visual Launcher Card previewing the Certificate */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#C5A059]/10 transition-all duration-350" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Styled Gold Certificate Badge */}
            <div className="p-3 bg-[#C5A059]/5 border border-[#C5A059]/30 text-[#C5A059] rounded-xl flex-shrink-0 group-hover:border-[#C5A059]/65 transition-all">
              <Landmark className="h-7 w-7" />
            </div>
            <div className="text-left">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider bg-orange-50 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 border border-orange-200/50 mb-2">
                <CheckCircle2 className="h-3 w-3" /> GOVERNMENT RECOGNIZED
              </span>
              <h3 className="font-display font-medium text-lg text-[#1E293B] dark:text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                Udyam Registration Certificate
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 font-sans mt-1 max-w-lg leading-relaxed">
                Amra Manush Foundation is registered under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#C5A059] hover:bg-[#b08c48] text-white font-bold font-mono text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-[#C5A059]/10 hover:shadow-[#C5A059]/15 cursor-pointer flex items-center justify-center gap-2"
            style={{ borderRadius: '2px' }}
          >
            Open Interactive Certificate
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Inline brief parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/60 text-left font-mono text-[11px]">
          <div>
            <span className="text-[#64748B] dark:text-slate-400 block uppercase text-[9px]">REG ID</span>
            <span className="text-[#334155] dark:text-slate-300 select-all font-semibold font-sans">{certDetails.regNumber}</span>
          </div>
          <div>
            <span className="text-[#64748B] dark:text-slate-400 block uppercase text-[9px]">ENTERPRISE TYPE</span>
            <span className="text-[#334155] dark:text-slate-300 font-semibold">{certDetails.enterpriseType}</span>
          </div>
          <div>
            <span className="text-[#64748B] dark:text-slate-400 block uppercase text-[9px]">INCORPORATED</span>
            <span className="text-[#334155] dark:text-slate-300">{certDetails.incorporationDate}</span>
          </div>
          <div>
            <span className="text-[#64748B] dark:text-slate-400 block uppercase text-[9px]">CLASSIFICATION</span>
            <span className="text-orange-600 dark:text-orange-400 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              Verified Active
            </span>
          </div>
        </div>
      </div>

      {/* Modal Overlay displaying full digital replica */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white dark:bg-[#1A2332]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 max-w-4xl w-full shadow-2xl relative overflow-hidden"
              style={{ borderRadius: '4px' }}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1A2332]/40 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <Landmark className="h-5 w-5 text-[#C5A059]" />
                  <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059] font-bold">
                    Official Govt MSME Credential
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="p-1.5 px-3 bg-white dark:bg-[#1A2332] hover:bg-[#F0F7FF] dark:bg-[#111827] dark:hover:bg-[#1A2332] text-[#334155] dark:text-slate-300 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 cursor-pointer transition-all"
                    style={{ borderRadius: '2px' }}
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print / PDF
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 px-1.5 bg-white dark:bg-[#1A2332] hover:bg-[#F0F7FF] dark:bg-[#111827] dark:hover:bg-[#1A2332] text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:text-white border border-slate-200 dark:border-slate-800 cursor-pointer transition-all-200"
                    style={{ borderRadius: '2px' }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Scrollable Container */}
              <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto">
                
                {/* Government Replica Frame Container */}
                <div id="print-certificate-replica" className="bg-white dark:bg-[#1A2332] text-[#0F172A] dark:text-white p-6 sm:p-10 border-8 border-double border-blue-600/20 dark:border-cyan-400/30 relative overflow-hidden text-left shadow-inner select-none font-sans">
                  
                  {/* Subtle Background Watermark Seal */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-96 h-96">
                      <circle cx="50" cy="50" r="45" fill="currentColor" />
                    </svg>
                  </div>

                  {/* Top Ministry Headers */}
                  <div className="text-center border-b-2 border-slate-200 dark:border-slate-800 pb-5 mb-6">
                    <div className="flex flex-col items-center gap-1">
                      {/* Stylized Tricolor National Ribbon bar placeholder */}
                      <div className="w-full flex h-1 mb-2">
                        <div className="w-1/3 bg-orange-500 h-full"></div>
                        <div className="w-1/3 bg-white dark:bg-[#1A2332] h-full border-t border-b border-slate-100"></div>
                        <div className="w-1/3 bg-green-600 h-full"></div>
                      </div>
                      
                      {/* Government of India Crest placeholder representation */}
                      <div className="text-[10px] font-bold font-serif tracking-widest text-[#334155] dark:text-slate-200 uppercase">
                        भारत सरकार | GOVERNMENT OF INDIA
                      </div>
                      <div className="text-[12px] font-bold tracking-wide text-[#1E293B] uppercase font-sans">
                        {certDetails.govHeader}
                      </div>
                      <div className="text-[11px] font-semibold text-sky-800 tracking-wide uppercase font-serif">
                        {certDetails.ministry}
                      </div>
                      <div className="text-[9px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-widest mt-1">
                        MINISTRY OF MICRO, SMALL AND MEDIUM ENTERPRISES
                      </div>
                    </div>

                    <h1 className="text-lg md:text-xl font-bold font-serif text-[#0F172A] dark:text-white mt-5 border-y border-slate-200 dark:border-slate-800 py-1.5 inline-block uppercase tracking-wider">
                      {certDetails.title}
                    </h1>
                  </div>

                  {/* Certificate Main Data Grid - Compliant layout */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
                    
                    {/* Primary parameters col */}
                    <div className="md:col-span-8 space-y-4">
                      
                      {/* UDYAM REG NUMBER */}
                      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          UDYEM REGISTRATION ID / NUMBER
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[#a47a24] font-mono text-base font-bold bg-blue-600/5 dark:bg-cyan-400/10 px-2 py-0.5 border border-blue-600/20 dark:border-cyan-400/30">
                            {certDetails.regNumber}
                          </span>
                          <button
                            onClick={handleCopy}
                            title="Copy ID to Clipboard"
                            className="bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 text-[#334155] dark:text-slate-200 p-1 rounded border border-slate-300 transition-colors cursor-pointer"
                          >
                            {copied ? (
                              <span className="text-[10px] font-mono font-bold text-orange-600 dark:text-orange-400 px-1">Copied!</span>
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* NAME OF ENTERPRISE */}
                      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          NAME OF ENTERPRISE
                        </span>
                        <span className="text-base text-[#0F172A] dark:text-white font-bold tracking-wide">
                          {certDetails.enterpriseName}
                        </span>
                      </div>

                      {/* TYPE OF ENTERPRISE */}
                      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          TYPE OF ENTERPRISE
                        </span>
                        <div className="flex items-center gap-10 mt-1">
                          <div>
                            <span className="text-[#64748B] dark:text-slate-400 block text-[9px] uppercase font-mono">Classification</span>
                            <span className="text-sm text-[#1E293B] font-bold uppercase">{certDetails.enterpriseType}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B] dark:text-slate-400 block text-[9px] uppercase font-mono">Classification Year</span>
                            <span className="text-sm text-[#1E293B] font-mono font-bold">{certDetails.classificationYear}</span>
                          </div>
                        </div>
                      </div>

                      {/* MAJOR ACTIVITY */}
                      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          MAJOR ACTIVITY
                        </span>
                        <span className="text-sm font-semibold text-orange-700 dark:text-orange-400 uppercase bg-orange-50 dark:bg-orange-500/10 border border-orange-200/50 px-2.5 py-0.5 inline-block">
                          {certDetails.majorActivity}
                        </span>
                      </div>

                      {/* SOCIAL CATEGORY */}
                      <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          SOCIAL CATEGORY OF ENTREPRENEUR
                        </span>
                        <span className="text-sm text-[#1E293B] font-medium">
                          {certDetails.socialCategory}
                        </span>
                      </div>

                    </div>

                    {/* QR Code and verification column - 4 columns */}
                    <div className="md:col-span-4 flex flex-col items-center justify-between border-l border-slate-200 dark:border-slate-800 pl-4 h-full">
                      {/* Fake stylized QR code representation of registry scan */}
                      <div className="flex flex-col items-center text-center p-3 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded-lg">
                        <div className="h-32 w-32 bg-white dark:bg-[#1A2332] p-1 border border-slate-200 dark:border-slate-800 shadow-inner relative flex items-center justify-center">
                          {/* QR design matrix visual */}
                          <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 opacity-80">
                            {Array.from({ length: 25 }).map((_, idx) => {
                              const isFilled = (idx * 7) % 3 === 0 || idx < 4 || idx % 5 === 0;
                              return (
                                <div 
                                  key={idx} 
                                  className={`rounded-sm ${(idx === 0 || idx === 4 || idx === 20 || idx === 24) ? 'bg-white dark:bg-[#1A2332] ring-2 ring-slate-900 ring-offset-2' : isFilled ? 'bg-white dark:bg-[#151E32]' : 'bg-transparent'}`}
                                />
                              );
                            })}
                          </div>
                          {/* absolute center mini crest logo representation */}
                          <div className="absolute inset-0 m-auto h-7 w-7 bg-white dark:bg-[#1A2332] rounded-full border border-blue-600/20 dark:border-cyan-400/30 shadow flex items-center justify-center text-[7px] font-bold text-blue-600 dark:text-cyan-400">
                            GOI
                          </div>
                        </div>
                        <span className="text-[9px] font-mono tracking-wider font-semibold text-[#64748B] dark:text-slate-400 mt-2.5 uppercase">
                          Scan to Verify
                        </span>
                        <span className="text-[8px] text-[#64748B] dark:text-slate-400 mt-0.5 leading-none">
                          udyamregistration.gov.in
                        </span>
                      </div>

                      {/* Gov stamp seal mark */}
                      <div className="mt-6 text-center border-t border-dashed border-slate-200 dark:border-slate-800/80 pt-4 w-full">
                        <div className="inline-flex flex-col items-center p-2 rounded-full border-2 border-double border-blue-500/60 bg-blue-500/5 scale-90">
                          <span className="text-[7px] font-bold text-blue-600 uppercase font-mono tracking-widest text-center leading-none">
                            MINISTRY OF MSME
                          </span>
                          <span className="text-[6px] text-blue-500 mt-0.5 italic">
                            Computer Generated
                          </span>
                          <span className="text-[6px] text-blue-500 uppercase font-bold tracking-tight">
                            NO SIGNATURE REQUIRED
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Address of units and NIC codes along bottom */}
                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    
                    {/* OFFICE ADDRESS */}
                    <div>
                      <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                        OFFICIAL ADDRESS OF ENTERPRISE / UNITS
                      </span>
                      <p className="text-xs text-[#334155] dark:text-slate-200 leading-relaxed font-sans mt-0.5">
                        {certDetails.address}
                      </p>
                    </div>

                    {/* NIC CODE ACTIVITIES */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                      <div>
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          DATE OF INCORPORATION
                        </span>
                        <span className="text-xs font-semibold text-[#1E293B]">{certDetails.incorporationDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold">
                          DATE OF COMMENCEMENT
                        </span>
                        <span className="text-xs font-semibold text-[#1E293B]">{certDetails.commencementDate}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-150 pt-4">
                      <span className="text-[10px] block font-mono uppercase tracking-widest text-[#64748B] dark:text-slate-400 font-bold mb-1">
                        NATIONAL INDUSTRY CLASSIFICATION (NIC) CODE
                      </span>
                      <div className="p-2.5 bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800 rounded text-xs text-[#334155] dark:text-slate-200 font-sans leading-normal">
                        <strong>NIC 5 Digit: </strong> {certDetails.nicCode}
                      </div>
                    </div>

                  </div>

                  {/* Footnote Warning Disclaimer in certificate */}
                  <div className="mt-8 pt-4 border-t-2 border-slate-200 dark:border-slate-800 text-[8px] text-[#64748B] dark:text-slate-400 font-sans leading-relaxed text-center">
                    * In case of graduation (upward/reverse) of status of an enterprise, the benefit of the Government Schemes will be availed as per the provisions of Government Notification. This is a secure digital replica representing compliance registry, maintained with double-signature protocols by Amra Manush Foundation trustees.
                  </div>

                </div>

              </div>

              {/* Action buttons footer */}
              <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#1A2332]/60 border-t border-slate-200 dark:border-slate-800">
                <p className="text-[10px] sm:text-xs text-[#64748B] dark:text-slate-400 font-sans">
                  Registry Status: <span className="text-orange-600 dark:text-orange-400 font-bold font-mono">ACTIVE (12-06-2026)</span>
                </p>
                <div className="flex gap-2">
                  <a
                    href={certDetails.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#151E32] hover:text-[#C5A059] border border-slate-200 dark:border-slate-800 text-[#334155] dark:text-slate-300 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                    style={{ borderRadius: '2px' }}
                  >
                    Open Govt Registry
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-700 text-[#0F172A] dark:text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                    style={{ borderRadius: '2px' }}
                  >
                    Close Verification
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
