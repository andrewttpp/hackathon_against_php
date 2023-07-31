import React, { useContext, useEffect, useState }from 'react'
import {Button, RadioGroup, Grid, FormControlLabel, MenuItem, Radio, Select, TextField, IconButton, FormGroup, Checkbox, ToggleButtonGroup, ToggleButton, Alert, keyframes } from '@mui/material';
import { primaryTextField } from '../ui/cssStyles';
import Add from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { get } from '../../http/apiTest';


const InteractivePage = () => {

    const {user} = useContext(Context)
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const slug = window.location.href.split('/').at(-1)
        get(slug)
        .then(data => {
            setQuestions(data.questions)
        })
        .catch(e => {})
        .finally(() => {
            setQuestions(prevState => {
                return [
                    ...prevState.map(i => {
                        return {
                            ...i,
                            answers: i.answers.map(j => {
                                return {
                                    ...j,
                                    correct: null
                                }
                            })
                        }
                    })
                ]
            })
        })
    }, [])

    const onChangeCorrectRadio = (questionId, e) => {
        const answerId = e.target.value
        console.log(questionId)

        setQuestions(prevState => {
        console.log(prevState)
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

    return (
        <Grid className='interactive'>
            <h3>Тест под название матем</h3>
           <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
                {
                    questions.map((question, index) => 
                        <div className='interactive_question'>
                            { 
                                question.type == 'solo' && <>
                                    <div className='interactive_question_info'>
                                        №{index + 1} Задание с <span style={{ fontWeight: 700}}>одним правильный ответом</span>
                                    </div>
                                    <div className='interactive_question_text'>
                                        {question.text}
                                    </div>
                                    <div className='interactive_question_scores'>
                                        {
                                            question.level == 1 ? <Button color="success" variant="contained">Легкий</Button> :
                                            question.level == 2 ? <Button color="warning" variant="contained">Средний</Button> :
                                            question.level == 3 ? <Button color="error" variant="contained">Сложный</Button> : ''
                                        } - {question.scores} б.
                                    </div>
                                    <RadioGroup
                                        className='interactive_question_answers'
                                        value={question.answers.filter(i => i.correct == true)[0]?.id || -1}
                                        onChange={e => onChangeCorrectRadio(question.id, e)}
                                    >
                                        {
                                            question.answers.map(answer =>
                                                <div 
                                                    className={`interactive_question_answers_item ${answer.correct ? 'interactive_question_answers_item-selected' : ''}`} 
                                                    key={answer.id}
                                                >
                                                    <FormControlLabel 
                                                        className='interactive_question_answers_item-point'
                                                        value={answer.id}
                                                        control={<>
                                                            <Radio 
                                                                value={answer.id}
                                                            />
                                                            <div>
                                                                {answer.text}
                                                            </div>
                                                        </>} 
                                                    />
                                                </div>
                                            )
                                        }
                                    </RadioGroup>
                                </>       
                            }
                            { 
                                question.type == 'many' && <>
                                    <div className='interactive_question_info'>
                                        №{index + 1} Задание с <span style={{ fontWeight: 700}}>несколькими правильными ответами</span>
                                    </div>
                                    <div className='interactive_question_text'>
                                        {question.text}
                                    </div>
                                    <div className='interactive_question_scores'>
                                        {
                                            question.level == 1 ? <Button color="success" variant="contained">Легкий</Button> :
                                            question.level == 2 ? <Button color="warning" variant="contained">Средний</Button> :
                                            question.level == 3 ? <Button color="error" variant="contained">Сложный</Button> : ''
                                        } - {question.scores} б.
                                    </div>
                                    <FormGroup
                                        className='interactive_question_answers'
                                        value={question.answers.filter(i => i.correct == true && i.id)}
                                        onChange={e => onChangeCorrectCheckbox(question.id, e)}
                                    >
                                        {
                                            question.answers.map(answer =>
                                                <div 
                                                    className={`interactive_question_answers_item ${answer.correct ? 'interactive_question_answers_item-selected' : ''}`} 
                                                    key={answer.id}
                                                >
                                                    <FormControlLabel 
                                                        className='interactive_question_answers_item-point'
                                                        value={answer.id}
                                                        control={<>
                                                            <Checkbox 
                                                                value={answer.id}
                                                            />
                                                            <div>
                                                                {answer.text}
                                                            </div>
                                                        </>} 
                                                    />
                                                </div>
                                            )
                                        }
                                    </FormGroup>
                                </>       
                            }
                            { 
                                (question.type == 'hronologia' || question.type == 'select') && <>
                                    <div className='interactive_question_info'>
                                        №{index + 1} Задание с <span style={{ fontWeight: 700}}>правильной последовательностью</span>
                                    </div>
                                    <div className='interactive_question_text'>
                                        {question.text}
                                    </div>
                                    <div className='interactive_question_scores'>
                                        {
                                            question.level == 1 ? <Button color="success" variant="contained">Легкий</Button> :
                                            question.level == 2 ? <Button color="warning" variant="contained">Средний</Button> :
                                            question.level == 3 ? <Button color="error" variant="contained">Сложный</Button> : ''
                                        } - {question.scores} б.
                                    </div>
                                    <FormGroup
                                        className='interactive_question_answers'
                                    >
                                        {
                                            question.answers.map(answer =>
                                                <div className='interactive_question_answers_item'>
                                                    <FormControlLabel 
                                                        className='interactive_question_answers_item-point'
                                                        control={<>
                                                            <Select 
                                                                value={answer.correct || 0}
                                                                onChange={e => onChangeCurrentSequence(question.id, answer.id, e)}
                                                                sx={{ marginRight: '8px' }}
                                                            >
                                                                <MenuItem value={0}>-</MenuItem>
                                                                {
                                                                    question.answers.map((i, index) => 
                                                                        <MenuItem value={index + 1} key={index + 1}>{index + 1}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                            <div>
                                                                {answer.text}
                                                            </div>
                                                        </>} 
                                                    />

                                                </div>
                                            )
                                        }
                                    </FormGroup>
                                </>       
                            }
                            { question.type == 'openWith' && <>
                                    <div className='interactive_question_info'>
                                        №{index + 1} Задание с <span style={{ fontWeight: 700}}>ограниченным ответом</span>
                                    </div>
                                    <div className='interactive_question_text'>
                                        {question.text}
                                    </div>
                                    <div className='interactive_question_scores'>
                                        {
                                            question.level == 1 ? <Button color="success" variant="contained">Легкий</Button> :
                                            question.level == 2 ? <Button color="warning" variant="contained">Средний</Button> :
                                            question.level == 3 ? <Button color="error" variant="contained">Сложный</Button> : ''
                                        } - {question.scores} б.
                                    </div>
                                    {
                                        question.answers.map((answer, index) => 
                                        <div>
                                            <TextField 
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
                            </>}
                            {
                                question.type == 'openWithout' && <>
                                <div className='interactive_question_info'>
                                    №{index + 1} Задание с <span style={{ fontWeight: 700}}>развернутым ответом</span>
                                </div>
                                <div className='interactive_question_text'>
                                    {question.text}
                                </div>
                                <div className='interactive_question_scores'>
                                    {
                                        question.level == 1 ? <Button color="success" variant="contained">Легкий</Button> :
                                        question.level == 2 ? <Button color="warning" variant="contained">Средний</Button> :
                                        question.level == 3 ? <Button color="error" variant="contained">Сложный</Button> : ''
                                    } - {question.scores} б.
                                </div>
                                {
                                    question.answers.map((answer, index) => 
                                    <div>
                                        <TextField 
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
                        </>}
                        </div>
                    )
                }

           </Grid>
        </Grid>
    );
}

export default InteractivePage;
