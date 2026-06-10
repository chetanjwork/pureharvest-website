'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#0B2147] m-0 p-0">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 sm:p-14 max-w-lg w-full shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V14M12 18H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h2 className="text-white text-2xl font-bold tracking-wide mb-3">
              System Interrupted
            </h2>
            
            <p className="text-white/70 font-medium leading-relaxed mb-10 text-sm">
              A critical error occurred while rendering the application layout. Our engineering team has been automatically notified.
            </p>
            
            <button
              onClick={() => reset()}
              className="px-8 py-3.5 rounded-full bg-[#0066FF] text-white font-semibold tracking-wide hover:bg-[#0052cc] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Attempt Recovery
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
