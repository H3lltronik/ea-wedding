import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { createClient } from '@/utils/supabase/client';
import { RootInvitation } from '@/app/types/supabase';
import { useInvitationCode } from '@/app/hooks/useInvitationCode';

export function useRootInvitation() {
  const [rootInvitation, setRootInvitation] = useState<RootInvitation | null>(null);
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
    loading: loading || codeLoading,
    error: error || codeError
  };
} 