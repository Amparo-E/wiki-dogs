import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments, setErrorMessage } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import style from './DogCreate.module.css';
import { validate } from "./controllerDogCreate";

const DogCreate = () => {
    const dispatch = useDispatch()
    const temperament = useSelector(state => state.temperaments)

    const imageUrl = 'https://assets.puzzlefactory.pl/puzzle/376/321/original.jpg';

    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        max_life_span: '',
        min_life_span: '',
        temperament: [],
        image: ''
    })
    

    useEffect(() => {
        dispatch(setErrorMessage(''));
        dispatch(getTemperaments());
    }, [dispatch,input]);


    const handleValidations = async () => {
        let res = await validate(input);
        setError(res);        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !Object.keys(error).length ){

            if(input.image === '') {
                input.image = imageUrl;
            }

            dispatch(createDog(input));

        }
        
        setInput({
            name: '',
            min_height: '',
            max_height: '',
            min_weight: '',
            max_weight: '',
            max_life_span: '',
            min_life_span: '',
            temperament: [],
            image: '',
        })
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        handleValidations();
    }


    const tempOptions = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value],
        });
    }
    

    return (
        <ErrorHandler>
        <SearchBar />
            <div className={style.content}>
            
                <img src={input.image === '' || error.image !== undefined ? imageUrl : input.image} alt="" />
                
                <form onSubmit={handleSubmit} className={style.container_form}>

                        <div className={style.input_box}>
                            <label htmlFor="name">Name: </label>
                            <input 
                                type="text" 
                                name="name" 
                                value={input.name}
                                onChange={handleChange}
                                placeholder="Breed"/>
                                {error.name && <p className={style.error}>{error.name}</p>}
                        </div>

                        <div className={style.input_box}>
                            <label htmlFor="min_height">Height: </label>
                            <input 
                                type="text"
                                name="min_height"
                                value={input.min_height}
                                onChange={handleChange}
                                placeholder="Min height"/>
                            <input 
                                type="text"
                                name="max_height"
                                value={input.max_height}
                                onChange={handleChange}
                                placeholder="Max height"/>
                                {error.min_height && <p className={style.error}>{error.min_height}</p>}
                                {error.max_height && <p className={style.error}>{error.max_height}</p>}
                        </div>

                        <div className={style.input_box}>
                            <label htmlFor="min_weight">Weight: </label>
                            <input 
                                type="text" 
                                name="min_weight" 
                                value={input.min_weight}
                                onChange={handleChange}
                                placeholder="Min weight"/>
                            <input 
                                type="text" 
                                name="max_weight" 
                                value={input.max_weight}
                                onChange={handleChange}
                                placeholder="Max weight"/>
                                {error.min_weight && <p className={style.error}>{error.min_weight}</p>}
                                {error.max_weight && <p className={style.error}>{error.max_weight}</p>}
                        </div>

                        <div className={style.input_box}>
                            <label htmlFor="max_life_span">Life: </label>
                            <input 
                                type="text" 
                                name="min_life_span" 
                                value={input.min_life_span}
                                onChange={handleChange}
                                placeholder="Min life"/>
                            <input 
                                type="text" 
                                name="max_life_span" 
                                value={input.max_life_span}
                                onChange={handleChange}
                                placeholder="Max life"/>
                                {error.min_life_span && <p className={style.error}>{error.min_life_span}</p>}
                                {error.max_life_span && <p className={style.error}>{error.max_life_span}</p>}
                        </div>

                        <div className={style.input_box}>
                            <label htmlFor="image">Image: </label>
                            <input 
                                type="text" 
                                name="image" 
                                value={input.image}
                                onChange={handleChange}
                                placeholder="URL image"/>
                                {error.image && <p className={style.error}>{error.image}</p>}
                        </div>
                    
                        <div className={style.form_select}>
                            <h4>Choise your temperament</h4>
                            <select onChange={tempOptions}>
                                {temperament?.map(temp => {
                                    return <option>{temp.name}</option>
                                })}
                            </select>
                        </div>


                        { input.temperament?.map(el => <p>{el}</p>) }
                        
                        { Object.keys(error).length === 0
                        ? <button type="submit" className={style.button}>Send</button> 
                        : <button type="submit" disabled className={style.disabled}>Send</button> 
                         }

                </form>
            </div> 
        </ErrorHandler>
    )
}

export default DogCreate;