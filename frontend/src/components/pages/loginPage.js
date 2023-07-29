import React, { useState }from 'react'
import {Button, Grid, TextField } from '@mui/material';
import { primaryButton, primaryTextField } from '../ui/cssStyles';

const LoginPage = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
 

    const onChangeLogin = (e) => {
        const value = e.target.value
        setLogin(value)
    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    
    const loginning = () => {
        console.log(login, password)
    }

    return (
        <Grid className='login'>
            <div className='login_title'>Вход</div>
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
