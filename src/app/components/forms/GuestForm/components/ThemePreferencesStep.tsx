import React, { useEffect } from 'react';
import { Form, Radio, Card, Progress, Alert } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ThemePreference, HogwartsHouse, StarWarsSide } from '../constants/enums';
import { ImageRadioGroup } from './ImageRadioGroup';
import { hogwartsHouseOptions, starWarsSideOptions } from '../constants/imageOptions';
import { useFormContext } from '../context/FormContext';
import { guestFormRules } from '../../../forms/guestFormSchema';

type FormValues = {
  themePreference: ThemePreference | null;
  house: HogwartsHouse | null;
  jediSith: StarWarsSide | null;
};

type ThemePreferencesStepProps = {
  form: ReturnType<typeof Form.useForm>[0];
};

export const ThemePreferencesStep: React.FC<ThemePreferencesStepProps> = ({ form }) => {
  const {
    currentGuestIndex,
    guests,
    currentGuest,
    updateGuestTheme,
    updateGuestHouse,
    updateGuestJediSith,
    setThemePreferencesForm
  } = useFormContext();

  // Register form with context
  useEffect(() => {
    setThemePreferencesForm(form);
    
    // Cleanup on unmount
    return () => {
      setThemePreferencesForm(null);
    };
  }, [form, setThemePreferencesForm]);
  
  // Sincronizar guest actual con el formulario cuando cambia
  useEffect(() => {
    if (currentGuest) {
      form.setFieldsValue({
        themePreference: currentGuest.themePreference,
        house: currentGuest.house,
        jediSith: currentGuest.jediSith
      });
    }
  }, [currentGuest, form, currentGuestIndex]);
  
  // Verificar si el invitado actual es fijo
  const isCurrentGuestFixed = currentGuest?.is_fixed || false;
  
  // Manejar cambios en valores del formulario
  const onFormValuesChange = (changedValues: Partial<FormValues>) => {
    if ('themePreference' in changedValues && changedValues.themePreference !== undefined) {
      // Actualizamos el contexto con el nuevo valor de preferencia
      updateGuestTheme(currentGuestIndex, changedValues.themePreference);
      
      // Si cambiamos de tema, reseteamos las opciones específicas
      if (changedValues.themePreference !== currentGuest?.themePreference) {
        if (changedValues.themePreference !== ThemePreference.HARRY_POTTER && 
            changedValues.themePreference !== ThemePreference.BOTH) {
          // Si el nuevo tema no es Harry Potter ni ambos, resetear la casa
          updateGuestHouse(currentGuestIndex, null);
          form.setFieldsValue({ house: null });
        }
        
        if (changedValues.themePreference !== ThemePreference.STAR_WARS && 
            changedValues.themePreference !== ThemePreference.BOTH) {
          // Si el nuevo tema no es Star Wars ni ambos, resetear lado de la fuerza
          updateGuestJediSith(currentGuestIndex, null);
          form.setFieldsValue({ jediSith: null });
        }
      }
    }
    
    if ('house' in changedValues && changedValues.house !== undefined) {
      updateGuestHouse(currentGuestIndex, changedValues.house);
    }
    
    if ('jediSith' in changedValues && changedValues.jediSith !== undefined) {
      updateGuestJediSith(currentGuestIndex, changedValues.jediSith);
    }
  };

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
        <h2 className="text-2xl font-parisienne text-center mb-8 text-[#b48a3f]">¡Temas seleccionados!</h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Todos los invitados han seleccionado sus preferencias
          </h3>

          <div className="space-y-4 mb-8">
            {guests.map((guest, index) => {
              return (
                <div key={index} className="p-4 border border-amber-100 rounded-md">
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
      <Card className="!mb-8">
        <h2 className="text-2xl font-parisienne text-center mb-4 text-[#b48a3f]">Temática de la boda</h2>

        <div className="">
          <Progress
            percent={progress.percentage}
            format={() => `${progress.current + 1}/${progress.total}`}
            status="active"
            strokeColor={{ from: '#f5e7c5', to: '#b48a3f' }}
          />
        </div>
      </Card>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <Card
          title={`Preferencias de ${guestName}`}
          className="border-amber-100 shadow-sm"
          styles={{ header: { background: 'rgba(251, 243, 219, 0.5)' } }}
        >
          {isCurrentGuestFixed && (
            <Alert
              message="Este invitado es fijo"
              description="Solo el nombre no puede ser modificado, pero puedes cambiar sus preferencias de tema."
              type="info"
              showIcon
              className="mb-4"
            />
          )}
          
          <Form.Item
            name="themePreference"
            label="¿Qué prefieres?"
            rules={guestFormRules.themePreference}
            className="mb-6"
            validateStatus={!currentGuest?.themePreference ? "error" : undefined}
            help={!currentGuest?.themePreference ? "Este campo es obligatorio" : undefined}
          >
            <Radio.Group
              value={currentGuest?.themePreference || null}
              className="flex flex-wrap gap-4"
              onChange={e => onFormValuesChange({ themePreference: e.target.value })}
            >
              <Radio.Button value={ThemePreference.STAR_WARS} className="p-2 flex items-center">Star Wars</Radio.Button>
              <Radio.Button value={ThemePreference.HARRY_POTTER} className="p-2 flex items-center">Harry Potter</Radio.Button>
              <Radio.Button value={ThemePreference.BOTH} className="p-2 flex items-center">Ambas</Radio.Button>
              <Radio.Button value={ThemePreference.NONE} className="p-2 flex items-center">Ninguna</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <AnimatePresence>
            {(currentGuest?.themePreference === ThemePreference.HARRY_POTTER || 
             currentGuest?.themePreference === ThemePreference.BOTH) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Item
                  name="house"
                  label="Elige tu casa de Hogwarts"
                  rules={guestFormRules.house}
                  validateStatus={!currentGuest?.house ? "error" : undefined}
                  help={!currentGuest?.house ? "Este campo es obligatorio" : undefined}
                >
                  <ImageRadioGroup
                    options={hogwartsHouseOptions}
                    value={houseValue}
                    onChange={(value) => onFormValuesChange({ house: value as HogwartsHouse })}
                  />
                </Form.Item>
              </motion.div>
            )}
            
            {(currentGuest?.themePreference === ThemePreference.STAR_WARS || 
             currentGuest?.themePreference === ThemePreference.BOTH) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Item
                  name="jediSith"
                  label="¿Jedi o Sith?"
                  rules={guestFormRules.jediSith}
                  validateStatus={!currentGuest?.jediSith ? "error" : undefined}
                  help={!currentGuest?.jediSith ? "Este campo es obligatorio" : undefined}
                >
                  <ImageRadioGroup
                    options={starWarsSideOptions}
                    value={jediSithValue}
                    onChange={(value) => onFormValuesChange({ jediSith: value as StarWarsSide })}
                  />
                </Form.Item>
              </motion.div>
            )}
          </AnimatePresence>
          
          {currentGuest?.themePreference && currentGuest?.themePreference !== ThemePreference.NONE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8 p-4 rounded-lg bg-amber-50"
            >
              {currentGuest?.themePreference === ThemePreference.STAR_WARS && (
                <div className="text-center">
                  <p className="text-lg mb-2">¡Que la fuerza te acompañe!</p>
                  <div className="flex justify-center">
                    <div className="animate-pulse w-16 h-16 flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#b48a3f] rounded-full shadow-lg shadow-amber-300"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentGuest?.themePreference === ThemePreference.HARRY_POTTER && (
                <div className="text-center">
                  <p className="text-lg mb-2">¡Lumos Maxima!</p>
                  <div className="flex justify-center">
                    <div className="animate-bounce w-16 h-16 flex items-center justify-center">
                      <div className="w-8 h-8 bg-[#b48a3f] rounded-full shadow-lg shadow-amber-300"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {currentGuest?.themePreference === ThemePreference.BOTH && (
                <div className="text-center">
                  <p className="text-lg mb-2">¡Que la magia de la fuerza te acompañe!</p>
                  <div className="flex justify-center space-x-4">
                    <div className="animate-pulse w-12 h-12 flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#b48a3f] rounded-full shadow-lg shadow-amber-300"></div>
                    </div>
                    <div className="animate-bounce w-12 h-12 flex items-center justify-center">
                      <div className="w-6 h-6 bg-[#b48a3f] rounded-full shadow-lg shadow-amber-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <div className="mt-8 p-4 rounded-lg bg-amber-50">
            <div className="flex items-center gap-3 mb-2">
              {/* Content for this section */}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}; 