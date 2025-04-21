import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemePreference, HogwartsHouse, StarWarsSide } from '../constants/enums';

export type GuestInfo = {
  name: string;
  age: number;
  themePreference: ThemePreference | null;
  house: HogwartsHouse | null;
  jediSith: StarWarsSide | null;
};

export type FormContextType = {
  // Estados reactivos
  currentGuestIndex: number;
  setCurrentGuestIndex: React.Dispatch<React.SetStateAction<number>>;
  guests: GuestInfo[];
  setGuests: React.Dispatch<React.SetStateAction<GuestInfo[]>>;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Funcionalidad para actualizar tema específico
  updateGuestTheme: (guestIndex: number, theme: ThemePreference | null) => void;
  updateGuestHouse: (guestIndex: number, house: HogwartsHouse | null) => void;
  updateGuestJediSith: (guestIndex: number, side: StarWarsSide | null) => void;
  
  // Obtener el invitado actual
  currentGuest: GuestInfo | null;
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const [currentGuestIndex, setCurrentGuestIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Actualizar tema para un invitado específico
  const updateGuestTheme = (guestIndex: number, theme: ThemePreference | null) => {
    setGuests(prevGuests => {
      const newGuests = [...prevGuests];
      if (!newGuests[guestIndex]) {
        newGuests[guestIndex] = {
          name: '',
          age: 0,
          themePreference: theme,
          house: null,
          jediSith: null
        };
      } else {
        newGuests[guestIndex] = {
          ...newGuests[guestIndex],
          themePreference: theme
        };
      }
      return newGuests;
    });
  };

  // Actualizar casa de Hogwarts para un invitado específico
  const updateGuestHouse = (guestIndex: number, house: HogwartsHouse | null) => {
    setGuests(prevGuests => {
      const newGuests = [...prevGuests];
      if (newGuests[guestIndex]) {
        newGuests[guestIndex] = {
          ...newGuests[guestIndex],
          house
        };
      }
      return newGuests;
    });
  };

  // Actualizar lado de la fuerza para un invitado específico
  const updateGuestJediSith = (guestIndex: number, side: StarWarsSide | null) => {
    setGuests(prevGuests => {
      const newGuests = [...prevGuests];
      if (newGuests[guestIndex]) {
        newGuests[guestIndex] = {
          ...newGuests[guestIndex],
          jediSith: side
        };
      }
      return newGuests;
    });
  };

  // Obtener información del invitado actual
  const currentGuest = guests[currentGuestIndex] || null;

  const value: FormContextType = {
    currentGuestIndex,
    setCurrentGuestIndex,
    guests,
    setGuests,
    isSubmitting,
    setIsSubmitting,
    isSubmitted,
    setIsSubmitted,
    updateGuestTheme,
    updateGuestHouse,
    updateGuestJediSith,
    currentGuest
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}; 