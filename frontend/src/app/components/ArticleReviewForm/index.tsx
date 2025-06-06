'use client';
import * as React from 'react';
import { FormInput } from '../FormShared/FormInput';
import { FormControl, Slider } from '@mui/material';
import { AlertToast } from '../AlertToast';
import api from '@/services/api';
import { useAuth } from '@/app/hooks/auth';
import { BackButton } from '../BackButton';
import { FormTextarea } from '../FormShared/FormTextarea';
import { ARTICLE_ROLES, REVIEW_STATUS } from '@/app/utils/roles';
import { createArticleReview } from '@/services/articles';


interface FormData {
    reviews: Array<ReviewData>;
}
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

interface ArticleData {
    id: string;
    title: string;
    knowledgeArea: string;
    keywords: string;
    language: string;
    userId: string;
    file: {
        filename: string;
        url: string;
    };
    users: {
        user: {
            id: string, name: string, email: string
        }
        , role: string
    }[];
};

export const ArticleReviewForm = ({ article }: { article: ArticleData }) => {
    const { user } = useAuth()
    // sem os criterios extras atrelados ao evento
    const [originality, setOriginality] = React.useState('')
    const [originalityComment, setOriginalityComment] = React.useState('')
    const [contribution, setContribution] = React.useState('')
    const [contributionComment, setContributionComment] = React.useState('')
    const [writing, setWriting] = React.useState('')
    const [writingComment, setWritingComment] = React.useState('')
    const [objectivity, setObjectivity] = React.useState('')
    const [objectivityComment, setObjectivityComment] = React.useState('')
    const [textFidelity, setTextFidelity] = React.useState('')
    const [textFidelityComment, setTextFidelityComment] = React.useState('')
    //const [criteriosExtras, setCriteriosExtras] = React.useState<CriterioData[]>([] as CriterioData[])

    const [message, setMessage] = React.useState({ status: '', description: '' });


    function handleNota(e: React.ChangeEvent<HTMLInputElement>, setNota: React.Dispatch<React.SetStateAction<string>>) {
        if (Number(e.target.value) < 0) {
            e.target.value = '0';
            setNota('0');
        } else if (Number(e.target.value) > 10) {
            e.target.value = '10';
            setNota('10');
        } else {
            setNota(e.target.value);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        if (!(originality &&
            writing &&
            textFidelity &&
            objectivity &&
            contribution)) {
            setMessage({
                status: 'error',
                description: 'Preencha todos os campos',
            });
            return;
        }
        const rating = JSON.stringify({
            originality, writing, objectivity, contribution, textFidelity
        })
        const formDataComum = {
            usersIds: [user.id], rating, roles: [ARTICLE_ROLES.REVIEWER],
            status: REVIEW_STATUS.CLOSED
        }

        console.log(formDataComum)
        createArticleReview({ articleId: article.id, ...formDataComum }).then((articleWithReviews) => {
            console.log("articleWithReviews", articleWithReviews)
            setMessage({ status: 'success', description: 'O artigo foi avaliado' })
        }).catch((error) => {
            setMessage({ status: 'error', description: 'Ocorreu um erro ao avaliar' })
        })
    }



    return (
        <div className='w-full bg-white shadow-custom mb-[50px]'>
            <FormControl className="mt-10 text-center ">
                <div className="mt-16 flex-col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormInput label={'Originalidade'}
                        value={originality}
                        type='number'
                        onChange={e => handleNota(e, setOriginality)}
                        placeholder="Insira a nota (0-10)"
                    />
                    <FormTextarea rows={4} label={''}
                        value={originalityComment}
                        onChange={e => setOriginalityComment(e.target.value)}
                        placeholder="Insira uma observação"
                    />
                </div>
                <div className="mt-16 flex-col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormInput label={'Contribuição'}
                        value={contribution}
                        type='number'
                        onChange={e => handleNota(e, setContribution)}
                        placeholder="Insira a nota (0-10)"
                    />
                    <FormTextarea rows={4} label={''}
                        value={contributionComment}
                        onChange={e => setContributionComment(e.target.value)}
                        placeholder="Insira uma observação"
                    />
                </div>
                <div className="mt-16 flex-col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormInput label={'Escrita'}
                        value={writing}
                        type='number'
                        onChange={e => handleNota(e, setWriting)}
                        placeholder="Insira a nota (0-10)"
                    />
                    <FormTextarea rows={4} label={''}
                        value={writingComment}
                        onChange={e => setWritingComment(e.target.value)}
                        placeholder="Insira uma observação"
                    />
                </div>
                <div className="mt-16 flex-col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormInput label={'Objetividade'}
                        value={objectivity}
                        type='number'
                        onChange={e => handleNota(e, setObjectivity)}
                        placeholder="Insira a nota (0-10)"
                    />
                    <FormTextarea rows={4} label={''}
                        value={objectivityComment}
                        onChange={e => setObjectivityComment(e.target.value)}
                        placeholder="Insira uma observação"
                    />
                </div>
                <div className="mt-16 flex-col" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormInput label={'Aderência ao tema'}
                        value={textFidelity}
                        type='number'
                        onChange={e => handleNota(e, setTextFidelity)}
                        placeholder="Insira a nota (0-10)"
                    />
                    <FormTextarea rows={4} label={''}
                        value={textFidelityComment}
                        onChange={e => setTextFidelityComment(e.target.value)}
                        placeholder="Insira uma observação"
                    />
                </div>
                <div className="flex justify-center p-4">
                    <div className="flex justify-center p-4 mt-20 space-x-40">
                        <div className="flex justify-center p-4">
                            <BackButton title={'Voltar'} />
                        </div>
                        <div className="flex justify-center p-4 ">
                            <button onClick={handleSubmit} className="w-[200px] rounded-lg h-[50px] text-white bg-pink-500 text-center font-Poppins text-base font-normal" >
                                Submeter Avaliação
                            </button >
                        </div>
                    </div>
                </div>
            </FormControl >
            <AlertToast message={message} setMessage={setMessage} />
        </div >

    );
};

