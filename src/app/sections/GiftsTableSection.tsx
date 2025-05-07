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
    <section className={`min-h-screen py-24 bg-gradient-to-b from-[#fffbf0] to-[#fff8e8] overflow-hidden ${className}`}>
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
            stroke="#b48a3f"
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
            stroke="#b48a3f"
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
              stroke="#b48a3f"
              strokeWidth="1"
              variants={drawVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>
        </motion.div>

        <motion.h2 
          className="text-5xl md:text-6xl text-center font-parisienne text-[#b48a3f] mb-4"
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
          className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto relative overflow-hidden mb-16 envelope-container"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
            borderTop: "15px solid #b48a3f",
            paddingBottom: "4rem",
            position: "relative",
            borderLeft: "1px solid #d3b978",
            borderRight: "1px solid #d3b978",
            background: "linear-gradient(to bottom, white, #fff8e8 100%)"
          }}
        >
          {/* Envelope flap */}
          <div className="absolute top-0 left-0 w-full h-12 bg-amber-50" 
               style={{
                 clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 50%, 0% 100%)",
                 transform: "translateY(-100%)",
                 borderLeft: "1px solid #b48a3f",
                 borderRight: "1px solid #b48a3f",
                 borderTop: "1px solid #b48a3f",
                 zIndex: -1,
                 background: "linear-gradient(to bottom, #d3b978, #fff8e8)"
               }}>
          </div>
          
          {/* Decorative stamp */}
          <div className="absolute top-6 right-10 w-16 h-16 rounded-md bg-amber-50 border border-amber-300 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M10,10 L90,10 L90,90 L10,90 Z" stroke="#b48a3f" strokeWidth="3" fill="none" strokeDasharray="5,5" />
              </svg>
            </div>
            <div className="text-[#b48a3f] font-bold text-xs tracking-wider">
              <span className="block text-center">♥</span>
              <span className="block text-center text-[8px] mt-1">AMOR</span>
            </div>
          </div>
          
          {/* Left seal line */}
          <div className="absolute top-0 left-0 h-full w-[1px] bg-amber-200" style={{ transform: "rotate(15deg)", transformOrigin: "top left", opacity: 0.7 }}></div>
          
          {/* Right seal line */}
          <div className="absolute top-0 right-0 h-full w-[1px] bg-amber-200" style={{ transform: "rotate(-15deg)", transformOrigin: "top right", opacity: 0.7 }}></div>

          <motion.div 
            className="absolute -top-20 -left-20 w-40 h-40 opacity-5"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100">
              <path d="M50,10 L55,40 L85,40 L60,60 L70,90 L50,70 L30,90 L40,60 L15,40 L45,40 Z" fill="#b48a3f"/>
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-20 -right-20 w-40 h-40 opacity-5"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100">
              <path d="M50,10 L55,40 L85,40 L60,60 L70,90 L50,70 L30,90 L40,60 L15,40 L45,40 Z" fill="#b48a3f"/>
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
              <svg className="w-14 h-14 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "-5%", top: "60%" }}
              animate={{ left: "105%" }}
              transition={{ duration: 18, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2 }}
            >
              <svg className="w-10 h-10 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "110%", top: "40%" }}
              animate={{ left: "-10%" }}
              transition={{ duration: 20, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1 }}
            >
              <svg className="w-12 h-12 text-[#b48a3f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "100%", top: "10%" }}
              animate={{ left: "-20%" }}
              transition={{ duration: 25, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 3 }}
            >
              <svg className="w-8 h-8 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "50%", top: "70%" }}
              animate={{ left: "120%" }}
              transition={{ duration: 12, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 4 }}
            >
              <svg className="w-10 h-10 text-[#b48a3f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            {/* Nuevos sobres de diferentes colores */}
            <motion.div 
              className="absolute"
              initial={{ left: "-15%", top: "30%" }}
              animate={{ left: "115%" }}
              transition={{ duration: 17, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 1.5 }}
            >
              <svg className="w-12 h-12 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "120%", top: "55%" }}
              animate={{ left: "-15%" }}
              transition={{ duration: 22, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 3.5 }}
            >
              <svg className="w-9 h-9 text-amber-100" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
            
            <motion.div 
              className="absolute"
              initial={{ left: "-20%", top: "15%" }}
              animate={{ left: "110%" }}
              transition={{ duration: 19, repeat: Infinity, repeatType: "loop", ease: "linear", delay: 2.7 }}
            >
              <svg className="w-11 h-11 text-[#d3b978]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </motion.div>
          </div>

          <div className="space-y-6 text-gray-700 mb-8 max-w-xl mx-auto">
            <div className="text-center px-4 py-6 border border-amber-200 rounded-lg bg-white shadow-sm">
              <p className="mb-4 text-[#8d6a32]">En cada mesa encontrarás sobres dorados para todos los invitados. Puedes depositar tus buenos deseos junto con tu generoso presente en la urna que estará ubicada cerca de la mesa principal.</p>
              <p className="text-[#b48a3f] italic">¡Cada aportación es un ladrillo dorado que nos ayudará a construir los cimientos de nuestro hogar y futuro juntos!</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto"
          variants={fadeInVariants}
        >
          <svg className="w-full h-auto opacity-10" viewBox="0 0 200 20">
            <motion.path
              d="M0,10 C40,20 60,0 100,10 C140,20 160,0 200,10"
              fill="none"
              stroke="#b48a3f"
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