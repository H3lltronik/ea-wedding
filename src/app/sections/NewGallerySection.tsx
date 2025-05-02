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
      { src: gallery2, alt: 'Nuestra foto 2' },
      { src: gallery3, alt: 'Nuestra foto 3' },
      { src: gallery4, alt: 'Nuestra foto 4' },
      { src: gallery5, alt: 'Nuestra foto 5' },
    ];

    // Define grid areas - center areas first for custom images
    const gridAreas = [
      // Center areas (for custom images)
      '2 / 3 / 4 / 4', // div1
      '2 / 4 / 4 / 5', // div2
      '4 / 3 / 5 / 5', // div3
      '1 / 3 / 2 / 5', // div4
      '2 / 5 / 4 / 6', // div5
      
      // Surrounding areas (for placeholder images)
      '2 / 2 / 4 / 3', // div6
      '4 / 2 / 5 / 3', // div7
      '4 / 5 / 5 / 6', // div8
      '1 / 5 / 2 / 6', // div9
      '1 / 2 / 2 / 3', // div10
      '1 / 6 / 2 / 7', // div11
      '2 / 6 / 3 / 7', // div12
      '3 / 6 / 4 / 7', // div13
      '4 / 6 / 5 / 7', // div14
      '4 / 1 / 5 / 2', // div15
      '3 / 1 / 4 / 2', // div16
      '2 / 1 / 3 / 2', // div17
      '1 / 1 / 2 / 2', // div18
    ];

    // Create photos array
    const photoItems: GridPhoto[] = [];
    
    // First add custom images to the center positions
    customImages.forEach((img, i) => {
      if (i < 5) { // Only use the first 5 grid areas for custom images
        photoItems.push({
          id: i + 1,
          src: img.src,
          alt: img.alt,
          gridArea: gridAreas[i]
        });
      }
    });
    
    // Then fill remaining grid areas with placeholder images
    for (let i = 5; i < gridAreas.length; i++) {
      photoItems.push({
        id: i + 1,
        src: `https://picsum.photos/id/${(i % 80) + 20}/400/300`,
        alt: `Momento especial ${i + 1}`,
        gridArea: gridAreas[i]
      });
    }
    
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
        <div className="w-full h-[calc(100vh-120px)] px-4 sm:px-6 md:px-8 relative flex-grow">
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
                className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  photo.id <= 5 ? 'custom-image z-10 border-2 border-[#b48a3f20]' : ''
                }`}
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
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(9, 1fr) !important;
            height: 100% !important;
            gap: 12px !important;
          }
          
          .gallery-grid > div:nth-child(1) { grid-area: 1 / 1 / 3 / 2 !important; }
          .gallery-grid > div:nth-child(2) { grid-area: 1 / 2 / 3 / 3 !important; }
          .gallery-grid > div:nth-child(3) { grid-area: 3 / 1 / 5 / 3 !important; }
          .gallery-grid > div:nth-child(4) { grid-area: 5 / 1 / 7 / 3 !important; }
          .gallery-grid > div:nth-child(5) { grid-area: 7 / 1 / 9 / 3 !important; }
          
          /* Hide other photos on mobile */
          .gallery-grid > div:nth-child(n+6) {
            display: none;
          }
        }
        
        /* Ensure section takes full height on all devices */
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