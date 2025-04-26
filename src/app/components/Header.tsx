'use client'
import React, { useEffect, useState } from 'react'
import WeddingLogo from '../icons/WeddingLogo'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface HeaderProps {
  className?: string;
  logoClassName?: string;
}

export const Header = ({ className = '', logoClassName = 'w-[80px] h-[80px]' }: HeaderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const originalCode = searchParams.get('code');
  
  // Ensure hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const isFormPage = pathname === '/form';
  const formLink = originalCode ? `/form?code=${originalCode}` : '/form';
  const homeLink = originalCode ? `/?code=${originalCode}` : '/';

  return (
    <div 
      className={`flex justify-between items-center w-full bg-white bg-opacity-90 backdrop-blur-sm py-2 px-4 md:px-6 ${className}`}
    >
      <div className="flex-1">
        {/* Espacio para mantener el logo centrado */}
        {!isFormPage && (
          <div className="invisible">
            <Link 
              href={formLink} 
              className="bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-full text-sm md:text-base transition-all duration-300 hover:shadow-md flex-shrink-0"
            >
              Confirmar asistencia
            </Link>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Link href={homeLink} className="flex-shrink-0">
          <WeddingLogo className={`text-red-300 ${logoClassName}`} />
        </Link>
      </div>
      
      <div className="flex-1 flex justify-end">
        {!isFormPage && (
          <Link 
            href={formLink} 
            className="bg-red-400 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-full text-sm md:text-base transition-all duration-300 hover:shadow-md flex-shrink-0"
          >
            Confirmar asistencia
          </Link>
        )}
      </div>
    </div>
  );
}
