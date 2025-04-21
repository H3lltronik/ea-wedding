import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { message } from 'antd';
import { createClient } from '@/utils/supabase/client';
import { RootInvitation } from '@/app/types/supabase';

export function useRootInvitation() {
  const [rootInvitation, setRootInvitation] = useState<RootInvitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const code = searchParams.get('code');
        if (!code) {
          setError('Código de invitación no encontrado');
          message.error('Código de invitación no encontrado');
          router.push('/invitation-error');
          return;
        }
        
        // Decode the base64 invitation code
        const decodedInvitationCode = Buffer.from(code, 'base64').toString('utf-8');
        
        // Create Supabase client and fetch invitation details
        const supabase = await createClient();
        const { data, error: supabaseError } = await supabase
          .from('root_invitations')
          .select('*')
          .eq('id', decodedInvitationCode)
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
  }, [searchParams, router]);

  return {
    rootInvitation,
    loading,
    error
  };
} 