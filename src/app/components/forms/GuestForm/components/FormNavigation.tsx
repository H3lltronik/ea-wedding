import React from 'react';
import { Button } from 'antd';
import { FormStep } from '../constants/enums';

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
  return (
    <div className="flex justify-between mt-8 max-w-3xl mx-auto px-6">
      <Button 
        onClick={prev} 
        disabled={currentStep === FormStep.GUEST_INFO && currentGuestIndex === 0}
        className="border-red-300 text-red-500 hover:border-red-500 hover:text-red-600"
      >
        Anterior
      </Button>
      
      {!isSubmitStep ? (
        <Button 
          type="primary" 
          onClick={next}
          className="bg-red-400 hover:bg-red-500 border-none"
        >
          {currentStep === FormStep.THEME_PREFERENCES && !hasCompletedAllGuests ? 'Siguiente invitado' : 'Siguiente'}
        </Button>
      ) : (
        <Button 
          type="primary" 
          onClick={handleSubmit}
          loading={submitting}
          className="bg-red-400 hover:bg-red-500 border-none"
        >
          Confirmar
        </Button>
      )}
    </div>
  );
}; 