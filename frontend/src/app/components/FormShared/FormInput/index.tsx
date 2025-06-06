'use client';
import * as React from 'react';
import { TextField } from '@mui/material';

interface FormInputProps {
  name?: string;
  placeholder: string;
  label: string;
  value?: string; // usar o valor fornecido na propriedade value
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // usar o evento de mudança do React para obter o valor digitado
}

export const FormInput: React.FC<FormInputProps> = ({ placeholder, label, value, name, onChange, type }) => {
  return (
    <div className="mt-4">
      <h1 className="text-form-label text-left text-[20px]">{label}</h1>
      <TextField
        className="bg-select-background text-black text-left rounded-[50px] w-[605px] mt-2"
        id="filled-basic"
        type={type}
        value={value} // usar o valor fornecido na propriedade value7
        name={name}
        placeholder={placeholder}
        sx={{ input: { color: '#838383', height: '40px', textIndent: '1em' } }}
        onChange={onChange} // usar o evento de mudança do React para obter o valor digitado
        InputProps={{
          style: { borderBottom: 'none' }, // Remove a linha de animação
          disableUnderline: true, // Remove a linha de animação
        }}
        variant="standard"
      />
    </div>
  );
};
