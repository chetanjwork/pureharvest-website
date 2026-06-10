'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 sm:p-14 max-w-lg w-full shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h2 className="text-white text-2xl font-bold tracking-wide mb-3">
          Experience Interrupted
        </h2>
        
        <p className="text-white/70 font-medium leading-relaxed mb-10 text-sm">
          We encountered an unexpected issue while preparing your hydration experience. Our engineering team has been notified.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-3.5 rounded-full bg-brand-secondary text-white font-semibold tracking-wide hover:bg-brand-secondary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold tracking-wide hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
