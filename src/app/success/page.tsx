'use client'

import React, { useEffect, Suspense } from 'react';
import { Header } from '../components/Header';
import Link from 'next/link';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Fallback component for the Header while it's loading
const HeaderFallback = () => (
  <div className="h-[80px] w-full bg-white bg-opacity-90 backdrop-blur-sm"></div>
);

export default function SuccessPage() {
  useEffect(() => {
    // Lanzar confetti cuando la página se carga
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Lanzar partículas desde ambos lados
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

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

  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 1 }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 overflow-hidden">
      <Suspense fallback={<HeaderFallback />}>
        <Header className="sticky top-0 left-0 right-0 z-50" />
      </Suspense>
      
      <motion.div 
        className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Elementos decorativos */}
        <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.svg 
            className="absolute top-10 right-10 w-40 h-40 text-red-200 opacity-20" 
            viewBox="0 0 100 100"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <motion.path
              d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              variants={drawVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>
          
          <motion.svg 
            className="absolute bottom-10 left-10 w-32 h-32 text-red-200 opacity-20" 
            viewBox="0 0 100 100"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <motion.rect 
              x="20" 
              y="20" 
              width="60" 
              height="60" 
              rx="10" 
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              variants={drawVariants}
              initial="hidden"
              animate="visible"
            />
          </motion.svg>
        </motion.div>
        
        <motion.div 
          className="w-24 h-24 mb-8 text-red-400"
          variants={itemVariants}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-parisienne text-red-400 mb-4 text-center"
          variants={itemVariants}
        >
          ¡Gracias por confirmar!
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-lg text-center mb-6"
          variants={itemVariants}
        >
          Hemos recibido tu confirmación de asistencia. Estamos muy emocionados de compartir 
          este día tan especial contigo.
        </motion.p>
        
        <motion.p 
          className="text-md text-gray-600 max-w-lg text-center mb-8"
          variants={itemVariants}
        >
          Recuerda la fecha: <span className="font-semibold">24 de Octubre de 2025</span>
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