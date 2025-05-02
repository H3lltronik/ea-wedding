'use client'

import React, { Suspense } from 'react';
import { Header } from '../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Fallback component for the Header while it's loading
const HeaderFallback = () => (
  <div className="h-[80px] w-full bg-white bg-opacity-90 backdrop-blur-sm"></div>
);

export default function InvitationErrorPage() {
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Suspense fallback={<HeaderFallback />}>
        <Header className="sticky top-0 left-0 right-0 z-50" />
      </Suspense>
      
      <motion.div 
        className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-24 h-24 mb-8 text-red-300"
          variants={itemVariants}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-parisienne text-red-400 mb-4 text-center"
          variants={itemVariants}
        >
          Código de invitación no válido
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-md text-center mb-8"
          variants={itemVariants}
        >
          Lo sentimos, el código de invitación que has proporcionado no es válido o ha expirado.
          Por favor, verifica que la URL sea correcta.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link 
            href="/" 
            className="bg-red-400 hover:bg-red-500 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 