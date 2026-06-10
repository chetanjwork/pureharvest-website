import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export default function Heading({ children, level = 2, className }: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  const styles = {
    1: 'text-5xl md:text-7xl lg:text-8xl font-sans tracking-[-0.04em] leading-[0.9] font-black uppercase',
    2: 'text-4xl md:text-5xl lg:text-6xl font-sans tracking-[-0.03em] leading-none font-bold uppercase',
    3: 'text-3xl md:text-4xl lg:text-5xl font-sans tracking-[-0.02em] leading-[1.1] font-bold uppercase',
    4: 'text-2xl md:text-3xl lg:text-4xl font-sans tracking-[-0.01em] leading-tight font-bold uppercase',
    5: 'text-xl md:text-2xl lg:text-3xl font-sans leading-tight font-bold uppercase',
    6: 'text-lg md:text-xl lg:text-2xl font-sans leading-tight font-bold uppercase',
  };

  return (
    <Tag className={cn(styles[level], className)}>
      {children}
    </Tag>
  );
}
