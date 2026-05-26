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
  Mail
} from 'lucide-react';

const INDUSTRIES = [
  { id: 'hospitality', name: 'Hospitality', icon: Hotel, desc: 'Hotels & Resorts' },
  { id: 'corporate', name: 'Corporate', icon: Building2, desc: 'Offices & HQs' },
  { id: 'events', name: 'Events', icon: PartyPopper, desc: 'Weddings & Galas' },
  { id: 'retail', name: 'Luxury Retail', icon: Briefcase, desc: 'Showrooms' },
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
    whatsapp: '+91 '
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: '', whatsapp: '', email: '' });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleStepAdvance = (updatedSelections: typeof selections) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelections(updatedSelections);
    setTimeout(() => {
      setStep(s => s + 1);
      setIsTransitioning(false);
    }, 450);
  };

  const handleFinishClick = () => {
    const newErrors = { name: '', whatsapp: '', email: '' };
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

    setErrors(newErrors);

    if (!hasError) {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const message = [
        `Industry: ${selections.industry}`,
        `Volume: ${selections.volume} units/month`,
        `Customizations: ${selections.customization.length > 0 ? selections.customization.join(', ') : 'None specified'}`,
        `WhatsApp: ${selections.whatsapp}`,
        `Email: ${selections.email || 'None provided'}`,
      ].join('\n');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selections.name,
          whatsapp: selections.whatsapp,
          email: selections.email,
          company: selections.company,
          industry: selections.industry,
          volume: selections.volume,
          customization: selections.customization,
          message,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsSuccess(true);

      // Mobile-friendly direct location redirection to prevent mobile browsers from blocking popups
      const waText = encodeURIComponent(
        `Hi PureHarvest! I'm ${selections.name} from ${selections.company}.\n` +
        `Industry: ${selections.industry} | Volume: ${selections.volume}/month\n` +
        `Customization: ${selections.customization.length > 0 ? selections.customization.join(', ') : 'None'}\n` +
        `Please get in touch!`
      );
      
      setTimeout(() => {
        window.location.href = `https://wa.me/918149174975?text=${waText}`;
      }, 1500);

    } catch (err) {
      alert('Something went wrong. Please WhatsApp us directly at +91 8149174975');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="bg-[#F8F9FA] text-brand-accent py-32 relative overflow-hidden" id="onboarding">
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
              Enterprise Solutions
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.9]">
              Configure Your <br className="hidden md:block" /> <span className="text-brand-secondary">Brand Experience</span>
            </h2>
            <p className="text-brand-accent/40 text-[11px] font-bold uppercase tracking-[0.4em] mb-12">Institutional Tailoring</p>
            
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
          <div className="bg-white/60 backdrop-blur-3xl border border-black/[0.03] rounded-[48px] p-8 md:p-20 shadow-[0_32px_120px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-20"
                >
                  <div className="w-24 h-24 bg-brand-secondary/10 text-brand-secondary rounded-full flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={48} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-black tracking-tight">System Secured.</h3>
                    <p className="text-brand-accent/60 max-w-md mx-auto text-lg font-medium leading-relaxed">
                      Your configuration is being processed by our Enterprise Architect. Expect a direct connect for {selections.company} shortly.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent/40">
                      <ShieldCheck size={14} /> End-to-End Secure
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent/40">
                      <Globe size={14} /> Global Priority
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
                      <div className="text-center md:text-left space-y-2">
                        <h3 className="text-3xl font-black tracking-tight">Select Industry</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">What is your primary business sector?</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INDUSTRIES.map((ind) => (
                          <button
                            key={ind.id}
                            disabled={isTransitioning}
                            onClick={() => handleStepAdvance({ ...selections, industry: ind.id })}
                            className={`group p-8 rounded-[36px] border transition-all duration-700 flex flex-col items-start text-left gap-6 relative overflow-hidden ${
                              isTransitioning ? 'pointer-events-none' : ''
                            } ${
                              selections.industry === ind.id 
                                ? 'bg-brand-secondary border-brand-secondary shadow-[0_20px_50px_-10px_rgba(0,71,171,0.3)] scale-[1.03]' 
                                : 'bg-white/40 border-black/[0.05] hover:border-black/10 hover:shadow-2xl hover:scale-[1.01]'
                            }`}
                          >
                            {/* Inner Glow for selection */}
                            {selections.industry === ind.id && (
                              <motion.div 
                                layoutId="card-glow"
                                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                              />
                            )}
                            
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                              selections.industry === ind.id ? 'bg-white/20 text-white rotate-6' : 'bg-brand-secondary/5 text-brand-secondary'
                            }`}>
                              <ind.icon size={26} strokeWidth={1.5} />
                            </div>
                            <div className="relative z-10">
                              <div className={`font-black text-[13px] uppercase tracking-[0.1em] mb-1 ${selections.industry === ind.id ? 'text-white' : 'text-brand-accent'}`}>
                                {ind.name}
                              </div>
                              <div className={`text-[10px] font-bold uppercase tracking-widest transition-opacity ${selections.industry === ind.id ? 'text-white/60' : 'text-brand-accent/30'}`}>
                                {ind.desc}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-12">
                      <div className="text-center md:text-left space-y-2">
                        <h3 className="text-3xl font-black tracking-tight">Select Scale</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Estimated monthly volume requirement</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { id: 'small', label: '< 500', sub: 'Starter', icon: Droplets, scale: 1 },
                          { id: 'medium', label: '2k - 5k', sub: 'Growing', icon: Droplets, scale: 2 },
                          { id: 'large', label: '5k - 10k', sub: 'Enterprise', icon: Zap, scale: 1 },
                          { id: 'custom', label: '10k+', sub: 'Unlimited', icon: Globe, scale: 1 },
                        ].map((vol) => (
                          <button
                            key={vol.id}
                            disabled={isTransitioning}
                            onClick={() => handleStepAdvance({ ...selections, volume: vol.id })}
                            className={`group p-12 rounded-[40px] border transition-all duration-700 flex flex-col items-center text-center gap-8 relative overflow-hidden ${
                              isTransitioning ? 'pointer-events-none' : ''
                            } ${
                              selections.volume === vol.id 
                                ? 'bg-brand-secondary border-brand-secondary shadow-[0_32px_80px_-20px_rgba(0,71,171,0.4)] scale-[1.02]' 
                                : 'bg-white border-black/[0.02] hover:border-black/5 hover:shadow-2xl'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                              selections.volume === vol.id ? 'bg-white/10 text-white' : 'bg-brand-secondary/5 text-brand-secondary'
                            }`}>
                              <vol.icon size={20} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                              <div className={`text-3xl font-black tracking-tight transition-transform group-hover:scale-105 ${selections.volume === vol.id ? 'text-white' : 'text-brand-accent'}`}>
                                {vol.label}
                              </div>
                              <div className={`text-[9px] font-black uppercase tracking-[0.4em] ${selections.volume === vol.id ? 'text-white/40' : 'text-brand-accent/20'}`}>
                                {vol.sub}
                              </div>
                            </div>
                            
                            {/* Visual Scale Indicator */}
                            <div className="w-full flex gap-1.5 justify-center">
                              {[1, 2, 3, 4].map((i) => (
                                <div 
                                  key={i} 
                                  className={`h-1 rounded-full transition-all duration-700 ${
                                    selections.volume === vol.id 
                                      ? 'bg-white/20 w-3' 
                                      : 'bg-black/5 w-1.5'
                                  }`} 
                                />
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-12">
                      <div className="text-center md:text-left space-y-2">
                        <h3 className="text-3xl font-black tracking-tight">Add Extras</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">Special features for your brand</p>
                      </div>
                      <div className="flex flex-col items-center gap-8 w-full">
                        <div className="flex justify-center w-full">
                          {[
                            { id: 'etching', label: 'Logo Etching', desc: 'Permanent brand visibility.' }
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                const current = selections.customization;
                                setSelections({
                                  ...selections,
                                  customization: current.includes(opt.id) ? current.filter(i => i !== opt.id) : [...current, opt.id]
                                });
                              }}
                              className={`p-12 rounded-[36px] border transition-all duration-700 text-left flex flex-col justify-between h-[220px] w-full max-w-md relative overflow-hidden ${
                                selections.customization.includes(opt.id)
                                  ? 'bg-brand-secondary border-brand-secondary shadow-[0_20px_50px_-10px_rgba(0,71,171,0.3)] scale-[1.02]'
                                  : 'bg-white/40 border-black/[0.05] hover:border-black/10'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selections.customization.includes(opt.id) ? 'bg-white/20' : 'bg-brand-secondary/5'}`}>
                                <CheckCircle2 size={18} className={selections.customization.includes(opt.id) ? 'text-white' : 'text-brand-secondary'} />
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

                        {/* Subtle Apple-style skip button directly below the single centered card option */}
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

                  {step === 4 && (
                    <div className="space-y-12">
                      <div className="text-center md:text-left space-y-2">
                        <h3 className="text-3xl font-black tracking-tight">Your Details</h3>
                        <p className="text-brand-accent/40 font-bold uppercase tracking-widest text-[10px]">How can we reach you?</p>
                      </div>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1 w-full">
                            <input 
                              type="text" 
                              placeholder="Full Name" 
                              className={`w-full bg-white/50 border rounded-[24px] p-7 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-secondary transition-all shadow-sm ${
                                errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-black/5'
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
                            <input 
                              type="text" 
                              placeholder="Company Name" 
                              className="w-full bg-white/50 border border-black/5 rounded-[24px] p-7 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-secondary transition-all shadow-sm"
                              value={selections.company}
                              onChange={(e) => setSelections({ ...selections, company: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1 w-full relative group">
                            <div className="absolute left-7 top-1/2 -translate-y-1/2 flex items-center gap-3.5 pointer-events-none">
                              <MessageSquare className="text-brand-secondary transition-transform group-focus-within:scale-110" size={24} strokeWidth={1.5} />
                              <div className="h-6 w-[1px] bg-black/10 group-focus-within:bg-brand-secondary/30 transition-colors" />
                              <span className="text-sm font-black tracking-wider text-brand-accent/50 group-focus-within:text-brand-secondary transition-colors">
                                +91
                              </span>
                            </div>
                            <input 
                              type="tel" 
                              placeholder="WhatsApp Number" 
                              className={`w-full bg-white/50 border rounded-[24px] p-7 pl-32 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-secondary transition-all shadow-sm ${
                                errors.whatsapp ? 'border-red-500/80 focus:border-red-500' : 'border-black/5'
                              }`}
                              value={selections.whatsapp.replace(/^\+91\s*/, '')}
                              onChange={(e) => {
                                let rawValue = e.target.value;
                                // Strip all non-digits
                                let digits = rawValue.replace(/[^0-9]/g, '');
                                // If they paste/type a number with country code, strip the leading 91/0 prefix
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
                            {errors.whatsapp && (
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                {errors.whatsapp}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1 w-full relative group">
                            <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-brand-secondary transition-transform group-focus-within:scale-110" size={24} strokeWidth={1.5} />
                            <input 
                              type="email" 
                              placeholder="Email ID" 
                              className={`w-full bg-white/50 border rounded-[24px] p-7 pl-20 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-brand-secondary transition-all shadow-sm ${
                                errors.email ? 'border-red-500/80 focus:border-red-500' : 'border-black/5'
                              }`}
                              value={selections.email}
                              onChange={(e) => {
                                setSelections({ ...selections, email: e.target.value });
                                if (errors.email) setErrors({ ...errors, email: '' });
                              }}
                            />
                            {errors.email && (
                              <span className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-4 block mt-1">
                                {errors.email}
                              </span>
                            )}
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
              <div className="mt-24 flex items-center justify-between pt-12 border-t border-black/5">
                <button
                  onClick={prevStep}
                  className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent/30 hover:text-brand-accent transition-all ${
                    step === 1 ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  <ArrowLeft size={16} strokeWidth={3} /> Back
                </button>
                
                <button
                  disabled={
                    (step === 1 && !selections.industry) || 
                    (step === 2 && !selections.volume) ||
                    isSubmitting
                  }
                  onClick={step === 4 ? handleFinishClick : nextStep}
                  className={`
                    ${step === 4 ? 'bg-brand-secondary shadow-[0_20px_50px_-10px_rgba(0,71,171,0.3)]' : 'bg-brand-accent shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)]'} 
                    text-white px-14 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.3em] 
                    flex items-center gap-5 hover:scale-[1.05] active:scale-95 transition-all 
                    disabled:opacity-10 relative overflow-hidden group
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
                      {step === 4 ? 'Submit Details' : 'Continue'} 
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
              </div>
            )}
          </div>

          {/* Compliance Footer */}
          <div className="mt-16 text-center space-y-4">
            <div className="flex justify-center items-center gap-8 opacity-20 grayscale">
              <span className="text-[10px] font-black uppercase tracking-widest">ISO 9001</span>
              <span className="text-[10px] font-black uppercase tracking-widest">GDPR Secure</span>
              <span className="text-[10px] font-black uppercase tracking-widest">256-bit Build</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
