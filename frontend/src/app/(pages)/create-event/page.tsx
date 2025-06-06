'use client';
import * as React from 'react';
import { SaganSideBar } from '../../components/SaganSideBar';
import { CreateEventCard } from '../../components/CreateEventCard';


function CreateEvent() {
    return (
        <div className="min-h-screen p-8" style={{ background: '#fafafb' }}>
            <div className="container flex">
                <SaganSideBar />
                <div className="mr-[80px]">
                    {' '}
                    <CreateEventCard />
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default CreateEvent;
