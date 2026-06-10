'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="pt-24 pb-28 md:py-24 bg-brand-accent text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      
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
              <span className="text-2xl font-semibold tracking-wide text-white">PureHarvest</span>
            </div>
            <p className="text-white/70 text-[14px] max-w-sm leading-relaxed mb-8 font-medium">
              We supply premium custom-branded glass water bottles for hotels, restaurants, cafes, and offices.
            </p>
            <div className="text-white/50 text-[13px] font-medium tracking-wide flex flex-col gap-2">
              <span>GST: 27GVMPD4986B1ZA</span>
              <span>FSSAI: 22724024000854</span>
            </div>
          </div>
          
          {/* Column 2: Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-medium text-[13px] tracking-wider opacity-60">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:pureharvestenterprise@gmail.com" className="text-white/80 text-[14px] font-medium hover:text-white inline-block transition-all break-all">
                  pureharvestenterprise@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918149174975" className="text-white/80 text-[14px] font-medium hover:text-white inline-block transition-all">
                  +91 81491 74975
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Locations & Coverage */}
          <div className="space-y-6">
            <h4 className="text-white font-medium text-[13px] tracking-wider opacity-60">Locations</h4>
            <ul className="space-y-4">
              <li><Link href="/mumbai" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Mumbai</Link></li>
              <li><Link href="/pune" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Pune</Link></li>
              <li><Link href="/bangalore" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Bangalore</Link></li>
              <li><Link href="/delhi" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Delhi NCR</Link></li>
              <li><Link href="/hotels" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">All India Hotels</Link></li>
            </ul>
          </div>

          {/* Column 4: Information & Social */}
          <div className="space-y-6">
            <h4 className="text-white font-medium text-[13px] tracking-wider opacity-60">Information</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">FAQs</Link></li>
              <li><Link href="/privacy" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Terms of Service</Link></li>
              <li><a href="https://wa.me/918149174975" target="_blank" rel="noopener noreferrer" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/pure_harvest.enterprise" target="_blank" rel="noopener noreferrer" className="text-white/80 text-[14px] hover:text-white inline-block transition-all font-medium">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <p className="text-white/50 text-[13px] tracking-wide font-medium text-left leading-relaxed max-w-md">
            © 2026 PureHarvest Enterprises. <br className="md:hidden" />Crafted for Excellence.
          </p>
          
          <div className="flex gap-4 items-center">
            <span className="text-white/50 text-[13px] tracking-wide font-medium">All rights reserved.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
