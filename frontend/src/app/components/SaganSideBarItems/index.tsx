'use client';
import * as React from 'react';
import Link from 'next/link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import ArticleIcon from '../../../../public/images/Document.png';
import InicioIcon from '../../../../public/images/Category.png';
import SettingsIcon from '../../../../public/images/Setting.png';
import EventsIcon from '../../../../public/images/Ticket.png';
import { useAuth } from '@/app/hooks/auth';
import { USER_ROLES } from '@/app/utils/roles';

const HomeItem = () => {
    return (
        <Link href={'/home'} passHref>
            <ListItemButton sx={{ paddingTop: 0, paddingBottom: 1 }}>
                <ListItemIcon sx={{ paddingLeft: 2.125 }}>
                    <Image src={InicioIcon} alt={'Home'} />
                </ListItemIcon>
                <ListItemText primary={'Home'} className="text-black" />
            </ListItemButton>
        </Link>
    );
};
const SettingItem = () => {
    return (
        <Link href={'/user-profile'} passHref>
            <ListItemButton sx={{ paddingTop: 1, paddingBottom: 0 }}>
                <ListItemIcon sx={{ paddingLeft: 2 }}>
                    <Image src={SettingsIcon} alt={'Configurações'} />
                </ListItemIcon>
                <ListItemText primary={'Configurações'} className="text-black" />
            </ListItemButton>
        </Link>
    );
};

const CreateEventItem = () => {
    const { user } = useAuth();
    return (
        [USER_ROLES.ADMIN].includes(user.role) ? (
            <Link href={'/create-event'} passHref>
                <ListItemButton sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    <ListItemIcon sx={{ paddingLeft: 2 }}>
                        <Image src={EventsIcon} alt={'Criar evento'} />
                    </ListItemIcon>
                    <ListItemText primary={'Criar evento'} className="text-black" />
                </ListItemButton>
            </Link>
        ) : <></>
    )
};


const ArticlesItem = () => {
    // const [isHover, setIsHover] = React.useState(false);
    return (
        <Link href={'/published-articles'} passHref>
            <ListItemButton
                sx={{ paddingTop: 1, paddingBottom: 1 }} >
                <ListItemIcon sx={{ paddingLeft: 2 }}>
                    <Image src={ArticleIcon} alt={'Artigos'} />
                </ListItemIcon>
                <ListItemText primary={'Artigos'} className="flex text-black" />
            </ListItemButton>
        </Link>
    );
    // return (
    //     <div
    //         onMouseEnter={() => setIsHover(true)}
    //         onMouseLeave={() => setIsHover(false)}
    //         className="flex w-full items-center justify-items-center align-items-center align-center"
    //     >
    //         <ListItemButton
    //             className="cursor-default items-center"
    //             sx={{ paddingTop: 1, paddingBottom: 1 }}
    //         >
    //             <ListItemIcon sx={{ paddingLeft: 2 }}>
    //                 <Image src={ArticleIcon} alt={'Artigos'} />
    //             </ListItemIcon>
    //             <ListItemText primary={'Artigos'} className="flex text-black" />
    //         </ListItemButton>

    //         <div className="ml-auto mr-0 flex items-center">
    //             <Tooltip
    //                 title={
    //                     <div className="bg-white text-center">
    //                         <Link href={'/published-articles'} passHref>
    //                             <div className="text-gray-600 text-sm font-semibold bg-white text-center cursor-pointer">
    //                                 Artigos Publicados
    //                             </div>
    //                         </Link>
    //                         <Divider sx={{ my: 1, backgroundColor: 'black' }} />
    //                         <div className="text-center text-indigo-700 text-sm font-semibold bg-white cursor-pointer">
    //                             Meus Artigos
    //                         </div>
    //                     </div>
    //                 }
    //                 placement="right-start"
    //                 componentsProps={{
    //                     tooltip: {
    //                         sx: {
    //                             bgcolor: 'common.white',
    //                             border: '1px solid black',
    //                             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    //                             '& .MuiTooltip-arrow': {
    //                                 color: 'common.gray',
    //                             },
    //                         },
    //                     },
    //                 }}
    //             >
    //                 <Image
    //                     className={`ml-2`}
    //                     src={ArrowRight}
    //                     alt="Seta"
    //                     style={{
    //                         opacity: isHover === true ? 100 : 0, // Define a opacidade com base no hover
    //                         transition: 'opacity 0.2s ease-in-out', // Adiciona uma transição de 0.3 segundos com easing
    //                     }}
    //                 />
    //             </Tooltip>
    //         </div>
    //     </div>
    // );
};

export default [HomeItem, CreateEventItem, ArticlesItem, SettingItem];
