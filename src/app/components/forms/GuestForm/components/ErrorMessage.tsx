import React from 'react';

export const ErrorMessage: React.FC = () => {
  return (
    <div className="text-center p-8">
      <h2 className="text-xl text-[#b48a3f]">Error al cargar la invitación</h2>
      <p>No se pudo encontrar los detalles de tu invitación.</p>
    </div>
  );
}; 