import React, {useContext, useState} from 'react';
import {isEmpty} from "../../utils/helpsFunctions";
import {Context} from "../../index";
import {Link} from "react-router-dom";
import '../../styles/MyTests.css'

const MyTestsPage = () => {
    const {user} = useContext(Context)

    if (!isEmpty(user.tests)) {
        return (
            <div className="wrapper">
                <div className="titlePage">
                    <span>Мои тесты</span>
                </div>

                {user.tests.map((testElement, testId) => {
                    return (<div className="testsContainer" key={testId}><Link to={'/test/' + testElement.slug}>
                        <div className="testsBlockContainer">
                            <div className="titleTestsBlockContainter">{testElement.name}</div>
                            <div
                                className="countQuestionsTestsBlockContainer">Вопросов: {testElement.count_questions}</div>
                        </div>
                    </Link></div>)
                })}
            </div>)
    } else {
        return (
            <div className="wrapper">
                <div className="titlePage">
                    <span>Мои тесты</span>
                </div>

                <div className="titlePage">
                    <span>Вы пока не создали ни одного теста</span>
                </div>
            </div>
        )
    }
}

export default MyTestsPage;