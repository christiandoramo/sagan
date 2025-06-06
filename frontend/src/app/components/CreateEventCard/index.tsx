'use client';
import * as React from 'react';
import { FormInput } from '../FormShared/FormInput';
import { Alert, FormControl, Slide, Snackbar } from '@mui/material';
import Image from 'next/image';
import EventImage from '../../../../public/images/bannerplaceholder.png';
import UploadImageIcon from '../../../../public/images/insertPortrait.png';
import Xzinho from '../../../../public/images/xzinho.png';
import { useState } from 'react';
import AddCriterioIcon from '../../../../public/images/addCriterio.png';
import { ComiteSelectionCard } from '../ComiteSelectionCard';
import api from '../../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';
import { AlertToast } from '../AlertToast';
import ProfessorModal from '../ProfessorModal';
import { useAuth } from '@/app/hooks/auth';
import { EVENT_ROLES } from '@/app/utils/roles';
import { useRouter } from 'next/navigation';

interface FormData {
    description: string;
    userId: string;
    name: string;
    startDate: string;
    endDate: string;
    criterios: Array<CriterioData>;
    category: string;
    usersIds?: string[];
    roles?: string[];
}
interface CriterioData {
    cardNumber: number;
    description: string;
    name: string;
}
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    college: {
        id: number;
        name: string;
        initials: string;
    };
}

