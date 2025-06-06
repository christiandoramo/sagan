'use client';
import * as React from 'react';
import { SaganSideBar } from '../../../../components/SaganSideBar';
import Image from 'next/image';
import Avatar from '../../../../../../public/Rectangle 115.png';
import { useEffect, useState } from 'react';
import { getEvents } from '@/services/events';
import { getUsers } from '@/services/users';
import api from '@/services/api';

interface User {
    name: string;
    email: string;
    role: string;
    collegeIde: string;

}

interface participant {
    data: [];
    email: string;
    role: string;
    collegeIde: string;
    event_role: string;
    id: string;

}


function Participants(props: any) {



    const [busca, setBusca] = useState('')
    const [buscaRole, setBuscaRole] = useState('');

    const [users, setUsers] = useState<User[]>([]);
    const [roleMatch, setroleMatch] = useState<User[]>([]);

    const lowerBusca = busca.toLowerCase()
    const lowerBuscaRole = buscaRole.toLowerCase()

    const { id } = props.params;


    {/*Filtro para usuarios*/ }
    const usersFiltrados = users.filter((user: any) => {
        const nomeMatch = user.name.toLowerCase().includes(lowerBusca);
        const uniRoleMatch = user.role.toLowerCase().includes(lowerBuscaRole);

        return nomeMatch && (buscaRole === 'Todos' || uniRoleMatch);
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await api.get<participant[]>(`/events/users/${id}`);
                const teste: any = await api.get<participant[]>(`/events/${id}`);
                const participants: any = response.data; // assuming participants are inside 'data' field of the response
                setUsers(participants);
                setroleMatch(teste.data.users);
                console.log(teste.data.users);
                console.log(participants)
            } catch (erro) {
                console.error('erro no try...: ', erro);
            }
        };
        fetchEventDetails();
    }, []);


    return (
        <div className="min-h-screen p-8" style={{ background: '#fafafb' }}>
            <div className="container flex">
                <SaganSideBar />
                {users &&
                    <div className=" text-black  w-full ">

                        <div className='flex'>

                            <input
                                type="text"
                                placeholder="Buscar por docente"
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                className="w-[70%] h-[57px] flex items-center m-auto bg-[#EFF0F2F0] border outline-none rounded-[30px] mb-5 px-2"

                            />

                            <select
                                className='p-2 rounded-[30px] w-[200px] h-[60px] outline-none items-center'
                                value={buscaRole}
                                onChange={(e) => setBuscaRole(e.target.value)}>
                                <option>Todos</option>
                                <option value={'STUDENT'}>Discente</option>
                                <option value={'PROFESSOR'}>Docente</option>

                            </select>

                        </div>

                        <h1 className='text-[#2D3748] font-poppins mb-6 text-[25px]'>Listar Docentes</h1>

                        <table className='w-full drop-shadow-2xl'>
                            <thead className=' py-[0.8rem] pr-[0.8rem]'>
                                <tr>

                                    <th className='pr-[100%]  text-[#A0AEC0] font-poppins text-[16px] font-normal leading-150'>Nome</th>
                                    <th className='pr-[100%] text-[#A0AEC0] font-poppins text-[16px] font-normal leading-150'>Função</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usersFiltrados.map((participant: any,) => (
                                    <tr key={participant.collegeIde}>

                                        <td className='border-t border-solid border-y-2 border-[#E2E8F0] py-[0.8rem] pr-[0.8rem] rounded-sm'>

                                            <div className='flex '>
                                                <Image src={Avatar} alt="avatar" className=' scale-80 object-cover mr-3 w-max-[50px] h-max-[52px]' />
                                                <div className='   '>
                                                    <div className='font-bold	'>
                                                        {participant.name}
                                                    </div>
                                                    <div className='text-[#718096] text-[14px] '>
                                                        {participant.email}
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td className=' py-[0.8rem] pr-[0.8rem] border-t border-y-2 rrounded-s-sm border-solid stroke-1 border-[#E2E8F0] '>

                                            {roleMatch.filter((userEvent: any) => userEvent.userId == participant.id).map((filteredUser: any) => (
                                                <div className='font-poppins  leading-5 font-bold text-[15px] pb-[3px]' key={filteredUser.id}>
                                                    {filteredUser.role}
                                                </div>
                                            ))}
                                            {!roleMatch.some((userEvent: any) => userEvent.id === participant.id) && (
                                                <div className='text-[#718096] font-poppins'>
                                                    {participant.role}
                                                </div>
                                            )}

                                        </td>

                                    </tr>
                                ))
                                }
                            </tbody >
                        </table >
                    </div >
                }
            </div >
        </div >
    );
}

export default Participants;
