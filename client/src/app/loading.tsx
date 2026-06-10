export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center p-4">
      {/* Branding Logo or Pulse */}
      <div className="relative w-20 h-20 mb-8 animate-pulse">
        <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-black tracking-widest text-sm uppercase">PH</span>
        </div>
      </div>
      
      {/* Loading Text */}
      <h2 className="text-white text-xl font-bold tracking-wider uppercase mb-2">
        Loading Excellence
      </h2>
      <p className="text-white/60 font-medium tracking-wide text-sm">
        Preparing your premium hydration experience...
      </p>
    </div>
  );
}
