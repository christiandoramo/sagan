'use client';

import { useAuth } from '@/app/hooks/auth';
import { ReusedGovButton } from '../FormControl/FormButton/ReusedButton';
import { FormControlInput } from '../FormControl/FormControlInput';
import InputImg from '../FormControl/FormInputImg';
import { AlertToast } from '../AlertToast';
import { useEffect, useState } from 'react';
import { UpdatedData } from '@/services/users';
import { getColleges } from '@/services/colleges';

interface CollegeData {
    id: number,
    name: string,
    initials: string,
    uf: string,
    createdAt: string,
    updatedAt: string
}

function Profile() {
    const [universities, setUniversities] = useState<CollegeData[]>([]);
    const [university, setUniversity] = useState<CollegeData | null>(null);
    const { user, userUpdate } = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassowrd, setConfirmPassword] = useState('')
    const [message, setMessage] = useState({ status: '', description: '' });

    function handleUpdate() {
        if (password !== confirmPassowrd) {
            setMessage({ status: 'error', description: 'Senhas não coincidem' });
            return
        }
        const data: UpdatedData = {
            name: name || user.name,
            email: email || user.email,
            password: password || undefined,
            college: university || undefined,
        }
        userUpdate(user.id, data)
    }
    const handleChangeUniversity = (event: any) => {
        console.log(event.target.value)
        const selectedUniversity = universities.find(uni => uni.name === event.target.value);
        console.log(selectedUniversity)
        setUniversity(selectedUniversity || null);
    }


    useEffect(() => {
        async function getUniversities() {
            const data: CollegeData[] = await getColleges()
            setUniversities([...data])
        }
        getUniversities()
    }, [])


    return (
        <>{user &&
            <div id="container" className="container d-flex justify-content-end mt-16 ml-10">
                <div className="container d-flex justify-content-center">
                    <div className="mr-10 !important flex items-center justify-center">
                        <InputImg />
                    </div>

                    <FormControlInput value={name} onChange={e => setName(e.target.value)} placeholder="nome" label="Nome" />
                    <FormControlInput value={email} onChange={e => setEmail(e.target.value)} placeholder="email" label="Email" />
                    <FormControlInput type={'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="•••••••••••••••" label="Nova Senha" />
                    <FormControlInput type={'password'} value={confirmPassowrd} onChange={e => setConfirmPassword(e.target.value)} placeholder="•••••••••••••••" label="Confirmar nova senha" />

                    <div onClick={handleUpdate} className="d-flex justify-content-center mt-4em">
                        <ReusedGovButton title="Salvar edição" />
                    </div>
                </div>
            </div>
        }
            <AlertToast message={message} setMessage={setMessage} />
        </>
    );
}

export default Profile;
