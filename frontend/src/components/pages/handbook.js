import React from 'react';

import bachelorLogo from'../../static/bachelor.svg';
import magistracyLogo from'../../static/magistracy.svg';
import specialtyLogo from'../../static/specialty.svg';

import styles from '../../styles/Handbook.module.css'

const Handbook = () => {

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <span>Вас приветствует справочник БГТУ им.Шухова!</span>
                <span>Для продолжения выберите нужное:</span>
            </div>
            <div className={styles.handbookContainer}>
                <div className={styles.blockBachelorContainer}>
                    <a href="handbook/bachelor/" className="bachelor">
                        <img id={styles.bachelorLogo} src={bachelorLogo}/>
                        <span>Бакалавр</span>
                    </a>
                </div>

                <div className={styles.blockMagistracyContainer}>
                    <a href="handbook/magistracy/" className="magistracy">
                        <img id={styles.magistracyLogo} src={magistracyLogo}/>
                        <span>Магистратура</span>
                    </a>
                </div>

                <div className={styles.blockSpecialtyContainer}>
                    <a href="handbook/specialty/" className="specialty">
                        <img id={styles.specialtyLogo} src={specialtyLogo}/>
                        <span>Специалитет</span>
                    </a>
                </div>
            </div>
        </div>
    );

};

export default Handbook;