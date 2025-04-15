'use client'
import { useEffect, useState, useRef } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./sections/HeroSection";
import { GallerySection } from "./sections/GallerySection";
import useSmoothScroll from "./hooks/useSmoothScroll";

export default function Home() {
  const [animationStage, setAnimationStage] = useState(0);
  const [scrollBlocked, setScrollBlocked] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Secciones para los indicadores de navegación
  const sections = ['hero', 'gallery', 'footer'];

  // Usar nuestro hook personalizado para el scroll suave
  const { activeSection, scrollToSection } = useSmoothScroll({
    containerRef,
    sections,
    scrollBlocked,
    duration: 1500
  });

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
      }, 1200); 
      
      return () => clearTimeout(timer);
    }
  }, [animationStage]);

  // Bloquear scroll
  useEffect(() => {
    if (!containerRef.current) return;
    
    if (scrollBlocked) {
      containerRef.current.style.overflow = 'hidden';
      console.log("Scroll bloqueado");
    } else {
      containerRef.current.style.overflow = 'auto';
      console.log("Scroll desbloqueado");
    }
  }, [scrollBlocked]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div 
        ref={containerRef} 
        className={`snap-container ${scrollBlocked ? 'overflow-hidden' : ''}`}
        style={{ height: '100vh', width: '100%' }}
      >
        {/* Primera sección - Hero con animación de logo y nombres */}
        <HeroSection 
          animate={true}
          index={0}
          onAnimationComplete={() => goToNextStage()}
          className="snap-section"
        />
        
        {/* A partir de aquí comienza la segunda sección con su header */}
        <div className="snap-section">
          {/* Header sticky para toda la sección de galería */}
          <Header className="sticky top-0 z-50" />
          
          {/* Contenido de la galería - sin clase snap-section para evitar conflictos */}
          <GallerySection 
            animate={animationStage >= 1}
            index={1}
            onAnimationComplete={() => animationStage === 1 && goToNextStage()}
          />
        </div>
        
        {/* Tercera sección - Footer */}
        <div className="snap-section flex flex-col justify-center items-center bg-gray-100 h-screen">
          {/* Mantenemos el Header visible */}
          <Header className="sticky top-0 z-50" />
          
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">© 2025 Nuestra Boda</p>
            </div>
          </div>
        </div>
      </div>
      
      {!scrollBlocked && (
        <div className="scroll-indicator">
          {sections.map((_, index) => (
            <div 
              key={index}
              className={`scroll-indicator-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
