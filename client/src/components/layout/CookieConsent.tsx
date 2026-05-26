'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem('ph_cookie_consent');
      if (!consent) setVisible(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem('ph_cookie_consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('ph_cookie_consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-xl"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="flex items-center justify-between gap-4 bg-brand-primary border border-black/[0.08] rounded-2xl px-5 py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.08),_0_1px_0_rgba(255,255,255,0.8)_inset]">
            
            {/* Text */}
            <p className="text-brand-accent/60 text-[11px] font-medium leading-relaxed flex-1 min-w-0">
              We use cookies to make your experience better.{' '}
              <Link
                href="/privacy"
                className="text-brand-secondary font-bold hover:underline underline-offset-2 transition-colors"
              >
                Privacy Policy ↗
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={decline}
                className="text-[9px] font-black uppercase tracking-widest text-brand-accent/30 hover:text-brand-accent/60 transition-colors cursor-pointer px-3 py-2"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="text-[9px] font-black uppercase tracking-widest bg-brand-accent text-brand-primary px-5 py-2.5 rounded-full hover:bg-brand-accent/90 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                Accept
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
