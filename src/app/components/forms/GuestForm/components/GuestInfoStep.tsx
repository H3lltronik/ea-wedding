import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Card } from 'antd';
import { motion } from 'framer-motion';
import { guestFormRules } from '../../../forms/guestFormSchema';
import { useFormContext } from '../context/FormContext';
import { GuestFormValues } from '../../../forms/guestFormSchema';
import { Guest } from '@/app/types/supabase';

type GuestInfoStepProps = {
  guestsCount: number;
  form: ReturnType<typeof Form.useForm<GuestFormValues>>[0];
  existingGuests?: Guest[];
};

export const GuestInfoStep: React.FC<GuestInfoStepProps> = ({ 
  guestsCount,
  form,
  existingGuests = []
}) => {
  const { setGuests, setGuestInfoForm, guests } = useFormContext();
  
  // Register form with context
  useEffect(() => {
    setGuestInfoForm(form);
    
    // Cleanup on unmount
    return () => {
      setGuestInfoForm(null);
    };
  }, [form, setGuestInfoForm]);
  
  // Manejar cambios en el formulario y actualizar el contexto
  const onFormValuesChange = () => {
    const formValues = form.getFieldsValue();
    if (formValues.guests) {
      setGuests(prevGuests => {
        const newGuests = [...prevGuests];
        
        formValues.guests.forEach((guest, index) => {
          if (index < newGuests.length) {
            // Mantener las preferencias de tema existentes y actualizar solo nombre y edad
            newGuests[index] = {
              ...newGuests[index],
              name: guest?.name || newGuests[index].name,
              age: guest?.age !== undefined ? guest.age : newGuests[index].age
            };
          }
        });
        
        return newGuests;
      });
    }
  };

  // Find fixed guests 
  const isGuestFixed = (index: number): boolean => {
    // Check if the guest is marked as fixed in context
    if (guests[index]?.is_fixed) return true;
    
    // Check if the guest exists in existingGuests and is fixed
    const existingGuest = existingGuests.find((g, i) => 
      (g.is_root && index === 0) || i === index
    );
    return existingGuest?.is_fixed || false;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6"
    >
      <h2 className="text-4xl font-parisienne text-center mb-8 text-red-400">Información de invitados</h2>
      
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
        />
      </Form.Item>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Lista de invitados</h3>
        
        <div className="space-y-6">
          {Array(guestsCount).fill(null).map((_, index) => {
            const isFixed = isGuestFixed(index);
            
            return (
              <Card 
                key={index}
                title={`Invitado ${index + 1}${index === 0 ? ' (Principal)' : ''}${isFixed ? ' (Fijo)' : ''}`}
                className="border-red-100 shadow-sm"
                styles={{ header: { background: 'rgba(254, 226, 226, 0.5)' } }}
              >
                <div className="flex flex-wrap gap-4">
                  <Form.Item 
                    name={['guests', index, 'name']} 
                    label="Nombre" 
                    rules={guestFormRules.guestName}
                    className="flex-1 min-w-[250px]"
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input 
                      placeholder="Nombre completo" 
                      className="bg-pink-50 border-red-200"
                      disabled={isFixed} // Disable editing for fixed guests
                      onChange={() => onFormValuesChange()}
                    />
                  </Form.Item>
                  
                  <Form.Item 
                    name={['guests', index, 'age']} 
                    label="Edad" 
                    rules={guestFormRules.guestAge}
                    className="w-[120px]"
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <InputNumber 
                      min={0} 
                      max={120} 
                      placeholder="Edad" 
                      className="bg-pink-50 border-red-200 w-full"
                      onChange={() => onFormValuesChange()}
                    />
                  </Form.Item>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}; 