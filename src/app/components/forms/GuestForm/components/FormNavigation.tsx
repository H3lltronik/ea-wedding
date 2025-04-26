import React, { useState } from 'react';
import { Button, message } from 'antd';
import { FormStep } from '../constants/enums';
import { useFormContext } from '../context/FormContext';

type FormNavigationProps = {
  currentStep: FormStep;
  prev: () => void;
  next: () => void;
  submitting: boolean;
  isSubmitStep: boolean;
  handleSubmit: () => void;
  hasCompletedAllGuests: boolean;
  currentGuestIndex: number;
};

export const FormNavigation: React.FC<FormNavigationProps> = ({ 
  currentStep, 
  prev, 
  next, 
  submitting, 
  isSubmitStep,
  handleSubmit,
  hasCompletedAllGuests,
  currentGuestIndex
}) => {
  const [validating, setValidating] = useState(false);
  const { validateCurrentStep } = useFormContext();
  
  // Manejador para el botón siguiente con validación
  const handleNext = async () => {
    setValidating(true);
    
    try {
      // Intentar validar el paso actual
      const isValid = await validateCurrentStep(currentStep);
      
      if (isValid) {
        // Si es válido, avanzar al siguiente paso
        await next();
      } else {
        // Si no es válido, mostrar mensaje de error
        let errorMessage = "Por favor completa todos los campos requeridos";
        
        if (currentStep === FormStep.THEME_PREFERENCES) {
          errorMessage = "Por favor selecciona todas las preferencias requeridas para este invitado";
        } else if (currentStep === FormStep.CONFIRMATION) {
          errorMessage = "Hay información pendiente por completar en pasos anteriores";
        }
        
        message.error(errorMessage);
      }
    } catch (error) {
      console.error("Validation error:", error);
      message.error("Ocurrió un error al validar el formulario");
    } finally {
      setValidating(false);
    }
  };
  
  // Manejador para el botón de envío con validación
  const handleSubmitWithValidation = async () => {
    setValidating(true);
    
    try {
      // Validar todo el formulario antes de enviar
      const isValid = await validateCurrentStep(FormStep.CONFIRMATION);
      
      if (isValid) {
        // Si es válido, proceder con el envío
        handleSubmit();
      } else {
        message.error("Por favor completa toda la información requerida antes de confirmar");
      }
    } catch (error) {
      console.error("Submit validation error:", error);
      message.error("Ocurrió un error al validar el formulario");
    } finally {
      setValidating(false);
    }
  };
  
  // Determinar texto del botón según el contexto
  const getNextButtonText = () => {
    if (currentStep === FormStep.THEME_PREFERENCES) {
      // Si estamos en el último invitado, el botón debe decir "Confirmar"
      if (hasCompletedAllGuests) {
        return "Confirmar";
      }
      
      return `Siguiente invitado (${currentGuestIndex + 1}/${hasCompletedAllGuests ? currentGuestIndex : currentGuestIndex + 2})`;
    }
    
    return "Siguiente";
  };
  
  return (
    <div className="flex justify-between mt-6">
      {/* Botón para retroceder, no se muestra en el primer paso */}
      {currentStep > FormStep.GUEST_INFO && (
        <Button 
          onClick={prev}
          disabled={validating || submitting}
        >
          Anterior
        </Button>
      )}
      
      <div className="flex-1"></div>
      
      {/* Botón para avanzar o enviar, dependiendo del paso */}
      <div>
        {isSubmitStep ? (
          <Button 
            type="primary" 
            onClick={handleSubmitWithValidation}
            loading={submitting}
            disabled={validating}
          >
            Enviar información
          </Button>
        ) : (
          <Button 
            type="primary" 
            onClick={handleNext}
            loading={validating}
            disabled={submitting}
          >
            {getNextButtonText()}
          </Button>
        )}
      </div>
    </div>
  );
}; 