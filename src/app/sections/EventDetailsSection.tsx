'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaChurch, FaGlassCheers, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import WeddingLogo from '@/app/icons/WeddingLogo'
import Link from 'next/link'

interface EventDetailsSectionProps {
  animate?: boolean;
  index?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

export const EventDetailsSection = ({ animate = true, index = 0, onAnimationComplete, className = '' }: EventDetailsSectionProps) => {
  // Animación variantes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.section 
      className={`relative flex flex-col justify-center items-center w-full min-h-screen py-16 bg-gradient-to-b from-[#fffbf0] to-[#fff8e8] ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.5
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#b48a3f" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <motion.div 
        className="container mx-auto px-6 relative z-10 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-center mb-10">
          <motion.h3 className="text-2xl font-parisienne text-[#b48a3f] mb-2" variants={itemVariants}>
            Nosotros:
          </motion.h3>
          <motion.h2 className="text-6xl md:text-7xl font-parisienne text-[#b48a3f] mb-3" variants={itemVariants}>
            Esaú González &
          </motion.h2>
          <motion.h2 className="text-6xl md:text-7xl font-parisienne text-[#b48a3f] mb-10" variants={itemVariants}>
            Andrea Valenzuela
          </motion.h2>

          <motion.p className="text-xl md:text-2xl text-[#b48a3f] mb-8 max-w-3xl mx-auto" variants={itemVariants}>
            Sería una gran alegría para nosotros si pudieras acompañarnos a nuestra:
          </motion.p>

          <motion.h2 className="text-7xl md:text-8xl font-parisienne text-[#b48a3f] mb-8" variants={itemVariants}>
            Boda
          </motion.h2>

          <motion.div className="flex justify-center items-center gap-4 flex-wrap mb-12" variants={itemVariants}>
            <div className="text-center">
              <h3 className="text-3xl font-medium text-[#b48a3f] uppercase">Sábado</h3>
              <div className="flex items-center justify-center">
                <span className="text-7xl font-bold text-[#b48a3f]">01</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-medium text-[#b48a3f] uppercase">Noviembre</h3>
              <h3 className="text-5xl font-medium text-[#b48a3f]">2025</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div 
            className="bg-white/70 rounded-xl p-8 backdrop-blur-sm shadow-lg border border-[#b48a3f]/30 transition-all"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#b48a3f]/10 rounded-full flex items-center justify-center">
                <FaChurch className="w-6 h-6 text-[#b48a3f]" />
              </div>
              <h3 className="text-3xl font-parisienne text-[#b48a3f]">Ceremonia Religiosa</h3>
            </div>

            <div className="pl-4 border-l-2 border-[#b48a3f]/20 mb-6">
              <h4 className="text-xl font-semibold text-[#b48a3f]">Parroquia San Judas Tadeo</h4>
              <p className="text-[#b48a3f]/80">
                Paseo de los Filósofos #1426, Colinas de la Normal, C.P. 44270, GDL. JAL.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-[#b48a3f]/10 rounded-full flex items-center justify-center">
                <FaClock className="w-4 h-4 text-[#b48a3f]" />
              </div>
              <h4 className="text-xl font-medium text-[#b48a3f]">Hora: <span className="font-semibold">6:00 PM</span></h4>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[#b48a3f]/10 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="w-4 h-4 text-[#b48a3f]" />
              </div>
              <Link href="https://maps.app.goo.gl/dTujXUdiz9nGSf837" target="_blank">
                <button className="text-[#b48a3f] underline hover:text-[#8d6a32] transition-colors">
                  Ver ubicación
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white/70 rounded-xl p-8 backdrop-blur-sm shadow-lg border border-[#b48a3f]/30 transition-all"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#b48a3f]/10 rounded-full flex items-center justify-center">
                <FaGlassCheers className="w-6 h-6 text-[#b48a3f]" />
              </div>
              <h3 className="text-3xl font-parisienne text-[#b48a3f]">Ceremonia Civil y Recepción</h3>
            </div>

            <div className="pl-4 border-l-2 border-[#b48a3f]/20 mb-6">
              <h4 className="text-xl font-semibold text-[#b48a3f]">Jardín Getsemaní</h4>
              <p className="text-[#b48a3f]/80">
                Calle Clio #2350, FOVISSSTE Estadio, C.P. 44240, GDL. JAL.
              </p>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-8 bg-[#b48a3f]/10 rounded-full flex items-center justify-center">
                <FaClock className="w-4 h-4 text-[#b48a3f]" />
              </div>
              <h4 className="text-xl font-medium text-[#b48a3f]">Hora: <span className="font-semibold">8:30 PM</span></h4>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-[#b48a3f]/10 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="w-4 h-4 text-[#b48a3f]" />
              </div>
              <Link href="https://maps.app.goo.gl/9mBHm7EEMD1ZVxS38" target="_blank">
                <button className="text-[#b48a3f] underline hover:text-[#8d6a32] transition-colors">
                  Ver ubicación
                </button>
              </Link>
            </div>
            <p className="text-[#b48a3f]/80 mt-2 italic text-xs text-center">
                No contamos con estacionamiento interno en el lugar, solo estacionamiento en la calle con personal cuidando los vehículos.
              </p>

          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <div className="w-40 h-40 mx-auto mb-8 flex justify-center">
            <WeddingLogo className="w-full h-full text-[#b48a3f]/60" />
          </div>
          <p className="text-lg text-[#b48a3f]/80 italic">
            &ldquo;Esperamos compartir con ustedes uno de los días más importantes de nuestras vidas.&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
} 