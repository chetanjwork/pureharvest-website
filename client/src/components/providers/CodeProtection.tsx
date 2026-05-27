'use client';

import { useEffect } from 'react';

/**
 * CodeProtection Provider
 * 
 * An elite client-side security wrapper designed to safeguard intellectual property,
 * prevent visual asset theft, and deter competitors from inspecting or copying code,
 * assets, or styles.
 * 
 * Measures included:
 * 1. Disables right-click context menu globally.
 * 2. Blocks standard browser inspect and source keyboard shortcuts (F12, Cmd+Opt+I, Ctrl+Shift+I, Cmd+U, Ctrl+U, etc.).
 * 3. Prevents image dragging/saving.
 * 4. Runs an anti-inspector debug loop in production.
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

    // Only run security controls in production mode to avoid hindering local development
    const isProduction = process.env.NODE_ENV === 'production';

    // 1. Prevent Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent Keyboard Shortcut Inspections
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (Inspect Element)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+I / Cmd+Opt+I (Inspect)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+J / Cmd+Opt+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+Shift+C / Cmd+Opt+C (Select element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U / Cmd+Opt+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevent Image Drag-and-Drop Stealing
    const handleDragStart = (e: DragEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Attach premium event listeners globally
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    // 4. Infinite Debugger Loop (DevTools Trap)
    // If someone forces Developer Tools open via browser menus, this infinite loop pauses 
    // execution and renders the console completely non-interactive.
    let debuggerInterval: NodeJS.Timeout;
    if (isProduction) {
      debuggerInterval = setInterval(() => {
        (function () {
          const startTime = performance.now();
          debugger;
          const endTime = performance.now();
          // Detect debugger timing lag (if developer tools is active, this takes > 100ms)
          if (endTime - startTime > 100) {
            // Optional: Handle developer tools alert
          }
        })();
      }, 1000);
    }

    // Clean up listeners and intervals on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      if (debuggerInterval) {
        clearInterval(debuggerInterval);
      }
    };
  }, []);

  return null; // Pure functional provider component, returns no visible markup
}
