'use client';
import * as React from 'react';
import SaganLogo from '../../../../public/images/logo-sagan.png';
import Image from 'next/image';

export const SaganContainer = () => {
    return (
        <div className="bg-[#1F3255] w-2/5">
            <div className="flex justify-center items-center h-screen">
                <Image
                    src={SaganLogo}
                    alt='logo Sagan'
                />
            </div>
        </div>
    )
};