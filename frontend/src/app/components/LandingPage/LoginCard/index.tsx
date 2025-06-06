import React from 'react'
import { Grid, Paper, TextField, Button, Typography, Link } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useState } from 'react';
import api from '../../../../services/api';
import { useRouter } from 'next/navigation';
import { AlertToast } from '../../AlertToast';
import { useAuth } from '@/app/hooks/auth';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'white',
            },
        },
    },
})(TextField);

const Login = () => {
    const paperStyle = {
        padding: 20, width: 400, margin: "20px auto", backgroundColor: '#335189', borderRadius: '20px'
    };

    const btnstyle = { margin: '8px 0', backgroundColor: '#335189', color: 'white' };

    const router = useRouter();
    const { signIn } = useAuth();

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

        const userData = {
            email,
            password
        }

        try {
        const logged = await signIn(userData);
        // await api.post('/auth', userData);
        // router.push('/home');
        if(logged ===true){
            setMessage({ status: 'success', description: 'Login realizado com sucesso' });
        }else{
            setMessage({ status: 'error', description: 'Credenciais inválidas!' });
        }
        } catch (error) {
            setMessage({ status: 'error', description: 'Credenciais inválidas' });
        }

    }

    return (
        <Grid className='mt-4'>
            <Paper elevation={10} style={paperStyle}>
                <h2 className="text-xl text-white ml-2 mb-5">Faça agora seu login</h2>
                <CssTextField value={email} onChange={handleChangeEmail} label='E-mail' placeholder='Seu email institucional' fullWidth required />
                <CssTextField value={password} onChange={handleChangePassword} className='mt-4' label='Senha' placeholder='Insira sua senha' type='password' fullWidth required />
                <Button onClick={handleSubmit} type='submit' variant="contained" style={btnstyle} fullWidth>Entrar</Button>
                <div className='justify-center text-center mt-2'>
                    <Typography>Ainda não possui cadastro?
                        <Link className='text-black ml-2' href="register" >
                            Cadastrar
                        </Link>
                    </Typography>
                    <Typography className='mt-1'>
                        <Link className='text-black' href="#" >
                            Esqueci minha senha
                        </Link>
                    </Typography>
                </div>
            </Paper>

            <AlertToast message={message} setMessage={setMessage} />
        </Grid>
    )
}

export default Login;