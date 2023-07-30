import React, { useContext, useEffect, useState }from 'react'
import {Button, RadioGroup, Grid, FormControlLabel, MenuItem, Radio, Select, TextField, IconButton } from '@mui/material';
import { primaryTextField } from '../ui/cssStyles';
import Add from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';

const CreateTestPage = () => {

    const navigate = useNavigate()
    const {user} = useContext(Context)

    const [questions, setQuestions] = useState([{
        id: 0,
        type: 'solo',
        answers: [
            {
                id: 0,
                text: '',
                correct: false,
            }
        ]
    }])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user.auth) {
            navigate('/login')
        }
        setLoading(false)
    }, [])

    const onChangeType = (questionId, e) => {
        const value = e.target.value

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        type: value
                    } : i
                )
            ]
        })
    }

    const onChangeText = (questionId, answerId, e) => {
        const value = e.target.value

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        answers: i.answers.map(j => j.id == answerId ? 
                            {
                                ...j,
                                text: value
                            } : j
                        )
                    } : i
                )
            ]
        })
    }

    const addNewAnswer = (questionId) => {
        const defaultAnswer = {
            text: '',
            correct: false,
        }

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        answers: [
                            ...i.answers,
                            {
                                ...defaultAnswer,
                                id: i.answers[i.answers.length - 1]?.id + 1 || Math.floor(Math.random() * 10000)
                            }
                        ]
                    } : i
                )
            ]
        })
    }

    const deleteAnswer = (questionId, answerId) => {

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        answers: i.answers.filter(j => j.id != answerId)
                    } : i
                )
            ]
        })
    }

    const addNewQuestion = () => {
        const defaultQuestion = {
            type: '',
            answers: [
                {
                    id: 0,
                    text: '',
                    correct: false,
                }
            ]
        }

        setQuestions(prevState => {
            return [
                ...prevState,
                {
                    ...defaultQuestion,
                    id: prevState[prevState.length - 1]?.id + 1 || Math.floor(Math.random() * 10000)
                }
            ]
        })
    }

    const deleteQuestion = (questionId) => {

        setQuestions(prevState => {
            return [
                ...prevState.filter(i => i.id != questionId)
            ]
        })
    }


    const onChangeQuestions = () => {

    }

    if (loading) {
        return <div>Загрузка...</div>
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
                {
                    questions.map(question => 
                        
                        <div className='createTest_list_question' key={question.id}>
                            <div>
                                <span style={{ marginRight: '8px' }}>Выберите тип вопроса:</span>
                                <Select
                                    value={question.type}
                                    onChange={e => onChangeType(question.id, e)}
                                    sx={{ borderRadius: '12px' }}
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
                                    question.type == 'solo' &&
                                    <div className='question'>
                                        <div className='question_list'>
                                            <RadioGroup
                                                className='question_list'
                                            >
                                                {
                                                    question.answers.map((answer, index) => 
                                                        <div 
                                                            className='question_list_answer'
                                                            key={answer.id}
                                                        >
                                                            <FormControlLabel 
                                                                className='question_list_answer-radio'
                                                                control={
                                                                    <Radio 
                                                                    />
                                                                } 
                                                            />
                                                            <TextField 
                                                                label="Текст вопроса"
                                                                className='createTest_main_input'
                                                                sx={{
                                                                    ...primaryTextField,
                                                                    width: '100%'
                                                                }}
                                                                value={answer.text}
                                                                onChange={e => onChangeText(question.id, answer.id, e)}
                                                            />
                                                            <IconButton 
                                                                color='error'
                                                                className='question_list_answer-iconButton'
                                                                onClick={e => deleteAnswer(question.id, answer.id)}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </div>
                                                    )
                                                }

                                                
                                            </RadioGroup>
                                        </div>
        
                                    </div>
                                }
                                {
                                    question.type == 'many' &&
                                    <div>many</div>
                                }
                                {
                                    question.type == 'select' &&
                                    <div>select</div>
                                }
                                {
                                    question.type == 'hronologia' &&
                                    <div>hronologia</div>
                                }
                                {
                                    question.type == 'openWith' &&
                                    <div>openWith</div>
                                }
                                {
                                    question.type == 'openWithout' &&
                                    <div>openWithout</div>
                                }

                                <Button 
                                    color='primary'
                                    variant="contained"
                                    onClick={() => addNewAnswer(question.id)}
                                    sx={{
                                        margin: '15px 0px 0px 15px'
                                    }}
                                >
                                    <Add sx={{ marginRight: '5px' }}/>
                                    <span>Добавить ответ</span>
                                </Button>
                                <Button 
                                    color='error'
                                    variant="contained"
                                    onClick={() => deleteQuestion(question.id)}
                                    sx={{
                                        margin: '15px 0px 0px 15px',
                                        float: 'right'
                                    }}
                                >
                                    <DeleteIcon sx={{ marginRight: '5px' }}/> 
                                    <span>Удалить вопрос</span>
                                </Button>
                            </div>
                        </div>
                    )
                }

                <Button 
                    color='primary'
                    variant="contained"
                    sx={{ width: '250px', marginTop: '15px' }}
                    onClick={() => addNewQuestion()}
                >
                    <Add /> Добавить вопрос
                </Button>
            </div>

        </div>
    );
}

export default CreateTestPage;
