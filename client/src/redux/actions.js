import {
    ERROR,
    GET_ALL_DOGS,
    GET_ALL_TEMPERAMENTS,
    CREATE_DOG,
    DELETE_DOG,
    PUT_DOG,
    SHOW_DOG_DETAIL,
    SEARCH_BY_NAME,
    CLEAN_DETAIL,
    FROM_ALL,
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



export const applyFilters = () => {
    return { type: APPLY_FILTERS }
}

export const setFilter = (payload) => {
    return { type: SET_FILTER, payload }
}

export const createDog = (payload) => { 
    return async function(dispatch) {
        try {            
            const postDog = await axios.post('http://localhost:3001/dogs', payload); 
            return dispatch({type: CREATE_DOG, payload: postDog.data.payload})

        } catch (error) {
            return dispatch({type: ERROR, error: error.response.data.message});
        }
    }
}

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

export const deleteDog = (id) => {
    return async function(dispatch){
        const deletedDog = await axios.delete(`http://localhost:3001/dogs/${id}`)
        return dispatch({type: DELETE_DOG, payload: deletedDog.data})
    }
}

export const putDog = (id, info) => {
    return async function(dispatch) {
        const putedDog = await axios.put(`http://localhost:3001/dogs/${id}`, info)
        return dispatch({type: PUT_DOG, payload: putedDog.data})
    }
}

export const searchByName = (name) => {
    return async function(dispatch) {
        try {
            const searched = await axios(`http://localhost:3001/dogs?name=${name}`);            
            return dispatch({type: SEARCH_BY_NAME, payload: searched.data})
        } catch (error) {
            return dispatch({type: ERROR, error: error.code === 'ERR_BAD_REQUEST' ? `No items found for the search term ${name}`: error.message});
        }
    }
}

export const cleanDetail = () => {
    return {type: CLEAN_DETAIL}
}

export const selectInfo = (source) => {
    return async function (dispatch) {
        const info = await axios(`http://localhost:3001/dogs?source=${source}`)
        return dispatch({type: FROM_ALL, payload: info.data})
    }
}

export const setErrorMessage = (payload) => {
    return {type: ERROR, payload};
}
