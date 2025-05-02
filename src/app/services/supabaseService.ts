import { createClient } from '@supabase/supabase-js';
import { GuestFormValues } from '../components/forms/guestFormSchema';
import { ThemePreference } from '../components/forms/GuestForm/constants/enums';

// Inicializar el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Servicio para manejar la inserción de invitados y sus preferencias en Supabase
 */
export const GuestService = {
  /**
   * Verifica si una invitación ya ha sido respondida
   * @param rootInvitationId ID de la invitación raíz
   * @returns Objeto con el estado y los datos de los invitados si existen
   */
  async checkExistingSubmission(rootInvitationId: string): Promise<{ exists: boolean }> {
    try {
      // Verificar si la invitación ha sido respondida usando la columna has_answered
      const { data, error } = await supabase
        .from('root_invitations')
        .select('has_answered')
        .eq('id', rootInvitationId)
        .single();
      
      if (error) {
        console.error('Error al verificar invitación respondida:', error);
        return { exists: false };
      }
      
      // Si has_answered es true, la invitación ya fue respondida
      const exists = data && data.has_answered === true;
      
      return { exists };
    } catch (error) {
      console.error('Error al verificar invitación:', error);
      return { exists: false };
    }
  },

  /**
   * Guarda los datos del formulario en Supabase
   * @param formData Datos del formulario de invitados
   * @param rootInvitationId ID de la invitación raíz
   */
  async saveFormData(formData: GuestFormValues, rootInvitationId: string): Promise<boolean> {
    try {
      console.log('Saving form data to Supabase:', formData);
      
      // 1. Para cada invitado en formData.guests, creamos un registro en la tabla guests
      const guestInsertPromises = formData.guests.map(async (guest, index) => {
        const isRoot = index === 0;
        
        // Insertar el invitado en la tabla guests
        const { data: guestData, error: guestError } = await supabase
          .from('guests')
          .insert({
            name: guest.name,
            root_invitation_id: rootInvitationId,
            is_root: isRoot,
            attending: true // Por defecto, asumimos que asistirán
          })
          .select('id')
          .single();
        
        if (guestError) {
          console.error('Error al insertar invitado:', guestError);
          throw guestError;
        }
        
        // 2. Si el invitado tiene preferencias, las guardamos en la tabla preferences
        if (guest.preferences) {
          const preferencesObj = {
            theme: guest.preferences.theme || ThemePreference.NONE,
            house: guest.preferences.house,
            jediSith: guest.preferences.jediSith,
            age: guest.age
          };
          
          const { error: prefError } = await supabase
            .from('preferences')
            .insert({
              guest_id: guestData.id,
              preferences: preferencesObj
            });
          
          if (prefError) {
            console.error('Error al insertar preferencias:', prefError);
            throw prefError;
          }
        }
        
        return guestData.id;
      });
      
      // Esperar a que todas las inserciones terminen
      await Promise.all(guestInsertPromises);
      
      // 3. Actualizar el campo has_answered a true en la invitación raíz
      const { error: updateError } = await supabase
        .from('root_invitations')
        .update({ has_answered: true })
        .eq('id', rootInvitationId);
      
      if (updateError) {
        console.error('Error al actualizar estado de invitación:', updateError);
        throw updateError;
      }
      
      console.log('All data saved successfully');
      return true;
    } catch (error) {
      console.error('Error al guardar datos en Supabase:', error);
      return false;
    }
  }
}; 