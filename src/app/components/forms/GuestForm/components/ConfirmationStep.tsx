import React from 'react';
import { Form, Alert, Card } from 'antd';
import { motion } from 'framer-motion';
import { ThemePreference, HogwartsHouse, StarWarsSide } from '../constants/enums';
import { useFormContext } from '../context/FormContext';
import { GuestFormValues } from '../../../forms/guestFormSchema';

type ConfirmationStepProps = {
  form: ReturnType<typeof Form.useForm<GuestFormValues>>[0];
};

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ form }) => {
  const { guests } = useFormContext();
  
  // Obtener valor del invitado principal
  const rootGuestName = form.getFieldValue('rootGuestName');
  
  // Función para obtener texto descriptivo de la preferencia de tema
  const getThemePreferenceText = (preference: ThemePreference | null) => {
    switch (preference) {
      case ThemePreference.STAR_WARS: return 'Star Wars';
      case ThemePreference.HARRY_POTTER: return 'Harry Potter';
      case ThemePreference.BOTH: return 'Ambas';
      case ThemePreference.NONE: return 'Ninguna';
      default: return 'No especificado';
    }
  };
  
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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6"
    >
      <h2 className="text-2xl font-parisienne text-center mb-8 text-red-400">Confirmación de datos</h2>
      
      <Alert
        message="Por favor confirma que los datos son correctos"
        description="Revisa la información antes de enviar el formulario. Una vez enviado, recibirás un correo de confirmación."
        type="info"
        showIcon
        className="mb-8"
      />
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Invitado principal</h3>
        <Card className="border-red-100 shadow-sm">
          <p><strong>Nombre:</strong> {rootGuestName}</p>
        </Card>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Detalle de invitados</h3>
        
        <div className="space-y-4">
          {guests.map((guest, index) => (
            <Card 
              key={index}
              title={`Invitado ${index + 1}${index === 0 ? ' (Principal)' : ''}`}
              className="border-red-100 shadow-sm"
              styles={{ header: { background: 'rgba(254, 226, 226, 0.5)' } }}
            >
              <div className="space-y-2">
                <p><strong>Nombre:</strong> {guest.name || 'No especificado'}</p>
                <p><strong>Edad:</strong> {guest.age || 'No especificada'}</p>
                <p><strong>Preferencia temática:</strong> {getThemePreferenceText(guest.themePreference)}</p>
                
                {(guest.themePreference === ThemePreference.HARRY_POTTER || guest.themePreference === ThemePreference.BOTH) && (
                  <p><strong>Casa de Hogwarts:</strong> {getHouseText(guest.house)}</p>
                )}
                
                {(guest.themePreference === ThemePreference.STAR_WARS || guest.themePreference === ThemePreference.BOTH) && (
                  <p><strong>Lado de la Fuerza:</strong> {getJediSithText(guest.jediSith)}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <p className="mb-4">
          Al hacer clic en <strong>&quot;Confirmar&quot;</strong>, confirmas tu asistencia a nuestra boda.
        </p>
        <p className="text-sm text-gray-500">
          Si necesitas hacer cambios, puedes usar el botón <strong>&quot;Anterior&quot;</strong> para regresar.
        </p>
      </div>
    </motion.div>
  );
}; 