'use client';
import * as React from 'react';
import { TextField } from '@mui/material';

interface FormControInputlProps {
    name?: string;
    placeholder: string;
    label: string;
    value?: string; // usar o valor fornecido na propriedade value
    type?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // usar o evento de mudança do React para obter o valor digitado
}

export const FormControlInput: React.FC<FormControInputlProps> = ({ placeholder, label, value, name, onChange, type, ...rest }) => {

    return (
        <div className="mt-4 justify-content start mr-15px" >
            <h1 className="text-form-label text-left text-[15px]">{label}</h1>
            <TextField
                className="filled-basic bg-select-background text-black rounded-[0px] w-[350px] mt-4 "
                type={type}
                value={value} // usar o valor fornecido na propriedade value7
                name={name}
                placeholder={placeholder}
                sx={{ input: { color: '#838383', height: '40px', textIndent: '1em' } }}
                onChange={onChange}
                variant="standard"
                InputProps={{
                    style: { borderBottom: 'none' }, // Remove a linha de animação
                    disableUnderline: true, // Remove a linha de animação
                }}
            >
            </TextField>
        </div>
    )
};
