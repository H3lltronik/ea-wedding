import { useState } from 'react';
import { Form } from 'antd';
import { GuestFormValues } from '../../guestFormSchema';
import { ThemePreference } from '../constants/enums';

type UseThemePreferencesProps = {
  form: ReturnType<typeof Form.useForm<GuestFormValues>>[0];
  guestsCount: number;
};

export function useThemePreferences({ form, guestsCount }: UseThemePreferencesProps) {
  const [themePreferences, setThemePreferences] = useState<Record<number, ThemePreference>>({});
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0);
  const [hasCompletedAllGuests, setHasCompletedAllGuests] = useState(false);
  
  // Calcular el progreso actual
  const progress = {
    current: currentGuestIndex,
    total: guestsCount,
    percentage: Math.round((currentGuestIndex / guestsCount) * 100),
    isComplete: hasCompletedAllGuests
  };
  
  const handleThemeChange = (value: ThemePreference, guestIndex: number) => {
    setThemePreferences(prev => ({
      ...prev,
      [guestIndex]: value,
    }));
    
    form.setFields([
      {
        name: ['themePreferences', guestIndex, 'preference'],
        value,
      },
      {
        name: ['themePreferences', guestIndex, 'guestIndex'],
        value: guestIndex,
      },
    ]);
  };

  const nextGuest = async () => {
    try {
      // Validar los datos del invitado actual
      const guestIndex = currentGuestIndex;
      const preference = themePreferences[guestIndex];
      
      if (!preference) {
        throw new Error(`Falta seleccionar preferencia para el invitado ${guestIndex + 1}`);
      }
      
      // Validar house selection para fans de Harry Potter
      if (preference === ThemePreference.HARRY_POTTER || preference === ThemePreference.BOTH) {
        const house = form.getFieldValue(['themePreferences', guestIndex, 'house']);
        if (!house) {
          throw new Error(`Falta seleccionar casa para el invitado ${guestIndex + 1}`);
        }
      }
      
      // Validar Jedi/Sith selection para fans de Star Wars
      if (preference === ThemePreference.STAR_WARS || preference === ThemePreference.BOTH) {
        const jediSith = form.getFieldValue(['themePreferences', guestIndex, 'jediSith']);
        if (!jediSith) {
          throw new Error(`Falta seleccionar si eres Jedi o Sith para el invitado ${guestIndex + 1}`);
        }
      }
      
      // Si estamos en el último invitado, marcar como completado
      if (currentGuestIndex === guestsCount - 1) {
        setHasCompletedAllGuests(true);
      } else {
        // De lo contrario, avanzar al siguiente invitado
        setCurrentGuestIndex(currentGuestIndex + 1);
      }
      
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      throw error;
    }
  };

  const prevGuest = () => {
    if (currentGuestIndex > 0) {
      setCurrentGuestIndex(currentGuestIndex - 1);
    }
    
    // Si se regresa de la pantalla de completado
    if (hasCompletedAllGuests) {
      setHasCompletedAllGuests(false);
    }
    
    return true;
  };

  const resetThemeStep = () => {
    setCurrentGuestIndex(0);
    setHasCompletedAllGuests(false);
  };

  const getCurrentGuestName = () => {
    return form.getFieldValue(['guests', currentGuestIndex, 'name']) || 
      `Invitado ${currentGuestIndex + 1}`;
  };

  return {
    themePreferences,
    handleThemeChange,
    currentGuestIndex,
    hasCompletedAllGuests,
    nextGuest,
    prevGuest,
    resetThemeStep,
    progress,
    getCurrentGuestName
  };
} 