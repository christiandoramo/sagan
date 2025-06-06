import React from 'react';
import { Paper, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Image, { StaticImageData } from 'next/image';
import Secomp from '../../../../../public/images/secomp.webp';
import TeoComp from '../../../../../public/images/teocomp.png';

export const EventsCarousel = () => {
    const items = [
        {
            name: "TEOCOMP",
            description: "A Escola de Teoria da Computação – Nordeste surgiu do desejo de promover maior integração e fortalecimento da comunidade de Teoria da Computação da região nordestina e também proporcionar uma oportunidade para divulgação de resultados encontro de estudantes e pesquisadores da área.",
            imageSrc: TeoComp
        },
        {
            name: "SECOMP",
            description: "A Secomp UFPE é um evento anual que visa promover um ambiente de aprendizado, discussão e troca de experiências, abrangendo desde temas técnicos e especializados até discussões sobre as implicações sociais da tecnologia.",
            imageSrc: Secomp
        }
    ];

    return (
        <Carousel className='w-[400px] rounded-t-lg'>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

interface ItemProps {
    item: {
        name: string;
        description: string;
        imageSrc: StaticImageData;
    };
}

const Item: React.FC<ItemProps> = (props) => {
    return (
        <Paper>
            <Image className="w-full" src={props.item.imageSrc} alt='Event image' />
            <h2 className='text-center text-2xl font-semibold mt-4'>{props.item.name}</h2>
            <p className='text-center m-2 mt-2'>{props.item.description}</p>

            <div className='flex justify-center items-center mt-4'>
                <Button className="mb-4 text-white" variant='contained'>
                    Confira!
                </Button>
            </div>
        </Paper>
    );
};
