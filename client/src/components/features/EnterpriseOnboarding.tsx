'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { 
  Building2, 
  Hotel, 
  PartyPopper, 
  Briefcase, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Upload
} from 'lucide-react';

const INDUSTRIES = [
  { id: 'hospitality', name: 'Hotels & Cafes', icon: Hotel, desc: 'Hotels, Resorts & Cafes' },
  { id: 'corporate', name: 'Offices', icon: Building2, desc: 'Offices & Workspaces' },
  { id: 'events', name: 'Events', icon: PartyPopper, desc: 'Weddings & Parties' },
  { id: 'retail', name: 'Shops', icon: Briefcase, desc: 'Shops & Showrooms' },
];

function MolecularBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,71,171,0.015)_0%,_transparent_75%)]" />
    </div>
  );
}

export default function EnterpriseOnboarding() {
  const [selections, setSelections] = useState({
    industry: '',
    volume: '',
    customization: [] as string[],
    name: '',
    company: '',
    email: '',
    whatsapp: '+91 ',
    city: '',
    customCity: '',
    logoName: '',
    logoBase64: '',
    requestSample: false,
    orderType: 'recurring', // 'recurring' or 'event'
    eventDate: '',
    gstNumber: '',
    _honey: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({ 
    name: '', whatsapp: '', email: '', city: '', 
    eventDate: '', customCity: '', industry: '', volume: '' 
  });
  const [logoError, setLogoError] = useState('');

  const [refId, setRefId] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

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

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    let digits = rawValue.replace(/[^0-9]/g, '');
    if (digits.startsWith('91') && digits.length > 10) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length > 10) {
      digits = digits.slice(1);
    }
    const cleanValue = digits.slice(0, 10);
    setSelections({ ...selections, whatsapp: '+91 ' + cleanValue });
    if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
  };

  const handleFinishClick = () => {
    const newErrors = { name: '', whatsapp: '', email: '', city: '', eventDate: '', customCity: '', industry: '', volume: '' };
    let hasError = false;

    if (!selections.industry) {
      newErrors.industry = 'Industry is required';
      hasError = true;
    }

    if (selections.orderType === 'recurring' && !selections.volume) {
      newErrors.volume = 'Volume is required';
      hasError = true;
    }

    if (selections.orderType === 'event' && !selections.eventDate) {
      newErrors.eventDate = 'Event Date is required';
      hasError = true;
    }

    const alphabetRegex = /^[a-zA-Z\s]+$/;
    if (!selections.name.trim()) {
      newErrors.name = 'Full Name is required';
      hasError = true;
    } else if (!alphabetRegex.test(selections.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
      hasError = true;
    }

    const coreNumber = selections.whatsapp.slice(4).replace(/[^0-9]/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;

    if (!coreNumber) {
      newErrors.whatsapp = 'WhatsApp Number is required';
      hasError = true;
    } else if (!indianPhoneRegex.test(coreNumber)) {
      newErrors.whatsapp = 'Please enter a valid 10-digit mobile number';
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

    setErrors(newErrors);

    if (!hasError) {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const newId = generateRefId();
    setRefId(newId);

    const finalCity = selections.city === 'Other' ? selections.customCity : selections.city;

    const message = [
      `Reference ID: ${newId}`,
      `Order Type: ${selections.orderType === 'event' ? 'One-Time Event Order' : 'Recurring Business Supply'}`,
      selections.orderType === 'event' ? `Event Date: ${selections.eventDate}` : null,
      `Industry: ${selections.industry}`,
      selections.orderType === 'recurring' ? `Volume: ${selections.volume} units/month` : null,
      `Delivery City: ${finalCity}`,
      `Logo: ${selections.logoName || 'None uploaded'}`,
      `WhatsApp: ${selections.whatsapp}`,
      `Email: ${selections.email || 'None provided'}`,
    ].filter(Boolean).join('\n');

    const waText = encodeURIComponent(
      `Hi PureHarvest! I'm ${selections.name} from ${selections.company}.\n` +
      `Reference ID: ${newId}\n` +
      `Order Type: ${selections.orderType === 'event' ? 'One-Time Event' : 'Recurring Supply'}\n` +
      (selections.orderType === 'event' ? `Event Date: ${selections.eventDate}\n` : '') +
      `Industry: ${selections.industry} ${selections.orderType === 'recurring' ? `| Volume: ${selections.volume}` : ''}\n` +
      `City: ${finalCity}\n` +
      `Logo: ${selections.logoName || 'None'}\n` +
      `Please prepare a custom B2B quotation for us!`
    );
    
    setWhatsappUrl(`https://wa.me/918149174975?text=${waText}`);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _honey: selections._honey,
          refId: newId,
          leadSource: 'Website Form',
          name: selections.name,
          whatsapp: selections.whatsapp,
          email: selections.email,
          company: selections.company,
          industry: selections.industry,
          volume: selections.volume,
          city: selections.city,
          orderType: selections.orderType,
          eventDate: selections.eventDate,
          logoName: selections.logoName,
          logoBase64: selections.logoBase64,
          message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      console.error('Submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-black/10 py-3 text-[15px] font-medium text-[#0A1128] focus:outline-none focus:border-[#0A1128] transition-colors placeholder:text-[#0A1128]/30 placeholder:font-normal appearance-none rounded-none";
  const errorInputClasses = "w-full bg-transparent border-b border-red-500 py-3 text-[15px] font-medium text-[#0A1128] focus:outline-none focus:border-red-500 transition-colors placeholder:text-[#0A1128]/30 placeholder:font-normal appearance-none rounded-none";

  return (
    <Section className="bg-white text-[#0A1128] py-20 relative overflow-hidden font-sans" id="onboarding">
      <MolecularBackground />
      
      <Container className="relative z-10 max-w-[800px] mx-auto">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-8 py-16"
            >
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              
              <div className="space-y-4 max-w-lg">
                <h3 className="text-3xl md:text-4xl font-light tracking-tight text-brand-accent">
                  Inquiry Received
                </h3>
                <p className="text-brand-accent/60 text-lg">
                  We will review your details and get back to you within 24 hours.
                </p>
                
                <div className="mt-8 border-t border-black/5 pt-8">
                  <span className="text-sm uppercase tracking-widest text-brand-accent/40 block mb-2">
                    Reference ID
                  </span>
                  <span className="text-2xl tracking-widest text-[#0A1128] font-mono">
                    {refId}
                  </span>
                </div>
              </div>

              <div className="w-full max-w-sm pt-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white px-6 py-4 rounded-none text-sm font-medium uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-colors w-full"
                >
                  <MessageSquare size={18} />
                  Follow up via WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Header */}
              <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                <h2 className="text-[40px] md:text-[56px] font-light tracking-tight text-[#0A1128] leading-tight">
                  Request a Quotation
                </h2>
                <p className="text-[#0A1128]/40 text-lg md:text-[19px] leading-relaxed max-w-xl mx-auto">
                  Submit your details below and our team will prepare a custom pricing proposal and design mockup for your brand.
                </p>
              </div>

              {/* Form Container */}
              <div className="max-w-[700px] mx-auto space-y-16">
                
                {/* 1. Order Details */}
                <div className="space-y-8">
                  <div className="border-b border-black/5 pb-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A1128]/40">Order Details</h3>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A1128]/40">Order Type</label>
                      <div className="flex gap-6 pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="orderType" 
                            checked={selections.orderType === 'recurring'} 
                            onChange={() => {
                              setSelections({...selections, orderType: 'recurring', eventDate: ''});
                              setErrors({...errors, volume: '', eventDate: ''});
                            }}
                            className="w-[18px] h-[18px] text-[#2F6EEB] focus:ring-[#2F6EEB] border-black/20"
                          />
                          <span className={`text-[15px] ${selections.orderType === 'recurring' ? 'text-[#0A1128] font-medium' : 'text-[#0A1128]/60 group-hover:text-[#0A1128]'}`}>Regular Supply</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer group ml-2">
                          <input 
                            type="radio" 
                            name="orderType" 
                            checked={selections.orderType === 'event'} 
                            onChange={() => {
                              setSelections({...selections, orderType: 'event', volume: ''});
                              setErrors({...errors, volume: '', eventDate: ''});
                            }}
                            className="w-[18px] h-[18px] text-[#2F6EEB] focus:ring-[#2F6EEB] border-black/20"
                          />
                          <span className={`text-[15px] ${selections.orderType === 'event' ? 'text-[#0A1128] font-medium' : 'text-[#0A1128]/60 group-hover:text-[#0A1128]'}`}>One-Time Event</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                      <div className="space-y-1">
                        <select 
                          value={selections.industry} 
                          onChange={(e) => {
                            setSelections({...selections, industry: e.target.value});
                            if (errors.industry) setErrors({...errors, industry: ''});
                          }} 
                          className={`${errors.industry ? errorInputClasses : inputClasses} ${!selections.industry ? 'text-[#0A1128]/40 font-normal' : ''}`}
                        >
                          <option value="" disabled>Industry Sector *</option>
                          {INDUSTRIES.map(ind => <option key={ind.id} value={ind.id}>{ind.name}</option>)}
                        </select>
                        {errors.industry && <span className="text-red-500 text-xs mt-1 block">{errors.industry}</span>}
                      </div>

                      {selections.orderType === 'event' ? (
                        <div className="space-y-1">
                          <input 
                            type={selections.eventDate ? "date" : "text"} 
                            placeholder="Event Date *"
                            onFocus={(e) => e.target.type = 'date'}
                            onBlur={(e) => {
                              if (!selections.eventDate) e.target.type = 'text';
                            }}
                            value={selections.eventDate} 
                            onChange={(e) => {
                              setSelections({...selections, eventDate: e.target.value});
                              if (errors.eventDate) setErrors({...errors, eventDate: ''});
                            }} 
                            className={errors.eventDate ? errorInputClasses : inputClasses}
                            min={new Date().toISOString().split('T')[0]} 
                          />
                          {errors.eventDate && <span className="text-red-500 text-xs mt-1 block">{errors.eventDate}</span>}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <select 
                            value={selections.volume} 
                            onChange={(e) => {
                              setSelections({...selections, volume: e.target.value});
                              if (errors.volume) setErrors({...errors, volume: ''});
                            }} 
                            className={`${errors.volume ? errorInputClasses : inputClasses} ${!selections.volume ? 'text-[#0A1128]/40 font-normal' : ''}`}
                          >
                            <option value="" disabled>Monthly Volume *</option>
                            <option value="small">&lt; 500</option>
                            <option value="medium">500 - 2,000</option>
                            <option value="large">2,000 - 10,000</option>
                            <option value="custom">10,000+</option>
                          </select>
                          {errors.volume && <span className="text-red-500 text-xs mt-1 block">{errors.volume}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Contact Information */}
                <div className="space-y-8">
                  <div className="border-b border-black/5 pb-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A1128]/40">Contact Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                    <div className="space-y-1">
                      <input 
                        type="text" 
                        placeholder="Full Name *" 
                        value={selections.name} 
                        onChange={(e) => {
                          setSelections({...selections, name: e.target.value.replace(/[^a-zA-Z\s]/g, '')});
                          if (errors.name) setErrors({...errors, name: ''});
                        }} 
                        className={errors.name ? errorInputClasses : inputClasses}
                      />
                      {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                    </div>
                    <div className="space-y-1">
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        value={selections.company} 
                        onChange={(e) => setSelections({...selections, company: e.target.value})} 
                        className={inputClasses}
                      />
                    </div>
                    <div className="space-y-1">
                      <input 
                        type="tel" 
                        placeholder="WhatsApp Number *" 
                        value={selections.whatsapp} 
                        onChange={handleWhatsappChange} 
                        className={errors.whatsapp ? errorInputClasses : inputClasses}
                      />
                      {errors.whatsapp && <span className="text-red-500 text-xs mt-1 block">{errors.whatsapp}</span>}
                    </div>
                    <div className="space-y-1">
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={selections.email} 
                        onChange={(e) => {
                          setSelections({...selections, email: e.target.value});
                          if (errors.email) setErrors({...errors, email: ''});
                        }} 
                        className={errors.email ? errorInputClasses : inputClasses}
                      />
                      {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <select 
                        value={selections.city} 
                        onChange={(e) => {
                          setSelections({...selections, city: e.target.value});
                          if (errors.city) setErrors({...errors, city: ''});
                        }} 
                        className={`${errors.city ? errorInputClasses : inputClasses} ${!selections.city ? 'text-[#0A1128]/40 font-normal' : ''}`}
                      >
                        <option value="" disabled>Delivery City *</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Thane">Thane</option>
                        <option value="Pune">Pune</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Other">Other City</option>
                      </select>
                      {errors.city && <span className="text-red-500 text-xs mt-1 block">{errors.city}</span>}
                    </div>
                    {selections.city === 'Other' && (
                      <div className="space-y-1 md:col-span-2">
                        <input 
                          type="text" 
                          placeholder="Specify City *" 
                          value={selections.customCity} 
                          onChange={(e) => {
                            setSelections({...selections, customCity: e.target.value});
                            if (errors.customCity) setErrors({...errors, customCity: ''});
                          }} 
                          className={errors.customCity ? errorInputClasses : inputClasses}
                        />
                        {errors.customCity && <span className="text-red-500 text-xs mt-1 block">{errors.customCity}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Brand Assets */}
                <div className="space-y-8">
                  <div className="border-b border-black/5 pb-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A1128]/40">Brand Assets (Optional)</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="flex items-center gap-4 bg-[#F5F5F7] hover:bg-[#EAEAEF] rounded-2xl p-4 cursor-pointer transition-all duration-300 group">
                      <div className="w-11 h-11 bg-white rounded-full shadow-sm flex items-center justify-center text-[#0A1128]/50 transition-transform duration-300 group-hover:scale-105">
                        <Upload size={18} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <span className="text-[15px] font-medium text-[#0A1128] block truncate">
                          {selections.logoName || 'Upload Company Logo'}
                        </span>
                        <span className="text-[13px] text-[#0A1128]/40 block mt-0.5">
                          {selections.logoName ? 'Click to replace file' : 'PNG, JPG, PDF, or AI format'}
                        </span>
                      </div>
                      <input type="file" accept=".png,.jpg,.jpeg,.pdf,.ai" className="hidden" onChange={handleLogoChange}/>
                    </label>
                    {logoError && <span className="text-red-500 text-xs mt-1 block">{logoError}</span>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 flex flex-col items-center space-y-4">
                  {submitError && (
                    <div className="text-red-500 text-[13px] text-center">{submitError}</div>
                  )}
                  <button 
                    onClick={handleFinishClick} 
                    disabled={isSubmitting} 
                    className="w-full md:w-auto md:min-w-[300px] bg-[#0A1128] text-white py-[14px] px-8 text-[15px] font-medium rounded-full flex justify-center items-center gap-3 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles size={16} className="animate-spin" /> Processing...
                      </span>
                    ) : 'Submit Inquiry'}
                  </button>
                  <p className="text-center text-[11px] text-[#0A1128]/40">
                    Your information is secure. We will never share your details.
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
