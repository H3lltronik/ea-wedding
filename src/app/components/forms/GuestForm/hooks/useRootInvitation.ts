import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { createClient } from '@/utils/supabase/client';
import { RootInvitation, Guest } from '@/app/types/supabase';
import { useInvitationCode } from '@/app/hooks/useInvitationCode';

export function useRootInvitation() {
  const [rootInvitation, setRootInvitation] = useState<RootInvitation | null>(null);
  const [existingGuests, setExistingGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { invitationCode, loading: codeLoading, error: codeError } = useInvitationCode();
  const router = useRouter();
  
  useEffect(() => {
    const fetchInvitation = async () => {
      if (codeLoading) return;
      
      if (codeError || !invitationCode) {
        setError(codeError || 'Código de invitación no válido');
        setLoading(false);
        return;
      }
      
      try {
        // Create Supabase client and fetch invitation details
        const supabase = await createClient();
        const { data, error: supabaseError } = await supabase
          .from('root_invitations')
          .select('*')
          .eq('id', invitationCode)
          .single();
          
        if (supabaseError || !data) {
          setError('Error al cargar la invitación');
          message.error('Error al cargar la invitación');
          router.push('/invitation-error');
          return;
        }
        
        // Set the invitation details
        setRootInvitation(data);
        
        // Fetch existing guests for this invitation
        const { data: guestsData, error: guestsError } = await supabase
          .from('guests')
          .select('*')
          .eq('root_invitation_id', invitationCode);
          
        if (guestsError) {
          console.error('Error fetching guests:', guestsError);
          setExistingGuests([]);
        } else if (guestsData && guestsData.length > 0) {
          // Now fetch preferences for each guest
          const enhancedGuests = await Promise.all(
            guestsData.map(async (guest) => {
              // Get preferences from preferences table
              const { data: preferencesData, error: prefError } = await supabase
                .from('preferences')
                .select('*')
                .eq('guest_id', guest.id)
                .single();
              
              if (prefError || !preferencesData) {
                console.log(`No preferences found for guest ${guest.name}`);
                return guest;
              }
              
              // Add the preferences to the guest object
              const prefs = preferencesData.preferences;
              return {
                ...guest,
                age: prefs?.age || guest.age,
                themePreference: prefs?.theme || null,
                house: prefs?.house || null,
                jediSith: prefs?.jediSith || null,
                preferences: [preferencesData]
              };
            })
          );
          
          setExistingGuests(enhancedGuests);
        } else {
          setExistingGuests([]);
        }
      } catch (err) {
        console.error('Error fetching invitation:', err);
        setError('Error al cargar la invitación');
        message.error('Error al cargar la invitación');
        router.push('/invitation-error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvitation();
  }, [invitationCode, codeLoading, codeError, router]);

  return {
    rootInvitation,
    existingGuests,
    loading: loading || codeLoading,
    error: error || codeError
  };
} 