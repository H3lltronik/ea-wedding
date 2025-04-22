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

  // Efecto para cambiar la fuente de audio según el tema seleccionado
  useEffect(() => {
    if (!currentGuest || !currentGuest.themePreference) {
      setAudioSrc(null);
      setIsVisible(false);
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
      setTimeout(() => setAudioSrc(null), 300); // Dar tiempo a la animación de salida
    }
    
    // Reproducir automáticamente después de un breve retraso
    if (newAudioSrc && playerRef.current) {
      setTimeout(() => {
        if (playerRef.current?.audio?.current) {
          // Intentar reproducción automática
          playerRef.current.audio.current.play()
            .then(() => console.log('[ThemeAudioPlayer] Reproduciendo automáticamente'))
            .catch((err: Error) => {
              console.warn('[ThemeAudioPlayer] No se pudo reproducir automáticamente:', err);
              // No mostrar error al usuario, es esperado en muchos navegadores
            });
        }
      }, 800); // Mayor retraso para asegurar carga completa
    }
  }, [currentGuest]);

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

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 w-80 shadow-lg rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center justify-between px-3 py-2 bg-red-100">
        <div className="flex items-center space-x-2">
          <span className="text-xl">{getThemeEmoji()}</span>
          <span className="text-sm font-medium text-red-800">{getThemeName()}</span>
        </div>
        <span className="text-xs bg-red-200 text-red-700 px-2 py-0.5 rounded-full">Soundtrack</span>
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