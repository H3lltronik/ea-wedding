'use client'

import React from 'react';
import { FormProvider } from '../components/forms/GuestForm/context/FormContext';
import FormPageContent from './FormPageContent';

export default function FormPage() {
  return (
    <FormProvider>
      <FormPageContent />
    </FormProvider>
  );
} 