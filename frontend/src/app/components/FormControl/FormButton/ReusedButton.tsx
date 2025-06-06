'use client';
import * as React from 'react';
import { Button } from '@mui/material';

interface ReusedGovButtonProps {
    title: string,
    textColor?: string;
}

export const ReusedGovButton: React.FC<ReusedGovButtonProps> = ({ title,textColor= "#ffffff" }) => {
    return (
        <div className="mt-4">
            <Button className="normal-case bg-pink-600 rounded-[50px] text-base h-[40px] w-[350px] mt-8" 
            style={{color:textColor}} >
                {title}
            </Button>
        </div>
    )
};