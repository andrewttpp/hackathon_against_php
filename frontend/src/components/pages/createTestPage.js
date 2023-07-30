import React, { useContext, useEffect, useState }from 'react'
import {Button, RadioGroup, FormControlLabel, MenuItem, Radio, Select, TextField, IconButton, FormGroup, Checkbox, ToggleButtonGroup, ToggleButton, Alert } from '@mui/material';
import { primaryTextField } from '../ui/cssStyles';
import Add from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { create } from '../../http/apiTest';

const CreateTestPage = () => {

    const navigate = useNavigate()
    const {user} = useContext(Context)

    const defaultQuestions = [{
        id: 1,
        type: '-',
        text: '',
        level: 1,
        scores: 1,
        answers: [
            {
                id: 1,
                text: '',
                correct: false,
            }
        ]
    }]

    const [name, setName] = useState('')
    const [questions, setQuestions] = useState(defaultQuestions)
    const [loading, setLoading] = useState(false)
    const [isSaveTest, setIsSaveTest] = useState(false)

    useEffect(() => {
        if (!user.auth) {
            navigate('/login')
            return;
        }
        setIsSaveTest(localStorage.getItem('lastSaveTest') != null)
        setLoading(false)
    }, [])

    useEffect(() => {
        if (questions.length >= 3) {
            localStorage.setItem(
                'lastSaveTest',
                JSON.stringify({name: name, questions: JSON.stringify(questions)})
            )
        } else {
            questions.length != 1 && localStorage.removeItem('lastSaveTest')
        }
    }, [questions])

    const loadSaveTest = () => {
        const lastSave = JSON.parse(localStorage.getItem('lastSaveTest'))
        setQuestions(JSON.parse(lastSave.questions))
        setName(lastSave.name)
        setIsSaveTest(false)
    }

    const deleteSaveTest = () => {
        localStorage.removeItem('lastSaveTest')
        setIsSaveTest(false)
    }

    const onChangeName = (e) => {
        const value = e.target.value
        setName(value)
    }

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

    const onChangeLevel = (questionId, value) => {
        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        level: value,
                        scores: value
                    } : i
                )
            ]
        })
    }

    const onChangeScores = (questionId, e) => {
        const value = e.target.value
        if (value > 99) {
            return;
        }
        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        scores: value
                    } : i
                )
            ]
        })
    }

    const onChangeTextQuestion = (questionId, e) => {
        const value = e.target.value

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        text: value
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
            text: '',
            level: 1,
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

    const onChangeCorrectRadio = (questionId, e) => {
        const answerId = e.target.value

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        answers: i.answers.map(j => j.id == answerId ? {
                            ...j,
                            correct: true
                        } : {
                            ...j,
                            correct: false
                        })
                    } : i
                )
            ]
        })
    }

    const onChangeCorrectCheckbox = (questionId, e) => {
        const answerId = e.target.value
        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        answers: i.answers.map(j => j.id == answerId ? {
                            ...j,
                            correct: j.correct ? false : true
                        } : j)
                    } : i
                )
            ]
        })
    }

    const onChangeCurrentSequence = (questionId, answerId, e) => {
        const value = e.target.value

        setQuestions(prevState => {
            return [
                ...prevState.map(
                    i => i.id == questionId ? {
                        ...i,
                        answers: i.answers.map(j => j.id == answerId ? {
                            ...j,
                            correct: value
                        } : {
                            ...j,
                            correct: j.correct == value ? null : j.correct
                        })
                    } : i
                )
            ]
        })
    }
    
    const createTest = () => {
        create({
            user_id: user.data.id,
            name,
            questions
        })
    }

    if (loading) {
        return <div>Загрузка...</div>
    }
    
    return (
        <div className='createTest'>
           <div>Создание нового теста</div>

            {
                isSaveTest &&
                <Alert color="primary" severity="info">
                    <div>У вас есть несохраненный тест. Хотите продолжить создание?</div>
                    <Button 
                        color='primary'
                        variant="contained"
                        onClick={loadSaveTest}
                        sx={{
                            margin: '10px 0px'
                        }}
                    >
                        Продолжить
                    </Button>
                    <Button 
                        color='error'
                        variant="outlined"
                        onClick={deleteSaveTest}
                        sx={{
                            margin: '10px 0px 10px 10px'
                        }}
                    >
                        Удалить сохранение
                    </Button>
                </Alert>
            }

            <div className='createTest_main'>
                <TextField 
                    label="Название теста"
                    className='createTest_main_input'
                    sx={{
                        ...primaryTextField,
                        minWidth: '350px'
                    }}
                    value={name}
                    onChange={e => onChangeName(e)}
                />
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
                                    <MenuItem value={'-'}>Не выбрано</MenuItem>
                                    <MenuItem value={'solo'}>Одиночный выбор</MenuItem>
                                    <MenuItem value={'many'}>Множественный выбор</MenuItem>
                                    <MenuItem value={'hronologia'}>Установление последовательности</MenuItem>
                                    <MenuItem value={'select'}>Установление соответствия</MenuItem>
                                    <MenuItem value={'openWith'}>Открытый ответ (с ограничениями)</MenuItem>
                                    <MenuItem value={'openWithout'}>Открытый ответ (без ограничений)</MenuItem>
                                </Select>

                                <div style={{ float: 'right'}}> 
                                    <ToggleButtonGroup 
                                        variant="outlined" 
                                        exclusive
                                        value={question.level || 1} 
                                        onChange={(e, value) => {
                                            return onChangeLevel(question.id, value)
                                        }}
                                    >
                                        <ToggleButton value={1} color='success'>Легкий</ToggleButton>
                                        <ToggleButton value={2} color='warning'>Средний</ToggleButton>
                                        <ToggleButton value={3} color='error'>Сложный</ToggleButton>
                                    </ToggleButtonGroup>
                                    <TextField 
                                        variant="standard"
                                        label="Баллы"
                                        className='createTest_main_input'
                                        sx={{
                                            ...primaryTextField,
                                            maxWidth: '50px',
                                            margin: '0 8px'
                                        }}
                                        value={question.scores || 1}
                                        onChange={e => onChangeScores(question.id, e)}
                                    />
                                </div>

                            </div>
                            <TextField 
                                label="Текст вопроса"
                                className='createTest_main_input'
                                sx={{
                                    ...primaryTextField,
                                    width: '100%',
                                    margin: '10px 0'
                                }}
                                value={question.text}
                                onChange={e => onChangeTextQuestion(question.id, e)}
                            />
                            <div className='createTest_list_question_main'>
                                {
                                    question.type == 'solo' &&
                                    <div className='question'>
                                        <div className='question_list'>
                                            <RadioGroup
                                                className='question_list'
                                                value={question.answers.filter(i => i.correct == true)[0]?.id || 0}
                                                onChange={e => onChangeCorrectRadio(question.id, e)}
                                            >
                                                {
                                                    question.answers.map((answer, index) => 
                                                        <div 
                                                            className='question_list_answer'
                                                            key={answer.id}
                                                        >
                                                            <FormControlLabel 
                                                                className='question_list_answer-radio'
                                                                value={answer.id}
                                                                control={
                                                                    <Radio 
                                                                    />
                                                                } 
                                                            />
                                                            <TextField 
                                                                label={answer.correct && answer.text ? 'Это правильный ответ' : ''}
                                                                placeholder="Текст ответа"
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
                                    <div className='question'>
                                        <div className='question_list'>
                                            <FormGroup
                                                className='question_list'
                                                value={question.answers.filter(i => i.correct == true && i.id)}
                                                onChange={e => onChangeCorrectCheckbox(question.id, e)}
                                            >
                                                {
                                                    question.answers.map((answer, index) => 
                                                        <div 
                                                            className='question_list_answer'
                                                            key={answer.id}
                                                        >
                                                            <FormControlLabel 
                                                                className='question_list_answer-radio'
                                                                value={answer.id}
                                                                control={
                                                                    <Checkbox 
                                                                    />
                                                                } 
                                                            />
                                                            <TextField 
                                                                label={answer.correct && answer.text ? 'Это правильный ответ' : ''}
                                                                placeholder="Текст ответа"
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

                                                
                                            </FormGroup>
                                        </div>
        
                                    </div>
                                }
                                {
                                    (question.type == 'hronologia' || question.type == 'select') &&
                                    <div className='question'>
                                        <div className='question_list'>
                                            <FormGroup
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
                                                                    <Select 
                                                                        value={answer.correct || 0}
                                                                        onChange={e => onChangeCurrentSequence(question.id, answer.id, e)}
                                                                    >
                                                                        <MenuItem value={0}>-</MenuItem>
                                                                        {
                                                                            question.answers.map((i, index) => 
                                                                                <MenuItem value={index + 1} key={index + 1}>{index + 1}</MenuItem>
                                                                            )
                                                                        }
                                                                    </Select>
                                                                } 
                                                            />
                                                            <TextField 
                                                                label={answer.correct && answer.text ? `№ ${answer.correct}` : ''}
                                                                placeholder="Текст ответа"
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

                                                
                                            </FormGroup>
                                        </div>
        
                                    </div>
                                }
                                {
                                    question.type == 'openWith' &&
                                    <div className='question'>
                                        <div className='question_list'>
                                            {
                                                question.answers.map((answer, index) => 
                                                    <div 
                                                        className='question_list_answer'
                                                        key={answer.id}
                                                    >
                                                        <TextField 
                                                            label={answer.text ? 'Текст правильного ответа' : ''}
                                                            placeholder="Текст ответа"
                                                            className='createTest_main_input'
                                                            sx={{
                                                                ...primaryTextField,
                                                                width: '100%'
                                                            }}
                                                            value={answer.text}
                                                            onChange={e => onChangeText(question.id, answer.id, e)}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
        
                                    </div>
                                }
                                {
                                    question.type == 'openWithout' &&
                                    <div className='question'>
                                    </div>
                                }

                                {
                                    (
                                        (question.type != 'openWithout') &&
                                        (question.type != 'openWith') && 
                                        (question.type != '-')
                                    ) &&
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
                                }

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

            <Button 
                color='success'
                variant="contained"
                sx={{ width: '100%', marginTop: '15px' }}
                onClick={createTest}
            >
                Завершить создание теста
            </Button>
        </div>
    );
}

export default CreateTestPage;
