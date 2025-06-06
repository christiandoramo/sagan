'use client';
import Link from 'next/link';
import { SelectRegisterHomeUser } from '../../components/SelectHomeUser';
import HomeUserCard from '../../components/CardHomeUser';
import HomeUserCardScheduled from '../../components/CardHomeUser/CardHomeUserScheduled';
import { useEffect, useState } from 'react';
import { getEvents } from '../../../services/events';

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

function Home() {
    const imageEventPath = '/images/image_event.png';
    const informationText =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ea magni at?';
    const EventNameText = 'Event Name';
    const EventDayText = '20';
    const EventDayMonthText = 'Novembro';
    const EventDayHourText = '14h:00 ás 16:00';

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const getAllEvents = async () => {
            const eventos = await getEvents();
            setEvents(eventos);
        };

        getAllEvents();
    }, []);

    return (
        <div className="flex">
            <div className="flex flex-col ml-9 mt-9 mb-5">
                <div className="flex flex-row justify-around">
                    <h1 className="text-black font-Poppins">
                        Você está visualizando os eventos que estão acontecendo agora e os próximos
                        eventos
                    </h1>
                    <div className="flex justify-end ml-40">
                        <SelectRegisterHomeUser />
                    </div>
                </div>
                <div className="flex flex-wrap mt-10">
                    {events.length>0 &&
                        events.map((event: any) => (
                            <Link href={`/event-screen/${event.id}`} key={event.id}>
                                <div className="w-1/3 mx-2 mb-12">
                                    <HomeUserCard
                                        image={imageEventPath}
                                        description={informationText}
                                        EventName={EventNameText}
                                    />
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}
export default Home;
