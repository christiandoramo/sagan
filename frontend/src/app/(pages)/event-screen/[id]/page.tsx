'use client';
import * as React from 'react';
import { getEventById } from '@/services/events';
import { useEffect, useState } from 'react';
import { SaganSideBar } from '../../../components/SaganSideBar';
import { EventScreenView } from '../../../components/EventScreenView';

interface EventData {
    title: string;
    description: string;
    startDate: string;
    category: string;
    endDate: string;
    criterias: string;
    banner: {
        url: string;
    };
    id: string
}

function EventScreen(props: any) {
    console.log('entrouu em EVENT/ID')
    const { id } = props.params;
    const [bannerImageUrl, setBannerImageUrl] = React.useState('');
    const startDate = '2024-01-10T00:00:00.000Z';
    const endDate = '2024-01-20T00:00:00.000Z';
    const siteUrl = 'www.saganufrpe.tech';
    const textInformation =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare, ipsum eget tempor aliquet, nibh mauris laoreet turpis, eu tincidunt erat diam condimentum metus. Maecenas bibendum fermentum sapien, eget tristique nibh consequat id. Mauris facilisis nulla iaculis nisi volutpat, id fermentum magna ullamcorper. Aliquam erat volutpat. Quisque malesuada enim eu ex pellentesque, ac semper mi gravida. Vivamus libero felis, tempor vel libero ac, ultrices scelerisque felis. Integer sagittis dictum tincidunt. Pellentesque iaculis arcu non auctor cursus. In ut nisi sed felis elementum tincidunt. Pellentesque mollis mauris efficitur tortor rhoncus pellentesque. Duis non volutpat diam. Vestibulum nec augue fermentum, iaculis lorem at, gravida arcu. Duis scelerisque, nisl pellentesque egestas venenatis, purus magna euismod tortor, quis ultricies lectus nunc vel ex. Vestibulum at sapien fringilla, venenatis orci lobortis, condimentum odio. Mauris nec pulvinar nisi. Proin et libero non lacus finibus ornare ut ut tortor. Morbi consequat nec nisl eu sagittis. Phasellus vel imperdiet nisi. Praesent varius leo at lorem fermentum, ut porta lorem viverra. Mauris pulvinar nibh ac nulla dignissim, sit amet pretium tellus aliquam. Mauris quam tellus, rhoncus at nisl id, ornare tempor leo. Donec vel leo eget urna consequat viverra. Phasellus dapibus hendrerit nunc, non laoreet enim vehicula et. Sed pretium non eros sed semper. Vestibulum tincidunt at orci sed pulvinar.';
    const eventTitle = "INNOVATION & TECHNOLOGY - LET'S TALK ABOUT THE FUTURE";
    const eventSubTitle = 'Science and Technology';
    const [event, setEvent] = React.useState<EventData>({
        title: eventTitle,
        description: textInformation,
        startDate: '',
        category: '',
        endDate: '',
        criterias: '',
        banner: {
            url: '',
        },
        id: ''
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const eventData = await getEventById(String(id));
                setEvent(eventData);
            } catch (erro) {
                console.error('erro no try...: ', erro);
            }
        };
        fetchEventDetails();
    }, [id]);

    return (
        <div className="min-h-screen p-8" style={{ background: '#fafafb' }}>
            <div className="container flex">
                {/* Conteúdo da barra lateral */}
                <div style={{ flex: '0 0 20%' }}>
                    <SaganSideBar />
                </div>

                <div className='w-full'>
                    <EventScreenView
                        siteUrl="www.saganufrpe.tech"
                        textInformation={event.description || textInformation}
                        eventTitle={event.title}
                        eventSubTitle={event.category}
                        image={event?.banner?.url}
                        startData={event.startDate || startDate}
                        endData={event.endDate || endDate}
                        id={event.id}
                    />{' '}
                    :
                </div>
            </div>
        </div>
    );
}

export default EventScreen;
