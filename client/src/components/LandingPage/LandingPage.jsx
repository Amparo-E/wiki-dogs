import React from "react";
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';


const LandingPage = () => {



    return (
        <>
            <div className={style.content}>

                <div className={style.forma_1}></div>
                <div className={style.forma_2}></div>

                <div className={style.content_info}>
                    <h1>WELCOME</h1>
                    <p>THIS WEBSITE IS FOR YOU</p>
                    <Link to='/home'>
                        <button className={style.button}>HOME</button>
                    </Link>
                </div>

                <div className={style.forma_3}></div>
                <div className={style.forma_4}></div>
            </div>
        </>
    )
}

export default LandingPage;