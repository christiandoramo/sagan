'use client';
import * as React from 'react';
import { FormSelect } from '../FormShared/FormSelect';
import { FormSelectCollege } from '../FormShared/FormSelectCollege';
import { FormInput } from '../FormShared/FormInput';
import { Button, SelectChangeEvent } from '@mui/material';
import api from '../../../services/api';
import { useState } from 'react';
import { AlertToast } from '../AlertToast';
import { getColleges } from '@/services/colleges';
import { useRouter } from 'next/navigation';

interface CollegeData {
    id: number,
    name: string,
    initials: string,
    uf: string,
    createdAt: string,
    updatedAt: string
}

export const RegisterForm = () => {
    const [universities, setUniversities] = useState<CollegeData[]>([]);
    const [university, setUniversity] = useState<CollegeData | null>(null);
    const institutionBodies = ['DOCENTE', 'DISCENTE'];
    const [institutionBody, setInstitutionBody] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState({ status: '', description: '' });

    const router = useRouter()

    const handleInstitutionBodyChange =(event: any) => {
        const selectedRole = event.target.value
        setInstitutionBody(selectedRole);
    }

    const handleChangeName = (event: any) => {

        setName(event.target.value);
    }

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
    }

    const handleChangeConfirmPassword = (event: any) => {
        setConfirmPassword(event.target.value);
    }

    const handleChangeUniversity = (event: any) => {
        console.log(event.target.value)
        const selectedUniversity = universities.find(university => university.name === event.target.value);
        console.log(selectedUniversity)
        setUniversity(selectedUniversity || null);
    }


    React.useEffect(() => {
        async function getUniversities() {
            const data: CollegeData[] = await getColleges()
            setUniversities([...data])
        }
        getUniversities()
    }, [])

    const handleSubmit = async () => {

        if (password !== confirmPassword) {
            setMessage({ status: 'error', description: 'As senhas não coincidem' });
            return;
        }

        if (name.trim() === '' || email.trim() === '' || password.trim() === ''
            || confirmPassword.trim() === '' || university === null || institutionBody === '') {
            setMessage({ status: 'error', description: 'Preencha todos os campos' });
            return;
        }
        const role = institutionBody === 'DOCENTE' ? 'PROFESSOR' : 'STUDENT';
        const userData = {
            name,
            email,
            role,
            password,
            collegeId: university.id,
        };

        try {
            api.post('/users', userData).then(()=>{
                setMessage({ status: 'success', description: 'Usuário cadastrado com sucesso' });
                router.push('/login')
            })
            
        } catch (err: any) {
            setMessage({ status: 'error', description: err.response.data.message });
        }

    };


    return (
        <div className="mt-1">

            <FormInput label="Seu nome" onChange={handleChangeName} value={name} placeholder="Ex: João Miguel"></FormInput>
            <FormInput label="Seu e-mail" onChange={handleChangeEmail} value={email} placeholder="Ex: joaomiguel@ufrpe.br"></FormInput>
            <FormInput label="Senha" onChange={handleChangePassword} type="password" value={password} placeholder="•••••••••••••••"></FormInput>
            <FormInput label="Confirmar senha" onChange={handleChangeConfirmPassword} type="password" value={confirmPassword} placeholder="•••••••••••••••"></FormInput>
            <FormSelectCollege
                label="Escolha a universidade a qual você possui vínculo"
                title="Selecione"
                value={university ? university.name : ''}
                onChange={handleChangeUniversity}
                options={universities.length > 0 ? universities.map((univ) => (univ.name)) : []}
            />
            <FormSelectCollege
                label="Você pertence a qual corpo nesta instituição?"
                title="Selecione"
                value={institutionBody} // Aqui está definido o valor do select como o estado 'institutionBody'
                onChange={handleInstitutionBodyChange}
                options={institutionBodies}
            />

            <Button onClick={handleSubmit} className={`text-white font-bold bg-[#F5167E] items-center flex m-auto text-center justify-center rounded-[50px] h-[60px] mt-[30px] w-[300px]`}>
                Cadastrar
            </Button>

            <h1 className="text-form-label text-center text-[18px] font-normal mt-4">
                Já possui cadastro?
                <Button className="normal-case text-enter-button mb-1/2">
                    <a href='/login' className='font-medium'>Entrar</a>
                </Button>
            </h1>

            <AlertToast message={message} setMessage={setMessage} />

        </div>
    )
};