'use client';
import * as React from 'react';
import { FormControl, Slider } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useAuth } from '@/app/hooks/auth';
import { ARTICLE_ROLES, REVIEW_STATUS, EVENT_ROLES, USER_ROLES } from '@/app/utils/roles';
import UploadButton from '../UploadButton';
import { AlertToast } from '../AlertToast';
import api from '@/services/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation';
import ReviewModal from '../ReviewModal';
import DistributeArticleModal from '../DistributeArticleModal';
registerLocale('pt', pt)

interface ReviewData {
    criterio: CriterioData;
    pontuation: number;
    observation: string;
}

interface CriterioData {
    cardNumber: number;
    description: string;
    name: string;
}

interface Rating {
    originality: number;
    contribution: number;
    writing: number;
    objectivity: number;
    textFidelity: number;
}

interface ArticleData {
    id: string;
    title: string;
    knowledgeArea: string;
    keywords: string;
    language: string;
    status: string;
    userId: string;
    rating: string;
    file: {
        filename: string;
        url: string;
    }
    users: {
        user: {
            id: string, name: string, email: string
        }
        , role: string
    }[];
};
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

export const ArticleReviewStatus = ({ article, eventRole, articleRole }:
    { article: ArticleData, eventRole: string, articleRole: string }) => {
    const { user } = useAuth()
    // falta atribuir observacoes e data limite para reenvio de artigo
    //const [observations, setObservions] = React.useState('')
    // const [endDate, setEndDate] = React.useState<Date>(addDays(new Date(), 2))
    // const onDateChange = (date: any) => { };
    const [file, setFile] = React.useState<any>(null);
    const [message, setMessage] = React.useState({ status: '', description: '' });
    const router = useRouter()
    const [openReviewModal, setOpenReviewModal] = React.useState(false);
    const [openDistributeModal, setOpenDistributeModal] = React.useState(false)
    const [selectedProfessors, setSelectedProfessors] = React.useState<User[]>([]);
    const [usersIds, setUsersIds] = React.useState<string[]>([]);
    const [roles, setRoles] = React.useState<string[]>([]);

    const onProfessorSelect = (professor: User) => {
        if (selectedProfessors.length !== 0) return;
        setUsersIds((prev) => [...prev, professor.id])
        setRoles((prev) => [...prev, ARTICLE_ROLES.REVIEWER])
        setSelectedProfessors((prev) => [...prev, professor])
    }

    // const handleFileChange = (event: any) => {
    //     setFile(event.target.files[0]);
    // };

    // const handleReject = () => {
    //     withReactContent(Swal).fire({
    //         title: 'Aviso',
    //         icon: "warning",
    //         text: "Tem certeza que deseja REJEITAR o artigo?",
    //         showCancelButton: true,
    //         confirmButtonColor: "#ff9c37",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Sim",
    //         cancelButtonText: "Não",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setMessage({
    //                 status: 'error',
    //                 description: 'Artigo rejeitado',
    //             });
    //         }
    //     })
    // }

    // const handleApprove = () => {
    //     withReactContent(Swal).fire({
    //         title: 'Aviso',
    //         icon: "warning",
    //         text: "Tem certeza que deseja APROVAR o artigo?",
    //         showCancelButton: true,
    //         confirmButtonColor: "#ff9c37",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Sim",
    //         cancelButtonText: "Não",
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             setMessage({
    //                 status: 'success',
    //                 description: 'Artigo aprovado',
    //             });
    //         }
    //     })
    // }

    const handleOpenReviewModal = () => {
        setOpenReviewModal(true)
    };
    const handleCloseReviewModal = () => {
        setOpenReviewModal(false)
    };
    const handleOpenDistributeModal = () => {
        setOpenDistributeModal(true)
    }
    const handleCloseDistributeModal = () => {
        setOpenDistributeModal(false)
    }



    // const handleRequestResend = async () => {
    //     const { value: text } = await Swal.fire({
    //         input: "textarea",
    //         inputLabel: "Message",
    //         inputPlaceholder: "Pendências do artigo",
    //         inputAttributes: {
    //             "aria-label": "Escreva as pendências do artigo aqui"
    //         },
    //         showCancelButton: true
    //     });
    //     if (text) {
    //         const { value: date } = await Swal.fire({
    //             title: "Defina a data limite do reenvio",
    //             input: "date",
    //             didOpen: () => {
    //                 const today = (new Date()).toISOString();
    //                 const swalInput = Swal.getInput()
    //                 if (swalInput) {
    //                     swalInput.min = today.split("T")[0];
    //                 }

    //             }
    //         });
    //         if (date) {
    //             Swal.fire("Pedido de reenvio concluído\nData limite", date);
    //         }
    //     }
    // }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     if (!file) {
    //         setMessage({
    //             status: 'error',
    //             description: 'Ocorreu um erro ao tentar enviar este artigo',
    //         });

    //     }
    //     const formData = new FormData()
    //     formData.append('file', file);
    //     try {
    //         const response = await api.patch('/articles', (article.id, formData));
    //         if (response)
    //             alert(response)
    //     } catch (err: any) {
    //         setMessage({
    //             status: 'error',
    //             description: 'Ocorreu um erro ao tentar enviar este artigo',
    //         });
    //     }
    // };

    return (
        <>
            {

                article &&
                <div className='w-full bg-white shadow-custom mb-[50px] p-1'>
                    <ReviewModal open={openReviewModal} onClose={handleCloseReviewModal}
                        user={user} article={article}
                    />
                    <DistributeArticleModal open={openDistributeModal} onClose={handleCloseDistributeModal}
                        onProfessorSelect={onProfessorSelect} selectedProfessors={selectedProfessors}
                        setRoles={setRoles} setSelectedProfessors={setSelectedProfessors} setUsersIds={setUsersIds}
                        articleId={article.id}
                    />
                    <FormControl className="mt-10 text-center w-full px-10">
                        <div className="mt-16 flex-col flex px-10 w-full">
                            <div className='align-center items-center flex justify-between text-center w-full'>
                                <div className='flex flex-col text-left text-black'>
                                    <p className='text-[12px] mt-[15px] mr-[35px] font-[200] mb-4'>
                                        Status do artigo: {
                                            article.status === REVIEW_STATUS.PENDING ? "O artigo ainda não está em avaliação" :
                                                article.status === REVIEW_STATUS.CLOSED ? "O artigo foi avaliado" :
                                                    article.status === REVIEW_STATUS.ON_REVIEW ? "Artigo está sendo avaliado." :
                                                        ""
                                        }
                                    </p>
                                    {/* {status === ARTICLE_STATUS.REJECTED &&
                                <>
                                    <p className='text-[12px] mt-[7px] mr-[35px] font-[200] '>Observacoes: </p>
                                    <p className='text-[10px] mr-[35px] w-80'>Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Donec eget turpis elit. Vestibulum ante ipsum primis in faucibus orci
                                        luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci
                                        luctus et ultrices posuere cubilia curae; Sed tincidunt leo vel leo tempus blandit.
                                        Nulla facilisis sapien eget efficitur tristique.
                                        Sed ornare nisl mi, vel mattis arcu posuere a. Vivamus mattis commodo egestas. Donec elementum ante eu sapien cursus,
                                        vitae faucibus dolor ornare. Pellentesque sed dui urna. Nullam venenatis viverra nisi. Morbi a dolor a enim interdum efficitur.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam maximus ipsum blandit mauris dictum, ut placerat eros bibendum.
                                        Vestibulum non lectus eu risus efficitur pretium. Ut gravida scelerisque sem, sit amet laoreet orci finibus in.
                                        Nam placerat sapien finibus risus convallis, id aliquam dui molestie.
                                    </p>
                                </>
                            } */}

                                </div>
                                {/* <div className="text-black flex">
                            {status === ARTICLE_STATUS.REJECTED &&
                                <DatePicker
                                    onChange={onDateChange}
                                    selected={new Date()}
                                    disabled={true}
                                    startDate={new Date()}
                                    endDate={endDate}
                                    inline
                                    locale="pt"
                                    readOnly={true}
                                />
                            }
                        </div> */}
                            </div>
                        </div>
                        <div className="flex justify-center p-4">
                            <div className="flex justify-center p-4 mt-20 space-x-4">
                                <>
                                    {article.status === REVIEW_STATUS.PENDING && (eventRole === EVENT_ROLES.OWNER || user.role === USER_ROLES.ADMIN) &&
                                        <div className="flex justify-center p-4">
                                            <button onClick={handleOpenDistributeModal} className="w-[140px] rounded-lg h-[50px] text-white bg-blue-500 text-center font-Poppins text-base font-normal" >
                                                Atribuir artigo
                                            </button >
                                        </div>
                                    }
                                    {article.status === REVIEW_STATUS.CLOSED && (eventRole === EVENT_ROLES.OWNER || user.role === USER_ROLES.ADMIN) &&
                                        <div className="flex justify-center p-4">
                                            <button onClick={handleOpenReviewModal} className="w-[140px] rounded-lg h-[50px] text-white bg-blue-500 text-center font-Poppins text-base font-normal" >
                                                Ver avaliação
                                            </button >
                                        </div>
                                    }
                                </>
                            </div>
                        </div>
                    </FormControl >
                    <AlertToast message={message} setMessage={setMessage} />
                </div >
            }
        </>
    );
};

