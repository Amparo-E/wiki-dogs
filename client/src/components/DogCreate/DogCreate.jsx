import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";
import style from './DogCreate.module.css';

const DogCreate = () => {
    const dispatch = useDispatch()
    const temperament = useSelector(state => state.temperaments)


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
    })

    const validate = (input) => {
        const error = {}

        if(!input.name.length) error.name = 'The dog should have a name';
        if(!input.min_height.length) error.min_height = 'The dog should have a min height';
        if(!input.max_height.length) error.max_height = 'The dog should have a max height';
        if(!input.min_weight.length) error.min_weight = 'The dog should have a min weight';
        if(!input.max_weight.length) error.max_weight = 'The dog should have a max weight';
        if(!input.min_life_span.length) error.min_life_span = 'The dog should have a min year';
        if(!input.max_life_span.length) error.max_life_span = 'The dog should have a max year';
        if(isNaN(input.min_height)) error.min_height = 'The dog height shoul be a number. Example "10-12"'
        
        if( input.min_height <= 0) error.min_height = 'the dog cannot have a height less than 0';
        if(input.max_height > 120) error.max_height = 'the dog cannot be taller than 120cm';   
        
        return error
    }

    useEffect(() => {
        dispatch(getTemperaments())
        setError(validate(input))
    }, [dispatch,input])




    const handleSubmit = (e) => {
        e.preventDefault()
        if( !Object.keys(error).length ){

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
        })
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    const tempOptions = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    

    return (
        <>
        <SearchBar />
            <div className={style.content}>
                
                <form onSubmit={handleSubmit} className={style.container_form}>

                        <div className={style.input_box}>
                            <label htmlFor="name">Name: </label>
                            <input 
                                type="text" 
                                name="name" 
                                value={input.name}
                                onChange={handleChange}/>
                                {error.name && <p className={style.error}>{error.name}</p>}
                        </div>

                        <div className={style.input_box}>
                            <label htmlFor="min_height">Min height: </label>
                            <input 
                                type="text"
                                name="min_height"
                                value={input.min_height}
                                onChange={handleChange}/>
                            <input 
                                type="text"
                                name="max_height"
                                value={input.max_height}
                                onChange={handleChange}/>
                                {error.min_height && <p className={style.error}>{error.min_height}</p>}
                                {error.max_height && <p className={style.error}>{error.max_height}</p>}
                        </div>

                        {/* <div className={style.input_box}>
                            <label htmlFor="max_height">Max height: </label>
                            <input 
                                type="text"
                                name="max_height"
                                value={input.max_height}
                                onChange={handleChange}/>
                                {error.max_height && <p>{error.max_height}</p>}
                        </div> */}

                        <div className={style.input_box}>
                            <label htmlFor="min_weight">Min weight: </label>
                            <input 
                                type="text" 
                                name="min_weight" 
                                value={input.min_weight}
                                onChange={handleChange}/>
                            <input 
                                type="text" 
                                name="max_weight" 
                                value={input.max_weight}
                                onChange={handleChange}/>
                                {error.min_weight && <p className={style.error}>{error.min_weight}</p>}
                                {error.max_weight && <p className={style.error}>{error.max_weight}</p>}
                        </div>

                        {/* <div className={style.input_box}>
                            <label htmlFor="max_weight">Max weight: </label>
                            <input 
                                type="text" 
                                name="max_weight" 
                                value={input.max_weight}
                                onChange={handleChange}/>
                                {error.max_weight && <p>{error.max_weight}</p>}
                        </div> */}

                        <div className={style.input_box}>
                            <label htmlFor="max_life_span">Min life: </label>
                            <input 
                                type="text" 
                                name="min_life_span" 
                                value={input.min_life_span}
                                onChange={handleChange}/>
                            <input 
                                type="text" 
                                name="max_life_span" 
                                value={input.max_life_span}
                                onChange={handleChange}/>
                                {error.min_life_span && <p className={style.error}>{error.min_life_span}</p>}
                                {error.max_life_span && <p className={style.error}>{error.max_life_span}</p>}
                        </div>

                        {/* <div className={style.input_box}>
                            <label htmlFor="min_life_span">Max life: </label>
                            <input 
                            type="text" 
                            name="max_life_span" 
                            value={input.max_life_span}
                            onChange={handleChange}/>
                            {error.max_life_span && <p>{error.max_life_span}</p>}
                        </div> */}

                    
                        <div className={style.form_select}>
                            <h4>Choise your temperament</h4>
                            <select onChange={tempOptions}>
                                {temperament?.map(temp => {
                                    return <option>{temp.name}</option>
                                })}
                            </select>
                        </div>

                        {input.temperament?.map(el => <p>{el}</p>)}


                        <button type="submit">Send</button>

                </form>

            </div> 
        </>
    )
}

export default DogCreate;