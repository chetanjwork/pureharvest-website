'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="py-20 bg-[#F8F9FA] text-brand-accent relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-8 mb-20 relative z-10">
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-xl">
                <Image 
                  src="/logo.png" 
                  alt="PureHarvest Logo" 
                  width={48} 
                  height={48} 
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-black tracking-widest uppercase text-brand-accent">PureHarvest</span>
            </div>
            <p className="text-brand-accent/60 text-sm max-w-sm leading-relaxed mb-6 font-medium">
              Premium custom branded water. We deliver custom glass bottles and pure, refreshing water for hotels, offices, cafes, and celebrations.
            </p>
            <div className="text-brand-accent/60 text-[11px] uppercase tracking-[0.2em] font-black flex flex-col gap-1.5">
              <span>GST NO: 27GVMPD4986B1ZA</span>
              <span>FSSAI: [Add Placeholder License Number]</span>
            </div>
          </div>
          
          {/* Column 2: Contact */}
          <div className="space-y-6">
            <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/60">Contact</h4>
            <ul className="space-y-5">
              <li>
                <a href="mailto:hello@pureharvestenterprises.com" className="text-brand-accent/70 text-sm font-bold hover:text-brand-accent hover:translate-x-1 inline-block transition-all">
                  hello@pureharvestenterprises.com
                </a>
              </li>
              <li>
                <a href="tel:+918149174975" className="text-brand-accent/70 text-sm font-bold hover:text-brand-accent hover:translate-x-1 inline-block transition-all">
                  Phone: +91 81491 74975
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Information */}
          <div className="space-y-6">
            <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/60">Information</h4>
            <ul className="space-y-5">
              <li><Link href="/faq" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Frequently Asked Qs</Link></li>
              <li><Link href="/privacy" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Social */}
          <div className="space-y-6">
            <h4 className="text-brand-accent font-black text-xs uppercase tracking-[0.3em] text-brand-accent/60">Social</h4>
            <ul className="space-y-5">
              <li><a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/pure_harvest.enterprise" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Instagram</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61588658160297" target="_blank" rel="noopener noreferrer" className="text-brand-accent/70 text-sm hover:text-brand-accent hover:translate-x-1 inline-block transition-all font-bold">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-brand-accent/60 text-[9px] uppercase tracking-[0.3em] font-black text-center md:text-left leading-relaxed max-w-md">
            © 2026 PureHarvest Enterprises. <br className="md:hidden" />Crafted for Excellence.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-brand-accent/70 hover:text-brand-accent transition-colors"
              aria-label="Scroll to top"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] font-black">Back to Top</span>
              <div className="w-6 h-6 rounded-full border border-brand-accent/20 group-hover:border-brand-accent flex items-center justify-center transition-colors">
                <svg className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </div>
            </button>
            
            <div className="hidden md:block w-[1px] h-4 bg-brand-accent/10" />
            
            <div className="flex gap-4 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-black/20 md:hidden" />
              <span className="text-brand-accent/60 text-[9px] uppercase tracking-[0.3em] font-black">All Rights Reserved</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
