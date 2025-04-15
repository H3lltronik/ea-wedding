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
  duration = 1500 
}: UseSmoothScrollOptions) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef<number>(0);

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
      
      // Función de easing para un movimiento más natural (easeInOutCubic)
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
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

  // Detectar la sección activa al hacer scroll y manejar la animación suave
  useEffect(() => {
    if (!containerRef.current || scrollBlocked) return;

    const handleScroll = () => {
      if (!containerRef.current || isScrolling) return;
      
      const now = Date.now();
      if (now - lastScrollTime.current < 200) return; // Limitar frecuencia de scroll
      
      const scrollPosition = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      
      // Calcular a qué sección pertenece el scroll actual
      const rawIndex = scrollPosition / windowHeight;
      const currentIndex = Math.round(rawIndex);
      
      if (currentIndex !== activeSection && !isScrolling) {
        setIsScrolling(true);
        smoothScrollToSection(currentIndex); // Usar duración predeterminada
        setActiveSection(currentIndex);
      }
      
      lastScrollTime.current = now;
    };
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      const now = Date.now();
      if (now - lastScrollTime.current < 200) {
        e.preventDefault();
        return;
      }
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(sections.length - 1, activeSection + direction));
      
      if (nextSection !== activeSection) {
        e.preventDefault();
        setIsScrolling(true);
        smoothScrollToSection(nextSection);
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
  }, [scrollBlocked, activeSection, isScrolling, sections.length, duration]);

  return {
    activeSection,
    isScrolling,
    scrollToSection
  };
};

export default useSmoothScroll; 