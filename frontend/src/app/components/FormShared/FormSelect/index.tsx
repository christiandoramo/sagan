'use client';
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FormSelectProps {
    title: string;
    label: string;
    value: string[];
    onChange: (event: any) => void;
    options: any[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ title, label, value, onChange, options }) => {
    const [selectedOption, setSelectedOption] = useState('DISCENTE');

    const handleChange = (event: SelectChangeEvent<string>) => {
        const newValue = event?.target?.value as string;
        setSelectedOption(newValue);
        onChange(newValue);
    };

    return (
        <div className="mt-4">
            <h1 className="text-form-label text-left text-[15px]">{label}</h1>
            <Select
                className="bg-select-background text-select-text text-left rounded-[50px] h-[50px] w-[605px] mt-2 border-black"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label={title}
                displayEmpty
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};