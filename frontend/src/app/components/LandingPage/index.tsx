'use client';
import * as React from 'react';
import Image from 'next/image';
import LoginCard from './LoginCard';
import { EventsCarousel } from './EventsCarousel';
import LogoDna from '../../../../public/images/LogoDNA.png';

export const LandingPage = () => {
    return (
        <div className="w-full min-h-screen flex items-center">
            <div className="w-1/2">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex items-center align-self-center">
                        <Image src={LogoDna} alt="Sagan Icon" className='w-20 h-22' />
                        <h1 className="text-5xl text-white font-bold">Sagan Project</h1>
                    </div>
                    <h2 className="text-3xl text-white font-bold ml-2 mt-2">Inspiração Científica, Inovação Acadêmica</h2>
                    <h2 className="text-2xl text-white font-bold ml-2 mt-10">Promova seu evento acadêmico no Sagan,</h2>
                    <h2 className="text-2xl text-white font-bold ml-2">onde o conhecimento fica em primeiro lugar</h2>
                    <LoginCard />
                </div>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
                <EventsCarousel />
            </div>
        </div>
    )
}