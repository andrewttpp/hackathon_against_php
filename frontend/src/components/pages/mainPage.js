import React, { useState }from 'react'
import {Input, Button, Grid} from '@mui/material';
import Add from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';

const MainPage = () => {

    return (
        <Grid className='mainPage'>
            <div className='mainPage_lk'>
                <div className='mainPage_lk_item'>
                    <Link to={'/createTest'}>
                        <Button 
                            startIcon={<Add />}
                            className='mainPage_lk_item_button'
                            color='success'
                            variant="contained"
                        >
                            Создать новый тест
                        </Button>
                    </Link>
                </div>
                <div className='mainPage_lk_item'>
                    <Button 
                        startIcon={<ListAltIcon />}
                        className='mainPage_lk_item_button'
                        variant="contained"
                    >
                        Список моих тестов
                    </Button>
                </div>
            </div>
        </Grid>
    );
}

export default MainPage;
