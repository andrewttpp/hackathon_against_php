import React, {useEffect, useState, useContext} from 'react'
import {Input, Button, Grid} from '@mui/material';
import Add from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {Link} from 'react-router-dom';
import {Context} from '../..';
import {ToastContainer} from "react-toastify";


const MainPage = () => {

    const {user} = useContext(Context)

    useEffect(() => {

    }, [])

    return (
        <Grid className='mainPage'>
            {
                user.auth
                    ?
                    <div className='mainPage_lk'>
                        <div className='mainPage_lk_item'>
                            <Link to={'/createTest'}>
                                <Button
                                    startIcon={<Add/>}
                                    className='mainPage_lk_item_button'
                                    color='success'
                                    variant="contained"
                                >
                                    Создать новый тест
                                </Button>
                            </Link>
                        </div>
                        <div className='mainPage_lk_item'>
                            <Link to={'/myTests'}>
                                <Button
                                    startIcon={<ListAltIcon/>}
                                    className='mainPage_lk_item_button'
                                    variant="contained"
                                >
                                    Список моих тестов
                                </Button>
                            </Link>
                        </div>
                    </div>
                    :
                    <div>Для взаимодействия с платформой вам необходимо авторизоваться</div>
            }
            <ToastContainer/>
        </Grid>
    );
}

export default MainPage;
