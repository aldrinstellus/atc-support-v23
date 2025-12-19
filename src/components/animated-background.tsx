'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Curated Unsplash images for "software engineering" theme
const BACKGROUND_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80&fit=crop',
    alt: 'Code on screen - software development',
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80&fit=crop',
    alt: 'Modern developer workspace',
  },
  {
    url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80&fit=crop',
    alt: 'Developer coding at desk',
  },
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80&fit=crop',
    alt: 'Team collaboration on laptop',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80&fit=crop',
    alt: 'Modern tech office workspace',
  },
  {
    url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1920&q=80&fit=crop',
    alt: 'Technology and development workspace',
  },
];

export function AnimatedBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Rotate images every 15 seconds (50% longer)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 15000); // 15 seconds (50% increase)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" suppressHydrationWarning>
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10" />

      {/* Animated Image Carousel */}
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 3.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={BACKGROUND_IMAGES[currentImageIndex].url}
            alt={BACKGROUND_IMAGES[currentImageIndex].alt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </motion.div>
      </AnimatePresence>

      {/* Liquid Glass Overlay - Multi-layer for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/55 to-background/60 backdrop-blur-sm" />

      {/* Subtle grid pattern overlay for tech aesthetic */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial gradient vignette for focus */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20" />
    </div>
  );
}
