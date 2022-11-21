import {
    ERROR,
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    FILTER_TEMPERAMENTS,
    FILTER_BREED,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    CREATE_DOG,
    DELETE_DOG,
    SHOW_DOG_DETAIL,
    SEARCH_BY_NAME,
    CLEAN_DETAIL,
    DESDE_TODOS,
    APPLY_FILTERS,
    SET_FILTER
} from './types';
import axios from 'axios';

// ------------- ACTIONS PARA TODO USO -------------
export const getDogs = () => {
    return async function(dispatch){
        try {
            const getDogie = await axios('http://localhost:3001/dogs');
            return dispatch({type: GET_ALL_DOGS, payload: getDogie.data});
            
        } catch (error) {
            return dispatch({type: ERROR, error});
        }
    }
}

export const getTemperaments = () => {
    return async function(dispatch){
        try {

            const getTemper = await axios('http://localhost:3001/temperaments');
            return dispatch({type: GET_ALL_TEMPERAMENTS, payload: getTemper.data});

        } catch (error) {
            return dispatch({type: ERROR, error});
        }
    }
}

export const loadData = async (dispatch) => {
    await Promise.all([
        dispatch(getDogs()),
        dispatch(getTemperaments())
        
    ]);

    return dispatch(applyFilters());
}


// ------------- ACTIONS PARA EL HOME -------------
// export const filterTemperaments = (temperament) => { 
//     return {type: FILTER_TEMPERAMENTS, payload: temperament}
// }

// export const filterBreed = (breed) => {
//     return {type: FILTER_BREED, payload: breed}    
// }

// export const orderByName = (payload) => {
//     return {type: ORDER_BY_NAME, payload }
// }

// export const orderByWeight = (payload) => {
//     return {type: ORDER_BY_WEIGHT, payload}
// }

export const applyFilters = (payload) => {
    return { type: APPLY_FILTERS, payload }
}

export const setFilter = (payload) => {
    return { type: SET_FILTER, payload }
}


// ------------- ACTIONS PARA EL FROMULARIO -------------
export const createDog = (payload) => { // {...}
    return async function(dispatch) {
        try {
            
            const postDog = await axios.post('http://localhost:3001/dogs', payload); // {...}
            return dispatch({type: CREATE_DOG, payload: postDog.data.payload})

        } catch (error) {
            return dispatch({type: ERROR, error});
        }
    }
}


// ------------- ACTIONS PARA EL DETAIL -------------
export const getDetail = (id) => {
    return async function(dispatch){
        try {
            
            const getDogDetail = await axios(`http://localhost:3001/dogs/${id}`)
            return dispatch({type: SHOW_DOG_DETAIL, payload: getDogDetail.data})
            
        } catch (error) {
            return dispatch({type: ERROR, error});
        }
    }
}

// ------------- ACTIONS PARA EL ELIMINAR -------------
export const deleteDog = (id) => {
    return async function(dispatch){
        const deletedDog = await axios.delete(`http://localhost:3001/dogs/${id}`)
        return dispatch({type: DELETE_DOG, payload: deletedDog.data})
    }
}


export const searchByName = (name) => {
    return async function(dispatch) {
        try {
            const searched = await axios(`http://localhost:3001/dogs?name=${name}`)
            console.log(name) 
            return dispatch({type: SEARCH_BY_NAME, payload: searched.data})
        } catch (error) {
            return dispatch({type: ERROR, error});
        }
    }
}

// ------------- ACTIONS PARA LIMPIAR -------------
export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
}

export const selectInfo = (source) => {
    return async function (dispatch) {
        const info = await axios(`http://localhost:3001/dogs?source=${source}`)
        return dispatch({type: DESDE_TODOS, payload: info.data})
    }
}


