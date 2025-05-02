'use client'
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroLogoAndNames from '../components/HeroLogoAndNames'
import Bg from '@/assets/propuesta/hero.jpg'
import Image from 'next/image'

interface HeroSectionProps {
  animate?: boolean;
  index?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

export const HeroSection = ({ animate = true, index = 0, onAnimationComplete, className = '' }: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reproducir video cuando la sección esté visible
  useEffect(() => {
    if (animate && videoRef.current) {
      // Intentar reproducir el video cuando la sección esté visible
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error reproduciendo video:", error);
        });
      }
    }
  }, [animate]);

  return (
    <motion.section 
      className={`relative flex justify-center items-center w-full h-screen ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.5 // Cada sección se anima con un pequeño retraso
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* <video 
          ref={videoRef}
          className="absolute w-full h-full object-cover"
          src="/videos/video.mp4" 
          muted 
          autoPlay
          playsInline
          loop
          preload="auto"
        /> */}
        <Image src={Bg} alt="Background" className="absolute w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black opacity-50" />
      
      {/* Añadimos el componente de logo y nombres con efecto typewriter */}
      <div className="relative z-10">
        <HeroLogoAndNames 
          onAnimationComplete={onAnimationComplete}
          className="text-white"
        />
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-[100px] bg-gradient-to-t from-[#fff8e8] to-transparent z-10"></div>
    </motion.section>
  )
}
