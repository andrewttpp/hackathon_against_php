import React, { useState }from 'react'
import {Button, Grid, MenuItem, Select, TextField} from '@mui/material';
import { primaryTextField } from '../ui/cssStyles';

const CreateTestPage = () => {

    const [type, setType] = useState('')

    const onChangeType = (e) => {
        const value = e.target.value
        setType(value)
    }
    
    return (
        <div className='createTest'>
           <div>Создание нового теста</div>

            <div className='createTest_main'>
                <TextField 
                    label="Название теста"
                    className='createTest_main_input'
                    sx={{
                        ...primaryTextField,
                        minWidth: '350px'
                    }}
                />
                {/* <TextField 
                    label="Название теста"
                    className='createTest_main_input'
                    sx={{
                        ...primaryTextField,
                        minWidth: '350px'
                    }}
                /> */}
            </div>

            <div className='createTest_list'>
                <div className='createTest_list_question'>
                    <div>
                        <span style={{ marginRight: '8px' }}>Выберите тип вопроса:</span>
                        <Select
                            value={type}
                            onChange={onChangeType}
                        >
                            <MenuItem value={''}>Не выбрано</MenuItem>
                            <MenuItem value={'solo'}>Одиночный выбор</MenuItem>
                            <MenuItem value={'many'}>Множественный выбор</MenuItem>
                            <MenuItem value={'select'}>Установление соответствия</MenuItem>
                            <MenuItem value={'hronologia'}>Установление последовательности</MenuItem>
                            <MenuItem value={'openWith'}>Открытый ответ (с ограничениями)</MenuItem>
                            <MenuItem value={'openWithout'}>Открытый ответ (без ограничений)</MenuItem>
                        </Select>
                    </div>
                    <div className='createTest_list_question_main'>
                        {
                            type == 'solo' &&
                            <div>SOLO</div>
                        }
                        {
                            type == 'many' &&
                            <div>many</div>
                        }
                        {
                            type == 'select' &&
                            <div>select</div>
                        }
                        {
                            type == 'hronologia' &&
                            <div>hronologia</div>
                        }
                        {
                            type == 'openWith' &&
                            <div>openWith</div>
                        }
                        {
                            type == 'openWithout' &&
                            <div>openWithout</div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CreateTestPage;
