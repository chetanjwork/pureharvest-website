'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { 
  Building2, 
  Hotel, 
  PartyPopper, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
  Droplets,
  Mail,
  Upload,
  Copy,
  Calendar,
  Check
} from 'lucide-react';

const INDUSTRIES = [
  { id: 'hospitality', name: 'Hotels & Cafes', icon: Hotel, desc: 'Hotels, Resorts & Cafes' },
  { id: 'corporate', name: 'Offices', icon: Building2, desc: 'Offices & Workspaces' },
  { id: 'events', name: 'Events', icon: PartyPopper, desc: 'Weddings & Parties' },
  { id: 'retail', name: 'Shops', icon: Briefcase, desc: 'Shops & Showrooms' },
];

const VOLUMES = [
  { id: 'small', label: '< 500', sub: 'Units / Month' },
  { id: 'medium', label: '500 - 2k', sub: 'Units / Month' },
  { id: 'large', label: '2k - 10k', sub: 'Enterprise' },
  { id: 'custom', label: '10k+', sub: 'Custom Scale' },
];

function MolecularBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,71,171,0.015)_0%,_transparent_75%)]" />
    </div>
  );
}

export default function EnterpriseOnboarding() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    industry: '',
    volume: '',
    customization: [] as string[],
    name: '',
    company: '',
    email: '',
    whatsapp: '+91 ',
    city: 'Mumbai',
    customCity: '',
    logoName: '',
    logoBase64: '',
    requestSample: false,
    orderType: 'recurring', // 'recurring' or 'event'
    eventDate: '',
    gstNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: '', whatsapp: '', email: '', city: '', eventDate: '', customCity: '' });
  const [logoError, setLogoError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [refId, setRefId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleStepAdvance = (updatedSelections: typeof selections) => {
    setSelections(updatedSelections);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['png', 'jpg', 'jpeg', 'pdf', 'ai'];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    if (!fileExt || !validExtensions.includes(fileExt)) {
      setLogoError('Unsupported file type. Please upload PNG, JPG, PDF, or AI.');
      return;
    }
    setLogoError('');

    const reader = new FileReader();
    reader.onload = () => {
      setSelections(prev => {
        // Automatically check/select "mockup" in customizations when a logo is uploaded
        const currentCustomization = prev.customization;
        const newCustomization = currentCustomization.includes('mockup')
          ? currentCustomization
          : [...currentCustomization, 'mockup'];
        return {
          ...prev,
          logoName: file.name,
          logoBase64: reader.result as string,
          customization: newCustomization
        };
      });
    };
    reader.readAsDataURL(file);
  };

  const generateRefId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2); // "26"
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // "06"
    return `PH-${yy}${mm}-${randomPart}`;
  };

  const handleFinishClick = () => {
    const newErrors = { name: '', whatsapp: '', email: '', city: '', eventDate: '', customCity: '' };
    let hasError = false;

    const alphabetRegex = /^[a-zA-Z\s]+$/;
    if (!selections.name.trim()) {
      newErrors.name = 'Full Name is required';
      hasError = true;
    } else if (!alphabetRegex.test(selections.name.trim())) {
      newErrors.name = 'Name can only contain alphabetical letters and spaces';
      hasError = true;
    }

    const coreNumber = selections.whatsapp.slice(4).replace(/[^0-9]/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!coreNumber) {
      newErrors.whatsapp = 'WhatsApp Number is required';
      hasError = true;
    } else if (!indianPhoneRegex.test(coreNumber)) {
      newErrors.whatsapp = 'Please enter a valid 10-digit Indian mobile number';
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (selections.email.trim() && !emailRegex.test(selections.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!selections.city) {
      newErrors.city = 'Delivery city is required';
      hasError = true;
    }

    if (selections.city === 'Other' && !selections.customCity.trim()) {
      newErrors.customCity = 'Please specify your delivery city';
      hasError = true;
    }

    if (selections.orderType === 'event' && !selections.eventDate) {
      newErrors.eventDate = 'Event Date is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const newId = generateRefId();
    setRefId(newId);

    const finalCity = selections.city === 'Other' ? selections.customCity : selections.city;

    const message = [
      `Reference ID: ${newId}`,
      `Order Type: ${selections.orderType === 'event' ? 'One-Time Event Order' : 'Recurring Business Supply'}`,
      selections.orderType === 'event' ? `Event Date: ${selections.eventDate}` : null,
      `Industry: ${selections.industry}`,
      `Volume: ${selections.volume} units/month`,
      `Customizations: ${selections.customization.length > 0 ? selections.customization.join(', ') : 'None specified'}`,
      `Delivery City: ${finalCity}`,
      selections.gstNumber ? `GST Number: ${selections.gstNumber}` : null,
      `Sample Requested: ${selections.requestSample ? 'Yes' : 'No'}`,
      `Logo: ${selections.logoName || 'None uploaded'}`,
      `WhatsApp: ${selections.whatsapp}`,
      `Email: ${selections.email || 'None provided'}`,
    ].filter(Boolean).join('\n');

    const waText = encodeURIComponent(
      `Hi PureHarvest! I'm ${selections.name} from ${selections.company}.\n` +
      `Reference ID: ${newId}\n` +
      `Order Type: ${selections.orderType === 'event' ? 'One-Time Event' : 'Recurring Supply'}\n` +
      (selections.orderType === 'event' ? `Event Date: ${selections.eventDate}\n` : '') +
      `Industry: ${selections.industry} | Volume: ${selections.volume}\n` +
      `City: ${finalCity}\n` +
      (selections.gstNumber ? `GST: ${selections.gstNumber}\n` : '') +
      `Sample: ${selections.requestSample ? 'Yes' : 'No'} | Logo: ${selections.logoName || 'None'}\n` +
      `Please prepare a custom B2B quotation for us!`
    );
    
    setWhatsappUrl(`https://wa.me/918149174975?text=${waText}`);
    setIsSuccess(true);
    setIsSubmitting(false);

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refId: newId,
        leadSource: 'Website Form',
        name: selections.name,
        whatsapp: selections.whatsapp,
        email: selections.email,
        company: selections.company,
        industry: selections.industry,
        volume: selections.volume,
        customization: selections.customization,
        city: selections.city,
        orderType: selections.orderType,
        eventDate: selections.eventDate,
        gstNumber: selections.gstNumber,
        requestSample: selections.requestSample,
        logoName: selections.logoName,
        logoBase64: selections.logoBase64,
        message,
      }),
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Background submission failed:', errorData);
      }
    })
    .catch((err) => {
      console.error('Background submission error:', err);
    });
  };

  return (
    <Section className="bg-[#F8F9FA] text-brand-accent py-16 md:py-20 lg:py-24 relative overflow-hidden" id="onboarding">
      <MolecularBackground />
      
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-brand-secondary/5 text-brand-secondary border border-brand-secondary/10 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8"
            >
               <Zap size={10} fill="currentColor" />
               Get Enterprise Design & Pricing Mockups
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
              Request Custom <br className="hidden md:block" /> <span className="text-brand-secondary">B2B Brand Quotation</span>
            </h2>
            <p className="text-brand-accent/40 text-[11px] font-bold uppercase tracking-[0.4em] mb-12">Same Business Day Response | BIS Approved & FSSAI Compliant</p>
            
            {/* Progress Bar */}
            <div className="max-w-xs mx-auto flex items-center gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex-1 relative">
                  <div className={`h-1 rounded-full transition-all duration-700 ${s <= step ? 'bg-brand-secondary' : 'bg-black/5'}`} />
                  {s === step && (
                    <motion.div 
                      layoutId="active-dot"
                      className="absolute -top-1 -right-1 w-3 h-3 bg-brand-secondary rounded-full border-2 border-[#F8F9FA] shadow-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Interface */}
          <div className="bg-white/95 md:bg-white/80 md:backdrop-blur-xl border border-white/50 rounded-[48px] p-6 md:p-20 shadow-xl md:shadow-2xl relative overflow-hidden flex flex-col min-h-[400px] md:min-h-[500px]">
            
            <AnimatePresence mode="popLayout" custom={step}>
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-10 py-10 md:py-16"
                >
                  <div className="w-20 h-20 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={40} strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-4 max-w-xl">
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight text-brand-accent">
                      Request Received Successfully
                    </h3>
                    <p className="text-brand-accent/50 font-bold uppercase tracking-widest text-[11px] max-w-md mx-auto leading-relaxed">
                      We will review your inquiry and get back to you within 24 hours (Same business day response).
                    </p>
                    
                    <div className="inline-block bg-[#0A1128]/5 border border-black/[0.04] rounded-3xl px-8 py-4 mt-4 relative">
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-accent/40 block mb-1">
                        Quotation Reference ID
                      </span>
                      <span className="text-2xl font-black tracking-widest text-[#0A1128] font-mono">
                        {refId}
                      </span>
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="w-full max-w-2xl bg-white border border-black/5 rounded-[36px] p-6 md:p-8 space-y-6 shadow-sm">
                    <div className="text-center space-y-2">
                      <h4 className="font-black text-xs uppercase tracking-wider text-brand-secondary">
                        How would you like to continue?
                      </h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/30">
                        Choose your preferred channel for quotation review
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                      {/* WhatsApp Option */}
                      <div className="bg-[#25D366]/5 rounded-3xl p-5 border border-[#25D366]/10 flex flex-col justify-between items-center text-center gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#25D366]">Fastest Response</span>
                          <h5 className="text-sm font-black uppercase tracking-wider text-brand-accent">Chat via WhatsApp</h5>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/40 leading-relaxed">
                            Connect instantly with our account executive and receive your layout mockup immediately.
                          </p>
                        </div>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all shadow-[0_12px_30px_-5px_rgba(37,211,102,0.3)] w-full"
                        >
                          <MessageSquare size={14} fill="currentColor" />
                          Open WhatsApp
                        </a>
                      </div>

                      {/* Email Option */}
                      <div className="bg-[#0A1128]/5 rounded-3xl p-5 border border-black/[0.04] flex flex-col justify-between items-center text-center gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#0A1128]/40">Corporate Protocol</span>
                          <h5 className="text-sm font-black uppercase tracking-wider text-brand-accent">Official Procurement Email</h5>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/40 leading-relaxed">
                            Share brand guidelines and receive official PDF quotation via email.
                          </p>
                        </div>
                        <div className="w-full space-y-2">
                          <div className="bg-white border border-black/5 px-4 py-3 rounded-xl text-center select-all">
                            <span className="text-[11px] font-bold text-brand-accent/80 font-mono">
                              pureharvestenterprise@gmail.com
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('pureharvestenterprise@gmail.com');
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="bg-[#0A1128] text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all w-full"
                          >
                            {copied ? (
                              <>
                                <Check size={14} />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy size={14} />
                                Copy Email Address
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What Happens Next Timeline */}
                  <div className="w-full max-w-4xl border-t border-black/5 pt-10">
                    <div className="text-center mb-8">
                      <span className="text-brand-secondary font-black tracking-[0.25em] uppercase text-[9px] mb-2 block">
                        Our Process
                      </span>
                      <h4 className="text-xl font-black uppercase tracking-tight text-brand-accent">
                        What Happens Next?
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      <div className="bg-white/60 border border-black/5 rounded-3xl p-5 flex gap-4 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 font-sans font-black text-xs">
                          1
                        </div>
                        <div>
                          <h5 className="font-black text-[11px] uppercase tracking-wider text-brand-accent mb-1">Quotation Calculation</h5>
                          <p className="text-[10px] font-medium text-brand-accent/60 leading-relaxed">
                            Our wholesale team reviews your target volume and budget metrics to prepare a customized commercial rate offer.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/60 border border-black/5 rounded-3xl p-5 flex gap-4 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 font-sans font-black text-xs">
                          2
                        </div>
                        <div>
                          <h5 className="font-black text-[11px] uppercase tracking-wider text-brand-accent mb-1">Free Brand Layout Mockup</h5>
                          <p className="text-[10px] font-medium text-brand-accent/60 leading-relaxed">
                            Our designers process your uploaded brand files to generate high-resolution layout preview models.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/60 border border-black/5 rounded-3xl p-5 flex gap-4 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 font-sans font-black text-xs">
                          3
                        </div>
                        <div>
                          <h5 className="font-black text-[11px] uppercase tracking-wider text-brand-accent mb-1">Physical Sample Box</h5>
                          <p className="text-[10px] font-medium text-brand-accent/60 leading-relaxed">
                            We dispatch printed glass sample bottles to your physical premises so you can evaluate the water and print quality.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6 pt-4 border-t border-black/5 w-full max-w-xs justify-center">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-accent/40">
                      <ShieldCheck size={12} /> End-to-End Secure
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-brand-accent/40">
                      <Globe size={12} /> Global Priority
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  {step === 1 && (
                    <div className="space-y-12">
                      {/* Order Type Selector */}
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-accent">What kind of order is this?</h3>
                          <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Do you need water for a one-time event or regular daily supply?</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                          <button
                            type="button"
                            onClick={() => setSelections(prev => ({ ...prev, orderType: 'recurring' }))}
                            className={`p-5 rounded-[28px] border transition-all duration-300 text-left flex items-start gap-4 ${
                              selections.orderType === 'recurring'
                                ? 'bg-[#0A1128] border-[#0A1128] text-white shadow-lg shadow-brand-primary/10'
                                : 'bg-white border-black/5 hover:border-black/15 text-brand-accent'
                            }`}
                          >
                            <div className={`mt-1 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              selections.orderType === 'recurring' ? 'border-[#D4AF37]' : 'border-black/20'
                            }`}>
                              {selections.orderType === 'recurring' && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                            </div>
                            <div>
                              <div className="font-black text-xs uppercase tracking-wider mb-1">Regular Supply</div>
                              <div className={`text-[10px] font-bold uppercase tracking-widest transition-opacity leading-relaxed ${selections.orderType === 'recurring' ? 'text-white/60' : 'text-brand-accent/40'}`}>
                                Daily or Weekly Deliveries
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelections(prev => ({ ...prev, orderType: 'event' }))}
                            className={`p-5 rounded-[28px] border transition-all duration-300 text-left flex items-start gap-4 ${
                              selections.orderType === 'event'
                                ? 'bg-[#0A1128] border-[#0A1128] text-white shadow-lg shadow-brand-primary/10'
                                : 'bg-white border-black/5 hover:border-black/15 text-brand-accent'
                            }`}
                          >
                            <div className={`mt-1 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              selections.orderType === 'event' ? 'border-[#D4AF37]' : 'border-black/20'
                            }`}>
                              {selections.orderType === 'event' && <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />}
                            </div>
                            <div>
                              <div className="font-black text-xs uppercase tracking-wider mb-1">One-Time Event</div>
                              <div className={`text-[10px] font-bold uppercase tracking-widest transition-opacity leading-relaxed ${selections.orderType === 'event' ? 'text-white/60' : 'text-brand-accent/40'}`}>
                                For Weddings, Parties, & Conferences
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-12">
                      <div>
                        <div className="text-center space-y-2 mb-6">
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-accent">Select your industry</h3>
                          <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Helps us tailor the bottle design and branding</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                          {INDUSTRIES.map((ind) => (
                            <button
                              key={ind.id}
                              type="button"
                              onClick={() => setSelections(prev => ({ ...prev, industry: ind.id }))}
                              className={`group p-4 md:p-6 rounded-[20px] md:rounded-[32px] border transition-all duration-500 flex flex-col items-center text-center gap-3 md:gap-5 relative overflow-hidden ${
                                selections.industry === ind.id 
                                  ? 'bg-[#0A1128] border-[#0A1128] shadow-[0_20px_50px_-10px_rgba(10,17,40,0.4)] scale-[1.02]' 
                                  : 'bg-white md:bg-white/50 border-black/5 hover:border-black/15 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1'
                              }`}
                            >
                              <div className={`p-3 rounded-[14px] md:rounded-[18px] transition-colors duration-500 flex items-center justify-center ${
                                selections.industry === ind.id ? 'bg-white/10 text-[#D4AF37]' : 'bg-[#F8F9FA] text-brand-accent group-hover:bg-white group-hover:shadow-sm'
                              }`}>
                                <ind.icon strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
                              </div>
                              <div className="space-y-1 w-full">
                                <h4 className={`font-black uppercase tracking-wider text-[10px] md:text-sm leading-tight transition-colors duration-500 ${
                                  selections.industry === ind.id ? 'text-white' : 'text-brand-accent group-hover:text-[#0A1128]'
                                }`}>
                                  {ind.name}
                                </h4>
                                <p className={`text-[8px] md:text-[10px] font-bold tracking-widest uppercase leading-tight transition-colors duration-500 ${
                                  selections.industry === ind.id ? 'text-white/50' : 'text-brand-accent/40'
                                }`}>
                                  {ind.desc}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-12">
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-accent">Estimated Volume</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Select your monthly water requirement</p>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {[
                          { id: 'small', label: '< 500', sub: 'Small Order', icon: Droplets, scale: 1 },
                          { id: 'medium', label: '2k - 5k', sub: 'Medium Order', icon: Droplets, scale: 2 },
                          { id: 'large', label: '5k - 10k', sub: 'Large Order', icon: Zap, scale: 1 },
                          { id: 'custom', label: '10k+', sub: 'Very Large', icon: Globe, scale: 1 },
                        ].map((vol) => (
                          <button
                            key={vol.id}
                            onClick={() => setSelections(prev => ({ ...prev, volume: vol.id }))}
                            className={`group p-4 md:p-6 rounded-[20px] md:rounded-[32px] border transition-all duration-500 flex flex-col items-center text-center gap-3 md:gap-5 relative overflow-hidden ${
                              selections.volume === vol.id 
                                ? 'bg-[#0A1128] border-[#0A1128] shadow-[0_20px_50px_-10px_rgba(10,17,40,0.4)] scale-[1.02]' 
                                : 'bg-white md:bg-white/50 border-black/5 hover:border-black/15 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1'
                            }`}
                          >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-[14px] md:rounded-[18px] flex items-center justify-center transition-all duration-500 ${
                              selections.volume === vol.id ? 'bg-[#D4AF37]/20 text-[#D4AF37] rotate-6' : 'bg-[#0A1128]/5 text-[#0A1128]'
                            }`}>
                              <vol.icon strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <div className="space-y-1 w-full">
                              <div className={`text-lg md:text-3xl font-black tracking-tight whitespace-nowrap transition-transform group-hover:scale-105 ${selections.volume === vol.id ? 'text-white' : 'text-brand-accent'}`}>
                                {vol.label}
                              </div>
                              <div className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] ${selections.volume === vol.id ? 'text-white/40' : 'text-brand-accent/20'}`}>
                                {vol.sub}
                              </div>
                            </div>
                            
                            {/* Visual Scale Indicator */}
                            <div className="w-full flex gap-1 justify-center mt-auto pt-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div 
                                  key={i} 
                                  className={`h-1 rounded-full transition-all duration-700 ${
                                    selections.volume === vol.id 
                                      ? 'bg-white/20 w-2 md:w-3' 
                                      : 'bg-black/5 w-1 md:w-1.5'
                                  }`} 
                                />
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-12">
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-accent">Add Extras</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Special features for your brand</p>
                      </div>
                      <div className="flex flex-col items-center gap-8 w-full">
                        <div className="flex justify-center w-full">
                          {[
                            { id: 'mockup', label: 'Visual Brand Mockup', desc: 'Upload your logo and we will send your premium custom bottle design.' }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                const current = selections.customization;
                                setSelections({
                                  ...selections,
                                  customization: current.includes(opt.id) ? current.filter(i => i !== opt.id) : [...current, opt.id]
                                });
                              }}
                              className={`p-6 md:p-12 rounded-[36px] border transition-all duration-500 text-left flex flex-col justify-between h-[220px] w-full max-w-md relative overflow-hidden ${
                                selections.customization.includes(opt.id)
                                  ? 'bg-[#0A1128] border-[#0A1128] shadow-[0_20px_50px_-10px_rgba(10,17,40,0.4)] scale-[1.02]'
                                  : 'bg-white md:bg-white/50 border-black/5 hover:border-black/15 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selections.customization.includes(opt.id) ? 'bg-[#D4AF37]/20' : 'bg-[#0A1128]/5'}`}>
                                <CheckCircle2 size={18} className={selections.customization.includes(opt.id) ? 'text-[#D4AF37]' : 'text-[#0A1128]'} />
                              </div>
                              <div>
                                <div className={`font-black text-sm uppercase tracking-wider mb-2 ${selections.customization.includes(opt.id) ? 'text-white' : 'text-brand-accent'}`}>
                                  {opt.label}
                                </div>
                                <div className={`text-[11px] font-bold uppercase tracking-widest transition-opacity ${selections.customization.includes(opt.id) ? 'text-white/50' : 'text-brand-accent/30'}`}>
                                  {opt.desc}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Logo Upload dropzone shown in Step 3 */}
                        <div className="w-full max-w-lg space-y-2 mt-4">
                          <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1 block text-center">
                            Brand Logo File
                          </label>
                          <div className="relative group">
                            <label className="flex items-center justify-between border border-dashed border-black/15 hover:border-brand-secondary/40 rounded-2xl p-4 cursor-pointer bg-white md:bg-white/40 hover:bg-white transition-all shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#0A1128]/5 flex items-center justify-center text-brand-accent/50 group-hover:text-brand-secondary transition-colors">
                                  <Upload size={14} />
                                </div>
                                <div className="text-left">
                                  <span className="text-xs font-black uppercase tracking-wider text-brand-accent block truncate max-w-[150px] sm:max-w-[200px]">
                                    {selections.logoName || 'Upload Logo File'}
                                  </span>
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-accent/30 block">
                                    {selections.logoName ? 'Click to change file' : 'Click to select logo'}
                                  </span>
                                </div>
                              </div>
                              <input 
                                type="file" 
                                accept=".png,.jpg,.jpeg,.pdf,.ai" 
                                className="hidden" 
                                onChange={handleLogoChange}
                              />
                            </label>
                          </div>
                          {logoError && (
                            <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1 text-center">
                                {logoError}
                            </span>
                          )}
                        </div>

                        {/* Subtle Apple-style skip button directly below the cards */}
                        <button
                          onClick={() => {
                            setSelections({ ...selections, customization: [] });
                            nextStep();
                          }}
                          className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-accent/30 hover:text-brand-secondary active:scale-95 transition-all focus:outline-none cursor-pointer mt-2"
                        >
                          Skip this step
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-8 text-left">
                      {/* Configuration Summary Card */}
                      <div className="bg-[#0A1128]/5 rounded-3xl p-6 border border-black/[0.04]">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-secondary mb-4">
                          Your Selected Configuration
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent/40 block">Order Type</span>
                            <span className="text-xs font-black uppercase tracking-wider text-brand-accent">
                              {selections.orderType === 'event' ? 'One-Time Event' : 'Recurring Supply'}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent/40 block">Business Sector</span>
                            <span className="text-xs font-black uppercase tracking-wider text-brand-accent">
                              {INDUSTRIES.find(i => i.id === selections.industry)?.name || selections.industry || 'None selected'}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent/40 block">Estimated Volume</span>
                            <span className="text-xs font-black uppercase tracking-wider text-brand-accent">
                              {selections.volume === 'small' && '< 500 units/mo'}
                              {selections.volume === 'medium' && '2k - 5k units/mo'}
                              {selections.volume === 'large' && '5k - 10k units/mo'}
                              {selections.volume === 'custom' && '10k+ units/mo'}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-brand-accent/40 block">
                              {selections.orderType === 'event' ? 'Event Date' : 'Customizations'}
                            </span>
                            <span className="text-xs font-black uppercase tracking-wider text-brand-accent truncate block">
                              {selections.orderType === 'event' 
                                ? (selections.eventDate ? new Date(selections.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not set')
                                : (selections.customization.length > 0 ? selections.customization.map(c => c === 'etching' ? 'Logo Etching' : c).join(', ') : 'None')}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-accent">Final Details</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Where should we send your quotation and samples?</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        {/* LEFT COLUMN: Contact Details */}
                        <div className="space-y-5">
                          <div className="text-[10px] font-black uppercase tracking-widest text-brand-secondary border-b border-black/5 pb-2">
                            Contact Information
                          </div>
                          
                          <div className="space-y-1 w-full">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1">Full Name</label>
                            <input 
                              type="text" 
                              placeholder="Full Name" 
                              className={`w-full bg-white md:bg-white/40 border rounded-2xl py-4.5 px-5 text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm ${
                                errors.name ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-black/[0.06] hover:border-black/15'
                              }`}
                              value={selections.name}
                              onChange={(e) => {
                                const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                                setSelections({ ...selections, name: cleanValue });
                                if (errors.name) setErrors({ ...errors, name: '' });
                              }}
                            />
                            {errors.name && (
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                {errors.name}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1 w-full">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1">Company Name</label>
                            <input 
                              type="text" 
                              placeholder="Company Name" 
                              className="w-full bg-white md:bg-white/40 border border-black/[0.06] hover:border-black/15 rounded-2xl py-4.5 px-5 text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                              value={selections.company}
                              onChange={(e) => setSelections({ ...selections, company: e.target.value })}
                            />
                          </div>

                          <div className="space-y-1 w-full">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1">GST Number (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="27AAAAA0000A1Z5" 
                              className="w-full bg-white md:bg-white/40 border border-black/[0.06] hover:border-black/15 rounded-2xl py-4.5 px-5 text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                              value={selections.gstNumber}
                              onChange={(e) => setSelections({ ...selections, gstNumber: e.target.value.toUpperCase() })}
                            />
                          </div>

                          <div className="space-y-1 w-full relative group">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1">WhatsApp Number</label>
                            <div className="relative">
                              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3.5 pointer-events-none">
                                <MessageSquare className="text-[#0A1128]/30 transition-transform group-focus-within:scale-110 group-focus-within:text-[#D4AF37]" size={22} strokeWidth={1.8} />
                                <div className="h-6 w-[1px] bg-black/10 group-focus-within:bg-[#D4AF37]/40 transition-colors" />
                                <span className="text-sm font-black tracking-wider text-brand-accent/40 group-focus-within:text-[#0A1128] transition-colors">
                                  +91
                                </span>
                              </div>
                              <input 
                                type="tel" 
                                placeholder="WhatsApp Number" 
                                className={`w-full bg-white md:bg-white/40 border rounded-2xl py-4.5 pr-5 pl-[104px] text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm ${
                                  errors.whatsapp ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-black/[0.06] hover:border-black/15'
                                }`}
                                value={selections.whatsapp.replace(/^\+91\s*/, '')}
                                onChange={(e) => {
                                  let rawValue = e.target.value;
                                  let digits = rawValue.replace(/[^0-9]/g, '');
                                  if (digits.startsWith('91') && digits.length > 10) {
                                    digits = digits.slice(2);
                                  } else if (digits.startsWith('0') && digits.length > 10) {
                                    digits = digits.slice(1);
                                  }
                                  const cleanValue = digits.slice(0, 10);
                                  setSelections({ ...selections, whatsapp: '+91 ' + cleanValue });
                                  if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                                }}
                              />
                            </div>
                            {errors.whatsapp && (
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                {errors.whatsapp}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1 w-full relative group">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1">Email ID</label>
                            <div className="relative">
                              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0A1128]/30 transition-transform group-focus-within:scale-110 group-focus-within:text-[#D4AF37]" size={22} strokeWidth={1.8} />
                              <input 
                                type="email" 
                                placeholder="Email ID" 
                                className={`w-full bg-white md:bg-white/40 border rounded-2xl py-4.5 pr-5 pl-14 text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm ${
                                  errors.email ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-black/[0.06] hover:border-black/15'
                                }`}
                                value={selections.email}
                                onChange={(e) => {
                                  setSelections({ ...selections, email: e.target.value });
                                  if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                              />
                            </div>
                            {errors.email && (
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* RIGHT COLUMN: Order Details */}
                        <div className="space-y-5">
                          <div className="text-[10px] font-black uppercase tracking-widest text-brand-secondary border-b border-black/5 pb-2">
                            Procurement Details
                          </div>

                          <div className="space-y-1 w-full">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1 block">Delivery City</label>
                            <select 
                              value={selections.city}
                              onChange={(e) => {
                                setSelections({ ...selections, city: e.target.value });
                                if (errors.city) setErrors({ ...errors, city: '' });
                              }}
                              className="w-full bg-white md:bg-white/40 border border-black/[0.06] hover:border-black/15 rounded-2xl py-4.5 px-5 text-sm font-semibold text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm"
                            >
                              <option value="Mumbai">Mumbai</option>
                              <option value="Thane">Thane</option>
                              <option value="Pune">Pune</option>
                              <option value="Other">Other (Custom Delivery)</option>
                            </select>
                          </div>

                          {selections.city === 'Other' && (
                            <motion.div 
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-1 w-full"
                            >
                              <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1">Specify Location / City</label>
                              <input 
                                type="text" 
                                placeholder="Enter city name (e.g. Delhi, Bangalore)" 
                                className={`w-full bg-white md:bg-white/40 border rounded-2xl py-4.5 px-5 text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm ${
                                  errors.customCity ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-black/[0.06] hover:border-black/15'
                                }`}
                                value={selections.customCity}
                                onChange={(e) => {
                                  setSelections({ ...selections, customCity: e.target.value });
                                  if (errors.customCity) setErrors({ ...errors, customCity: '' });
                                }}
                              />
                              {errors.customCity && (
                                <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                  {errors.customCity}
                                </span>
                              )}
                            </motion.div>
                          )}



                          {selections.orderType === 'event' && (
                            <div className="space-y-1 w-full relative">
                              <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1 block">Event Date</label>
                              <div className="relative">
                                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0A1128]/30 pointer-events-none" size={20} strokeWidth={1.8} />
                                <input 
                                  type="date" 
                                  className={`w-full bg-white md:bg-white/40 border rounded-2xl py-4.5 pr-5 pl-14 text-sm font-semibold uppercase tracking-wider text-brand-accent focus:bg-white focus:outline-none focus:border-[#0A1128] focus:ring-1 focus:ring-[#0A1128] transition-all shadow-sm ${
                                    errors.eventDate ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500' : 'border-black/[0.06] hover:border-black/15'
                                  }`}
                                  value={selections.eventDate}
                                  min={new Date().toISOString().split('T')[0]} // prevent past dates
                                  onChange={(e) => {
                                    setSelections({ ...selections, eventDate: e.target.value });
                                    if (errors.eventDate) setErrors({ ...errors, eventDate: '' });
                                  }}
                                />
                              </div>
                              {errors.eventDate && (
                                <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                  {errors.eventDate}
                                </span>
                              )}
                            </div>
                          )}

                          <div className="space-y-1 w-full">
                            <label className="text-[10px] uppercase tracking-widest font-black text-brand-accent/60 ml-1 block">
                              Brand Logo (PNG, JPG, PDF, AI)
                            </label>
                            <div className="relative group">
                              <label className="flex items-center justify-between border border-dashed border-black/15 hover:border-brand-secondary/40 rounded-2xl p-4 cursor-pointer bg-white md:bg-white/40 hover:bg-white transition-all shadow-sm">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#0A1128]/5 flex items-center justify-center text-brand-accent/50 group-hover:text-brand-secondary transition-colors">
                                    <Upload size={14} />
                                  </div>
                                  <div className="text-left">
                                    <span className="text-xs font-black uppercase tracking-wider text-brand-accent block truncate max-w-[150px] sm:max-w-[200px]">
                                      {selections.logoName || 'Upload Logo File'}
                                    </span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-brand-accent/30 block">
                                      {selections.logoName ? 'Click to change file' : 'Click to select logo'}
                                    </span>
                                  </div>
                                </div>
                                <input 
                                  type="file" 
                                  accept=".png,.jpg,.jpeg,.pdf,.ai" 
                                  className="hidden" 
                                  onChange={handleLogoChange}
                                />
                              </label>
                            </div>
                            {logoError && (
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                  {logoError}
                              </span>
                            )}
                          </div>

                          <div className="pt-2">
                            <label className="flex items-center gap-3.5 p-4 rounded-2xl bg-white md:bg-white/30 border border-black/5 hover:border-brand-secondary/20 cursor-pointer transition-all select-none shadow-sm">
                              <input 
                                type="checkbox"
                                checked={selections.requestSample}
                                onChange={(e) => setSelections({ ...selections, requestSample: e.target.checked })}
                                className="rounded border-black/10 text-brand-secondary focus:ring-brand-secondary h-4.5 w-4.5 cursor-pointer"
                              />
                              <div className="text-left">
                                <span className="text-xs font-black uppercase tracking-wider text-brand-accent block">
                                  Request Physical Sample Bottle
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-accent/30 block leading-tight">
                                  Get a free sample sent to your address to inspect quality
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interface Footer Actions */}
            {!isSuccess && (
              <div className="relative mt-auto pt-8 md:pt-12 flex flex-row items-center justify-center border-t border-black/5 w-full z-20">
                {step > 1 && (
                  <div className="absolute left-0">
                    <button
                      onClick={prevStep}
                      className="flex items-center justify-center w-12 h-12 md:w-auto md:h-auto md:gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent/30 hover:text-brand-accent transition-all bg-black/5 md:bg-transparent rounded-full md:rounded-none"
                    >
                      <ArrowLeft size={16} strokeWidth={3} /> <span className="hidden md:inline">Back</span>
                    </button>
                  </div>
                )}
                
                <div className="flex flex-col items-center w-full max-w-sm">
                  <button
                    disabled={
                      (step === 2 && !selections.industry) || 
                      (step === 3 && !selections.volume) ||
                      isSubmitting
                    }
                    onClick={step === 5 ? handleFinishClick : nextStep}
                    className={`
                      ${step === 5 ? 'bg-[#0A1128] shadow-[0_20px_50px_-10px_rgba(10,17,40,0.3)]' : 'bg-[#0A1128] shadow-[0_20px_50px_-10px_rgba(10,17,40,0.2)]'} 
                      text-white w-full md:w-auto md:px-14 py-5 md:py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] 
                      flex items-center justify-center gap-5 hover:scale-[1.05] active:scale-95 transition-all 
                      disabled:bg-black/5 disabled:text-black/30 disabled:shadow-none disabled:hover:scale-100 disabled:pointer-events-none relative overflow-hidden group
                    `}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                          <Sparkles size={16} />
                        </motion.div>
                        Processing...
                      </span>
                    ) : (
                      <>
                        {step === 5 ? 'Request Quotation' : 'Continue'} 
                        <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    {/* Shimmer Effect */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                    />
                  </button>

                  {step === 5 && (
                    <div className="hidden md:block text-[9px] font-black uppercase tracking-widest text-[#0D47A1] mt-2 text-right">
                      ⚡ Same Business Day Response
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* What Happens Next Trust Panel */}
          {!isSuccess && step === 5 && (
            <div className="mt-20 border-t border-black/5 pt-16">
              <div className="text-center mb-10">
                <span className="text-brand-secondary font-black tracking-[0.25em] uppercase text-[9px] mb-3 block">
                  Process Flow
                </span>
                <h4 className="text-2xl font-black uppercase tracking-tight text-brand-accent">
                  What Happens Next?
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white md:bg-white/40 border border-black/5 rounded-3xl p-6 flex gap-5 hover:scale-[1.01] transition-transform shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 font-sans font-black text-sm">
                    1
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-wider text-brand-accent mb-1.5">Quotation Calculation</h5>
                    <p className="text-[11px] font-medium text-brand-accent/60 leading-relaxed">
                      Our wholesale team reviews your target volume and budget metrics to prepare a customized commercial rate offer.
                    </p>
                  </div>
                </div>

                <div className="bg-white md:bg-white/40 border border-black/5 rounded-3xl p-6 flex gap-5 hover:scale-[1.01] transition-transform shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 font-sans font-black text-sm">
                    2
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-wider text-brand-accent mb-1.5">Free Brand Layout Mockup</h5>
                    <p className="text-[11px] font-medium text-brand-accent/60 leading-relaxed">
                      Our designers process your uploaded brand files to generate high-resolution layout preview models.
                    </p>
                  </div>
                </div>

                <div className="bg-white md:bg-white/40 border border-black/5 rounded-3xl p-6 flex gap-5 hover:scale-[1.01] transition-transform shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 font-sans font-black text-sm">
                    3
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-wider text-brand-accent mb-1.5">Physical Sample Box</h5>
                    <p className="text-[11px] font-medium text-brand-accent/60 leading-relaxed">
                      We dispatch printed glass sample bottles to your physical premises so you can evaluate the water and print quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compliance & Trust Badges Footer */}
          <div className="mt-16 text-center space-y-4">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 opacity-60">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent/60 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-brand-secondary" /> BIS Approved
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent/60 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-brand-secondary" /> FSSAI Compliant
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-accent/60 flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-brand-secondary" /> Premium Bottle Quality
              </span>
            </div>
            <div className="flex justify-center items-center gap-8 opacity-20 grayscale pt-4 border-t border-black/5 max-w-xs mx-auto">
              <span className="text-[9px] font-black uppercase tracking-widest">ISO 9001</span>
              <span className="text-[9px] font-black uppercase tracking-widest">GDPR Secure</span>
              <span className="text-[9px] font-black uppercase tracking-widest">256-bit Build</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
