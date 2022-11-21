import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadData, selectInfo, applyFilters, setFilter } from '../../redux/actions';
import Card from '../Cards/Cards'; 
import SearchBar from '../SearchBar/SearchBar';
import Loading  from '../Loading/Loading'
import Pagination from "../pagination/Pagination";
import style from './HomePage.module.css'

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadData);
    }, []);
    
    const allDogs = useSelector(state => state.dogs);
    const dogsFiltereds = useSelector(state => state.dogFiltered);
    const allTemperaments = useSelector(state => state.temperaments);
    const filters = useSelector(state => state.filters);

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
        dispatch(setFilter({ name: 'temperament', value: e.target.value }));
        dispatch(applyFilters());

    }

    const handleFilterByBreed = (e) => {
        e.preventDefault()
        dispatch(setFilter({ name: 'breed', value: e.target.value }));
        dispatch(applyFilters());
    }



    const handleInfo = async (e) => {
        e.preventDefault();

        await dispatch(selectInfo(e.target.value));

        dispatch(applyFilters());
    }

    const handleChangeOrder = (e) => {
        dispatch(setFilter({ name: 'order', value: e.target.value }));
        dispatch(applyFilters());
    }

    //-----------------------------------------

    return (
        <>
            <SearchBar/>

            <div className={style.content_select}>                
                <select onChange={handleFilterByTemperament} className={style.select_box}>
                    <option value="">Order by temperaments</option>
                    {allTemperaments?.map(temp => <option value={temp.name}>{temp.name}</option>)}
                </select>

                <select onChange={handleFilterByBreed} className={style.select_box}>
                    <option value="">Order by breed</option>
                    {allDogs?.map(dog => dog !== undefined ? <option value={dog.name}>{dog.name}</option> : <></>)}
                </select>

                <div onChange={handleChangeOrder} className={style.select_box}>
                    <input type="radio" name="filters" value="A-Z" checked={filters.order === 'A-Z'}/> A-Z
                    <input type="radio" name="filters" value="Z-A" checked={filters.order === 'Z-A'}/> Z-A
                    <input type="radio" name="filters" value="MIN-MAX" checked={filters.order === 'MIN-MAX'}/> MIN-MAX
                    <input type="radio" name="filters" value="MAX-MIN" checked={filters.order === 'MAX-MIN'}/> MAX-MIN
                </div>

                <select onChange={handleInfo} className={style.select_box}>
                    <option value="All">All</option>
                    <option value="api">api</option>
                    <option value="db">db</option>
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