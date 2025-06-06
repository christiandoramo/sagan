'use client';
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FormSelectProps {
    title: string;
    label: string;
    value: string;
    onChange: (event: any) => void;
    options: any[];
}

export const FormSelectCollege: React.FC<FormSelectProps> = ({ title, label, value, onChange, options }) => {

    return (
        <div className="mt-4">
            <h1 className="text-form-label text-left text-[15px]">{label}</h1>
            <Select
                className="bg-select-background text-select-text text-left rounded-[50px] h-[50px] w-[605px] mt-2 border-black"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={title}
                onChange={onChange}
                sx={{
                    input: {
                        color: '#838383', height: '40px', textIndent: '1em',
                    },
                    paddingX: '10px',
                }}
                MenuProps={{
                    style: { borderBottom: 'none' }, // Remove a linha de animação
                }}
            >
                {options
                    .sort((a, b) => a.localeCompare(b))
                    .map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
            </Select>
        </div>
    );
};