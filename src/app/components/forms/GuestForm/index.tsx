'use client'

import React, { useEffect } from 'react';
import { Card, Form } from 'antd';
import { 
  GuestInfoStep, 
  ThemePreferencesStep, 
  ConfirmationStep,
  FormNavigation,
  LoadingIndicator,
  ErrorMessage,
  FormSteps
} from './components';
import { useFormContext } from './context/FormContext';
import { FormStep } from './constants/enums';
import { GuestFormValues } from '../guestFormSchema';
import { useRootInvitation } from './hooks/useRootInvitation';

export default function GuestForm() {
  const [form] = Form.useForm<GuestFormValues>();
  
  // Get invitation data
  const { rootInvitation, loading, error } = useRootInvitation();
  
  // Get context state
  const { 
    setGuests,
    currentGuestIndex,
    setCurrentGuestIndex,
    isSubmitting,
    setIsSubmitting
  } = useFormContext();
  
  // Setup initial guest data when rootInvitation changes
  useEffect(() => {
    if (rootInvitation) {
      const guestsCount = rootInvitation.invitations_amount;
      
      // Inicializar datos del formulario
      form.setFieldsValue({
        rootGuestName: rootInvitation.name,
        guests: Array(guestsCount).fill(null).map((_, i) => ({
          name: i === 0 ? rootInvitation.name : '',
          age: undefined,
        })),
      });
      
      // Inicializar guests en el contexto
      setGuests(Array(guestsCount).fill(null).map((_, i) => ({
        name: i === 0 ? rootInvitation.name : '',
        age: 0,
        themePreference: null,
        house: null,
        jediSith: null
      })));
    }
  }, [rootInvitation, form, setGuests]);
  
  // Estado del formulario (paso actual)
  const [currentStep, setCurrentStep] = React.useState<FormStep>(FormStep.GUEST_INFO);
  
  // Navegar al siguiente paso
  const next = async () => {
    try {
      if (currentStep === FormStep.GUEST_INFO) {
        await form.validateFields(['rootGuestName', 'guests']);
        setCurrentStep(FormStep.THEME_PREFERENCES);
      } else if (currentStep === FormStep.THEME_PREFERENCES) {
        // Si estamos en el último invitado o ya hemos completado todos
        if (currentGuestIndex >= (rootInvitation?.invitations_amount || 0) - 1) {
          setCurrentStep(FormStep.CONFIRMATION);
        } else {
          // Pasar al siguiente invitado
          setCurrentGuestIndex(currentGuestIndex + 1);
        }
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };
  
  // Navegar al paso anterior
  const prev = () => {
    if (currentStep === FormStep.THEME_PREFERENCES) {
      if (currentGuestIndex > 0) {
        // Volver al invitado anterior
        setCurrentGuestIndex(currentGuestIndex - 1);
      } else {
        // Volver al paso anterior
        setCurrentStep(FormStep.GUEST_INFO);
      }
    } else if (currentStep === FormStep.CONFIRMATION) {
      setCurrentStep(FormStep.THEME_PREFERENCES);
    }
  };
  
  // Manejar el envío del formulario
  const handleSubmit = async (values: GuestFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Aquí iría la lógica para enviar los datos a la API
      console.log('Submitting form with values:', values);
      
      // Simular una espera de la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirigir o mostrar mensaje de éxito
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Renderizar contenido según el paso actual
  const renderContent = () => {
    if (loading) {
      return <LoadingIndicator />;
    }
    
    if (error || !rootInvitation) {
      return <ErrorMessage />;
    }
    
    switch (currentStep) {
      case FormStep.GUEST_INFO:
        return <GuestInfoStep guestsCount={rootInvitation.invitations_amount} form={form} />;
      case FormStep.THEME_PREFERENCES:
        return <ThemePreferencesStep />;
      case FormStep.CONFIRMATION:
        return <ConfirmationStep form={form} />;
      default:
        return null;
    }
  };
  
  // Determinar si todos los invitados han completado sus preferencias
  const hasCompletedAllGuests = currentGuestIndex >= (rootInvitation?.invitations_amount || 0);
  
  return (
    <div className="py-10 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Card>
          <FormSteps currentStep={currentStep} />
        </Card>
        
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleSubmit}
          requiredMark={false}
          className="antd-wed-form"
        >
          {renderContent()}
          {!loading && (
            <FormNavigation 
              currentStep={currentStep}
              prev={prev}
              next={next}
              submitting={isSubmitting}
              isSubmitStep={currentStep === FormStep.CONFIRMATION}
              handleSubmit={() => form.submit()}
              hasCompletedAllGuests={hasCompletedAllGuests}
              currentGuestIndex={currentGuestIndex}
            />
          )}
        </Form>
      </div>
    </div>
  );
} 