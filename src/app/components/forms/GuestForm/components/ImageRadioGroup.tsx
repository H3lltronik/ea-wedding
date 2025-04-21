import React from 'react';
import { ImageRadioButton } from './ImageRadioButton';

type RadioOption = {
  value: string;
  label: string;
  imageSrc: string;
};

type ImageRadioGroupProps = {
  options: RadioOption[];
  value?: string | null;
  onChange?: (value: string) => void;
  imageHeight?: number;
  vertical?: boolean;
};

export const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({
  options,
  value,
  onChange,
  imageHeight = 120,
  vertical = false
}) => {
  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={`grid ${vertical ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'} gap-4 pt-2`}>
      {options.map((option) => (
        <ImageRadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          imageSrc={option.imageSrc}
          isSelected={value === option.value}
          imageHeight={imageHeight}
          onClick={handleOptionClick}
        />
      ))}
    </div>
  );
}; 