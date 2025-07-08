'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { ThemePreference } from '../constants/enums';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './ThemeAudioPlayer.css';

// Definir rutas de audio
const AUDIO_PATHS = {
  HARRY_POTTER: '/audio/harry-potter.mp3',
  STAR_WARS: '/audio/star-wars.mp3',
  BOTH: '/audio/star-wars-x-harry-potter.mp3'
};

export const ThemeAudioPlayer: React.FC = () => {
  const { currentGuest } = useFormContext();
  const playerRef = useRef<AudioPlayer>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Efecto para cambiar la fuente de audio según el tema seleccionado
  useEffect(() => {
    if (!currentGuest || !currentGuest.themePreference) {
      setAudioSrc(null);
      setIsVisible(false);
      setIsCollapsed(false);
      return;
    }

    console.log("[ThemeAudioPlayer] themePreference", currentGuest.themePreference);
    
    let newAudioSrc = '';
    
    // Seleccionar audio según preferencia
    switch (currentGuest.themePreference) {
      case ThemePreference.HARRY_POTTER:
        newAudioSrc = AUDIO_PATHS.HARRY_POTTER;
        break;
      
      case ThemePreference.STAR_WARS:
        newAudioSrc = AUDIO_PATHS.STAR_WARS;
        break;
      
      case ThemePreference.BOTH:
        newAudioSrc = AUDIO_PATHS.BOTH;
        break;
        
      default:
        newAudioSrc = '';
    }

    if (newAudioSrc) {
      setAudioSrc(newAudioSrc);
      // Mostrar el reproductor con una animación suave
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
      setIsCollapsed(false);
      setTimeout(() => setAudioSrc(null), 300); // Dar tiempo a la animación de salida
    }
    
    // Reproducir automáticamente después de un breve retraso
    if (newAudioSrc && playerRef.current) {
      setTimeout(() => {
        if (playerRef.current?.audio?.current) {
          // Intentar reproducción automática
          playerRef.current.audio.current.play()
            .then(() => {
              console.log('[ThemeAudioPlayer] Reproduciendo automáticamente');
              setIsPlaying(true);
            })
            .catch((err: Error) => {
              console.warn('[ThemeAudioPlayer] No se pudo reproducir automáticamente:', err);
              setIsPlaying(false);
              // No mostrar error al usuario, es esperado en muchos navegadores
            });
        }
      }, 800); // Mayor retraso para asegurar carga completa
    }
  }, [currentGuest]);

  // Efecto para monitorear el estado de reproducción
  useEffect(() => {
    const audio = playerRef.current?.audio?.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioSrc]);

  // Si no hay tema seleccionado, no mostrar reproductor
  if (!audioSrc) return null;

  const getThemeEmoji = () => {
    if (!currentGuest?.themePreference) return '';
    
    switch(currentGuest.themePreference) {
      case ThemePreference.HARRY_POTTER: return '🧙';
      case ThemePreference.STAR_WARS: return '⚔️';
      case ThemePreference.BOTH: return '🧙⚔️';
      default: return '';
    }
  };

  const getThemeName = () => {
    if (!currentGuest?.themePreference) return '';
    
    switch(currentGuest.themePreference) {
      case ThemePreference.HARRY_POTTER: return 'Harry Potter';
      case ThemePreference.STAR_WARS: return 'Star Wars';
      case ThemePreference.BOTH: return 'Mix';
      default: return '';
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleExpandPlayer = () => {
    setIsCollapsed(false);
  };

  // Renderizar icono colapsado
  if (isCollapsed) {
    return (
      <>
        {/* Icono colapsado visible */}
        <div 
          className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={handleExpandPlayer}
            className={`w-12 h-12 rounded-full bg-amber-100 shadow-lg hover:bg-amber-200 transition-all duration-200 flex items-center justify-center ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            title={`${getThemeName()} - ${isPlaying ? 'Reproduciendo' : 'Pausado'}`}
          >
            <span className="text-2xl">🎵</span>
          </button>
        </div>
        
        {/* Reproductor oculto pero montado */}
        <div className="fixed bottom-4 right-4 z-50 w-80 shadow-lg rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm opacity-0 pointer-events-none">
          <div className="flex items-center justify-between px-3 py-2 bg-amber-50">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{getThemeEmoji()}</span>
              <span className="text-sm font-medium text-[#8d6a32]">{getThemeName()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-amber-100 text-[#b48a3f] px-2 py-0.5 rounded-full">Soundtrack</span>
              <button
                onClick={handleToggleCollapse}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                title="Colapsar reproductor"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <AudioPlayer
            ref={playerRef}
            src={audioSrc}
            autoPlay={true}
            autoPlayAfterSrcChange={true}
            loop={true}
            preload="auto"
            volume={0.7}
            onError={(e) => console.error('[ThemeAudioPlayer] Error:', e)}
            style={{ backgroundColor: 'transparent' }}
            className="theme-audio-player"
            showJumpControls={false}
            layout="horizontal-reverse"
            customControlsSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS
            ]}
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR
            ]}
          />
        </div>
      </>
    );
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 w-80 shadow-lg rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2 bg-amber-50">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{getThemeEmoji()}</span>
          <span className="text-sm font-medium text-[#8d6a32]">{getThemeName()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-amber-100 text-[#b48a3f] px-2 py-0.5 rounded-full">Soundtrack</span>
          <button
            onClick={handleToggleCollapse}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
            title="Colapsar reproductor"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <AudioPlayer
        ref={playerRef}
        src={audioSrc}
        autoPlay={true}
        autoPlayAfterSrcChange={true}
        loop={true}
        preload="auto"
        volume={0.7}
        onError={(e) => console.error('[ThemeAudioPlayer] Error:', e)}
        style={{ backgroundColor: 'transparent' }}
        className="theme-audio-player"
        showJumpControls={false}
        layout="horizontal-reverse"
        customControlsSection={[
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS
        ]}
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR
        ]}
      />
    </div>
  );
}; 