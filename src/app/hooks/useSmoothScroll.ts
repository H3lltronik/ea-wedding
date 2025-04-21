import { useState, useEffect, useRef, RefObject } from 'react';

interface UseSmoothScrollOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  sections: string[];
  scrollBlocked: boolean;
  duration?: number;
}

const useSmoothScroll = ({ 
  containerRef, 
  sections, 
  scrollBlocked,
  duration = 800
}: UseSmoothScrollOptions) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef<number>(0);
  const shouldHandleScroll = useRef<boolean>(true);

  // Función para hacer scroll suave a una sección específica
  const smoothScrollToSection = (index: number, scrollDuration: number = duration) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const targetPosition = index * window.innerHeight;
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    
    let startTime: number | null = null;
    
    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / scrollDuration, 1);
      
      // Función de easing para un movimiento más natural (easeInOutQuad)
      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      container.scrollTop = startPosition + distance * easedProgress;
      
      if (timeElapsed < scrollDuration) {
        requestAnimationFrame(animateScroll);
      } else {
        container.scrollTop = targetPosition; // Asegurar que llegamos exactamente al destino
        setIsScrolling(false);
      }
    };
    
    requestAnimationFrame(animateScroll);
  };

  // Función para navegar a una sección específica al hacer clic en los indicadores
  const scrollToSection = (index: number) => {
    if (!containerRef.current || scrollBlocked || isScrolling) return;
    
    setIsScrolling(true);
    smoothScrollToSection(index);
    setActiveSection(index);
  };

  // Permitir o bloquear temporalmente el manejo del scroll
  const setScrollHandling = (shouldHandle: boolean) => {
    shouldHandleScroll.current = shouldHandle;
  };

  // Detectar la sección activa al hacer scroll
  useEffect(() => {
    if (!containerRef.current || scrollBlocked) return;

    const handleScroll = () => {
      if (!containerRef.current || isScrolling || !shouldHandleScroll.current) return;
      
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Determinar sección activa basada en la posición del scroll
      const index = Math.floor((scrollPosition + windowHeight / 2) / windowHeight);
      if (index !== activeSection && index >= 0 && index < sections.length) {
        setActiveSection(index);
      }
    };
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling || !shouldHandleScroll.current) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 100) {
        return;
      }
      
      const container = containerRef.current!;
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calcular a qué sección pertenece el scroll actual
      const currentSection = Math.floor(scrollPosition / windowHeight);
      
      // Verificar si estamos en los bordes de una sección
      const isAtSectionTop = Math.abs(scrollPosition - (currentSection * windowHeight)) < 20;
      const isAtSectionBottom = Math.abs(scrollPosition - ((currentSection + 1) * windowHeight) + container.clientHeight) < 20;
      
      // Si estamos en el borde superior y se hace scroll hacia arriba, o
      // si estamos en el borde inferior y se hace scroll hacia abajo
      if ((isAtSectionTop && e.deltaY < 0 && currentSection > 0) || 
          (isAtSectionBottom && e.deltaY > 0 && currentSection < sections.length - 1)) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction));
        
        setIsScrolling(true);
        smoothScrollToSection(nextSection, 600);
        setActiveSection(nextSection);
        lastScrollTime.current = now;
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scrollBlocked, activeSection, isScrolling, sections.length]);

  return {
    activeSection,
    isScrolling,
    scrollToSection,
    setScrollHandling
  };
};

export default useSmoothScroll; 