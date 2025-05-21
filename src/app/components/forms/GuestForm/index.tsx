'use client'

import React, { useEffect, useState } from 'react';
import { Card, Form, message } from 'antd';
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
  
  // Get invitation data and existing guests
  const { rootInvitation, existingGuests, loading, error } = useRootInvitation();
  
  // Get context state
  const { 
    setGuests,
    guests,
    currentGuestIndex,
    setCurrentGuestIndex,
    isSubmitting,
    setIsSubmitting,
    validateCurrentStep,
    getMergedFormData
  } = useFormContext();
  
  // Estado del formulario (paso actual)
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.GUEST_INFO);
  
  // Setup initial guest data when rootInvitation changes
  useEffect(() => {
    if (rootInvitation) {
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
          themePreference: existingGuest?.themePreference || null,
          house: existingGuest?.house || null,
          jediSith: existingGuest?.jediSith || null,
          is_fixed: existingGuest?.is_fixed || (i === 0), // Root guest is always fixed
          attending: existingGuest?.attending !== false, // Por defecto, se asume que asisten
          id: existingGuest?.id, // Guardar el ID para futuras actualizaciones
        };
      }));
    }
  }, [rootInvitation, existingGuests, form, setGuests]);
  
  // Navegar al siguiente paso
  const next = async () => {
    try {
      if (currentStep === FormStep.GUEST_INFO) {
        // La validación se hará en FormNavigation
        setCurrentStep(FormStep.THEME_PREFERENCES);
        
        // Buscar el próximo invitado que asistirá (ignorar cancelados)
        const nextAttendingIndex = guests.findIndex((guest, idx) => 
          idx >= 0 && guest.attending !== false
        );
        
        if (nextAttendingIndex >= 0) {
          setCurrentGuestIndex(nextAttendingIndex);
        }
      } else if (currentStep === FormStep.THEME_PREFERENCES) {
        // La validación se hará en FormNavigation
        
        // Buscar el próximo invitado que asistirá (ignorar cancelados)
        const nextAttendingIndex = guests.findIndex((guest, idx) => 
          idx > currentGuestIndex && guest.attending !== false
        );
        
        // Si estamos en el último invitado asistente o ya hemos completado todos
        if (nextAttendingIndex === -1) {
          setCurrentStep(FormStep.CONFIRMATION);
        } else {
          // Pasar al siguiente invitado que asistirá
          setCurrentGuestIndex(nextAttendingIndex);
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
        // Buscar el invitado anterior que asistirá (ignorar cancelados)
        const prevAttendingIndex = [...guests].reverse().findIndex((guest, idx) => 
          guests.length - 1 - idx < currentGuestIndex && guest.attending !== false
        );
        
        if (prevAttendingIndex !== -1) {
          // Convertir el índice invertido a índice real
          setCurrentGuestIndex(guests.length - 1 - prevAttendingIndex);
        } else {
          // Si no hay invitados asistentes previos, ir al paso anterior
          setCurrentStep(FormStep.GUEST_INFO);
        }
      } else {
        // Volver al paso anterior
        setCurrentStep(FormStep.GUEST_INFO);
      }
    } else if (currentStep === FormStep.CONFIRMATION) {
      setCurrentStep(FormStep.THEME_PREFERENCES);
      
      // Buscar el último invitado que asistirá
      const lastAttendingIndex = [...guests].reverse().findIndex(guest => 
        guest.attending !== false
      );
      
      if (lastAttendingIndex !== -1) {
        setCurrentGuestIndex(guests.length - 1 - lastAttendingIndex);
      }
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
  
  // Determine if all attending guests have completed their preferences
  const hasCompletedAllGuests = !guests.some((guest, index) => 
    guest.attending !== false && // Solo contar a los que van a asistir
    index > currentGuestIndex && 
    currentStep === FormStep.THEME_PREFERENCES
  );
  
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
          {!loading && (
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