'use client'

import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { ThemePreference, HogwartsHouse, StarWarsSide } from '../constants/enums';

type ThemeBackgroundProps = {
  children: React.ReactNode;
};

export const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ children }) => {
  const { currentGuest } = useFormContext();
  const [bgClass, setBgClass] = useState('bg-gradient-to-r from-pink-50 to-red-50');

  useEffect(() => {
    if (!currentGuest || !currentGuest.themePreference) {
      setBgClass('bg-gradient-to-r from-pink-50 to-red-50'); // Default background
      return;
    }
    
    console.log("[ThemeBackground] themePreference", currentGuest.themePreference);
    console.log("[ThemeBackground] guest", currentGuest);
    
    switch (currentGuest.themePreference) {
      case ThemePreference.HARRY_POTTER:
        const house = currentGuest.house;
        switch (house) {
          case HogwartsHouse.GRYFFINDOR:
            setBgClass('bg-gradient-to-br from-red-800 to-yellow-600');
            break;
          case HogwartsHouse.SLYTHERIN:
            setBgClass('bg-gradient-to-br from-green-800 to-gray-600');
            break;
          case HogwartsHouse.RAVENCLAW:
            setBgClass('bg-gradient-to-br from-blue-800 to-gray-500');
            break;
          case HogwartsHouse.HUFFLEPUFF:
            setBgClass('bg-gradient-to-br from-yellow-500 to-black');
            break;
          default:
            setBgClass('bg-gradient-to-r from-indigo-600 to-purple-600'); // Generic Hogwarts
        }
        break;
      
      case ThemePreference.STAR_WARS:
        const jediSith = currentGuest.jediSith;
        switch (jediSith) {
          case StarWarsSide.JEDI:
            setBgClass('bg-gradient-to-br from-blue-600 to-sky-300');
            break;
          case StarWarsSide.SITH:
            setBgClass('bg-gradient-to-br from-red-700 to-red-950');
            break;
          default:
            setBgClass('bg-gradient-to-r from-gray-900 to-gray-600'); // Generic Star Wars
        }
        break;
      
      case ThemePreference.BOTH:
        // Para "ambos", podemos hacer una mezcla de los temas
        setBgClass('bg-gradient-to-r from-blue-600 via-purple-600 to-red-600');
        break;
        
      default:
        setBgClass('bg-gradient-to-r from-pink-50 to-red-50'); // Default wedding theme
    }
  }, [currentGuest]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${bgClass}`}>
      {children}
    </div>
  );
}; 