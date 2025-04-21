import { useState } from 'react';
import { Form, message } from 'antd';
import { GuestFormValues } from '../../guestFormSchema';
import { FormStep } from '../constants/enums';

type UseFormNavigationProps = {
  form: ReturnType<typeof Form.useForm<GuestFormValues>>[0];
  nextGuest: () => Promise<boolean>;
  prevGuest: () => boolean;
  resetThemeStep: () => void;
  hasCompletedAllGuests: boolean;
};

export function useFormNavigation({ 
  form, 
  nextGuest, 
  prevGuest, 
  resetThemeStep,
  hasCompletedAllGuests
}: UseFormNavigationProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.GUEST_INFO);

  const next = async () => {
    try {
      if (currentStep === FormStep.GUEST_INFO) {
        // Validar la información de invitados
        await form.validateFields(['rootGuestName', 'guests']);
        setCurrentStep(FormStep.THEME_PREFERENCES);
        resetThemeStep(); // Reiniciar el paso de tema al entrar
      } else if (currentStep === FormStep.THEME_PREFERENCES) {
        // En el paso de temática, gestionar los sub-pasos de invitados
        if (hasCompletedAllGuests) {
          // Si ya se completaron todos los invitados, avanzar al siguiente paso principal
          setCurrentStep(FormStep.CONFIRMATION);
        } else {
          // Si no están completos, intentar avanzar al siguiente invitado
          try {
            await nextGuest();
          } catch (error) {
            message.error(error instanceof Error ? error.message : 'Por favor completa todos los campos requeridos');
          }
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
      message.error(error instanceof Error ? error.message : 'Por favor completa todos los campos requeridos');
    }
  };
  
  const prev = () => {
    if (currentStep === FormStep.GUEST_INFO) {
      return; // Ya estamos en el primer paso
    } else if (currentStep === FormStep.THEME_PREFERENCES) {
      // Si estamos en el paso de tema, intentar retroceder en los sub-pasos primero
      const hasPrevGuest = prevGuest();
      
      // Si no hay invitado anterior, retroceder al paso anterior principal
      if (!hasPrevGuest && !hasCompletedAllGuests) {
        setCurrentStep(FormStep.GUEST_INFO);
      }
    } else {
      // Para otros pasos, simplemente retroceder
      setCurrentStep(currentStep - 1);
      
      // Si volvemos al paso de temática, asegurarnos de que estamos en el modo de revisión
      if (currentStep - 1 === FormStep.THEME_PREFERENCES) {
        // No reiniciamos para permitir revisar
      }
    }
  };

  return {
    currentStep,
    next,
    prev
  };
} 