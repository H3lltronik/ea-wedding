'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface DressCodeSectionProps {
  className?: string;
}

export const DressCodeSection = ({ className = '' }: DressCodeSectionProps) => {
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
    <section className={`min-h-screen py-24 bg-gradient-to-b from-pink-50 via-red-50 to-pink-50 overflow-hidden ${className}`}>
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
          <motion.path
            d="M50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 C20,35 35,20 50,20 Z"
            fill="none"
            stroke="#FDA4AF"
            strokeWidth="0.5"
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
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#FFB6C1"
            strokeWidth="0.8"
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
          Código de Vestimenta
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-20"
          variants={itemVariants}
        >
          Para que juntos celebremos este día tan especial, nos encantaría que te unieras a nosotros con el siguiente código de vestimenta
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute -top-10 -left-10 w-20 h-20 text-red-200 opacity-20"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100">
                <path d="M50,10 L55,40 L85,40 L60,60 L70,90 L50,70 L30,90 L40,60 L15,40 L45,40 Z" fill="currentColor"/>
              </svg>
            </motion.div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-parisienne text-red-400 mb-6">Para Ellas</h3>
              <div className="bg-white rounded-xl shadow-md p-8 mb-8 transform hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 flex-shrink-0 bg-red-50 rounded-full flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V5H16V4Z" fill="currentColor"/>
                      <path d="M20 6H4C2.9 6 2 6.9 2 8V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V8C22 6.9 21.1 6 20 6ZM12 17C9.2 17 7 14.8 7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12C17 14.8 14.8 17 12 17Z" fill="currentColor"/>
                    </svg>
                  </motion.div>
                  <h4 className="text-xl font-medium text-gray-800">Elegancia y Sofisticación</h4>
                </div>
                <p className="text-lg mb-6 text-gray-700">
                  Sugerimos un <span className="font-semibold italic">vestido formal</span> en tonos pastel o colores vibrantes que reflejen la alegría de este día tan especial.
                </p>
                <div className="space-y-4 text-gray-700 mb-6 pl-2">
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Vestido cocktail o largo</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Zapatos cómodos para bailar</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Accesorios que complementen tu outfit</span>
                  </motion.div>
                </div>
                <motion.div 
                  className="text-sm text-gray-500 italic bg-red-50 p-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  Evita el color blanco, reservado para la novia.
                </motion.div>
              </div>
              <motion.div 
                className="flex justify-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center drop-shadow-lg">
                  <svg className="w-24 h-24 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C9.8 16 8 14.2 8 12V4H16V12C16 14.2 14.2 16 12 16Z" fill="currentColor"/>
                    <path d="M18.7 12.4C18.4 12.2 18.1 12.1 17.7 12.1C17.3 12.1 17 12.2 16.7 12.5C16.4 12.8 16.3 13.1 16.3 13.5H15.5C15.5 12.8 15.7 12.3 16.2 11.9C16.6 11.5 17.1 11.3 17.7 11.3C18.2 11.3 18.7 11.5 19.1 11.8C19.5 12.2 19.7 12.6 19.7 13.2C19.7 13.5 19.6 13.8 19.4 14.1C19.2 14.4 19 14.6 18.7 14.9L17.3 16.3H19.8V17.1H16.1V16.4L18.2 14.3C18.5 14 18.7 13.8 18.8 13.6C18.9 13.4 19 13.2 19 13C19 12.8 18.9 12.6 18.7 12.4Z" fill="currentColor"/>
                    <path d="M7.8 16.7H5.4L5.1 17.8H4.3L6.3 12.3H6.9L9 17.8H8.1L7.8 16.7ZM5.6 16H7.5L6.6 13.4L5.6 16Z" fill="currentColor"/>
                    <path d="M7 10.9L8.5 5.9H20.5L18.5 10.9" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10.2 16H13.8L16.5 21H7.5L10.2 16Z" fill="currentColor"/>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute -top-10 -right-10 w-20 h-20 text-red-200 opacity-20"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: -360, scale: 1 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100">
                <rect x="20" y="20" width="60" height="60" rx="10" fill="currentColor" />
              </svg>
            </motion.div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-parisienne text-red-400 mb-6">Para Ellos</h3>
              <div className="bg-white rounded-xl shadow-md p-8 mb-8 transform hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 flex-shrink-0 bg-red-50 rounded-full flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <svg className="w-6 h-6 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14C11.7 14 11.5 13.8 11.5 13.5V9.5C11.5 9.2 11.7 9 12 9C12.3 9 12.5 9.2 12.5 9.5V13.5C12.5 13.8 12.3 14 12 14Z" fill="currentColor"/>
                      <path d="M10.3 15H13.7L15 19H9L10.3 15Z" fill="currentColor"/>
                      <path d="M14.5 6C14.5 8 12 10 12 10C12 10 9.5 8 9.5 6C9.5 4.9 10.6 4 12 4C13.4 4 14.5 4.9 14.5 6Z" fill="currentColor"/>
                      <path d="M17 11H7V21H17V11Z" fill="currentColor"/>
                      <path d="M15.7 7H19C19.5 7 20 7.4 20 8V20C20 20.6 19.6 21 19 21H5C4.4 21 4 20.6 4 20V8C4 7.4 4.5 7 5 7H8.3" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </motion.div>
                  <h4 className="text-xl font-medium text-gray-800">Distinción y Estilo</h4>
                </div>
                <p className="text-lg mb-6 text-gray-700">
                  Recomendamos un <span className="font-semibold italic">atuendo formal</span> que haga honor a esta celebración tan significativa.
                </p>
                <div className="space-y-4 text-gray-700 mb-6 pl-2">
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Traje oscuro o en tonos neutros</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Camisa de vestir</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Zapatos formales</span>
                  </motion.div>
                </div>
                <motion.div 
                  className="text-sm text-gray-500 italic bg-red-50 p-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  La corbata es opcional, pero agrega un toque de elegancia.
                </motion.div>
              </div>
              <motion.div 
                className="flex justify-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center drop-shadow-lg">
                  <svg className="w-24 h-24 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 4.5C15 3.7 14.3 3 13.5 3H10.5C9.7 3 9 3.7 9 4.5V7H15V4.5Z" fill="currentColor"/>
                    <path d="M8.7 7L5 8.6V13C5 14.7 6.3 16.2 8 16.6V21H16V16.6C17.7 16.1 19 14.7 19 13V8.6L15.3 7H8.7Z" fill="currentColor"/>
                    <path d="M12 16C14.2 16 16 14.2 16 12V8H8V12C8 14.2 9.8 16 12 16Z" fill="white"/>
                    <path d="M13 11.3V12.5C13 13.1 12.6 13.5 12 13.5C11.4 13.5 11 13.1 11 12.5V11C11 10.4 11.4 10 12 10C12.3 10 12.5 10.1 12.7 10.3L14.4 12H15.5L13.5 10C13.2 9.7 12.7 9.5 12 9.5C11.2 9.5 10.5 10.2 10.5 11V12.5C10.5 13.3 11.2 14 12 14C12.8 14 13.5 13.3 13.5 12.5V11.8H12V11.3H13Z" fill="currentColor"/>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto text-center relative overflow-hidden"
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
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="20" fill="none"/>
            </svg>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-20 -right-20 w-40 h-40 opacity-5"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="20" fill="none"/>
            </svg>
          </motion.div>

          <h3 className="text-2xl font-semibold text-red-400 mb-4 relative z-10">¡Toque Temático!</h3>
          <p className="text-lg mb-8 text-gray-700 relative z-10 max-w-xl mx-auto">
            Si lo deseas, puedes agregar un pequeño detalle temático de Star Wars o Harry Potter a tu outfit.
            ¡Nos encantaría ver tu creatividad!
          </p>
          
          <div className="flex justify-center space-x-16 items-center relative z-10">
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-10 h-10 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14L3 18L7 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M17 14L21 18L17 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 22L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M11.9999 8C13.6568 8 14.9999 6.65685 14.9999 5C14.9999 3.34315 13.6568 2 11.9999 2C10.3431 2 8.99994 3.34315 8.99994 5C8.99994 6.65685 10.3431 8 11.9999 8Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Harry Potter</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-3 shadow-md">
                <svg className="w-10 h-10 text-red-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 18L19 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 11L15 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 11L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 7L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="2" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Star Wars</span>
            </motion.div>
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

export default DressCodeSection; 