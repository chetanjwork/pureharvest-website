'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, Menu, X, ChevronRight, Phone, Globe, MessageCircle } from 'lucide-react';

const navLinks = [
  { name: 'Solutions', id: 'services', desc: 'Expert logistics & branding' },
  { name: 'Our Brands', id: 'portfolio', desc: 'Luxury hydration collection' },
  { name: 'Impact', id: 'industries', desc: 'Sustainable brand authority' },
  { name: 'About Us', id: 'process', desc: 'The PureHarvest journey' }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const pathname = usePathname();
  const router = useRouter();

  // ─── ZERO-RENDER SCROLL ANIMATIONS (COMPOSITOR THREAD) ────────────────────
  // We map scroll position to CSS values. This bypasses React re-renders entirely.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  // Navbar Container
  const navMaxWidth = useTransform(scrollY, [0, 60], ["1280px", isMobile ? "92%" : "800px"]);
  const navPaddingY = useTransform(scrollY, [0, 60], ["24px", "10px"]);
  const navPaddingX = useTransform(scrollY, [0, 60], ["24px", "20px"]);
  const navRadius = useTransform(scrollY, [0, 60], ["0px", "999px"]);
  const navBg = useTransform(scrollY, [0, 60], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);
  const navBorder = useTransform(scrollY, [0, 60], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.6)"]);
  const navShadow = useTransform(scrollY, [0, 60], ["0px 0px 0px rgba(0,0,0,0)", "0px 8px 30px rgba(0,0,0,0.12)"]);
  const navY = useTransform(scrollY, [0, 60], [0, 16]); // Drops down slightly on scroll

  // Logo
  const logoSize = useTransform(scrollY, [0, 60], [40, 32]);
  
  // Wordmark ("PureHarvest") - fades and collapses
  const wordmarkOpacity = useTransform(scrollY, [0, 30], [1, 0]);
  const wordmarkWidth = useTransform(scrollY, [0, 60], ["150px", "0px"]);

  // CTA Button
  const ctaPaddingX = useTransform(scrollY, [0, 60], ["32px", "20px"]);
  const ctaPaddingY = useTransform(scrollY, [0, 60], ["14px", "8px"]);
  const ctaTextSize = useTransform(scrollY, [0, 60], ["13px", "11px"]);


  // Lock body scroll when mobile menu is open
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
        className="fixed top-0 left-0 right-0 h-0.5 bg-brand-secondary origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <header className={`fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-[100]`}>
        {/* We apply the y transform to the wrapper to move the whole pill down slightly when scrolling */}
        <motion.div
          style={{ y: isMenuOpen ? 0 : navY }}
          className="w-full flex justify-center will-change-transform transform-gpu"
        >
          <motion.div 
            className={`
              pointer-events-auto flex items-center justify-between mx-auto
              ${isMenuOpen ? '!w-full !max-w-none !bg-[#F2F2F7] !px-6 !py-5 !rounded-none !shadow-none !border-transparent' : ''}
            `}
            style={{ 
              width: "100%",
              maxWidth: isMenuOpen ? "100%" : navMaxWidth,
              paddingTop: isMenuOpen ? "20px" : navPaddingY,
              paddingBottom: isMenuOpen ? "20px" : navPaddingY,
              paddingLeft: isMenuOpen ? "24px" : navPaddingX,
              paddingRight: isMenuOpen ? "24px" : navPaddingX,
              borderRadius: isMenuOpen ? "0px" : navRadius,
              backgroundColor: isMenuOpen ? "#F2F2F7" : navBg,
              borderColor: isMenuOpen ? "transparent" : navBorder,
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: isMenuOpen ? "none" : navShadow,
              backdropFilter: isMenuOpen ? "none" : "blur(12px)", // Native CSS backdrop-filter is hardware accelerated
              WebkitBackdropFilter: isMenuOpen ? "none" : "blur(12px)",
              willChange: "transform, max-width, padding, background-color, border-radius",
            }}
          >
            {/* LOGO AREA */}
            <Link
              href="/"
              className="flex items-center gap-3 group active:scale-95 transition-transform"
            >
              <motion.div 
                className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                style={{ width: logoSize, height: logoSize }}
              >
                <Image 
                  src="/logo.png" 
                  alt="PureHarvest Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              {/* Desktop Wordmark (animates out on scroll) */}
              <motion.span 
                className="font-sans font-black tracking-widest uppercase whitespace-nowrap text-brand-accent hidden md:block overflow-hidden"
                style={{ 
                  opacity: isMenuOpen ? 1 : wordmarkOpacity, 
                  width: isMenuOpen ? "150px" : wordmarkWidth,
                  fontSize: "13px"
                }}
              >
                PureHarvest
              </motion.span>
            </Link>

            {/* NAV LINKS (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-[10px] font-bold uppercase tracking-widest transition-all relative group focus:outline-none text-brand-accent/70 hover:text-brand-accent"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-brand-secondary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* ACTION BUTTON & MOBILE TOGGLE */}
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.button
                onClick={() => scrollTo('onboarding')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 rounded-full font-black uppercase tracking-widest transition-all shadow-lg group relative overflow-hidden bg-brand-accent text-white focus:outline-none"
                style={{
                  paddingTop: isMenuOpen ? "14px" : ctaPaddingY,
                  paddingBottom: isMenuOpen ? "14px" : ctaPaddingY,
                  paddingLeft: isMenuOpen ? "32px" : ctaPaddingX,
                  paddingRight: isMenuOpen ? "32px" : ctaPaddingX,
                }}
              >
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <motion.span className="relative z-10" style={{ fontSize: isMenuOpen ? "13px" : ctaTextSize }}>Inquire</motion.span>
                <motion.div className="relative z-10" whileHover={{ x: 2, y: -2 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <ArrowUpRight strokeWidth={2.5} size={isMobile ? 12 : 14} />
                </motion.div>
              </motion.button>

              {/* Mobile Menu Toggle (Apple Style) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="rounded-full flex items-center justify-center transition-colors lg:hidden text-brand-accent focus:outline-none -webkit-tap-highlight-color-transparent bg-black/5 hover:bg-black/10 w-10 h-10 md:w-11 md:h-11 shrink-0"
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
              </button>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* MOBILE MENU OVERLAY (Apple Style) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] lg:hidden bg-[#F2F2F7] flex flex-col pt-[85px] pb-10"
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="flex-1 overflow-y-auto px-5 space-y-4 pt-4">
              {/* Navigation Group */}
              <div className="bg-white rounded-[22px] divide-y divide-gray-100 overflow-hidden border border-black/5 shadow-sm">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(link.id)}
                    className="w-full flex items-center justify-between px-5 py-4 active:bg-gray-50 transition-colors group"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-base font-bold text-black group-active:text-brand-secondary transition-colors">
                        {link.name}
                      </span>
                      <span className="text-[11px] text-[#8E8E93] font-medium tracking-tight">
                        {link.desc}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-[#C7C7CC]" />
                  </motion.button>
                ))}
              </div>

              {/* Contact Group */}
              <div className="bg-white rounded-[22px] divide-y divide-gray-100 overflow-hidden border border-black/5 shadow-sm">
                <a href="tel:+918149174975" className="w-full flex items-center gap-4 p-5 active:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
                    <Phone size={16} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[#8E8E93] uppercase tracking-[0.2em] mb-1">Direct Call</span>
                    <span className="text-base font-black text-black tracking-tight">+91 81491 74975</span>
                  </div>
                </a>
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93]">
                      <Globe size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold text-black">Social Hub</span>
                  </div>
                  <div className="flex gap-3">
                    <a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] active:scale-95 transition-transform">
                      <MessageCircle size={16} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Area */}
            <div className="px-5 mt-auto pt-6 pb-2 relative z-50">
              <button
                onClick={() => scrollTo('onboarding')}
                className="w-full bg-[#0B2147] text-white py-4.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <ArrowUpRight size={16} strokeWidth={2.5} className="relative z-10 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
