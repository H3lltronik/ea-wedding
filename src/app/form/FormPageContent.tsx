'use client'

import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import GuestForm from '../components/forms/GuestForm';
import { motion } from 'framer-motion';
import { ThemeBackground } from '../components/forms/GuestForm/components/ThemeBackground';
import { ThemeAudioPlayer } from '../components/forms/GuestForm/components/ThemeAudioPlayer';
import { Card } from 'antd';

export default function FormPageContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga para mostrar animaciones
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Variantes para animaciones
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const decorVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.2,
      transition: { 
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 1 }
      }
    }
  };

  return (
    <ThemeBackground>
      <div className="min-h-screen">
        <Header className="sticky top-0 left-0 right-0 z-50" />
        
        {isLoading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-red-200 border-t-red-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            className="py-10 px-4 relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
          >
            {/* Elementos decorativos SVG */}
            <motion.div className="absolute top-0 right-0 -z-10 overflow-hidden w-full h-full">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path 
                  d="M0,0 C30,20 70,20 100,0 V100 H0 Z" 
                  fill="none" 
                  stroke="#FDA4AF" 
                  strokeWidth="0.2"
                  variants={decorVariants}
                  initial="hidden"
                  animate="visible"
                />
                <motion.path 
                  d="M0,100 C30,80 70,80 100,100 V0 H0 Z" 
                  fill="none" 
                  stroke="#FDA4AF" 
                  strokeWidth="0.2"
                  variants={decorVariants}
                  initial="hidden"
                  animate="visible"
                />
              </svg>
            </motion.div>

            {/* Título y descripción */}
            <Card>
              <motion.div className="max-w-4xl mx-auto mb-10 text-center" variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl font-parisienne text-red-400 mb-4">Confirmación de Asistencia</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Por favor completa el formulario para confirmar tu asistencia a nuestra boda. 
                  Estamos muy emocionados de compartir este día especial contigo.
                </p>
              </motion.div>
            </Card>

            {/* Formulario */}
            <motion.div variants={itemVariants}>
              <GuestForm />
            </motion.div>
          </motion.div>
        )}
        
        {/* Reproductor de audio temático */}
        <ThemeAudioPlayer />
      </div>
    </ThemeBackground>
  );
} 