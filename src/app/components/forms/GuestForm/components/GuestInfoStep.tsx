import React from 'react';
import { Form, Input, InputNumber, Card } from 'antd';
import { motion } from 'framer-motion';
import { guestFormRules } from '../../../forms/guestFormSchema';
import { useFormContext } from '../context/FormContext';
import { GuestFormValues } from '../../../forms/guestFormSchema';

type GuestInfoStepProps = {
  guestsCount: number;
  form: ReturnType<typeof Form.useForm<GuestFormValues>>[0];
};

export const GuestInfoStep: React.FC<GuestInfoStepProps> = ({ 
  guestsCount,
  form 
}) => {
  const { setGuests } = useFormContext();
  
  // Actualizar el contexto cuando cambian los valores del formulario
  const handleFormChange = () => {
    const formValues = form.getFieldsValue();
    if (formValues.guests) {
      setGuests(prevGuests => {
        const newGuests = [...prevGuests];
        formValues.guests.forEach((guest, index) => {
          if (guest && guest.name) {
            // Mantener las preferencias de tema existentes
            newGuests[index] = {
              ...newGuests[index] || {},
              name: guest.name,
              age: guest.age || 0,
            };
          }
        });
        return newGuests;
      });
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
      <h2 className="text-2xl font-parisienne text-center mb-8 text-red-400">Información de invitados</h2>
      
      <Form.Item 
        name="rootGuestName" 
        label="Nombre del invitado principal" 
        rules={guestFormRules.rootGuestName}
        className="mb-8"
      >
        <Input 
          size="large" 
          className="bg-pink-50 border-red-200 focus:border-red-400" 
          placeholder="Ej. Andrea García"
          disabled
          onChange={handleFormChange}
        />
      </Form.Item>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Lista de invitados</h3>
        
        <div className="space-y-6">
          {Array(guestsCount).fill(null).map((_, index) => (
            <Card 
              key={index}
              title={`Invitado ${index + 1}${index === 0 ? ' (Principal)' : ''}`}
              className="border-red-100 shadow-sm"
              styles={{ header: { background: 'rgba(254, 226, 226, 0.5)' } }}
            >
              <div className="flex flex-wrap gap-4">
                <Form.Item 
                  name={['guests', index, 'name']} 
                  label="Nombre" 
                  rules={guestFormRules.guestName}
                  className="flex-1 min-w-[250px]"
                >
                  <Input 
                    placeholder="Nombre completo" 
                    className="bg-pink-50 border-red-200"
                    disabled={index === 0} // Disable editing for the main guest
                    onChange={handleFormChange}
                  />
                </Form.Item>
                
                <Form.Item 
                  name={['guests', index, 'age']} 
                  label="Edad" 
                  rules={guestFormRules.guestAge}
                  className="w-[120px]"
                >
                  <InputNumber 
                    min={0} 
                    max={120} 
                    placeholder="Edad" 
                    className="bg-pink-50 border-red-200 w-full"
                    onChange={() => handleFormChange()} 
                  />
                </Form.Item>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 