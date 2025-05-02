'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface DressCodeSectionProps {
  className?: string;
}

// Harry Potter Icons
const harryPotterIcons = [
  { name: 'Sombrero de Mago', path: '/noun-wizard-hat-4420259.svg' },
  { name: 'Nimbus 2000', path: '/noun-nimbus-2000-1419626.svg' },
  { name: 'Reliquias de la Muerte', path: '/noun-deathly-hallows-2185219.svg' },
  { name: 'Snitch Dorada', path: '/noun-golden-snitch-1419618.svg' },
  { name: 'Harry Potter', path: '/noun-harry-potter-2185221.svg' },
  { name: 'Giratiempo', path: '/noun-time-turner-3560060.svg' },
  { name: 'Caldero', path: '/noun-cauldron-1419627.svg' },
  { name: 'Búho', path: '/noun-owl-6865120.svg' },
  { name: 'Carta de Hogwarts', path: '/noun-hogwarts-letter-2395701.svg' },
  { name: 'Libros', path: '/noun-books-7198506.svg' },
  { name: 'Varita', path: '/noun-umbridges-wand-965707.svg' },
  { name: 'Poción', path: '/noun-potion-bottle-1223747.svg' },
];

// Star Wars Icons
const starWarsIcons = [
  { name: 'Sable de Luz', path: '/noun-light-saber-12457.svg' },
  { name: 'Jedi', path: '/noun-jedi-2552433.svg' },
  { name: 'Stormtrooper', path: '/noun-stormtrooper-316783.svg' },
  { name: 'TIE Fighter', path: '/noun-tie-fighter-2202280.svg' },
  { name: 'Estrella de la Muerte', path: '/noun-death-star-12458.svg' },
  { name: 'C-3PO', path: '/noun-c3po-37513.svg' },
  { name: 'Estación de Batalla', path: '/noun-space-battle-station-5289018.svg' },
];

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
                  Sugerimos un <span className="font-semibold italic">vestido formal</span> que refleje la elegancia de esta ocasión tan especial.
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
                    <span>Accesorios de noche</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-300 mr-3"></span>
                    <span>Zapatos cómodos para bailar</span>
                  </motion.div>
                </div>
                <motion.div 
                  className="text-sm text-gray-500 italic bg-red-50 p-3 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  No está permitido usar color blanco, beige, plateado, azul marino o colores muy claros, pues están reservados para la novia y las damas.
                </motion.div>
              </div>
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
                  La corbata es opcional, pero agrega un toque de elegancia. No esta permitido usar color gris pues esta reservado para el novio.
                </motion.div>
              </div>
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
          
          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div>
              <h4 className="text-xl font-medium text-red-400 mb-4">Harry Potter</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {harryPotterIcons.slice(0, 6).map((icon, index) => (
                  <motion.div 
                    key={`hp-${index}`}
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-2 shadow-md p-3">
                      <Image 
                        src={icon.path} 
                        alt={icon.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-xs text-gray-700 font-medium text-center">{icon.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-medium text-red-400 mb-4">Star Wars</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {starWarsIcons.slice(0, 6).map((icon, index) => (
                  <motion.div 
                    key={`sw-${index}`}
                    className="flex flex-col items-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-2 shadow-md p-3">
                      <Image 
                        src={icon.path} 
                        alt={icon.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <span className="text-xs text-gray-700 font-medium text-center">{icon.name}</span>
                  </motion.div>
                ))}
              </div>
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