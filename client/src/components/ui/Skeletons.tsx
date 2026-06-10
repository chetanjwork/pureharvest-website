import React from 'react';

export const ConfiguratorSkeleton = () => (
  <div className="w-full min-h-200 py-24 flex flex-col items-center justify-center bg-[#F8F9FA]">
    <div className="w-full max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 animate-pulse">
      {/* Left side: Bottle silhouette */}
      <div className="w-full flex justify-center items-center h-125">
        <div className="w-30 md:w-45 h-100 md:h-150 bg-black/5 rounded-full" />
      </div>
      {/* Right side: Controls */}
      <div className="w-full flex flex-col justify-center space-y-8">
        <div className="w-3/4 h-12 bg-black/5 rounded-lg" />
        <div className="w-1/2 h-6 bg-black/5 rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-16 bg-black/5 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const PortfolioSkeleton = () => (
  <div className="w-full py-32 flex flex-col items-center bg-black animate-pulse">
    <div className="w-64 h-12 bg-white/10 rounded-lg mb-16" />
    <div className="w-full max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="w-full aspect-[4/5] bg-white/5 rounded-3xl" />
      ))}
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="w-full py-32 flex items-center justify-center bg-[#F8F9FA] animate-pulse">
    <div className="w-full max-w-3xl h-150 bg-white rounded-[48px] shadow-sm border border-black/5 p-8 md:p-16 flex flex-col space-y-8">
      <div className="w-1/2 h-10 bg-black/5 rounded-lg self-center" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-full h-24 bg-black/5 rounded-3xl" />
        ))}
      </div>
      <div className="w-full h-16 bg-black/5 rounded-2xl mt-auto" />
    </div>
  </div>
);
