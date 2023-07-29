import React, { useState }from 'react'
import {Button, Grid, TextField } from '@mui/material';
import { primaryButton, primaryTextField } from '../ui/cssStyles';
import { loginUser } from '../../http/apiUser';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const LoginPage = () => {

    const navigate = useNavigate()
    const cookies = new Cookies();

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onChangeLogin = (e) => {
        const value = e.target.value
        setLogin(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    
    const loginning = async () => {
        if (!login) {
            setErrorMessage('Введите логин')
            return
        }
        if (!password) {
            setErrorMessage('Введите пароль')
            return
        }
        await loginUser(login, password)
        .then(data => {
            cookies.set('token', data.data.access, { path: '/' });
            navigate('/')
            window.location.reload()
        })
        .catch(e => setErrorMessage('Неправильные данные'))
    }

    return (
        <Grid className='login'>
            <div className='login_title'>Вход</div>
            {
                errorMessage && <span style={{ color: '#ff6666' }}>{errorMessage}</span>
            }
            <TextField
                fullWidth
                placeholder="Введите логин"
                onChange={onChangeLogin}
                sx={{
                    ...primaryTextField,
                }}
            />
            <TextField
                fullWidth
                placeholder="Введите пароль"
                onChange={onChangePassword}
                type='password'
                sx={{
                    ...primaryTextField,
                    marginTop: '8px'
                }}
            />
            <Button
                onClick={loginning}
                variant="outlined" 
                color={"primary"}
                sx={{
                    ...primaryButton,
                    marginTop: '8px',
                }}
            >
                Войти
            </Button>
        </Grid>
    );
}

export default LoginPage;
