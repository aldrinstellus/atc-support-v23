'use client';

/**
 * ATC Logo Component
 *
 * Displays the ATC branding with "atc." text logo and red dot
 * in the application sidebar.
 *
 * V21 - Replaced CTIS image logo with ATC text logo
 * - Left-aligned instead of center-aligned
 * - Theme-aware: black text in light mode, white text in dark mode
 * - Red dot accent (#EF4444)
 * - ModeSwitcher archived to archive/src-backups/mode-switcher/
 */

export const CTISLogo = () => {
  return (
    <div className="flex-shrink-0 px-3 pt-3 pb-3">
      {/* ATC Logo - Text-based, theme-aware */}
      <div className="flex items-center justify-start py-2 relative h-10">
        <span className="text-3xl font-black tracking-tight text-foreground">
          atc<span className="text-red-500">.</span>
        </span>
      </div>
    </div>
  );
};

export default CTISLogo;
