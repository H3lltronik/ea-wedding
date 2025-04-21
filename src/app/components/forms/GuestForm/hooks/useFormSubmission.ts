import { useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { GuestFormValues } from '../../guestFormSchema';
import { RootInvitation } from '@/app/types/supabase';

type UseFormSubmissionProps = {
  rootInvitation: RootInvitation | null;
};

export function useFormSubmission({ rootInvitation }: UseFormSubmissionProps) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: GuestFormValues) => {
    try {
      setSubmitting(true);
      
      if (!rootInvitation) {
        message.error('Error: No se encontró la invitación');
        return;
      }
      
      const supabase = await createClient();
      
      // First, save the guests
      const guestsToInsert = values.guests.map((guest) => ({
        root_invitation_id: rootInvitation.id,
        name: guest.name,
        age: guest.age,
      }));
      
      const { data: insertedGuests, error: guestsError } = await supabase
        .from('guests')
        .insert(guestsToInsert)
        .select();
        
      if (guestsError) {
        throw new Error(`Error al guardar invitados: ${guestsError.message}`);
      }
      
      // Then, save the theme preferences
      const preferencesToInsert = values.themePreferences.map(pref => {
        const guest = insertedGuests[pref.guestIndex];
        return {
          guest_id: guest.id,
          main_preference: pref.preference,
          house: pref.preference === 'harry_potter' || pref.preference === 'both' ? pref.house : null,
          jedi_sith: pref.preference === 'star_wars' || pref.preference === 'both' ? pref.jediSith : null,
        };
      });
      
      const { error: preferencesError } = await supabase
        .from('theme_preferences')
        .insert(preferencesToInsert);
        
      if (preferencesError) {
        throw new Error(`Error al guardar preferencias: ${preferencesError.message}`);
      }
      
      message.success('¡Registro exitoso!');
      router.push('/success');
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Error al enviar el formulario. Por favor, intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    handleSubmit
  };
} 