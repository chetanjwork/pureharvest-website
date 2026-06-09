'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="pt-24 pb-28 md:py-24 bg-brand-accent text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-12 md:gap-8 mb-12 md:mb-20 relative z-10">
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
              <span className="text-2xl font-black tracking-widest uppercase text-white">PureHarvest</span>
            </div>
            <p className="text-white/70 text-sm max-w-sm leading-relaxed mb-6 font-medium">
              We supply premium custom-branded glass water bottles for hotels, restaurants, cafes, and offices.
            </p>
            <div className="text-white/50 text-[11px] uppercase tracking-[0.2em] font-black flex flex-col gap-1.5">
              <span>GST NO: 27GVMPD4986B1ZA</span>
              <span>FSSAI NO: 22724024000854</span>
            </div>
          </div>
          
          {/* Column 2: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] opacity-40">Contact</h4>
            <ul className="space-y-5">
              <li>
                <a href="mailto:hello@pureharvestenterprises.com" className="text-white/80 text-sm font-bold hover:text-brand-secondary hover:translate-x-1 inline-block transition-all break-all">
                  hello@pureharvestenterprises.com
                </a>
              </li>
              <li>
                <a href="tel:+918149174975" className="text-white/80 text-sm font-bold hover:text-brand-secondary hover:translate-x-1 inline-block transition-all">
                  Phone: +91 81491 74975
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Information */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] opacity-40">Information</h4>
            <ul className="space-y-5">
              <li><Link href="/faq" className="text-white/80 text-sm hover:text-brand-secondary hover:translate-x-1 inline-block transition-all font-bold">Frequently Asked Qs</Link></li>
              <li><Link href="/privacy" className="text-white/80 text-sm hover:text-brand-secondary hover:translate-x-1 inline-block transition-all font-bold">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/80 text-sm hover:text-brand-secondary hover:translate-x-1 inline-block transition-all font-bold">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Social */}
          <div className="space-y-6">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] opacity-40">Social</h4>
            <ul className="space-y-5">
              <li><a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm hover:text-brand-secondary hover:translate-x-1 inline-block transition-all font-bold">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/pure_harvest.enterprise" target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm hover:text-brand-secondary hover:translate-x-1 inline-block transition-all font-bold">Instagram</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61588658160297" target="_blank" rel="noopener noreferrer" className="text-white/80 text-sm hover:text-brand-secondary hover:translate-x-1 inline-block transition-all font-bold">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <p className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-black text-left leading-relaxed max-w-md">
            © 2026 PureHarvest Enterprises. <br className="md:hidden" />Crafted for Excellence.
          </p>
          
          <div className="flex gap-4 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-white/60 text-[9px] uppercase tracking-[0.3em] font-black">All Rights Reserved</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
