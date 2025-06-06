'use client';
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FormSelectProps {
    title: string;
    label: string;
    value: string;
    onChange: (event: any) => void;
}

export const FormControlSelect: React.FC<FormSelectProps> = ({ title, label, value, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="mt-4">
            <h1 className="text-form-label text-left text-[15px]">{label}</h1>
            <Select
                className="bg-select-background text-select-text text-left rounded-[40px] w-[350px] mt-2 border-black"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="Age"
                displayEmpty
                onChange={onChange}
            >
                <MenuItem value="">{title}</MenuItem>
                <MenuItem value={10}>Masculino</MenuItem>
                <MenuItem value={20}>Feminino</MenuItem>
                <MenuItem value={30}>Outro</MenuItem>
            </Select>
        </div>
    )
};