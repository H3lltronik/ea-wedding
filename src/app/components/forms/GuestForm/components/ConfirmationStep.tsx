import React, { useEffect } from 'react';
import { Form, Alert, Card } from 'antd';
import { motion } from 'framer-motion';
import { ThemePreference, HogwartsHouse, StarWarsSide } from '../constants/enums';
import { useFormContext } from '../context/FormContext';

type ConfirmationStepProps = {
  form: ReturnType<typeof Form.useForm>[0];
};

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ form }) => {
  const { guests, setConfirmationForm } = useFormContext();
  
  // Register form with context
  useEffect(() => {
    setConfirmationForm(form);
    
    // Cleanup on unmount
    return () => {
      setConfirmationForm(null);
    };
  }, [form, setConfirmationForm]);
  
  // Función para obtener texto descriptivo de la casa de Hogwarts
  const getHouseText = (house: HogwartsHouse | null) => {
    if (!house) return 'No especificada';
    return house.charAt(0).toUpperCase() + house.slice(1);
  };
  
  // Función para obtener texto descriptivo del lado de la fuerza
  const getJediSithText = (side: StarWarsSide | null) => {
    if (!side) return 'No especificado';
    return side === StarWarsSide.JEDI ? 'Jedi' : 'Sith';
  };
  
  // Función para obtener el nombre de la preferencia
  const getThemeName = (preference: ThemePreference | null): string => {
    switch (preference) {
      case ThemePreference.STAR_WARS:
        return 'Star Wars';
      case ThemePreference.HARRY_POTTER:
        return 'Harry Potter';
      case ThemePreference.BOTH:
        return 'Ambos temas';
      case ThemePreference.NONE:
        return 'Ninguna preferencia';
      default:
        return 'Sin preferencia';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6"
    >
      <h2 className="text-4xl font-parisienne text-center mb-8 text-[#b48a3f]">Confirmación</h2>
      
      <Alert
        message="Por favor confirma que los datos son correctos"
        description="Revisa la información antes de enviar el formulario. Una vez enviado, recibirás un correo de confirmación."
        type="info"
        showIcon
        className="mb-8"
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Resumen de invitados</h3>
        
        <div className="space-y-4 mb-8">
          {guests.map((guest, index) => (
            <Card 
              key={index}
              title={`${guest.name}`}
              className="border-amber-100 shadow-sm"
              styles={{ header: { background: 'rgba(251, 243, 219, 0.5)' } }}
            >
              <div className="space-y-2">
                <p><span className="font-medium">Edad:</span> {guest.age !== undefined && guest.age !== null ? `${guest.age} años` : 'No especificada'}</p>
                <p><span className="font-medium">Preferencia:</span> {getThemeName(guest.themePreference)}</p>
                
                {guest.themePreference === ThemePreference.HARRY_POTTER || guest.themePreference === ThemePreference.BOTH ? (
                  <p><span className="font-medium">Casa:</span> {getHouseText(guest.house)}</p>
                ) : null}
                
                {guest.themePreference === ThemePreference.STAR_WARS || guest.themePreference === ThemePreference.BOTH ? (
                  <p><span className="font-medium">Lado de la fuerza:</span> {getJediSithText(guest.jediSith)}</p>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 