'use client';

import { useState } from 'react';
import Container from '../ui/Container';
import Section from '../ui/Section';
import Heading from '../ui/Heading';
import MotionWrapper from '../motion/MotionWrapper';
import { Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 1500);
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
                <MapPin size={18} />
              </div>
              <p className="font-medium text-brand-accent/80 text-sm">Aptewadi, Krishna Nagar, Swaraj NX, Shop No. 4, Badlapur East</p>
            </div>
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

        <div className="bg-black/[0.02] border border-black/5 backdrop-blur-xl p-10 md:p-12 rounded-[40px]">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto text-[#25D366]">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold">Inquiry Sent</h3>
              <p className="text-brand-accent/60 font-medium">Thank you. Our team will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Full Name</label>
                  <input required type="text" placeholder="Arjun Sharma" className="w-full px-6 py-4 rounded-2xl bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium" value={formData.name} onChange={(e) => {
                    const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    setFormData({ ...formData, name: cleanValue });
                  }} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Email</label>
                  <input required type="email" placeholder="arjun@enterprise.com" className="w-full px-6 py-4 rounded-2xl bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Company</label>
                <input type="text" placeholder="Organization Name" className="w-full px-6 py-4 rounded-2xl bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/60 ml-1">Message</label>
                <textarea required rows={4} placeholder="Describe your requirements..." className="w-full px-6 py-4 rounded-2xl bg-black/[0.03] border border-black/10 text-brand-accent placeholder:text-brand-accent/40 focus:outline-none focus:border-brand-accent/40 transition-all font-medium resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-brand-accent/90 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
