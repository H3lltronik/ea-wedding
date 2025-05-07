'use client'

import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { ThemePreference } from '../constants/enums';

// Importamos las imágenes de fondo
import harryPotterBg from '@/assets/backgrounds/harry-potter-bg.jpg';
import starWarsBg from '@/assets/backgrounds/star-wars-bg.jpg';
import bothBg from '@/assets/backgrounds/both-bg.jpg';

type ThemeBackgroundProps = {
  children: React.ReactNode;
};

export const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ children }) => {
  const { currentGuest } = useFormContext();
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (!currentGuest || !currentGuest.themePreference) {
      setBgImage(null);
      return;
    }
    
    console.log("[ThemeBackground] themePreference", currentGuest.themePreference);
    console.log("[ThemeBackground] guest", currentGuest);
    
    // Iniciar animación de transición
    setIsChanging(true);
    
    // Esperar un momento antes de cambiar la imagen (para la animación)
    const timer = setTimeout(() => {
      switch (currentGuest.themePreference) {
        case ThemePreference.HARRY_POTTER:
          setBgImage(harryPotterBg.src);
          break;
        
        case ThemePreference.STAR_WARS:
          setBgImage(starWarsBg.src);
          break;
        
        case ThemePreference.BOTH:
          setBgImage(bothBg.src);
          break;
          
        default:
          setBgImage(null);
      }
      
      // Finalizar animación después de un breve retraso
      setTimeout(() => {
        setIsChanging(false);
      }, 300);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [currentGuest]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo por defecto cuando no hay imagen seleccionada */}
      {!bgImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#fffbf0] to-[#fff8e8] transition-opacity duration-1000 ease-in-out" />
      )}
      
      {/* Imagen de fondo cuando hay una selección */}
      {bgImage && (
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isChanging ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay para mejorar legibilidad del contenido */}
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>
      )}
      
      {/* Contenido de la página */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}; 