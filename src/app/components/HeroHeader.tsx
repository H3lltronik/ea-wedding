'use client'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import WeddingLogo from '../icons/WeddingLogo'

interface HeroHeaderProps {
  onAnimationComplete?: () => void;
}

export const HeroHeader = ({ onAnimationComplete }: HeroHeaderProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Transformación directa del tamaño sin spring physics para transición lineal
  const logoSize = useTransform(scrollY, 
    [0, 300], 
    ['100vh', '10vh']
  )
  
  // Transparencia del fondo - ahora comienza transparente (0) y se vuelve opaco (0.9)
  const bgOpacity = useTransform(scrollY,
    [0, 200],
    [0, 0.9]
  )
  
  // Color de fondo con opacidad variable
  const bgColor = useTransform(
    bgOpacity,
    (opacity) => `rgba(255, 255, 255, ${opacity})`
  )
  
  // Ensure hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <motion.header 
      className="fixed top-0 z-50 flex justify-center items-center w-full pointer-events-none"
      style={{
        backgroundColor: bgColor
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <motion.div 
        style={{ 
          width: logoSize, 
          height: logoSize 
        }}
        className="flex justify-center items-center py-2"
      >
        <WeddingLogo className="w-full h-full text-red-300" />
      </motion.div>
    </motion.header>
  )
} 