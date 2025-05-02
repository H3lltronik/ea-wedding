'use client'

import React, { useEffect, useState } from 'react';
import { Card, Form, message, Alert, Button } from 'antd';
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
import { useRootInvitation } from './hooks/useRootInvitation';
import { GuestService } from '../../../services/supabaseService';
import { useRouter } from 'next/navigation';
import { useInvitationCode } from '../../../hooks/useInvitationCode';

export default function GuestForm() {
  // Un solo formulario para toda la aplicación
  const [form] = Form.useForm();
  const router = useRouter();
  
  // Obtener el código de invitación para usarlo en redirecciones
  const { invitationCode } = useInvitationCode();
  
  // Estados para controlar si ya existe una respuesta
  const [existingSubmission, setExistingSubmission] = useState<boolean>(false);
  const [checkingSubmission, setCheckingSubmission] = useState<boolean>(true);
  
  // Get invitation data and existing guests
  const { rootInvitation, existingGuests, loading, error } = useRootInvitation();
  
  // Get context state
  const { 
    setGuests,
    currentGuestIndex,
    setCurrentGuestIndex,
    isSubmitting,
    setIsSubmitting,
    validateCurrentStep,
    getMergedFormData
  } = useFormContext();
  
  // Estado del formulario (paso actual)
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.GUEST_INFO);
  
  // Verificar si ya existe una respuesta para esta invitación usando has_answered
  useEffect(() => {
    const checkExistingSubmission = async () => {
      if (rootInvitation?.id) {
        setCheckingSubmission(true);
        try {
          const { exists } = await GuestService.checkExistingSubmission(rootInvitation.id);
          setExistingSubmission(exists);
        } catch (error) {
          console.error('Error al verificar respuesta existente:', error);
        } finally {
          setCheckingSubmission(false);
        }
      }
    };
    
    if (rootInvitation) {
      checkExistingSubmission();
    }
  }, [rootInvitation]);
  
  // Setup initial guest data when rootInvitation changes
  useEffect(() => {
    if (rootInvitation && !existingSubmission) {
      const guestsCount = rootInvitation.invitations_amount;
      
      // Map existing guests into a lookup table by index (if any)
      const existingGuestsMap = new Map();
      existingGuests.forEach(guest => {
        // Determine index by is_root or other criteria
        const index = guest.is_root ? 0 : existingGuests.indexOf(guest);
        if (index >= 0 && index < guestsCount) {
          existingGuestsMap.set(index, guest);
        }
      });
      
      // Initialize form with initial values considering existing guests
      form.setFieldsValue({
        rootGuestName: rootInvitation.name,
        guests: Array(guestsCount).fill(null).map((_, i) => {
          const existingGuest = existingGuestsMap.get(i);
          return {
            name: existingGuest ? existingGuest.name : (i === 0 ? rootInvitation.name : ''),
            age: existingGuest?.age || undefined,
          };
        }),
      });
      
      // Initialize guests in context
      setGuests(Array(guestsCount).fill(null).map((_, i) => {
        const existingGuest = existingGuestsMap.get(i);
        return {
          name: existingGuest ? existingGuest.name : (i === 0 ? rootInvitation.name : ''),
          age: existingGuest?.age || 0,
          themePreference: null,
          house: null,
          jediSith: null,
          is_fixed: existingGuest?.is_fixed || (i === 0), // Root guest is always fixed
        };
      }));
    }
  }, [rootInvitation, existingGuests, form, setGuests, existingSubmission]);
  
  // Navegar al siguiente paso
  const next = async () => {
    try {
      if (currentStep === FormStep.GUEST_INFO) {
        // La validación se hará en FormNavigation
        setCurrentStep(FormStep.THEME_PREFERENCES);
      } else if (currentStep === FormStep.THEME_PREFERENCES) {
        // La validación se hará en FormNavigation
        
        // Si estamos en el último invitado o ya hemos completado todos
        if (currentGuestIndex >= (rootInvitation?.invitations_amount || 0) - 1) {
          setCurrentStep(FormStep.CONFIRMATION);
        } else {
          // Pasar al siguiente invitado
          setCurrentGuestIndex(currentGuestIndex + 1);
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
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
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Validar el formulario completo
      await form.validateFields();
      
      // Antes de enviar, verificar que todo es válido
      const isValid = await validateCurrentStep(FormStep.CONFIRMATION);
      
      if (!isValid) {
        message.error('Por favor completa toda la información requerida');
        setIsSubmitting(false);
        return;
      }
      
      // Obtener los datos combinados de todos los formularios
      const mergedValues = getMergedFormData();
      
      // Mostrar la estructura final en la consola
      console.log('Form submission data:', mergedValues);
      
      // Verificar que tenemos el ID de la invitación raíz
      if (!rootInvitation?.id) {
        message.error('No se pudo obtener la información de la invitación');
        setIsSubmitting(false);
        return;
      }
      
      // Insertar nuevos datos
      const success = await GuestService.saveFormData(mergedValues, rootInvitation.id);
      
      if (success) {
        message.success('¡Información registrada correctamente!');
        
        // Crear la URL con los parámetros necesarios
        const redirectParams = new URLSearchParams();
        
        // Agregar el código de invitación codificado en base64
        if (invitationCode) {
          const encodedCode = Buffer.from(invitationCode).toString('base64');
          redirectParams.append('code', encodedCode);
        }
        
        // Construir URL final
        const redirectUrl = `/thank-you${redirectParams.toString() ? `?${redirectParams.toString()}` : ''}`;
        
        // Redirigir a la página de agradecimiento después de un breve retraso
        setTimeout(() => {
          router.push(redirectUrl);
        }, 2000);
      } else {
        message.error('Hubo un problema al registrar tu información. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Error al enviar el formulario');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Renderizar notificación de respuesta existente
  const renderExistingSubmissionAlert = () => {
    if (existingSubmission && rootInvitation) {
      // Crear la URL para redireccionar con el código de invitación
      let redirectUrl = '/';
      
      // Agregar el código de invitación codificado en base64 si está disponible
      if (invitationCode) {
        const encodedCode = Buffer.from(invitationCode).toString('base64');
        redirectUrl = `/?code=${encodedCode}`;
      }
      
      return (
        <Alert
          message={`¡Gracias ${rootInvitation.name}!`}
          description={
            <div>
              <p>Detectamos que ya has completado este formulario anteriormente. Agradecemos tu respuesta y nos emociona contar con tu presencia.</p>
              <Button type="primary" onClick={() => router.push(redirectUrl)}>
                Volver al inicio
              </Button>
            </div>
          }
          type="success"
          showIcon
          className="mb-6"
        />
      );
    }
    return null;
  };
  
  // Renderizar contenido según el paso actual
  const renderContent = () => {
    if (loading || checkingSubmission) {
      return <LoadingIndicator />;
    }
    
    if (error || !rootInvitation) {
      return <ErrorMessage />;
    }
    
    // Si existe una respuesta previa, mostrar alerta
    if (existingSubmission) {
      return renderExistingSubmissionAlert();
    }
    
    switch (currentStep) {
      case FormStep.GUEST_INFO:
        return <GuestInfoStep 
          guestsCount={rootInvitation.invitations_amount} 
          form={form}
        />;
      case FormStep.THEME_PREFERENCES:
        return <ThemePreferencesStep form={form} />;
      case FormStep.CONFIRMATION:
        return <ConfirmationStep form={form} />;
      default:
        return null;
    }
  };
  
  // Determinar si todos los invitados han completado sus preferencias
  const hasCompletedAllGuests = currentGuestIndex >= (rootInvitation?.invitations_amount || 0);
  
  // No mostrar navegación si estamos mostrando la alerta de respuesta existente
  const shouldShowNavigation = !existingSubmission;
  
  return (
    <div className="py-10 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Card>
          <FormSteps currentStep={currentStep} />
        </Card>
        
        <Form 
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleSubmit}
          className="antd-wed-form"
        >
          {renderContent()}
          {!loading && !checkingSubmission && shouldShowNavigation && (
            <FormNavigation 
              currentStep={currentStep}
              prev={prev}
              next={next}
              submitting={isSubmitting}
              isSubmitStep={currentStep === FormStep.CONFIRMATION}
              handleSubmit={handleSubmit}
              hasCompletedAllGuests={hasCompletedAllGuests}
              currentGuestIndex={currentGuestIndex}
            />
          )}
        </Form>
      </div>
    </div>
  );
} 