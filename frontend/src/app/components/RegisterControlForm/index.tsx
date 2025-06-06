'use client';
import { FormControlSelect } from "../FormControl/FormControlSelect";
import { FormControl } from '@mui/material';
import React from "react";
export const RegisterFormControl=() => {
    const [Gender, setGender] = React.useState('');
    const [GenderBody, setGenderBody] = React.useState('');

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.target.value);
    };

return(
    <FormControl>
        <FormControlSelect label='Escolha seu Gênero' title='Selecione' value={Gender} onChange={handleGenderChange} />
    </FormControl>
    )
    
}