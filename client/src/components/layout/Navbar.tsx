'use client';

import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, Menu, X, ChevronRight, Phone, Globe, MessageCircle, Send } from 'lucide-react';

const navLinks = [
  { name: 'Solutions', id: 'services', desc: 'Expert logistics & branding' },
  { name: 'Our Brands', id: 'portfolio', desc: 'Luxury hydration collection' },
  { name: 'Impact', id: 'industries', desc: 'Sustainable brand authority' },
  { name: 'About Us', id: 'process', desc: 'The PureHarvest journey' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Smooth scroll progress for the top bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Apple/Zomato style zero-JS scroll tracking hooking directly into Framer's render loop
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only trigger React state updates when necessary to prevent layout thrashing
    const isScrolled = latest > 20;
    if (scrolled !== isScrolled) {
      setScrolled(isScrolled);
    }
  });

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    if (pathname !== '/') {
      router.push(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-secondary origin-left z-[100]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          top: (scrolled && !isMenuOpen) ? '20px' : '0px',
        }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          mass: 1,
          opacity: { duration: 0.4 }
        }}
        className={`fixed left-0 right-0 flex justify-center pointer-events-none ${isMenuOpen ? 'z-[200]' : 'z-[100]'}`}
      >
        <motion.div 
          layout
          className={`
            pointer-events-auto flex items-center justify-between transition-colors duration-300
            ${isMenuOpen 
              ? 'w-full px-6 py-5 bg-[#F2F2F7] border-b border-transparent' 
              : scrolled
                ? 'w-auto px-4 py-2 sm:px-5 lg:py-2 bg-white/95 md:bg-white/60 bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.2)_100%)] md:backdrop-blur-[40px] border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] rounded-full gap-4 sm:gap-6'
                : 'w-full max-w-[1400px] px-6 md:px-10 py-5 lg:py-6 bg-transparent border-b border-transparent'
            }
          `}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group active:scale-95 transition-transform"
          >
            <motion.div 
              layout 
              className={`relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500
                ${(scrolled && !isMenuOpen) ? 'w-8 h-8' : 'w-10 h-10'}
              `}
            >
              <Image 
                src="/logo.png" 
                alt="PureHarvest Logo" 
                width={40} 
                height={40} 
                className={`object-contain md:drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-500
                  ${(scrolled && !isMenuOpen) ? 'w-8 h-8' : 'w-10 h-10'}
                `}
                priority
              />
            </motion.div>
            <motion.span 
              layout
              className="text-[13px] font-sans font-black tracking-[0.1em] uppercase whitespace-nowrap transition-colors text-brand-accent hidden md:block"
            >
              PureHarvest
            </motion.span>
          </Link>

          {/* NAV LINKS (Desktop) */}
          <nav className={`hidden lg:flex items-center ${scrolled && !isMenuOpen ? 'gap-6' : 'gap-10'}`}>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                layout
                onClick={() => scrollTo(link.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  text-[10px] font-bold uppercase tracking-widest transition-all relative group focus:outline-none
                  ${scrolled ? 'text-brand-accent/60 hover:text-brand-accent' : 'text-brand-accent/60 hover:text-brand-accent'}
                `}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-secondary transition-all duration-300 group-hover:w-full`} />
              </motion.button>
            ))}
          </nav>

          {/* ACTION BUTTON & MOBILE TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              layout
              onClick={() => scrollTo('onboarding')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-1 sm:gap-1.5 rounded-full font-black uppercase tracking-widest transition-all shadow-lg group relative overflow-hidden bg-brand-accent text-white focus:outline-none
                ${(scrolled && !isMenuOpen) 
                  ? 'px-3 py-1.5 sm:px-5 sm:py-2 text-[8px] sm:text-[9px]' 
                  : 'px-4.5 py-2.5 sm:px-8 sm:py-3.5 text-[8.5px] sm:text-[9px]'
                }
              `}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative z-10">Inquire</span>
              <motion.div className="relative z-10" whileHover={{ x: 2, y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                <ArrowUpRight size={(scrolled && !isMenuOpen) ? 10 : 12} />
              </motion.div>
            </motion.button>

            {/* Mobile Menu Toggle (Apple Style) */}
            <motion.button
              layout
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.85 }}
              className={`rounded-full flex items-center justify-center transition-colors lg:hidden text-brand-accent focus:outline-none -webkit-tap-highlight-color-transparent
                ${isMenuOpen ? 'bg-black/10 w-9 h-9' : scrolled ? 'bg-black/5 hover:bg-black/10 w-8 h-8' : 'bg-black/5 hover:bg-black/10 w-9 h-9'}
              `}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <X size={16} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Menu size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* MOBILE MENU OVERLAY (Apple Style) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed inset-0 z-[150] lg:hidden bg-[#F2F2F7] flex flex-col pt-[100px] pb-10"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="flex-1 overflow-y-auto px-5 space-y-6">
              {/* Navigation Group */}
              <div className="bg-white rounded-[22px] divide-y divide-gray-100 overflow-hidden border border-black/[0.03] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(link.id)}
                    className="w-full flex items-center justify-between px-6 py-4.5 active:bg-gray-50 transition-colors group"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[17px] font-bold tracking-[-0.01em] text-black group-active:text-brand-secondary transition-colors">
                        {link.name}
                      </span>
                      <span className="text-[12px] text-[#8E8E93] font-medium tracking-tight">
                        {link.desc}
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-[#C7C7CC]" />
                  </motion.button>
                ))}
              </div>

              {/* Contact Group */}
              <div className="bg-white rounded-[22px] divide-y divide-gray-100 overflow-hidden border border-black/[0.03] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <a href="tel:+918149174975" className="w-full flex items-center gap-5 p-6 active:bg-gray-50 transition-colors">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
                    <Phone size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-widest mb-0.5">Direct Call</span>
                    <span className="text-[18px] font-black text-black tracking-tight">+91 81491 74975</span>
                  </div>
                </a>
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93]">
                      <Globe size={16} strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-bold text-black">Social Hub</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] active:scale-95 transition-transform">
                      <MessageCircle size={18} strokeWidth={2} />
                    </a>
                    <a href="https://www.instagram.com/pure_harvest.enterprise" target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#E1306C]/10 text-[#E1306C] active:scale-95 transition-transform">
                      <Globe size={18} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Area (Sleek Apple style pill button) */}
            <div className="px-5 mt-auto pt-6 pb-2 relative z-50">
              <button
                onClick={() => scrollTo('onboarding')}
                className="w-full bg-[#0B2147] text-white py-4.5 rounded-[18px] text-[15px] font-black uppercase tracking-[0.15em] shadow-[0_12px_24px_-8px_rgba(11,33,71,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowUpRight size={18} strokeWidth={2.5} className="relative z-10 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
