'use client'
import { useEffect, useState, useRef, Suspense } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./sections/HeroSection";
import { DressCodeSection } from "./sections/DressCodeSection";
import { EventDetailsSection } from "./sections/EventDetailsSection";
import { NewGallerySection } from "./sections/NewGallerySection";

// Fallback component for the Header while it's loading
const HeaderFallback = () => (
  <div className="fixed top-0 left-0 right-0 z-50 h-[80px] w-full bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300"></div>
);

export default function Home() {
  const [animationStage, setAnimationStage] = useState(0);
  const [scrollBlocked, setScrollBlocked] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Función para avanzar a la siguiente etapa de animación
  const goToNextStage = () => {
    setAnimationStage(prev => prev + 1);
    console.log("Avanzando a etapa:", animationStage + 1);
  };

  // Desbloquear scroll después de que todas las animaciones estén completas
  useEffect(() => {
    if (animationStage >= 2) { // Todas las secciones ya se animaron
      console.log("Todas las animaciones completadas, desbloqueando scroll");
      const timer = setTimeout(() => {
        setScrollBlocked(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  // Bloquear scroll durante animaciones iniciales
  useEffect(() => {
    if (!containerRef.current) return;

    if (scrollBlocked) {
      document.body.style.overflow = 'hidden';
      console.log("Scroll bloqueado");
    } else {
      document.body.style.overflow = 'auto';
      console.log("Scroll desbloqueado");
    }
  }, [scrollBlocked]);

  // Controlamos la visibilidad del header basada en el scroll
  useEffect(() => {
    if (scrollBlocked || !containerRef.current) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Mostrar el header cuando nos desplazamos más allá de la altura de la ventana
      if (scrollY > 100) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollBlocked]);

  return (
    <div className="min-h-screen">
      {/* Header único y fijo para toda la aplicación */}
      <Suspense fallback={<HeaderFallback />}>
        <Header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`} 
        />
      </Suspense>
      
      <div ref={containerRef}>
        {/* Primera sección - Hero con animación de logo y nombres */}
        <HeroSection
          animate={true}
          index={0}
          onAnimationComplete={() => goToNextStage()}
          className="min-h-screen"
        />

        {/* Segunda sección - Galería */}
        <div className="min-h-screen">
          {/* Contenido de la galería */}
          <NewGallerySection
            animate={animationStage >= 1}
            index={1}
            onAnimationComplete={() => animationStage === 1 && goToNextStage()}
          />
        </div>

        {/* Tercera sección - Detalles del Evento */}
        <div className="min-h-screen">
          {/* Contenido de los detalles del evento */}
          <EventDetailsSection />
        </div>
        
        {/* Cuarta sección - Dress Code */}
        <div className="min-h-screen">
          {/* Contenido del Dress Code */}
          <DressCodeSection />
        </div>

        {/* Footer */}
        <div className="flex flex-col justify-center items-center bg-gray-100 py-8">
          <div className="text-center">
            <p className="text-gray-500">© 2025 Nuestra Boda</p>
          </div>
        </div>
      </div>
    </div>
  );
}
