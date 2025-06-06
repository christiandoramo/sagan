'use client';
import * as React from 'react';
import { Button } from '@mui/material';

interface SignUpEventButtonProps {
    title: string,
    textColor?: string;
}

export const SignUpEventButton: React.FC<SignUpEventButtonProps> = ({ title,textColor= "#ffffff" }) => {
    return (
        <div className="flex">
            <Button className="normal-case bg-pink-600 rounded-[50px] text-base h-[39px] w-[306px] " 
            style={{color:textColor}} >
                {title}
            </Button>
        </div>
    )
};