'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface GiftsTableSectionProps {
  className?: string;
}

export const GiftsTableSection = ({ className = '' }: GiftsTableSectionProps) => {
  // Variantes para animaciones
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const drawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.4 }
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className={`min-h-screen py-24 bg-gradient-to-b from-red-50 via-pink-50 to-red-50 overflow-hidden ${className}`}>
      {/* Elemento decorativo SVG flotante */}
      <motion.div
        className="absolute top-20 right-5 opacity-20 -z-10 hidden lg:block"
        initial="initial"
        animate="animate"
        variants={floatVariants}
      >
        <svg width="200" height="200" viewBox="0 0 100 100">
          <motion.path
            d="M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 Z"
            fill="none"
            stroke="#FFB6C1"
            strokeWidth="1"
            variants={drawVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </motion.div>

      {/* Elemento decorativo SVG flotante izquierda */}
      <motion.div
        className="absolute top-60 left-5 opacity-20 -z-10 hidden lg:block"
        initial="initial"
        animate="animate"
        variants={{
          ...floatVariants,
          animate: {
            ...floatVariants.animate,
            transition: {
              ...floatVariants.animate.transition,
              delay: 1,
              repeatType: "reverse" as const
            }
          }
        }}
      >
        <svg width="150" height="150" viewBox="0 0 100 100">
          <motion.path
            d="M20,50 L80,50 M50,20 L50,80"
            stroke="#FDA4AF"
            strokeWidth="1"
            variants={drawVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
      </motion.div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto"
          variants={fadeInVariants}
        >
          <svg className="w-full h-auto opacity-10" viewBox="0 0 200 20">
            <motion.path
              d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10"
              fill="none"
              stroke="#FDA4AF"
              strokeWidth="1"
              variants={drawVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </motion.div>

        <motion.h2 
          className="text-5xl md:text-6xl text-center font-parisienne text-red-400 mb-4"
          variants={itemVariants}
        >
          Tu deseo es nuestro regalo
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-20"
          variants={itemVariants}
        >
          Preferimos la libertad de los regalos no etiquetados. Cada mesa contará con sobres para quienes deseen contribuir a nuestro futuro juntos.
        </motion.p>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto relative overflow-hidden mb-16"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 opacity-5"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100">
              <path d="M50,10 L55,40 L85,40 L60,60 L70,90 L50,70 L30,90 L40,60 L15,40 L45,40 Z" fill="currentColor"/>
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-20 -right-20 w-40 h-40 opacity-5"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100">
              <path d="M50,10 L55,40 L85,40 L60,60 L70,90 L50,70 L30,90 L40,60 L15,40 L45,40 Z" fill="currentColor"/>
            </svg>
          </motion.div>

          {/* Visualización de sobres en movimiento */}
          <div className="relative h-40 mb-8 overflow-hidden">
            <motion.div 
              className="absolute"
              initial={{ left: "-10%", top: "20%" }}
              animate={{ left: "110%" }}
              transition={{ duration: 15, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            >
              <svg className="w-14 h-14 text-red-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "-5%", top: "60%" }}
              animate={{ left: "105%" }}
              transition={{ duration: 18, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2 }}
            >
              <svg className="w-10 h-10 text-pink-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "110%", top: "40%" }}
              animate={{ left: "-10%" }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
            >
              <svg className="w-12 h-12 text-red-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "100%", top: "10%" }}
              animate={{ left: "-20%" }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 3 }}
            >
              <svg className="w-8 h-8 text-pink-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "50%", top: "70%" }}
              animate={{ left: "120%" }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 4 }}
            >
              <svg className="w-10 h-10 text-red-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
          </div>

          <div className="space-y-6 text-gray-700 mb-8 max-w-xl mx-auto">
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center mt-1 mr-3">
                <span className="h-2 w-2 rounded-full bg-red-400"></span>
              </span>
              <span className="text-left">Cada invitado encontrará un sobre elegante en su mesa</span>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center mt-1 mr-3">
                <span className="h-2 w-2 rounded-full bg-red-400"></span>
              </span>
              <span className="text-left">Al final de la noche, todos los sobres de la mesa se colocarán juntos en el centro</span>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="h-5 w-5 flex-shrink-0 rounded-full bg-red-100 flex items-center justify-center mt-1 mr-3">
                <span className="h-2 w-2 rounded-full bg-red-400"></span>
              </span>
              <span className="text-left">La mesa con los sobres más bonitos y creativos recibirá un premio especial</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="bg-red-50 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-red-500 italic font-medium">
              Importante: No es necesario traer regalos físicos. Tu presencia en nuestra boda es lo más importante para nosotros.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto"
          variants={fadeInVariants}
        >
          <svg className="w-full h-auto opacity-10" viewBox="0 0 200 20">
            <motion.path
              d="M0,10 C40,20 60,0 100,10 C140,20 160,0 200,10"
              fill="none"
              stroke="#FDA4AF"
              strokeWidth="1"
              variants={drawVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GiftsTableSection; 