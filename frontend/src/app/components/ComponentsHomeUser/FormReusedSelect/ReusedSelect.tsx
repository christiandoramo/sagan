'use client';
import { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface FormSelectReusedProps {
    title: string;
    label: string;
    value: string;
    onChange: (event: any) => void;
}

export const FormSelectHomeUser : React.FC<FormSelectReusedProps> = ({ title, label, value, onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="">
            <h1 className="text-form-label text-left text-[15px]">{label}</h1>
            <Select
                className="bg-violet-50 text-select-text text-left rounded-[50px] w-[190px] h-[46px] border-black "
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="Category"
                displayEmpty
                onChange={onChange}
                sx={{background:''}}
            >
                <MenuItem value="">{title}</MenuItem>
                <MenuItem value={10}>Todos</MenuItem>
                <MenuItem value={20}>Acontecendo agora</MenuItem>
                <MenuItem value={30}>Outros</MenuItem>
            </Select>
        </div>
    )
};