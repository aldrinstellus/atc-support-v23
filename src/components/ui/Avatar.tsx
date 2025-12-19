'use client';

import Image from 'next/image';

interface AvatarProps {
  name: string;
  id?: string; // Persona ID for stable avatar generation
  initials?: string;
  size?: number;
  className?: string;
  variant?: 'profile' | 'chat';
}

// Gender detection based on common first names
function detectGender(name: string): 'male' | 'female' {
  const firstName = name.split(' ')[0].toLowerCase();

  // V17 Mode Switcher personas
  const maleNames = ['david', 'marcus', 'michael', 'christopher'];
  const femaleNames = ['sarah', 'jennifer', 'jessica', 'emily', 'jordan'];

  if (maleNames.includes(firstName)) return 'male';
  if (femaleNames.includes(firstName)) return 'female';

  // Default to male for unknown
  return 'male';
}

// Get appropriate avatar style based on gender
function getAvatarStyle(name: string): string {
  const gender = detectGender(name);
  // DiceBear styles:
  // - "lorelei" for female (professional, diverse)
  // - "avataaars" for male (professional, customizable)
  return gender === 'female' ? 'lorelei' : 'avataaars';
}

export function Avatar({
  name,
  id,
  initials: _initials = 'SC',  
  size = 40,
  className = '',
  variant = 'profile'
}: AvatarProps) {
  // Generate consistent avatar URL using DiceBear API with gender-appropriate style
  // Use persona ID as seed if provided (keeps avatar stable when name changes)
  // Otherwise fall back to name-based seed
  const seed = id || name.toLowerCase().replace(/\s+/g, '-');
  const style = getAvatarStyle(name);
  const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=7c3aed&backgroundType=solid`;

  const sizeClass = variant === 'chat' ? 'w-8 h-8' : 'w-10 h-10';

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 bg-primary ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <Image
        src={avatarUrl}
        alt={`${name}'s avatar`}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        unoptimized // DiceBear SVGs don't need Next.js optimization
      />
    </div>
  );
}
