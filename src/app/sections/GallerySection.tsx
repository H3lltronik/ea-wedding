'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface GallerySectionProps {
  animate?: boolean;
  index?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

interface PhotoItem {
  id: number;
  height: number;
  width: number;
}

export const GallerySection = ({ animate = true, index = 0, onAnimationComplete, className = '' }: GallerySectionProps) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Generate random heights for a Pinterest-like masonry layout
    const imageItems = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      height: Math.floor(Math.random() * 200) + 200, // Random height between 200-400px
      width: 400
    }));
    
    setPhotos(imageItems);
    setLoading(false);
  }, []);

  return (
    <motion.section 
      className={`relative flex flex-col justify-center items-center w-full min-h-screen py-16 bg-[#0e1a40] ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.5
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <h2 className="text-5xl font-bold mb-12 text-red-300">Nuestra Galería</h2>
      
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <div className="h-16 w-16 border-4 border-red-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-6 w-full max-w-7xl space-y-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="break-inside-avoid rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              style={{ marginBottom: '1rem' }}
            >
              <div className="relative">
                <Image
                  src={`https://picsum.photos/id/${photo.id + 20}/400/${photo.height}`}
                  alt={`Nuestra foto ${photo.id}`}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  onError={(e) => {
                    // Fallback when image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/400/${photo.height}?random=${photo.id}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <p className="text-white text-lg font-semibold">Momento especial {photo.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
} 