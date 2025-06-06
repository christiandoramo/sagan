'use client';
import * as React from 'react';
import { Button } from '@mui/material';

interface CreateEventButtonProps {
    title: string,
    textColor?: string;
}

export const CreateEventButton: React.FC<CreateEventButtonProps> = ({ title,textColor= "#ffffff" }) => {
    return (
        <div className="flex">
            <Button className="normal-case bg-pink-600 rounded-[10px] text-base h-[80px] w-[250px]" 
            style={{color:textColor,paddingRight:15}} >
                <span style={{justifyContent:'flex-start',paddingRight:30 }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <h1 style={{ height: '28px', width: '33px', fontSize: '50px', marginTop: '0px', paddingRight: '20px',
                        justifyContent:'start',fontFamily:"Poppins" }}>+</h1>
                    </div>
                </span>
                {title}
            </Button>
        </div>
    )
};