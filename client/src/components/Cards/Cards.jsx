import React from "react";
import { Link } from "react-router-dom";
import style from './Cards.module.css'

const Cards = ({id, name, image, weight, temperament}) => {

    return (
        <>
            <div className={style.card} key={id}>
                <Link to={`/home/${id}`} className={style.title_card}>     

                    <div className={style.card_img}>
                        <img src={image} alt={image}/>
                    </div>
                    
                    <div className={style.card_info}>
                        <h3>{name}</h3>
                    
                        <h5>Weight:</h5>
                        <p>{weight} Kg</p>
                        <h5>Temperaments:</h5>
                        <p>{temperament}</p>
                    </div>

                </Link>
            </div>
        </>
        
    )
}

export default Cards;