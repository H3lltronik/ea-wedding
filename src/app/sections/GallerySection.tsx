'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface GallerySectionProps {
  animate?: boolean;
  index?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

export const GallerySection = ({ animate = true, index = 0, onAnimationComplete, className = '' }: GallerySectionProps) => {
  return (
    <motion.section 
      className={`relative flex flex-col justify-center items-center w-full h-screen bg-[#0e1a40] ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.5
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <h2 className="text-5xl font-bold mb-8 text-red-300">Nuestra Galería</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 w-full max-w-4xl">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="relative overflow-hidden rounded-lg shadow-lg h-40 bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-pink-200 opacity-70" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Foto {item}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  )
} 