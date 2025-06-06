'use client';
import * as React from 'react';
import { Button } from '@mui/material';
import Image from 'next/image'
import govImage from '../../../../../public/images/govbr.png'

interface GovButtonProps {
    title: string
    size:string
}

export const GovButton: React.FC<GovButtonProps> = ({ title, size }) => {
    return (
        <div className="mt-4">
            <Button className={`normal-case bg-gov-button rounded-[50px] text-base h-[60px] p-[${size}px] mt-8 m-auto`} endIcon={
               <Image className='pl-[5px] h-[23px] w-[70px]' src={govImage} alt='logo govbr' />
            }>
                {title}
            </Button>
        </div>
    )
};