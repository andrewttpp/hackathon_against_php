import React, {useEffect, useState} from 'react';
import {getHandbook} from "../../http/apiHandbook";
import '../../styles/HandbookType.css'


const HandbookTypePage = () => {
    const [handbook, setHandbook] = useState({})
    const [titleName, setTitleName] = useState({})

    const isEmpty = (obj) => {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }

        return true
    }

    const getTitleName = (typeHandbook) => {
        if (typeHandbook === 'bachelor') {
            setTitleName('Направления бакалавриата')
        } else if (typeHandbook === 'magistracy') {
            setTitleName('Направления магистратуры')
        } else {
            setTitleName('Направления специалитета')
        }
    }

    useEffect(() => {
        const typeHandbook = window.location.href.split('/').at(-1)
        getHandbook(typeHandbook)
            .then(data => {
                setHandbook(data)
                getTitleName(typeHandbook)
            })
            .catch(e => {
            })

    }, [])

    const openArrow = (e) => {
        let object = e.currentTarget
        let parentObject = object.closest('div.specialtiesBlockContainer')
        let programsBlock = parentObject.querySelector('.programsBlockWrapper')

        if (object.classList.contains('open')) {
            object.classList.remove('open')
            programsBlock.style.display = 'none'
        } else {
            object.classList.add('open')
            programsBlock.style.display = 'flex'
        }
    }

    if (!isEmpty(handbook)) {
        return (
            <div className="wrapper">
                <div className="titlePage">
                    <span>{titleName}</span>
                </div>
                <div className="handbookContainer">
                    {handbook.specialties.map((specialtiesElement, specialtiesId) => {
                        return (<div className="specialtiesBlockContainer" key={specialtiesId}>
                            <div className="specialtiesBlock">
                                <span>{specialtiesElement.code + ' "' + specialtiesElement.name+ '"'}</span>
                                <div className="arrow" onClick={(e) => {
                                    openArrow(e);
                                }}>
                                    <span className="leftBar"></span>
                                    <span className="rightBar"></span>
                                </div>
                            </div>
                            <div className="programsBlockWrapper">
                                <div className="titleProgramsBlock">
                                            <span>Образовательные программы направления {specialtiesElement.code + ' "' + specialtiesElement.name+ '"'}</span>
                                        </div>
                            {specialtiesElement.programs.map((programsElement, programsltiesId) => {
                                return (
                                    <div className="programsBlockContainer" key={programsltiesId}>
                                        <div className="programsBlock">
                                            <span>{programsElement.name}</span>
                                        </div>
                                    </div>)
                            })}</div>
                        </div>)
                    })}
                </div>
            </div>

        );
    }


};

export default HandbookTypePage;