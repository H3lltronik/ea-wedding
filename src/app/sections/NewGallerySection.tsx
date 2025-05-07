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
import gallery6 from '@/assets/gallery/6.jpg'
import gallery7 from '@/assets/gallery/7.jpg'
import gallery8 from '@/assets/gallery/8.jpg'
import gallery9 from '@/assets/gallery/9.jpg'
import gallery10 from '@/assets/gallery/10.jpg'
import gallery11 from '@/assets/gallery/11.jpg'
import gallery12 from '@/assets/gallery/12.jpg'
import gallery13 from '@/assets/gallery/13.jpg'
import gallery14 from '@/assets/gallery/14.jpg'
import gallery15 from '@/assets/gallery/15.jpg'

interface NewGallerySectionProps {
  animate?: boolean;
  index?: number;
  onAnimationComplete?: () => void;
  className?: string;
}

interface GridPhoto {
  id: number;
  src: StaticImageData | string;
  alt: string;
  gridArea: string;
}

export const NewGallerySection = ({ animate = true, index = 0, onAnimationComplete, className = '' }: NewGallerySectionProps) => {
  const [photos, setPhotos] = useState<GridPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Our own gallery images
    const customImages = [
      { src: gallery1, alt: 'Nuestra foto 1' },
      { src: gallery5, alt: 'Nuestra foto 5' },
      { src: gallery3, alt: 'Nuestra foto 3' },
      { src: gallery4, alt: 'Nuestra foto 4' },
      { src: gallery2, alt: 'Nuestra foto 2' },
      { src: gallery6, alt: 'Nuestra foto 6' },
      { src: gallery7, alt: 'Nuestra foto 7' },
      { src: gallery8, alt: 'Nuestra foto 8' },
      { src: gallery9, alt: 'Nuestra foto 9' },
      { src: gallery10, alt: 'Nuestra foto 10' },
      { src: gallery11, alt: 'Nuestra foto 11' },
      { src: gallery12, alt: 'Nuestra foto 12' },
      { src: gallery13, alt: 'Nuestra foto 13' },
      { src: gallery14, alt: 'Nuestra foto 14' },
      { src: gallery15, alt: 'Nuestra foto 15' },
      
    ];

    // Define grid areas - center areas first for custom images
    const gridAreas = [
      // Center areas (for custom images)
      '3 / 3 / 5 / 4', // div1 - Nuestra foto 1 (moved down)
      '3 / 4 / 5 / 5', // div2 - Nuestra foto 5
      '1 / 1 / 3 / 2', // div3 - Nuestra foto 3 (vertical position)
      '1 / 3 / 3 / 5', // div4 - Nuestra foto 4 (taller)
      '2 / 5 / 4 / 6', // div5 - Nuestra foto 2
      
      // Additional positions for more custom images
      '2 / 2 / 4 / 3', // div6 - Nuestra foto 6
      '4 / 2 / 5 / 3', // div7 - Nuestra foto 7
      '4 / 5 / 5 / 6', // div8 - Nuestra foto 8
      '1 / 5 / 2 / 6', // div9 - Nuestra foto 9
      '1 / 2 / 2 / 3', // div10 - Nuestra foto 10
      '1 / 6 / 2 / 7', // div11 - Nuestra foto 11
      '2 / 6 / 3 / 7', // div12 - Nuestra foto 12
      '3 / 6 / 4 / 7', // div13 - Nuestra foto 13
      '4 / 6 / 5 / 7', // div14 - Nuestra foto 14
      '3 / 1 / 5 / 2', // div15 - Nuestra foto 15
      '3 / 2 / 4 / 3', // div16 - Removed placeholder
      '4 / 3 / 5 / 4', // div17 - Removed placeholder
      '3 / 5 / 4 / 6', // div18 - Removed placeholder
    ];

    // Create photos array
    const photoItems: GridPhoto[] = [];
    
    // Add all custom images to their positions
    customImages.forEach((img, i) => {
      if (i < gridAreas.length) {
        photoItems.push({
          id: i + 1,
          src: img.src,
          alt: img.alt,
          gridArea: gridAreas[i]
        });
      }
    });
    
    // No more placeholder images
    setPhotos(photoItems);
    setLoading(false);
  }, []);

  return (
    <motion.section 
      className={`gallery-section relative flex flex-col justify-center items-center w-full h-screen bg-[#fff8e8] overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : { opacity: 0 }}
      transition={{ 
        duration: 1.5,
        delay: index * 0.5
      }}
      onAnimationComplete={() => onAnimationComplete?.()}
    >
      <h2 className="text-5xl md:text-6xl font-bold mb-6 pt-6 text-[#b48a3f] relative z-10 font-parisienne text-center">Nuestra Galería</h2>
      
      {loading ? (
        <div className="flex items-center justify-center w-full h-[80vh]">
          <div className="h-16 w-16 border-4 border-red-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full flex-grow px-4 sm:px-6 md:px-8 relative">
          {/* Gallery grid container */}
          <div 
            className="gallery-grid w-full h-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridTemplateRows: 'repeat(4, 1fr)',
              gap: '8px',
            }}
          >
            {photos.map((photo) => (
              <div 
                key={photo.id} 
                className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] custom-image border-2 border-[#b48a3f20]"
                style={{ 
                  gridArea: photo.gridArea,
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={photo.id <= 5}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    onError={(e) => {
                      // Fallback when image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `https://picsum.photos/400/300?random=${photo.id}`;
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
      
      <style jsx global>{`
        .custom-image {
          box-shadow: 0 0 15px rgba(180, 138, 63, 0.5);
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 576px) {
          .gallery-grid {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
            gap: 12px !important;
            padding-bottom: 24px !important;
          }
          
          .gallery-grid > div {
            position: relative !important;
            aspect-ratio: 1/1 !important;
            height: auto !important;
            width: 100% !important;
            grid-area: auto !important;
            margin-bottom: 4px !important;
          }
          
          h2.text-5xl {
            font-size: 2.5rem !important;
            margin-bottom: 1rem !important; 
            padding-top: 1.5rem !important;
          }
          
          section.gallery-section {
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            overflow-y: visible !important;
            padding: 24px 0 48px 0 !important;
          }
        }
        
        /* Tablet specific adjustments */
        @media (min-width: 577px) and (max-width: 768px) {
          .gallery-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: minmax(200px, auto) !important;
            gap: 16px !important;
            padding-bottom: 32px !important;
          }
          
          .gallery-grid > div {
            aspect-ratio: 4/3 !important;
            position: relative !important;
            height: auto !important;
            grid-area: auto !important;
          }
          
          section.gallery-section {
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            padding-bottom: 48px !important;
            overflow-y: visible !important;
          }
        }
        
        /* Ensure section takes full height on desktop */
        section.gallery-section {
          min-height: 100vh;
          height: 100vh;
          max-height: 100vh;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </motion.section>
  )
} 