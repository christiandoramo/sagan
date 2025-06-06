import React from 'react';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import Avatar from '../../../../public/Rectangle 115.png';

interface User {
    id: string;
    name: string;
    email: string;
    college: {
        id: number;
        name: string;
        initials: string;
    };
}

interface ComiteSelectionCardProps {
    chosenOrganizers: User[] | null;
}

export const ComiteSelectionCard: React.FC<ComiteSelectionCardProps> = ({ chosenOrganizers }) => {
    return (
        <div className='mt-10  overflow-y-auto min-h-[200px] max-h-[200px]'>
            {/* <div className='bg-[#FAFAFB] p-[5px] flex items-center rounded-lg w-11/12 m-auto h-[45px] mb-[15px]'>
                <div className='mx-[5px] bg-[#FAFAFB]'>
                    <Image src={IconSearch} alt='Imagem' className='w-[18px] h-[18px]' />
                </div>
                <input className=' bg-[#FAFAFB] text-[#030229] font-[400] text-[12px] placeholder-[#030229]::placeholder' placeholder='Procure por e-mail' />
            </div> */}
            {/*Parte de buscar avaliadores por EMAIL*/}
            <div className='px-5 flex flex-col w-full'>
                {chosenOrganizers ? (chosenOrganizers.map((organizer: User) => {
                    return (
                        <div key={organizer.id} className='m-auto justify-center align-center w-full'>
                            <div className='flex w-full justify-center align-center'>
                                <div className='max-w-[35px] min-w-[35px] justify-center align-center '>
                                    <Image src={Avatar} className='flex-shrink-0 rounded-full w-[35px]' alt='Imagem Usuario' />
                                </div>
                                <div className='flex-col flex ml-auto'>
                                    <div className='text-[#030229] font-nunito text-[12px] font-normal leading-normal text-left'>
                                        {organizer.name}
                                    </div>
                                    <div className='text-[#030229] font-nunito text-[10px] opacity-50 font-normal leading-normal text-left'>
                                        {organizer.email}
                                    </div>
                                </div>
                            </div>
                            <Divider sx={{ my: 1, backgroundColor: 'black', opacity: '0.3' }} />
                        </div>
                    )
                })) : ''};
            </div>
        </div>
    )
}