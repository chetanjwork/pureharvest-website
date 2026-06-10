import React from 'react';

interface SectionLabelProps {
  icon: React.ElementType;
  label: string;
}

export function SectionLabel({ icon: Icon, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={14} className="text-brand-secondary" strokeWidth={2.5} />
      <span className="text-brand-secondary text-xs font-black uppercase tracking-[0.3em]">{label}</span>
    </div>
  );
}
