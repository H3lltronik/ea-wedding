import { Rule } from 'antd/es/form';
import { ThemePreference, HogwartsHouse, StarWarsSide } from './GuestForm/constants/enums';

export type GuestFormValues = {
  rootGuestName: string;
  guests: {
    name: string;
    age?: number;
    id?: string;
    preferences?: {
      theme: ThemePreference | null;
      house?: HogwartsHouse;
      jediSith?: StarWarsSide;
    };
  }[];
  themePreferences: {
    guestIndex: number;
    preference: ThemePreference;
    house?: HogwartsHouse;
    jediSith?: StarWarsSide;
  }[];
};

export const guestFormRules = {
  rootGuestName: [
    { required: true, message: 'Por favor ingresa el nombre del invitado' },
    { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
    { max: 100, message: 'El nombre debe tener máximo 100 caracteres' },
  ] as Rule[],
  guestName: [
    { required: true, message: 'Por favor ingresa el nombre del invitado' },
    { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
    { max: 100, message: 'El nombre debe tener máximo 100 caracteres' },
  ] as Rule[],
  guestAge: [
    { required: true, message: 'Por favor ingresa la edad del invitado' },
    { type: 'number', min: 0, message: 'La edad debe ser mayor o igual a 0' },
    { type: 'number', max: 120, message: 'La edad debe ser menor o igual a 120' },
  ] as Rule[],
  themePreference: [
    { required: true, message: 'Por favor selecciona una preferencia' },
  ] as Rule[],
  house: [
    { required: true, message: 'Por favor selecciona una casa de Hogwarts' },
  ] as Rule[],
  jediSith: [
    { required: true, message: 'Por favor selecciona si eres Jedi o Sith' },
  ] as Rule[],
}; 