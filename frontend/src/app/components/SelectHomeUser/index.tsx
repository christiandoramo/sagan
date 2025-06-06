'use client';
import { FormSelectHomeUser } from '../ComponentsHomeUser/FormReusedSelect/ReusedSelect';
import { FormControl } from '@mui/material';
import React from "react";

export const SelectRegisterHomeUser=() => {
    const [Category, setCategory] = React.useState('');
    const [GenderBody, setGenderBody] = React.useState('');

    const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

return(
    <FormControl>
        <FormSelectHomeUser label='' title="Todos" value={Category} onChange={handleGenderChange} />
    </FormControl>
    )
    
}