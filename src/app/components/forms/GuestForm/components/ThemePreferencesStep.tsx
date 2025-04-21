import React from 'react';
import { Form, Radio, Card, Progress } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ThemePreference, HogwartsHouse, StarWarsSide } from '../constants/enums';
import { ImageRadioGroup } from './ImageRadioGroup';
import { hogwartsHouseOptions, starWarsSideOptions } from '../constants/imageOptions';
import { useFormContext } from '../context/FormContext';

export const ThemePreferencesStep: React.FC = () => {
  const { 
    currentGuestIndex, 
    guests,
    currentGuest,
    updateGuestTheme,
    updateGuestHouse,
    updateGuestJediSith
  } = useFormContext();
  
  // Determinar progreso
  const guestsCount = guests.length;
  const progress = {
    current: currentGuestIndex,
    total: guestsCount,
    percentage: guestsCount ? Math.round(((currentGuestIndex + 1) / guestsCount) * 100) : 0,
    isComplete: currentGuestIndex >= guestsCount - 1
  };
  
  // Determinar si ya se completaron todos los invitados
  const hasCompletedAllGuests = currentGuestIndex >= guestsCount;
  
  // Manejador para el cambio de tema
  const handleThemeChange = (value: ThemePreference) => {
    updateGuestTheme(currentGuestIndex, value);
  };
  
  // Manejador para el cambio de casa de Hogwarts
  const handleHouseChange = (value: string) => {
    updateGuestHouse(currentGuestIndex, value as HogwartsHouse);
  };
  
  // Manejador para el cambio de lado de la fuerza
  const handleJediSithChange = (value: string) => {
    updateGuestJediSith(currentGuestIndex, value as StarWarsSide);
  };
  
  // Obtener nombre del invitado actual
  const guestName = currentGuest?.name || `Invitado ${currentGuestIndex + 1}`;
  
  // Función para encontrar la URL de la imagen de la casa seleccionada
  const getHouseImageSrc = (house: string) => {
    const option = hogwartsHouseOptions.find(option => option.value === house);
    return option ? option.imageSrc : '';
  };

  // Función para encontrar la URL de la imagen del lado de la fuerza seleccionado
  const getForceImageSrc = (side: string) => {
    const option = starWarsSideOptions.find(option => option.value === side);
    return option ? option.imageSrc : '';
  };
  
  // Convierte HogwartsHouse y StarWarsSide a string para compatibilidad con ImageRadioGroup
  const houseValue = currentGuest?.house ? String(currentGuest.house) : null;
  const jediSithValue = currentGuest?.jediSith ? String(currentGuest.jediSith) : null;
  
  // Si todos los invitados han completado, mostrar una pantalla de resumen
  if (hasCompletedAllGuests) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto p-6"
      >
        <h2 className="text-2xl font-parisienne text-center mb-8 text-red-400">¡Temas seleccionados!</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Todos los invitados han seleccionado sus preferencias
          </h3>
          
          <div className="space-y-4 mb-8">
            {guests.map((guest, index) => {
              return (
                <div key={index} className="p-4 border border-red-100 rounded-md">
                  <p className="font-semibold mb-2">{guest.name || `Invitado ${index + 1}`}</p>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">Preferencia:</span> {' '}
                      <span>
                        {guest.themePreference === ThemePreference.STAR_WARS ? 'Star Wars' : 
                         guest.themePreference === ThemePreference.HARRY_POTTER ? 'Harry Potter' : 
                         guest.themePreference === ThemePreference.BOTH ? 'Ambas' : 'Ninguna'}
                      </span>
                    </div>
                    
                    {(guest.themePreference === ThemePreference.HARRY_POTTER || guest.themePreference === ThemePreference.BOTH) && guest.house && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Casa:</span> {' '}
                        <span className="flex items-center gap-2">
                          {guest.house.charAt(0).toUpperCase() + guest.house.slice(1)}
                          <div className="relative rounded-md overflow-hidden" style={{ width: 30, height: 40 }}>
                            <Image
                              src={getHouseImageSrc(guest.house)}
                              alt={guest.house}
                              fill
                              sizes="30px"
                              className="object-cover"
                            />
                          </div>
                        </span>
                      </div>
                    )}
                    
                    {(guest.themePreference === ThemePreference.STAR_WARS || guest.themePreference === ThemePreference.BOTH) && guest.jediSith && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-medium">Lado:</span> {' '}
                        <span className="flex items-center gap-2">
                          {guest.jediSith === StarWarsSide.JEDI ? 'Jedi' : 'Sith'}
                          <div className="relative rounded-md overflow-hidden" style={{ width: 30, height: 40 }}>
                            <Image
                              src={getForceImageSrc(guest.jediSith)}
                              alt={guest.jediSith}
                              fill
                              sizes="30px"
                              className="object-cover"
                            />
                          </div>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="mb-4">Para continuar al siguiente paso, haz clic en &quot;Siguiente&quot;</p>
            <p className="mb-4">Si necesitas hacer cambios, puedes regresar usando el botón &quot;Anterior&quot;</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key={`guest-preferences-${currentGuestIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6"
    >
      <h2 className="text-2xl font-parisienne text-center mb-4 text-red-400">Temática de la boda</h2>
      
      <div className="mb-8">
        <Progress 
          percent={progress.percentage} 
          format={() => `${progress.current + 1}/${progress.total}`}
          status="active"
          strokeColor={{ from: '#fecaca', to: '#f87171' }}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Card 
          title={`Preferencias de ${guestName}`}
          className="border-red-100 shadow-sm"
          styles={{ header: { background: 'rgba(254, 226, 226, 0.5)' } }}
        >
          <Form.Item 
            label="¿Qué prefieres?" 
            required
            className="mb-6"
          >
            <Radio.Group 
              onChange={(e) => handleThemeChange(e.target.value)}
              value={currentGuest?.themePreference || null}
              className="flex flex-wrap gap-4"
            >
              <Radio.Button value={ThemePreference.STAR_WARS} className="p-2 flex items-center">Star Wars</Radio.Button>
              <Radio.Button value={ThemePreference.HARRY_POTTER} className="p-2 flex items-center">Harry Potter</Radio.Button>
              <Radio.Button value={ThemePreference.BOTH} className="p-2 flex items-center">Ambas</Radio.Button>
              <Radio.Button value={ThemePreference.NONE} className="p-2 flex items-center">Ninguna</Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <AnimatePresence>
            {(currentGuest?.themePreference === ThemePreference.HARRY_POTTER || currentGuest?.themePreference === ThemePreference.BOTH) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <Form.Item 
                  label="¿De qué casa eres?"
                  required
                >
                  <ImageRadioGroup 
                    options={hogwartsHouseOptions}
                    value={houseValue}
                    onChange={handleHouseChange}
                    imageHeight={130}
                  />
                </Form.Item>
              </motion.div>
            )}
            
            {(currentGuest?.themePreference === ThemePreference.STAR_WARS || currentGuest?.themePreference === ThemePreference.BOTH) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Form.Item 
                  label="¿Qué tipo de personaje eres?"
                  required
                >
                  <ImageRadioGroup 
                    options={starWarsSideOptions}
                    value={jediSithValue}
                    onChange={handleJediSithChange}
                    imageHeight={130}
                  />
                </Form.Item>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animaciones según preferencia */}
          {currentGuest?.themePreference && currentGuest?.themePreference !== ThemePreference.NONE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 p-4 rounded-lg bg-pink-50"
            >
              {currentGuest?.themePreference === ThemePreference.STAR_WARS && (
                <div className="text-center">
                  <p className="text-lg mb-2">¡Que la fuerza te acompañe!</p>
                  <div className="flex justify-center">
                    <div className="animate-pulse w-16 h-16 flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-400 rounded-full shadow-lg shadow-red-300"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentGuest?.themePreference === ThemePreference.HARRY_POTTER && (
                <div className="text-center">
                  <p className="text-lg mb-2">¡Lumos Maxima!</p>
                  <div className="flex justify-center">
                    <div className="animate-bounce w-16 h-16 flex items-center justify-center">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-lg shadow-yellow-300"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentGuest?.themePreference === ThemePreference.BOTH && (
                <div className="text-center">
                  <p className="text-lg mb-2">¡La magia y la fuerza están contigo!</p>
                  <div className="flex justify-center space-x-4">
                    <div className="animate-pulse w-12 h-12 flex items-center justify-center">
                      <div className="w-6 h-6 bg-red-400 rounded-full shadow-lg shadow-red-300"></div>
                    </div>
                    <div className="animate-bounce w-12 h-12 flex items-center justify-center">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full shadow-lg shadow-yellow-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </div>
    </motion.div>
  );
}; 