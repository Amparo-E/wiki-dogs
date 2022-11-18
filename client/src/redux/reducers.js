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

// dogs para todo
// tmeperaments para todo
// dogDetail solo para el detail

const initialState = {
    dogs: [], //siempre lleno no lo modifico
    temperaments: [],
    dogFiltered: [], //lo modifico segun la accion [{}{}{}{}{}{}{}{}{}{}{}{}{}{}...]
    dogDetail: {},
    succes: {}
}

const rootReducer = (state= initialState, action) => {
    let allDogs = state.dogs;
    let dogFiltered = state.dogFiltered

    switch (action.type) {
        case GET_ALL_DOGS:
            return {...state, dogs: action.payload, dogFiltered: action.payload};

        case GET_ALL_TEMPERAMENTS:
            return {...state, temperaments: action.payload};



        case SEARCH_BY_NAME:
            // if(!action.payload.length){
            //      alert('No existe tal perro')
            //      return {...state, dogFiltered}
            //     }
            // else 
            console.log(action.payload) 
            return {...state, dogFiltered: action.payload};
            



        case FILTER_TEMPERAMENTS:
            const filteredTemp = action.payload === 'All' 
            ? allDogs 
            : allDogs.filter(el => el.temperament?.includes(action.payload))
            return {...state, dogFiltered: filteredTemp};

        case FILTER_BREED: 
            const filteredBreed = action.payload === 'All' 
            ? allDogs 
            : allDogs.filter(el => el.name?.includes(action.payload));
            return {...state, dogFiltered: filteredBreed};




        case ORDER_BY_NAME:
            const sortedByName = action.payload === 'A-Z' 
            ? allDogs.sort((a, b) => {
                if(a.name.toUpperCase() > b.name.toUpperCase()) return 1
                if(a.name.toUpperCase() < b.name.toUpperCase()) return -1
                return 0
              }) 
            : allDogs.sort((a, b) => {
                if(a.name.toUpperCase() < b.name.toUpperCase()) return 1
                if(a.name.toUpperCase() > b.name.toUpperCase())return -1
                return 0
              })
            return {...state, dogFiltered: sortedByName}




        case ORDER_BY_WEIGHT: 
            const sortedByWeight = action.payload === 'MIN-MAX' 
            ? allDogs.sort((a, b) => parseInt(a.weight) - parseInt(b.weight)) 
            : allDogs.sort((a, b) => parseInt(b.weight) - parseInt(a.weight))
            return {...state, dogs: sortedByWeight}

        case SHOW_DOG_DETAIL:
            return {...state, dogDetail: action.payload}
        
        case CREATE_DOG:
            return {...state, dogs: [...state.dogs, action.payload], succes: action.payload}

        case DELETE_DOG:
            const deleteDogs = allDogs.filter(dog => dog.id !== action.payload)
            return {...state, dogs: deleteDogs}

        default:
            return {...state};
    }
}

export default rootReducer;