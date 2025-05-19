import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Card, Button, Tooltip, message } from 'antd';
import { motion } from 'framer-motion';
import { guestFormRules } from '../../../forms/guestFormSchema';
import { useFormContext } from '../context/FormContext';
import { GuestFormValues } from '../../../forms/guestFormSchema';
import { Guest } from '@/app/types/supabase';
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { TimeService } from '@/app/services/timeService';

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
  const { setGuests, setGuestInfoForm, guests, updateGuestAttendance } = useFormContext();
  
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

  // Find fixed guests - this function is kept for future use but currently not used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isGuestFixed = (index: number): boolean => {
    // Check if the guest is marked as fixed in context
    if (guests[index]?.is_fixed) return true;
    
    // Check if the guest exists in existingGuests and is fixed
    const existingGuest = existingGuests.find((g, i) => 
      (g.is_root && index === 0) || i === index
    );
    return existingGuest?.is_fixed || false;
  };
  
  // Manejar la cancelación o descancelación de asistencia
  const handleToggleAttendance = async (index: number) => {
    const guest = guests[index];
    const newAttendingStatus = !guest.attending;
    
    // Si estamos intentando descancelar (cambiar de no asistir a asistir), verificar fecha límite
    if (newAttendingStatus === true && guest.attending === false) {
      const isBeforeDeadline = await TimeService.isBeforeDeadline();
      
      if (!isBeforeDeadline) {
        message.error(
          'No es posible confirmar asistencia después de la fecha límite (10 de mayo de 2025)',
          5
        );
        return;
      }
    }
    
    // Mostrar mensaje de carga
    const loadingMessage = message.loading(
      `${newAttendingStatus ? 'Confirmando' : 'Cancelando'} asistencia...`, 
      0
    );
    
    try {
      const success = await updateGuestAttendance(index, newAttendingStatus);
      
      if (success) {
        message.success(
          `${newAttendingStatus ? 'Asistencia confirmada' : 'Asistencia cancelada'} correctamente`
        );
      } else {
        if (newAttendingStatus) {
          // Si fallaba confirmar asistencia, mostrar mensaje especial para fecha límite
          message.error(
            'No es posible confirmar asistencia después de la fecha límite (10 de mayo de 2025)'
          );
        } else {
          message.error('No se pudo actualizar el estado de asistencia');
        }
      }
    } catch (error) {
      console.error('Error al cambiar asistencia:', error);
      message.error('Error al actualizar el estado de asistencia');
    } finally {
      loadingMessage();
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
      <h2 className="text-4xl font-parisienne text-center mb-8 text-[#b48a3f]">Información de invitados</h2>
      
      <Form.Item 
        name="rootGuestName" 
        label="Nombre del invitado" 
        rules={guestFormRules.rootGuestName}
        className="mb-8"
      >
        <Input 
          size="large" 
          className="bg-amber-50 border-amber-200 focus:border-[#b48a3f]" 
          placeholder="Ej. Andrea García"
          disabled
        />
      </Form.Item>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Lista de invitados</h3>
        
        <div className="space-y-6">
          {Array(guestsCount).fill(null).map((_, index) => {
            const guest = guests[index] || {};
            const isAttending = guest.attending !== false; // Por defecto, se asume que asisten
            
            return (
              <Card 
                key={index}
                title={`Invitado ${index + 1}`}
                className={`border-amber-100 shadow-sm ${!isAttending ? 'bg-red-50' : ''}`}
                styles={{ 
                  header: { 
                    background: isAttending ? 'rgba(251, 243, 219, 0.5)' : 'rgba(254, 226, 226, 0.7)',
                    color: !isAttending ? '#b91c1c' : undefined
                  } 
                }}
                extra={
                  <Tooltip title={isAttending ? 'Cancelar asistencia' : 'Confirmar asistencia'}>
                    <Button 
                      type={isAttending ? 'default' : 'primary'}
                      danger={isAttending}
                      icon={isAttending ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                      onClick={() => handleToggleAttendance(index)}
                    >
                      {isAttending ? 'Cancelar' : 'Confirmar'}
                    </Button>
                  </Tooltip>
                }
              >
                <div className={`flex flex-wrap gap-4 ${!isAttending ? 'opacity-70' : ''}`}>
                  <Form.Item 
                    name={['guests', index, 'name']} 
                    label="Nombre" 
                    rules={guestFormRules.guestName}
                    className="flex-1 min-w-[250px]"
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input 
                      placeholder="Nombre completo" 
                      className={`bg-amber-50 border-amber-200 ${!isAttending ? 'text-red-700' : ''}`}
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
                      className={`bg-amber-50 border-amber-200 w-full ${!isAttending ? 'text-red-700' : ''}`}
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