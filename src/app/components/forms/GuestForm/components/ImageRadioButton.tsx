import React from 'react';
import Image from 'next/image';
import { Radio } from 'antd';

type ImageRadioButtonProps = {
  value: string;
  label: string;
  imageSrc: string;
  isSelected: boolean;
  imageHeight?: number;
  onClick: (value: string) => void;
  disabled?: boolean;
};

export const ImageRadioButton: React.FC<ImageRadioButtonProps> = ({
  value,
  label,
  imageSrc,
  isSelected,
  imageHeight = 120,
  onClick,
  disabled = false
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick(value);
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`
        relative rounded-lg overflow-hidden
        transition-all duration-300 border-2
        ${isSelected ? 'border-[#b48a3f] shadow-lg' : 'border-gray-200'}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-amber-200 hover:shadow-md'}
      `}
    >
      <Radio 
        value={value} 
        checked={isSelected}
        disabled={disabled}
        className="sr-only"
      />
      
      <div className="p-3 flex flex-col items-center justify-between">
        <div 
          className="relative mb-2 overflow-hidden rounded-md w-full"
          style={{ height: imageHeight }}
        >
          <Image
            src={imageSrc}
            alt={label}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
        <span className="text-sm font-medium text-center block mt-2">{label}</span>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 bg-amber-50/20">
          <div className="absolute top-2 right-2 bg-[#b48a3f] text-white rounded-full w-6 h-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}; 