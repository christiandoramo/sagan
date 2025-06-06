'use client';
import * as React from 'react';
import { FormInput } from '../FormShared/FormInput';
import { FormControl } from '@mui/material';
import { Button } from '@mui/material';
import { AlertToast } from '../AlertToast';
import { useState } from 'react';
import api from '../../../services/api';
import { useAuth } from '@/app/hooks/auth';


export const LoginForm = () => {
    const { signIn } = useAuth()



    const [message, setMessage] = useState({ status: '', description: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (event: any) => {
        setEmail(event.target.value);
        setMessage({ status: '', description: '' });
    }

    const handleChangePassword = (event: any) => {
        setPassword(event.target.value);
        setMessage({ status: '', description: '' });
    }

    const handleSubmit = async () => {

        if (email.trim() === '' || password.trim() === '') {
            setMessage({ status: 'error', description: 'Preencha todos os campos' });
            return;
        }

        try {
            const response = await signIn({ email, password })
        } catch (error) {
            setMessage({ status: 'error', description: 'Credenciais inválidas' });
        }

    }


    return (
        <FormControl className="mt-10">
            <FormInput value={email} onChange={handleChangeEmail} label="Seu email institucional" placeholder="exemplo@ufrpe.br"></FormInput>
            <FormInput value={password} onChange={handleChangePassword} type="password" label="Senha" placeholder="•••••••••••••••"></FormInput>

            <Button onClick={handleSubmit} className={`text-white font-bold bg-[#F5167E] items-center flex m-auto text-center justify-center rounded-[50px] h-[60px] mt-[30px] w-[300px]`}>
                Entrar
            </Button>

            <h1 className="text-form-label text-center text-[18px] font-normal mt-[120px]">
                Ainda não possui cadastro?
                <Button className="normal-case text-enter-button mb-1/2">
                    <a href='/register' className='font-medium'>Cadastrar</a>
                </Button>
            </h1>

            <AlertToast message={message} setMessage={setMessage} />

        </FormControl>
    )
};