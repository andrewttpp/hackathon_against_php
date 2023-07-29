import React, { useContext, useEffect, useState } from 'react'
import AppRoutes from './routes';
import Header from './components/header';
import Cookies from 'universal-cookie';
import { authUser } from './http/apiUser';
import { Context } from '.';
import { CircularProgress } from '@mui/material';

const App = () => {

    const {user} = useContext(Context)
    const cookies = new Cookies();

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = cookies.get('token')
        authUser(token)
        .then(data => {
            user.set(data)
        })
        .catch(e => {})
        .finally(() => {
            setLoading(false)
        })
        
    }, [])

    if (loading) {
        return <CircularProgress color="primary" />
    }
    
    return (
        <>
            <Header />
            <AppRoutes />
        </>
    );
}

export default App;
