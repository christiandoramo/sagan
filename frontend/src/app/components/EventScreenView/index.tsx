import * as React from 'react';
import { Button } from '@mui/material';
import Icon from '../../../../public/images/icon_language_.png';
import Image from 'next/image';
import './Datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import { useAuth } from '@/app/hooks/auth';
import api from '../../../services/api';


import { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import { AlertToast } from '../AlertToast';
registerLocale('pt', pt)

interface EventScreenProps {
    siteUrl: string;
    textInformation: string;
    eventTitle: string;
    eventSubTitle: string;
    image: string;
    startData: string;
    endData: string;
    id: string
}






export const EventScreenView: React.FC<EventScreenProps> = ({
    siteUrl,
    textInformation,
    eventTitle,
    eventSubTitle,
    image,
    startData,
    endData,
    id
}) => {
    const [isHydrated, setIsHydrated] = React.useState(false);
    const [message, setMessage] = React.useState({ status: '', description: '' });

    const { user } = useAuth()

    React.useEffect(() => {
        // Simulate fetching additional data or any other client-side logic
        // You can replace this with your actual client-side logic
        const fetchData = async () => {
            // Perform any client-side data fetching or processing here
            // For example, fetching additional data using an API
            // const result = await fetch('https://api.example.com/data');
            // const data = await result.json();

            // Set the state to indicate that hydration is complete
            setIsHydrated(true);
        };

        // Check if this is the initial client-side render
        if (!isHydrated) {
            // Run client-side logic only if not hydrated
            fetchData();
        }
    }, [isHydrated]);


    const handleRegisterOnEvent = async () => {

        const sendUser = {
            usersIds: user.id,
        }

        console.log(`Teste user ${user.id}`)
        console.log(`Teste id pagina ${id}`)
        setMessage({
            status: 'success',
            description: 'Cadastro realizado',
        });
        try {
            await api.patch(`/events/add-user/${id}`, sendUser);
        } catch (err: any) {
            setMessage({
                status: 'error',
                description: 'Ocorreu um erro ao tentar enviar este artigo',
            });
        }
    };


    const onDateChange = (date: any) => { };

    const addOneDay = 24 * 60 * 60 * 1000;

    const dataInicio = new Date(startData)
    const dataFim = new Date(endData)


    return (
        <>
            <div className="flex-col">
                <div className="mb-2 flex">
                    <Image
                        className="w-[70%] h-58"
                        src={image}
                        width={'700'}
                        height={60}
                        alt="Banner"
                    />

                    <div className="text-black flex m-auto">
                        <DatePicker
                            onChange={onDateChange}
                            selected={new Date()}
                            disabled={true}
                            startDate={new Date(dataInicio.getTime() + addOneDay)}
                            endDate={new Date(dataFim.getTime() + addOneDay)}
                            inline
                            locale="pt"
                            readOnly={true}

                        />
                    </div>
                </div>

                <div
                    className="bg-white shadow-lg flex-grow p-6 w-[100%]"
                    style={{ filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.25))' }}
                >
                    {/* Conteúdo principal */}
                    <div className="mb-5 flex justify-between items-center">
                        {/* Texto original */}
                        <div className="mb-4 mt-4 flex flex-col " style={{ display: 'flex-row' }}>
                            <h2
                                className="text-[#4D5959] text-[18px] font-medium mr-36"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {eventTitle}
                            </h2>
                            <p className="text-[#4D5959]" style={{ whiteSpace: 'nowrap' }}>
                                {eventSubTitle}
                            </p>
                        </div>

                        {/* Novo conteúdo alinhado à direita */}
                        <div className="inline-flex justify-end">
                            <Image className="h-[30px] mr-2 mt-2" src={Icon} alt="" />
                            <div className="ml-2 flex-col">
                                <p className="text-black italic flex justify-center">Visite nosso Site</p>
                                <a className="text-[#8A77FF] font-bold" href="google.com">
                                    {siteUrl}
                                </a>
                            </div>
                        </div>

                    </div>

                    <div>
                        <p className="text-justify text-black">{textInformation}</p>
                    </div>

                    <div className="flex mt-[10%] justify-between">
                        <Button
                            onClick={handleRegisterOnEvent}
                            variant="contained"
                            color="secondary"
                            className="text-white bg-[#F5167E] rounded-[10px]"
                        >
                            Cadastre-se
                        </Button>
                        <Link
                            href="/article-submission"
                            className="rounded-[10px] border-2 border-solid border-[#615bff88] bg-[#FFFFFF] text-[#1F3255] flex "
                        >
                            <Button className="text-center">Enviar Artigo</Button>
                        </Link>
                        <Link
                            href={`/event/participants/${id}`}
                            className="rounded-[10px] border-2 border-solid border-[#615bff88] bg-[#FFFFFF] text-[#1F3255]"
                        >
                            <Button className="text-center">Participantes</Button>
                        </Link>

                    </div>



                </div>
            </div>
            <AlertToast message={message} setMessage={setMessage} />
        </>
    );
};
