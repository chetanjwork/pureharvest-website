'use client';

import { useState } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import MotionWrapper from '../motion/MotionWrapper';
import { Mail, MapPin, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Indian Mobile Number Validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setPhoneError('');
    
    setStatus('loading');
    
    // Capture data
    const payload = {
      refId: `CONTACT-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      leadSource: 'Contact Form',
      targetSheet: 'Sheet2'
    };

    try {
      // Run the network request AND an artificial 2-second delay in parallel
      const [response] = await Promise.all([
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }),
        new Promise(resolve => setTimeout(resolve, 2000)) // Guarantee 2-3 seconds of "Sending..."
      ]);

      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  return (
    <Section className="bg-brand-primary text-brand-accent py-24" id="contact">
      <Container className="grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <span className="text-brand-accent font-medium tracking-widest uppercase text-xs mb-4 block">Contact Us</span>
          <Heading level={2} className="mb-8">Let's Craft Your <br />Brand Experience</Heading>
          <p className="text-brand-accent/60 text-lg leading-relaxed mb-12 font-medium max-w-lg">
            Let's make something premium together. Our team is ready to design and deliver custom bottles that your clients and guests will love.
          </p>
          
          <div className="space-y-8">

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-brand-accent/40 group-hover:text-brand-accent transition-colors">
                <Mail size={18} />
              </div>
              <p className="font-medium text-brand-accent/80 text-sm">pureharvestenterprise@gmail.com</p>
            </div>
            <a href="https://wa.me/918149174975" target="_blank" className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full border border-[#25D366]/20 bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <MessageSquare size={18} />
              </div>
              <p className="font-medium text-brand-accent/80 text-sm group-hover:text-brand-accent transition-colors">+91 8149174975 ↗</p>
            </a>
          </div>
        </div>

        <div className="bg-[#F8F9FA] md:bg-black/[0.02] border border-black/5 md:backdrop-blur-xl p-10 md:p-12 rounded-[40px] overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="py-16 text-center space-y-6"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.15, stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto text-[#25D366]"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h3 className="text-3xl font-bold mb-2">Inquiry Sent</h3>
                  <p className="text-brand-accent/60 font-medium text-lg">Thank you. Our team will contact you shortly.</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Full Name</label>
                    <input disabled={status === 'loading'} required type="text" placeholder="Arjun Sharma" className="w-full px-6 py-4 rounded-2xl bg-[#F8F9FA] md:bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium disabled:opacity-50" value={formData.name} onChange={(e) => {
                      const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      setFormData({ ...formData, name: cleanValue });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Email</label>
                    <input disabled={status === 'loading'} required type="email" placeholder="arjun@enterprise.com" className="w-full px-6 py-4 rounded-2xl bg-[#F8F9FA] md:bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium disabled:opacity-50" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-accent/40 font-medium">+91</span>
                      <input disabled={status === 'loading'} required type="tel" maxLength={10} placeholder="9876543210" className={`w-full pl-16 pr-6 py-4 rounded-2xl bg-[#F8F9FA] md:bg-black/[0.03] border ${phoneError ? 'border-red-500' : 'border-black/10'} text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium disabled:opacity-50`} value={formData.phone} onChange={(e) => {
                        const cleanValue = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, phone: cleanValue });
                        if (phoneError) setPhoneError('');
                      }} />
                    </div>
                    {phoneError && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{phoneError}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Company</label>
                    <input disabled={status === 'loading'} type="text" placeholder="Organization Name" className="w-full px-6 py-4 rounded-2xl bg-[#F8F9FA] md:bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium disabled:opacity-50" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Message</label>
                  <textarea disabled={status === 'loading'} required rows={4} placeholder="Describe your requirements..." className="w-full px-6 py-4 rounded-2xl bg-[#F8F9FA] md:bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium resize-none disabled:opacity-50" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <button type="submit" disabled={status === 'loading'} className={`w-full bg-brand-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${status === 'loading' ? 'opacity-90 scale-[0.98]' : 'hover:bg-brand-accent/90 active:scale-[0.98]'}`}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin text-white/80" />
                      <span className="text-white/80">Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
