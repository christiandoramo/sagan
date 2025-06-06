'use client';
import * as React from 'react';
import { FormInput } from '../FormShared/FormInput';
import { FormControl } from '@mui/material';
import { Button } from '@mui/material';
import UploadButton from '../UploadButton';
import WarningBox from '../WarningBox';
import { useState } from 'react';
import api from '../../../services/api';
import { AlertToast } from '../AlertToast';
import { useAuth } from '@/app/hooks/auth';
import { FormSelectCoAuthor } from '../FormShared/FormSelectCoAuthor';
import { getUsersList } from '@/services/users';
import { ARTICLE_ROLES } from '@/app/utils/roles';
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';


interface UserListData {
    id: string;
    name: string;
}

export const SubmissionForm = () => {
    const { user } = useAuth()
    const [title, setTitle] = useState('');
    const [areaConhecimento, setAreaConhecimento] = useState('');
    const [idioma, setIdioma] = useState('');
    const [palavrasChave, setpalavrasChave] = useState('');

    const [message, setMessage] = useState({ status: '', description: '' });
    const [coauthor1, setCoauthor1] = useState<UserListData | null>(null)
    const [coauthor2, setCoauthor2] = useState<UserListData | null>(null)
    const [usersList, setUserList] = useState<UserListData[]>([])
    const rating = { originality: 0, contribution: 0, writing: 0, objectivity: 0, textFidelity: 0 };

    const router = useRouter();

    const [file, setFile] = useState<any>(null);

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleChangeTitle = (event: any) => {
        setTitle(event.target.value);
    };

    const handleChangeAreaConhecimento = (event: any) => {
        setAreaConhecimento(event.target.value);
    };

    const handleChangeIdioma = (event: any) => {
        setIdioma(event.target.value);
    };

    const handleChangepalavrasChave = (event: any) => {
        setpalavrasChave(event.target.value);
    };

    const handleChangeCoAuthor1 = (event: any) => {
        console.log(event.target.value)
        if (usersList.length > 0) {
            const selectedCoauthor = usersList.find(userListData => userListData.id === event.target.value);
            console.log(selectedCoauthor)
            setCoauthor1(selectedCoauthor || null);
        }
    }

    const handleChangeCoAuthor2 = (event: any) => {
        console.log(event.target.value)
        if (usersList.length > 0) {
            const selectedCoauthor = usersList.find(userListData => userListData.id === event.target.value);
            console.log(selectedCoauthor)
            setCoauthor2(selectedCoauthor || null);
        }
    }

    const handleSubmit = async () => {

        const formDataCopy = new FormData();
        formDataCopy.append('file', file);
        formDataCopy.append('title', title);
        formDataCopy.append('knowledgeArea', areaConhecimento);
        formDataCopy.append('language', idioma);
        formDataCopy.append('keywords', palavrasChave);
        formDataCopy.append('rating', JSON.stringify(rating));
        formDataCopy.append('usersIds', user.id);
        formDataCopy.append('roles', ARTICLE_ROLES.AUTHOR);
        if (coauthor1 != null) {
            formDataCopy.append('usersIds', coauthor1.id);
            formDataCopy.append('roles', ARTICLE_ROLES.COAUTHOR);
        }
        if (coauthor2 != null) {
            formDataCopy.append('usersIds', coauthor2.id);
            formDataCopy.append('roles', ARTICLE_ROLES.COAUTHOR);
        }


        try {
            console.log(formDataCopy)
            const response: any = await api.post('/articles', formDataCopy);

            setMessage({
                status: 'success',
                description: 'Artigo submetido',
            });


            router.push(`/article-screen/${response.data.id}/`);
        } catch (err: any) {
            setMessage({
                status: 'error',
                description: err.message,
            });
        }

    };

    React.useEffect(() => {
        async function getUserList() {
            const idsUsersAndName = await getUsersList()
            if (idsUsersAndName) {
                setUserList([...idsUsersAndName])
            }
            console.log(idsUsersAndName)
        }
        getUserList()
    }, [])

    return (
        <>
            <div>
                <div className="w-full">
                    <FormControl className="mt-10 text-center  mx-auto ">
                        <div className="mx-auto pb-[20px]">
                            <WarningBox />
                            <FormInput
                                label=""
                                placeholder="Título "
                                value={title}
                                onChange={handleChangeTitle}
                            />
                            <FormInput
                                label=""
                                placeholder="Área do conhecimento  "
                                value={areaConhecimento}
                                onChange={handleChangeAreaConhecimento}
                            />

                            <FormInput
                                label=""
                                placeholder="Idioma "
                                value={idioma}
                                onChange={handleChangeIdioma}
                            />
                            <FormInput
                                label=""
                                placeholder="Palavras Chave. Ex: Robótica, Saneamento..."
                                value={palavrasChave}
                                onChange={handleChangepalavrasChave}
                            />
                            <FormSelectCoAuthor
                                label="Coautor 1"
                                title="Selecione"
                                value={coauthor1 ? coauthor1.id : ''} // Aqui está definido o valor do select como o estado 'institutionBody'
                                onChange={handleChangeCoAuthor1}
                                options={usersList.length > 0 ? usersList : []}
                            />
                            <FormSelectCoAuthor
                                label="Coautor 2"
                                title="Selecione"
                                value={coauthor2 ? coauthor2.id : ''} // Aqui está definido o valor do select como o estado 'institutionBody'
                                onChange={handleChangeCoAuthor2}
                                options={usersList.length > 0 ? usersList : []}
                            />

                            <UploadButton onChange={handleFileChange} />
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                color="secondary"
                                className="text-white bg-[#F5167E] w-[45%] h-[50px] mt-[40px] rounded-[10px]"
                            >
                                Submeter
                            </Button>
                        </div>
                    </FormControl>
                </div>

            </div>
            <AlertToast message={message} setMessage={setMessage} />
        </>
    );
};
