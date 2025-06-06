'use client';
import * as React from 'react';
import { TextField } from '@mui/material';

interface FormInputProps {
  name?: string;
  placeholder: string;
  label: string;
  value?: string; // usar o valor fornecido na propriedade value
  type?: string;
  rows?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // usar o evento de mudança do React para obter o valor digitado
}

export const FormTextarea: React.FC<FormInputProps> = ({ placeholder, label, value, name, onChange, type, rows }) => {
  return (
    <div className="mt-4">
      <h1 className="text-form-label text-left text-[20px]">{label}</h1>
      <TextField
        id="standard-textarea"
        multiline
        className="bg-select-background text-black text-left rounded-[15px] w-[605px] mt-2"
        type={type}
        value={value} // usar o valor fornecido na propriedade value
        name={name}
        placeholder={placeholder}
        minRows={rows ?? 4} // define a altura da Textarea
        sx={{ textarea: { color: '#838383', textIndent: '1em' } }}
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
