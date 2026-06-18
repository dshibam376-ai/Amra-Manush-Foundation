import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ShieldCheck, FileText, CheckCircle2, RefreshCw, Layers, Award, Landmark } from 'lucide-react';
import { TRANSPARENCY_REPORTS } from '../data';
import GoogleDriveExplorer from './GoogleDriveExplorer';
import UdyamCertificate from './UdyamCertificate';
import FAQSection from './FAQSection';

export default function Transparency() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setSuccessId(null);
    
    // Simulate high-security file generation path
    setTimeout(() => {
      setDownloadingId(null);
      setSuccessId(id);
      
      // Secondary timer to clear success indicator
      setTimeout(() => {
        setSuccessId(null);
      }, 4000);
    }, 1800);
  };

  return (
    <section id="transparency" className="py-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-orange-600 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#d4af37] px-3.5 py-1.5 rounded-full bg-blue-600/5 dark:bg-cyan-400/10 border border-blue-600/20 dark:border-cyan-400/30 uppercase">
            GOVERNANCE ASSURANCE
          </span>
          <h2 className="font-display font-bold text-3.5xl sm:text-4xl text-[#0F172A] dark:text-white mt-4 tracking-tight">
            Fiscal Governance & 100% Transparency
          </h2>
          <p className="text-[#64748B] dark:text-slate-400 font-sans text-sm sm:text-base mt-3 leading-relaxed text-balance">
            We operate with public corporate hygiene standards. Browse our compliance registrations, independent charter auditor reports, and complete project sourcing statements.
          </p>
          <div className="h-1.5 w-16 bg-[#d4af37] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Transparency Rules & Framework - 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 100% Transparency Seal */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-orange-600 dark:bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-orange-600 dark:bg-orange-500/5 border border-emerald-500/10 text-orange-600 dark:text-orange-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-base sm:text-lg text-[#1E293B] dark:text-white">
                    Direct Dollar-to-Field System
                  </h3>
                  <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400">AUDIT RATIO: 95% DIRECT AID</span>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed font-sans mb-4">
                Our strict operational rules dictate that <strong>95% of every single rupee donated</strong> is funneled directly into core raw ingredients, packaging, and micro-distribution infrastructure. Administrative expenses are kept under a strict 5% buffer.
              </p>

              <div className="space-y-2 border-t border-slate-100/5 pt-4">
                <div className="flex items-center gap-2 text-xs text-[#0F172A] dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <span>Real-time geo-coded GPS confirmation photo sets</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0F172A] dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <span>Dual signature audit at every centralized sub-kitchen</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0F172A] dark:text-slate-200 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <span>12th month strict public auditor compliance publishings</span>
                </div>
              </div>
            </div>

            {/* Interactive Udyam Certificate Representation */}
            <UdyamCertificate />

          </div>

          {/* Downloadable Reports list - 7 columns */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="font-display font-semibold text-[#1E293B] dark:text-slate-100 text-lg">Document Registry</h3>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">Sponsors can download transparent legal declarations</p>
              </div>
              <Layers className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>

            <div className="space-y-4">
              {TRANSPARENCY_REPORTS.map((report) => {
                const isDownloading = downloadingId === report.id;
                const isSuccess = successId === report.id;

                return (
                  <div 
                    key={report.id}
                    className="p-4 bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332]/60 transition-all border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A2332] border border-slate-200 dark:border-slate-800/80 text-blue-600 dark:text-cyan-400 flex-shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E293B] dark:text-slate-100 text-xs sm:text-sm tracking-wide leading-snug">
                          {report.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-[#64748B] dark:text-slate-400 font-mono">
                          <span>FY {report.year}</span>
                          <span className="h-2 w-[1px] bg-slate-100 dark:bg-[#1E293B]" />
                          <span className="text-orange-600 dark:text-orange-400/80 font-bold uppercase">{report.type}</span>
                          <span className="h-2 w-[1px] bg-slate-100 dark:bg-[#1E293B]" />
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Download CTA / Overlay Indicator */}
                    <button
                      onClick={() => handleDownload(report.id, report.title)}
                      disabled={isDownloading}
                      className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border hover:brightness-105 transition-all cursor-pointer ${
                        isSuccess
                          ? 'bg-orange-600 dark:bg-orange-500/10 text-white dark:text-orange-400 border-orange-500/30'
                          : isDownloading
                          ? 'bg-white dark:bg-[#1A2332] border-slate-200 dark:border-slate-800 text-[#64748B] dark:text-slate-400'
                          : 'bg-white dark:bg-[#1A2332] hover:bg-white dark:bg-[#1A2332] border-slate-200 dark:border-slate-800 text-[#0F172A] dark:text-slate-200'
                      }`}
                    >
                      {isSuccess ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-white dark:text-orange-400" />
                          Downloaded.
                        </>
                      ) : isDownloading ? (
                        <>
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          Decrypting...
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </>
                      )}
                    </button>

                    {/* Interactive Simulated Loading bar */}
                    {isDownloading && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-white dark:bg-[#1A2332]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.8 }}
                          className="h-full bg-gradient-to-r from-blue-600 dark:from-cyan-500 to-blue-600 dark:to-cyan-500"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Note indicator */}
            <div className="mt-6 p-3 bg-blue-600/5 dark:bg-cyan-400/10 rounded-xl border border-blue-600/20 dark:border-cyan-400/30 flex items-center gap-2">
              <span className="text-blue-600 dark:text-cyan-400 font-bold text-xs select-none">!</span>
              <p className="text-[10.5px] text-[#334155] dark:text-slate-300 leading-normal font-sans">
                Notice: All audit sheets are cataloged directly from Hindmotor branch registers and sealed with authorized stamps. Physical register inspection requests can be filed via the portal <strong className="text-[#fbbf24]">amramanushfoundation.co.in</strong> or directly to <strong className="text-[#0F172A] dark:text-white">amramanushfoundation@gmail.com</strong>.
              </p>
            </div>

          </div>

        </div>

        {/* Dynamic, live-connected Google Drive Report Vault / Explorer */}
        <div className="mt-12">
          <GoogleDriveExplorer />
        </div>
        
        {/* FAQ Section */}
        <div className="mt-12">
            <FAQSection />
        </div>

      </div>
    </section>
  );
}
