import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterTemperaments, filterBreed, orderByName, orderByWeight } from '../../redux/actions';
import Card from '../Cards/Cards'; 
import SearchBar from '../SearchBar/SearchBar';
import  Loading  from '../Loading/Loading'
import Pagination from "../pagination/Pagination";
import style from './HomePage.module.css'

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    
    const allDogs = useSelector(state => state.dogs);
    const dogsFiltereds = useSelector(state => state.dogFiltered);
    const allTemperaments = useSelector(state => state.temperaments);
    
    const [render, setRender] = useState(false)
    

    // const [estado, setEstado] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setpostPerPage] = useState(8);
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = dogsFiltereds.slice(firstPostIndex, lastPostIndex);

    // const paginadio = () => {
    //     return dogs.slice((currentPage*2)-12, currentPage+12)
    // }


    //Paginado.map...


    // const prueba = filtrados.length? filtro.slice((currentPage*2)-12, currentPage+12):perrosSinFiltrar.slice((currentPage*2)-12, currentPage+12)


    // ---------- los puedo meter en una funcion y ponerle condicionales
    const handleFilterByTemperament  = (e) => {
        e.preventDefault()
        // setEstado(e.target.value)
        setRender(!render)
        dispatch(filterTemperaments(e.target.value))
    }

    const handleFilterByBreed = (e) => {
        e.preventDefault()
        // setEstado(e.target.value)
        setRender(!render)
        dispatch(filterBreed(e.target.value))
    }

    const handlerOrderByOrder = (e) => {
        e.preventDefault()
        // setEstado(e.target.value)
        setRender(!render)
        dispatch(orderByName(e.target.value))
    }

    const handlerOrderByWeight = (e) => {
        e.preventDefault()
        // setEstado(e.target.value)
        setRender(!render)
        dispatch(orderByWeight(e.target.value))
    }

    //-----------------------------------------

    return (
        <>
            <SearchBar/>

            <div className={style.content_select}> 
                <select onChange={handleFilterByTemperament} className={style.select_box}>
                    <option value="All" > All </option>
                    {allTemperaments?.map(temp => <option value={temp.name} >{temp.name}</option>)}
                </select>

                <select onChange={handleFilterByBreed} className={style.select_box}>
                    <option value="All">All</option>
                    {allDogs?.map(dog => <option value={dog.name}>{dog.name}</option>)}
                </select>

                <select onChange={handlerOrderByOrder} className={style.select_box}>
                    <option value="A-Z" >A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                <select onChange={handlerOrderByWeight} className={style.select_box}>
                    <option value="MIN-MAX">MIN-MAX</option>
                    <option value="MAX-MIN">MAX-MIN</option>
                </select>
            </div>


            {!currentPost.length > 0 
            ? ( <Loading ready={false}/> )
            : (
                <div className={style.content_cards}>
                    {currentPost?.map((dog, index) => <Card id={dog.id} 
                                                            name={dog.name} 
                                                            image={dog.image} 
                                                            temperament={dog.temperament} 
                                                            weight={dog.weight}
                                                            key={index}
                                                            />
                                                            )}
                </div>
            )}


            <div> 
                <Pagination 
                    totalPost={dogsFiltereds.length} 
                    postPerPage={postPerPage} 
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage}
                />
            </div>

        </>
    )
}

export default HomePage;