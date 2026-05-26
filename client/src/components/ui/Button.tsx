'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  disabled = false
}: ButtonProps) {
  const variants = {
    primary: 'border border-white/40 text-white bg-transparent hover:bg-white hover:text-black hover:border-white',
    secondary: 'bg-transparent text-white hover:opacity-70',
    outline: 'border-b border-white text-white rounded-none px-0 py-1 hover:border-brand-accent'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium tracking-widest transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
        variant !== 'outline' && 'rounded-full',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
