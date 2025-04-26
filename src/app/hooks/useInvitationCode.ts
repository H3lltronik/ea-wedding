import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { message } from 'antd';

export function useInvitationCode() {
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
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
      
      setInvitationCode(decodedInvitationCode);
    } catch (err) {
      console.error('Error decoding invitation code:', err);
      setError('Error al procesar el código de invitación');
      message.error('Error al procesar el código de invitación');
      router.push('/invitation-error');
    } finally {
      setLoading(false);
    }
  }, [searchParams, router]);

  return {
    invitationCode,
    loading,
    error
  };
} 