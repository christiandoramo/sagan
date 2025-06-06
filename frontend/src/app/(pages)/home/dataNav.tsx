'use client';
import { SelectRegisterHomeUser } from '../../components/SelectHomeUser';
import HomeUserCard from '../../components/CardHomeUser';
import HomeUserCardScheduled from '../../components/CardHomeUser/CardHomeUserScheduled';
import { useEffect, useState } from 'react';
import { getEvents } from '../../../services/events';
import Link from 'next/link';
import { AlertToast } from '@/app/components/AlertToast';

interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    criterias: string;
    banner: {
        url: string;
    };
}

function DataHomeUserNav() {
    const imageEventPath = '/images/image_event.png';
    const informationText =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ea magni at?';
    const EventNameText = 'Event Name';
    // const EventDayText = '20';
    // const EventDayMonthText = 'Novembro';
    // const EventDayHourText = '14h:00 ás 16:00';
    const [events, setEvents] = useState<Event[]>([]);
    const [message, setMessage] = useState({ status: '', description: '' });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventosData = await getEvents();
                if (eventosData)
                    setEvents(eventosData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchEvents();
    }, []);

    console.log(events);
    return (
        <div className="flex">
            <div className="flex flex-col ml-9 mt-9 mb-5">
                <div
                    className="!important flex flex-row"
                    style={{ justifyContent: 'space-around' }}
                >
                    <h1 style={{ color: 'black', font: 'Poppins' }}>
                        Você está visualizando os eventos que estão acontecendo agora e os próximos
                        eventos
                    </h1>

                    <div className="flex justify-end ml-40 ">
                        <SelectRegisterHomeUser />
                    </div>
                </div>
                <div className="flex flex-row mt-10 ml-[51px] mr-[71px] flex-wrap">
                    {events.length>0
                        ? events.map((event, index) => {
                            return (
                                <div key={index} className="mr-[25px] mb-20 w-[]">
                                    <Link href={`/event-screen/${event.id}`}>
                                        <HomeUserCard
                                            image={event?.banner?.url || imageEventPath}
                                            description={event.description || EventNameText}
                                            EventName={event.title || informationText}
                                        />
                                    </Link>
                                </div>
                            );
                        })
                        : null}
                </div>
            </div>
            <AlertToast message={message} setMessage={setMessage} />
        </div>
    );
}
export default DataHomeUserNav;
