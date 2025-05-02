'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

// Import gallery images
import gallery1 from '@/assets/gallery/1.jpg'
import gallery2 from '@/assets/gallery/2.png'
import gallery3 from '@/assets/gallery/3.png'
import gallery4 from '@/assets/gallery/4.png'
import gallery5 from '@/assets/gallery/5.jpg'

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
  gridRow: number;
  gridColumn: number;
  src: StaticImageData | string;
  alt: string;
}

export const GallerySection = ({ animate = true, index = 0, onAnimationComplete, className = '' }: GallerySectionProps) => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Our own gallery images
    const customImages = [
      { src: gallery1, alt: 'Nuestra foto 1' },
      { src: gallery2, alt: 'Nuestra foto 2' },
      { src: gallery3, alt: 'Nuestra foto 3' },
      { src: gallery4, alt: 'Nuestra foto 4' },
      { src: gallery5, alt: 'Nuestra foto 5' },
    ];

    // Create balanced images with different grid sizes
    const imageItems: PhotoItem[] = [];
    
    // First add placeholder lorem picsum images for the left side
    for (let i = 0; i < 8; i++) {
      const isWide = Math.random() > 0.8;
      const isTall = Math.random() > 0.8;
      
      imageItems.push({
        id: i + 1,
        height: isTall ? 300 : 200,
        width: 400,
        gridRow: isTall ? 2 : 1,
        gridColumn: isWide ? 2 : 1,
        src: `https://picsum.photos/id/${(i % 80) + 20}/400/${isTall ? 300 : 200}`,
        alt: `Momento especial ${i + 1}`
      });
    }
    
    // Then add our custom images with prominent sizes in the center
    const startId = imageItems.length + 1;
    customImages.forEach((img, i) => {
      // Make our images larger to stand out
      const isWide = i % 2 === 0;
      const isTall = i % 3 === 0;
      
      imageItems.push({
        id: startId + i,
        height: isTall ? 350 : 250,
        width: isWide ? 500 : 400,
        gridRow: isTall ? 2 : 1, // Tall images span 2 rows
        gridColumn: isWide ? 2 : 1, // Wide images span 2 columns
        src: img.src,
        alt: img.alt
      });
    });
    
    // Then add more lorem picsum images for the right side
    const rightStartId = imageItems.length + 1;
    for (let i = 0; i < 7; i++) {
      const isWide = Math.random() > 0.8;
      const isTall = Math.random() > 0.8;
      
      imageItems.push({
        id: rightStartId + i,
        height: isTall ? 300 : 200,
        width: 400,
        gridRow: isTall ? 2 : 1,
        gridColumn: isWide ? 2 : 1,
        src: `https://picsum.photos/id/${(i % 80) + 50}/400/${isTall ? 300 : 200}`,
        alt: `Momento especial ${rightStartId + i}`
      });
    }
    
    setPhotos(imageItems);
    setLoading(false);
  }, []);

  return (
    <motion.section 
      className={`relative flex flex-col justify-center items-center w-full min-h-screen py-16 bg-[#fff8e8] overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.5
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <h2 className="text-6xl font-bold mb-12 text-[#b48a3f] relative z-10 font-parisienne text-center">Nuestra Galería</h2>
      
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <div className="h-16 w-16 border-4 border-red-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative w-full h-[calc(100vh-10rem)] flex-grow overflow-hidden">
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#fff8e8] to-transparent z-10"></div>
          
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#fff8e8] to-transparent z-10"></div>
          
          {/* Top fade gradient */}
          <div className="absolute left-0 right-0 top-0 h-16 bg-gradient-to-b from-[#fff8e8] to-transparent z-10"></div>
          
          {/* Bottom fade gradient */}
          <div className="absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t from-[#fff8e8] to-transparent z-10"></div>
          
          {/* Gallery container with grid layout */}
          <div 
            className="gallery-grid w-[130vw] md:w-[140vw] lg:w-[160vw] max-w-none mx-auto -translate-x-[15vw] md:-translate-x-[20vw] lg:-translate-x-[30vw] hide-scrollbar overflow-hidden"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gridAutoRows: 'minmax(150px, auto)',
              gap: '16px',
              height: '100%',
              padding: '20px',
              overflowY: 'hidden',
              overflowX: 'hidden'
            }}
          >
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  photo.id > 8 && photo.id <= 8 + 5 ? 'custom-image z-10' : ''
                }`}
                style={{ 
                  gridColumn: `span ${photo.gridColumn}`,
                  gridRow: `span ${photo.gridRow}`,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-full object-cover"
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
                      <p className="text-white text-lg font-semibold">{photo.alt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Custom scrollbar style */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @media (max-width: 640px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        
        @media (min-width: 1025px) and (max-width: 1280px) {
          .gallery-grid {
            grid-template-columns: repeat(6, 1fr) !important;
          }
        }
        
        @media (min-width: 1281px) {
          .gallery-grid {
            grid-template-columns: repeat(8, 1fr) !important;
          }
        }
      `}</style>
    </motion.section>
  )
} 