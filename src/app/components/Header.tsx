'use client'
import React, { useEffect, useState } from 'react'
import WeddingLogo from '../icons/WeddingLogo'

interface HeaderProps {
  className?: string;
  logoClassName?: string;
}

export const Header = ({ className = '', logoClassName = 'w-[80px] h-[80px]' }: HeaderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className={`flex justify-center items-center w-full bg-white bg-opacity-90 backdrop-blur-sm py-2 ${className}`}
    >
      <WeddingLogo className={`text-red-300 ${logoClassName}`} />
    </div>
  );
}
