import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function WhatsAppButton() {
  const { language } = useLanguage();
  const phoneNumber = "916289536580";
  const message = language === 'bn' 
    ? "নমস্কার, আমি আমরা মানুষ ফাউন্ডেশনের সাথে যোগাযোগ করতে চাই।" 
    : "Hello, I would like to connect with Amra Manush Foundation regarding donations/volunteering.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white dark:bg-[#1A2332] text-[#0F172A] dark:text-white text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        {language === 'bn' ? 'আমাদের সাথে যোগাযোগ করুন' : 'Connect with us'}
      </span>
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </motion.a>
  );
}
