'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface SubmitButton {
    label: string
    size:string
}

export const SubmitButton: React.FC<SubmitButton> = ({label, size})=> {
  return (
    <Stack direction="row" spacing={2}>
        <Button className={`text-white font-bold bg-[#F5167E] items-center flex m-auto text-center justify-center rounded-[50px] h-[60px] w-[${size}px] mt-[30px]`}>
           {label}
        </Button>
    </Stack>
  );
}