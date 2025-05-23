import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemePreference, HogwartsHouse, StarWarsSide, FormStep } from '../constants/enums';
import { Form } from 'antd';
import { GuestFormValues } from '../../guestFormSchema';
import { GuestService } from '../../../../services/supabaseService';
import { TimeService } from '../../../../services/timeService';

export type GuestInfo = {
  name: string;
  age: number;
  themePreference: ThemePreference | null;
  house: HogwartsHouse | null;
  jediSith: StarWarsSide | null;
  is_fixed?: boolean;
  attending?: boolean;
  id?: string; // Para identificar invitados existentes
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
  updateGuestAttendance: (guestIndex: number, attending: boolean) => Promise<boolean>;
  
  // Obtener el invitado actual
  currentGuest: GuestInfo | null;

  // Form instances
  guestInfoForm: ReturnType<typeof Form.useForm<GuestFormValues>>[0] | null;
  setGuestInfoForm: React.Dispatch<React.SetStateAction<ReturnType<typeof Form.useForm<GuestFormValues>>[0] | null>>;
  themePreferencesForm: ReturnType<typeof Form.useForm>[0] | null;
  setThemePreferencesForm: React.Dispatch<React.SetStateAction<ReturnType<typeof Form.useForm>[0] | null>>;
  confirmationForm: ReturnType<typeof Form.useForm>[0] | null;
  setConfirmationForm: React.Dispatch<React.SetStateAction<ReturnType<typeof Form.useForm>[0] | null>>;
  
  // Form validation methods
  validateCurrentStep: (step: FormStep) => Promise<boolean>;
  getMergedFormData: () => GuestFormValues;
};

const FormContext = createContext<FormContextType | null>(null);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const [currentGuestIndex, setCurrentGuestIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Store form instances
  const [guestInfoForm, setGuestInfoForm] = useState<ReturnType<typeof Form.useForm<GuestFormValues>>[0] | null>(null);
  const [themePreferencesForm, setThemePreferencesForm] = useState<ReturnType<typeof Form.useForm>[0] | null>(null);
  const [confirmationForm, setConfirmationForm] = useState<ReturnType<typeof Form.useForm>[0] | null>(null);

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

  // Actualizar estado de asistencia de un invitado
  const updateGuestAttendance = async (guestIndex: number, attending: boolean): Promise<boolean> => {
    const guest = guests[guestIndex];
    if (!guest) return false;
    
    // Si estamos cambiando de no asistir a asistir (descancelar), verificar fecha lu00edmite
    if (attending === true && guest.attending === false) {
      const isBeforeDeadline = await TimeService.isBeforeDeadline();
      
      if (!isBeforeDeadline) {
        // La fecha lu00edmite ha pasado, no permitir descancelar
        return false;
      }
    }
    
    // Si el invitado ya existe en la base de datos, actualizarlo
    if (guest.id) {
      const success = await GuestService.toggleGuestAttendance(guest.id, attending);
      
      if (success) {
        // Actualizar estado local despuu00e9s de la actualizaciu00f3n exitosa en la BD
        setGuests(prevGuests => {
          const newGuests = [...prevGuests];
          if (newGuests[guestIndex]) {
            newGuests[guestIndex] = {
              ...newGuests[guestIndex],
              attending
            };
          }
          return newGuests;
        });
      }
      
      return success;
    } else {
      // Si es un invitado nuevo que au00fan no estu00e1 en la BD, solo actualizar el estado local
      setGuests(prevGuests => {
        const newGuests = [...prevGuests];
        if (newGuests[guestIndex]) {
          newGuests[guestIndex] = {
            ...newGuests[guestIndex],
            attending
          };
        }
        return newGuests;
      });
      
      return true;
    }
  };

  // Validate current step form
  const validateCurrentStep = async (step: FormStep): Promise<boolean> => {
    try {
      switch (step) {
        case FormStep.GUEST_INFO:
          if (guestInfoForm) {
            try {
              await guestInfoForm.validateFields();
              return true;
            } catch (error) {
              console.error("Guest info validation error:", error);
              return false;
            }
          }
          return false;
          
        case FormStep.THEME_PREFERENCES:
          // Validate theme preferences for current guest
          const guest = guests[currentGuestIndex];
          
          if (!guest || guest.themePreference === null) {
            return false;
          }
          
          // Validate Hogwarts house if needed
          if ((guest.themePreference === ThemePreference.HARRY_POTTER || 
              guest.themePreference === ThemePreference.BOTH) && 
              guest.house === null) {
            return false;
          }
          
          // Validate Star Wars side if needed
          if ((guest.themePreference === ThemePreference.STAR_WARS || 
              guest.themePreference === ThemePreference.BOTH) && 
              guest.jediSith === null) {
            return false;
          }
          
          return true;
          
        case FormStep.CONFIRMATION:
          // Verify we have the confirmation form
          if (!confirmationForm) {
            return false;
          }
          
          try {
            // Validate terms accepted
            await confirmationForm.validateFields();
            
            // Validate that all guests have complete information
            return guests.every(guest => 
              Boolean(guest.name) && 
              guest.age !== undefined && 
              guest.themePreference !== null && 
              (guest.themePreference !== ThemePreference.HARRY_POTTER && 
                guest.themePreference !== ThemePreference.BOTH || 
                guest.house !== null) && 
              (guest.themePreference !== ThemePreference.STAR_WARS && 
                guest.themePreference !== ThemePreference.BOTH || 
                guest.jediSith !== null)
            );
          } catch (error) {
            console.error("Confirmation validation error:", error);
            return false;
          }
          
        default:
          return false;
      }
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  };
  
  // Get merged form data from all forms
  const getMergedFormData = (): GuestFormValues => {
    const guestInfoData = guestInfoForm?.getFieldsValue() || { rootGuestName: '', guests: [] };
    
    // Crear una estructura más adecuada que combine los datos del formulario y del estado
    const combinedData: GuestFormValues = {
      rootGuestName: guestInfoData.rootGuestName || '',
      guests: guests
        .filter(guest => guest.attending !== false) // Solo incluir a los que van a asistir
        .map(guest => {
          // Obtener datos del formulario para completar la información
          const formGuest = (guestInfoData.guests || [])[guests.indexOf(guest)] || {};
          
          return {
            name: guest.name || formGuest.name || '',
            age: formGuest.age !== undefined ? formGuest.age : guest.age,
            preferences: {
              theme: guest.themePreference || ThemePreference.NONE,
              house: guest.house || undefined,
              jediSith: guest.jediSith || undefined
            },
            id: guest.id // Pasar el ID para actualizar correctamente
          };
        }),
      // Mantener la estructura anterior para compatibilidad
      themePreferences: guests
        .filter(guest => guest.attending !== false) // Solo incluir a los que van a asistir
        .map(guest => ({
          guestIndex: guests.indexOf(guest),
          preference: guest.themePreference || ThemePreference.NONE,
          house: guest.house || undefined,
          jediSith: guest.jediSith || undefined
        }))
    };
    
    // Mostrar en consola los datos que se enviarían
    console.log('Datos a enviar:', combinedData);
    
    return combinedData;
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
    updateGuestAttendance,
    currentGuest,
    guestInfoForm,
    setGuestInfoForm,
    themePreferencesForm,
    setThemePreferencesForm,
    confirmationForm,
    setConfirmationForm,
    validateCurrentStep,
    getMergedFormData
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