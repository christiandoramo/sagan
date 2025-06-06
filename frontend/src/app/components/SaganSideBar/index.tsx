"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Image from 'next/image';
import LogoDna from '../../../../public/images/LogoDNA.png';
import SaganLogo from '../../../../public/images/SaganLogoSideBar.png';
import LogoutIcon from '../../../../public/images/Logout.png';
import Avatar from '../../../../public/Rectangle 115.png';
import SaganSideBarItems from '../SaganSideBarItems';
import { useAuth } from '@/app/hooks/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const drawerWidth = 240;

export function SaganSideBar() {
    const SaganSideBarMenuItems = SaganSideBarItems
    const { user, signOut } = useAuth();
    const router = useRouter();

    function handleLogout() {
        signOut()
        router.push('/login')
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <div className={`pb-2`}>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        backgroundColor: '#FFFFFF',
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: '#FFFFFF',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >

                    <div className='flex items-center align-self-center ml-6 mt-4 mb-9'>
                        <Image src={LogoDna} alt="Sagan Icon" className='w-20 h-22' />
                        <Image src={SaganLogo} alt="Sagan Logo" className='w-20' />
                    </div>

                    <List>
                        {SaganSideBarMenuItems.map((item, index) => (
                            <ListItem key={index} disablePadding className='m-0 pr-6 flex flex-row relative group '>
                                {item()}
                            </ListItem>
                        ))
                        }
                    </List>
                    <div className='flex items-center  mt-auto p-7'>
                        <Link href={'/user-profile'}>
                            <div className='flex items-center justify-space-around'>
                                <Image src={Avatar} alt={user.name} />
                                <div className='text-black font-nunito text-xs'>{user.name}</div>
                            </div>
                        </Link>
                        <Image src={LogoutIcon} style={{ cursor: 'pointer' }} onClick={() => handleLogout()} alt="logout" className='ml-auto' />
                    </div>
                </Drawer>
            </div>
        </Box >
    );
}