export const CreateEventCard: React.FC = () => {
    const { user } = useAuth();

    const router = useRouter()
    const [criteryCards, setCriteryCards] = React.useState<number>(1);
    const [file, setFile] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState({ status: false, message: '' });
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [message, setMessage] = useState({ status: '', description: '' });
    const [usersIds, setUsersIds] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedProfessors, setSelectedProfessors] = useState<User[]>([]);
    const [formData, setFormData] = React.useState<FormData>({
        userId: '',
        description: '',
        name: '',
        startDate: '',
        endDate: '',
        criterios: [],
        category: '',
    });

    const onProfessorSelect = (professor: User) => {
        if (selectedProfessors.find(p => p.id === professor.id)) return;
        setUsersIds((prev) => [...prev, professor.id])
        setRoles((prev) => [...prev, EVENT_ROLES.ORGANIZER])
        setSelectedProfessors((prev) => [...prev, professor])
    }
    const handleOpenModal = () => {
        setOpen(true)
    };
    const handleCloseModal = () => {
        setOpen(false)
    };

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            setImageUrl(URL.createObjectURL(selectedFile));
        } else {
            setImageUrl(null);
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setError({ status: false, message: '' });
    };

    const handleSubmit = (e: any) => {
        const formDataCopy = new FormData();

        const criteriosData = formData.criterios.map((criterio) => {
            return {
                name: criterio.name,
                description: criterio.description,
            };
        });
        const criteriosDataString: string = JSON.stringify(criteriosData);

        console.log(file);

        formDataCopy.append('description', formData.description);
        formDataCopy.append('title', formData.name);
        formDataCopy.append('file', file);
        formDataCopy.append('category', formData.category);
        formDataCopy.append('startDate', new Date().toISOString());
        formDataCopy.append('endDate', new Date().toISOString());
        formDataCopy.append('criterias', criteriosDataString);
        formDataCopy.append('userId', user.id);
        if (usersIds.length !== 0) {
            for (const id of usersIds) {
                formDataCopy.append('usersIds', id);
            }
            for (const role of roles) {
                formDataCopy.append('roles', role);
            }
        }

        let createEventData;
        if (usersIds.length !== 0 && usersIds.length !== 0) {
            createEventData = {
                title: formData.name,
                category: formData.category,
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString() || '',
                description: formData.description,
                criterias: criteriosDataString,
                userId: user.id,
                usersIds,
                roles,
            };
        } else {
            createEventData = {
                title: formData.name,
                category: formData.category,
                startDate: new Date().toISOString(),
                endDate: new Date().toISOString() || '',
                description: formData.description,
                criterias: criteriosDataString,
                userId: user.id,
            };
        }
        console.log(createEventData);

        if (
            createEventData.category === '' ||
            createEventData.description === '' ||
            createEventData.title === ''
        ) {
            setMessage({ status: 'error', description: 'Preencha todos os campos' });
            return;
        }

        api.post('/events', formDataCopy)
            .then((res) => {
                setMessage({ status: 'success', description: 'Evento criado com sucesso' })
                // router.push('/home')
            }

            )
            .catch((err) => setMessage({ status: 'error', description: 'Erro ao criar evento' }));
    };

    const handleAddCriteryClick = () => {
        const newCriteriaCard = {
            cardNumber: criteryCards,
            description: '',
            name: '',
        };
        setCriteryCards((prev) => prev + 1);
        setFormData((prevData) => ({
            ...prevData,
            criterios: [...prevData.criterios, newCriteriaCard],
        }));
    };
    const handleRemoveCriteryClick = (cardNumber: number) => {
        setFormData((prevData) => ({
            ...prevData,
            criterios: prevData.criterios.filter((criterio) => criterio.cardNumber !== cardNumber),
        }));
        setCriteryCards((prev) => prev - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const matchResult = name.match(/([^\[]+)\[(\d+)\]\.([^\]]+)/);
        if (matchResult && matchResult.length === 4) {
            const dataType: string = matchResult[1];
            const index: number = parseInt(matchResult[2], 10);
            const dataField: string = matchResult[3];
            if (dataType === 'criterios' && formData[dataType]) {
                const updatedCriterios = [...formData[dataType]];
                updatedCriterios[index] = {
                    ...updatedCriterios[index],
                    [dataField]: value,
                };
                setFormData((prevData) => ({
                    ...prevData,
                    [dataType]: updatedCriterios,
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const onDateChange = (dates: [Date, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    function TransitionLeft(props: any) {
        return <Slide {...props} direction="left" />;
    }
    return (
        <FormControl>
            <ProfessorModal
                selectedProfessors={selectedProfessors}
                setSelectedProfessors={setSelectedProfessors}
                onProfessorSelect={onProfessorSelect}
                setRoles={setRoles}
                setUsersIds={setUsersIds}
                open={open}
                onClose={handleCloseModal}
            />
            <div className="flex flex-row">
                <div className=" m-auto mr-[111px] flex flex-col mt-0">
                    <div className="w-[266px] shadow-custom mb-[20px] bg-white m-auto mt-0 pt-[64px] pb-[100px] px-4
                    items-center justify-center flex flex-col">
                        <div className="mb-[15px]">
                            {/* Parte de seleção do Calendário */}
                            <div className="w-full">
                                <DatePicker
                                    selected={startDate}
                                    onChange={onDateChange}
                                    startDate={startDate}
                                    minDate={new Date()}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                />
                            </div>
                        </div>
                        <button onClick={handleOpenModal} className="w-[140px] rounded-lg h-[50px]
                         text-white bg-blue-500 mt-10 text-center font-Poppins text-base font-normal" >
                            Escolher Comitê
                        </button >
                        <ComiteSelectionCard chosenOrganizers={selectedProfessors} />
                    </div>
                </div>

                <div className="flex flex-col items-center h-full">
                    <div className="w-[715px] shadow-custom mb-[64px] px-[60px] py-[40px] pb-20 bg-white h-full">
                        <div className="flex justify-between">
                            <div className="text-[#030229] text-[24px] text-[600] leading-normal">
                                Criar Evento
                            </div>
                            <div></div>
                        </div>

                        <div className="mt-10">
                            <div className="flex flex-col w-full m-auto items-center">
                                <div className="mb-6 w-[595px] max-h-[150.45px]">
                                    {imageUrl ? (
                                        <div className="w-full h-[150px] overflow-hidden rounded-lg">
                                            <img
                                                src={imageUrl}
                                                alt="Imagem do Evento"
                                                className="w-full h-[150px] overflow-hidden rounded-lg object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            src={EventImage}
                                            alt="Imagem do Evento"
                                            className="w-full h-[150px] overflow-hidden rounded-lg object-cover"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="fileInput">
                                        <Image src={UploadImageIcon} alt="Fazer upload de Imagem" />
                                    </label>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        name="file"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>
                            <FormInput
                                name="name"
                                onChange={handleInputChange}
                                value={formData.name}
                                label="Título"
                                placeholder="Insira o título do evento"
                            ></FormInput>
                            <FormInput
                                name="description"
                                onChange={handleInputChange}
                                value={formData.description}
                                label="Descrição"
                                placeholder="Descreva o evento"
                            ></FormInput>
                            <FormInput
                                name="category"
                                onChange={handleInputChange}
                                value={formData.category}
                                label="Categoria"
                                placeholder="Insira a categoria do evento"
                            ></FormInput>
                        </div>
                    </div>
                    {/* Parte dos critérios de avaliação */}
                    <div className="m-auto text-center">
                        <p className="text-[#030229] font-nunito text-[24px] text-[600] leading-normal">
                            Critérios de Avaliação de Artigos
                        </p>
                        <div className="p-4">
                            {formData.criterios
                                ? formData.criterios.map((criterio, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="shadow-custom mb-[64px] px-[60px] py-[40px] pb-20 bg-white h-full relative"
                                        >
                                            <div
                                                className="absolute top-[20px] right-[25px] "
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveCriteryClick(criterio.cardNumber);
                                                }}
                                            >
                                                <Image src={Xzinho} alt="Remover Critério" />{' '}
                                            </div>
                                            <div>
                                                <FormInput
                                                    name={`criterios[${index}].name`}
                                                    onChange={handleInputChange}
                                                    value={formData.criterios[index].name}
                                                    label="Nome do Critério"
                                                    placeholder="Insira o nome do critério de avaliação"
                                                />
                                                <FormInput
                                                    name={`criterios[${index}].description`}
                                                    onChange={handleInputChange}
                                                    value={formData.criterios[index].description}
                                                    label="Descrição"
                                                    placeholder="Insira Informações de ajuda para entendimento do critério"
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                                : null}
                            <div
                                className="text-white m-auto mb-4 flex items-center justify-center align-center"
                                onClick={handleAddCriteryClick}
                            >
                                <p className="opacity-75 text-[275] text-[10px] text-black text-center">
                                    Adicionar Critério
                                </p>
                                <div className="cursor-pointer">
                                    <Image src={AddCriterioIcon} alt="adicionar Criterio" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center p-4 mt-20 space-x-40">
                            <div className="flex justify-center p-4">
                                <button className="w-[140px] rounded-lg h-[50px] text-black bg-white text-center font-Poppins text-base font-normal">
                                    Cancelar
                                </button>
                            </div>
                            <div className="flex justify-center p-4 ">
                                <button
                                    onClick={handleSubmit}
                                    className="w-[140px] rounded-lg h-[50px] text-white bg-pink-500 text-center font-Poppins text-base font-normal"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={error.status}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                TransitionComponent={TransitionLeft}
            ></Snackbar>

            <AlertToast message={message} setMessage={setMessage} />
        </FormControl>
    );
};
