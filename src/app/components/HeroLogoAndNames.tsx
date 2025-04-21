'use client'
import React, { useEffect, useState } from 'react'
import WeddingLogo from '../icons/WeddingLogo'
import { WindupChildren, Pace } from 'windups'

interface HeroLogoAndNamesProps {
  className?: string;
  onAnimationComplete?: () => void;
}

export const HeroLogoAndNames = ({ 
  className = '', 
  onAnimationComplete 
}: HeroLogoAndNamesProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <WeddingLogo className="w-[400px] h-[400px] text-white" />
      <h1 className="text-4xl md:text-9xl font-parisienne text-center">
        <WindupChildren onFinished={onAnimationComplete}>
          <Pace ms={100}>
            Andrea
            y
            Esaú
          </Pace>
        </WindupChildren>
      </h1>
    </div>
  );
}

export default HeroLogoAndNames; 