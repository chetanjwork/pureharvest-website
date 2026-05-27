'use client';

import { useEffect } from 'react';

/**
 * CodeProtection Provider
 * 
 * A lightweight client-side security wrapper designed to prevent casual asset theft.
 * Relies on Next.js Server Components for business logic security to ensure 
 * compliance with corporate IT firewalls.
 * 
 * Measures included:
 * 1. Disables right-click context menu on images.
 * 2. Prevents image dragging/saving.
 */
export default function CodeProtection() {
  useEffect(() => {
    // 1. Check for mobile/touch devices. If true, we completely bypass mounting 
    // these heavy security listeners to save main-thread CPU cycles.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmallScreen = window.innerWidth < 768;
    
    if (isTouch || isSmallScreen) {
      return;
    }

    // 1. Prevent Right-Click Context Menu on Images
    const handleContextMenu = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // 2. Prevent Image Drag-and-Drop Stealing
    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Attach event listeners globally
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    // Clean up listeners on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null; // Pure functional provider component, returns no visible markup
}
