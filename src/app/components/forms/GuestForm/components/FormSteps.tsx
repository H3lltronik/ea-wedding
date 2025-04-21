import React from 'react';
import { Steps } from 'antd';
import { FormStep } from '../constants/enums';

type FormStepsProps = {
  currentStep: FormStep;
};

export const FormSteps: React.FC<FormStepsProps> = ({ currentStep }) => {
  return (
    <Steps
      current={currentStep}
      className="mb-10"
      items={[
        { title: 'Invitados', description: 'Información personal' },
        { title: 'Temática', description: 'Preferencias' },
        { title: 'Confirmación', description: 'Revisa y envía' },
      ]}
    />
  );
}; 