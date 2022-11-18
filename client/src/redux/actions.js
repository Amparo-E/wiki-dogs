import {
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    FILTER_TEMPERAMENTS,
    FILTER_BREED,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    CREATE_DOG,
    DELETE_DOG,
    SHOW_DOG_DETAIL,
    SEARCH_BY_NAME
} from './types';
import axios from 'axios';




// ------------- ACTIONS PARA TODO USO -------------
export const getDogs = () => {
    return async function(dispatch){
        const getDogie = await axios('http://localhost:3001/dogs');
        return dispatch({type: GET_ALL_DOGS, payload: getDogie.data});
    }
}

export const getTemperaments = () => {
    return async function(dispatch){
        const getTemper = await axios('http://localhost:3001/temperaments');
        return dispatch({type: GET_ALL_TEMPERAMENTS, payload: getTemper.data});
    }
}


// ------------- ACTIONS PARA EL HOME -------------
export const filterTemperaments = (temperament) => { 
    return {type: FILTER_TEMPERAMENTS, payload: temperament}
}

export const filterBreed = (breed) => {
        return {type: FILTER_BREED, payload: breed}
    
}

export const orderByName = (payload) => {
    return {type: ORDER_BY_NAME, payload}
}

export const orderByWeight = (payload) => {
    return {type: ORDER_BY_WEIGHT, payload}
}


// ------------- ACTIONS PARA EL FROMULARIO -------------
export const createDog = (payload) => { // {...}
    return async function(dispatch) {
        const postDog = await axios.post('http://localhost:3001/dogs', payload); // {...}
        return dispatch({type: CREATE_DOG, payload: postDog.data.payload})
    }
}


// ------------- ACTIONS PARA EL DETAIL -------------
export const getDetail = (id) => {
    return async function(dispatch){
        const getDogDetail = await axios(`http://localhost:3001/dogs/${id}`)
        return dispatch({type: SHOW_DOG_DETAIL, payload: getDogDetail.data})
    }
}

// ------------- ACTIONS PARA EL ELIMINAR -------------
export const deleteDog = (id) => {
    return {type: DELETE_DOG, payload: id}
}


export const searchByName = (name) => {
    return async function(dispatch) {
        try {
            const searched = await axios(`http://localhost:3001/dogs?name=${name}`)
            console.log(name) 
            return dispatch({type: SEARCH_BY_NAME, payload: searched.data})
        } catch (error) {
            return error.message
        }
    }
}