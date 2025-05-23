'use client'

import React, { useEffect, useState, Suspense } from 'react';
import { Card, Typography, Button } from 'antd';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import WeddingLogo from '../icons/WeddingLogo';

const { Title, Paragraph } = Typography;

// Component that uses useSearchParams
const ThankYouContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedCode = searchParams.get('code');
  const [guestName, setGuestName] = useState<string>('');

  // Obtener el nombre del invitado principal si tenemos el código
  useEffect(() => {
    const fetchGuestInfo = async () => {
      if (encodedCode) {
        try {
          // Decodificar el código de invitación
          const invitationId = Buffer.from(encodedCode, 'base64').toString('utf-8');
          
          // Consultar la información de la invitación
          const supabase = await createClient();
          const { data, error } = await supabase
            .from('root_invitations')
            .select('name')
            .eq('id', invitationId)
            .single();
          
          if (data && !error) {
            setGuestName(data.name);
          }
        } catch (error) {
          console.error('Error al obtener información del invitado:', error);
        }
      }
    };
    
    fetchGuestInfo();
  }, [encodedCode]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl w-full"
    >
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="mb-6 inline-block"
          >
            <div className="w-32 h-32 relative mx-auto">
              <WeddingLogo />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Title level={2} className="mb-2">
              {guestName ? `¡Muchas gracias ${guestName}!` : '¡Muchas gracias!'}
            </Title>
            <Paragraph className="text-lg mb-8">
              Hemos recibido tu información correctamente.
              {' '}Estamos emocionados de compartir nuestro día especial contigo.
            </Paragraph>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button 
                type="primary" 
                size="large"
                onClick={() => router.push(encodedCode ? `/?code=${encodedCode}` : '/')}
                className="mb-4"
              >
                Volver al inicio
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-[url('/images/background.jpg')] bg-cover bg-center flex items-center justify-center py-10 px-4">
    <div className="max-w-2xl w-full">
      <Card className="shadow-xl border-0 overflow-hidden">
        <div className="text-center">
          <div className="w-32 h-32 relative mx-auto">
            <WeddingLogo />
          </div>
          <div className="mt-6">
            <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded-md mx-auto"></div>
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-md mx-auto mt-4"></div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[url('/images/background.jpg')] bg-cover bg-center flex items-center justify-center py-10 px-4">
      <Suspense fallback={<LoadingFallback />}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
} 