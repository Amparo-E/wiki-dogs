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

// dogs para todo
// tmeperaments para todo
// dogDetail solo para el detail

const initialState = {
    dogs: [], 
    temperaments: [],
    dogFiltered: [],
    dogsFromSource: [],
    dogDetail: {},
    error: {},
    filters: {
        temperament: '',
        breed: '',
        order: 'A-Z'
    }
}

const rootReducer = (state = initialState, action) => {
    let allDogs = state.dogs;

    switch (action.type) {
        case ERROR: 
        return {...state, error: action.error}
        case GET_ALL_DOGS:
            return {...state, dogs: action.payload, dogFiltered: action.payload, dogsFromSource: action.payload };
        case GET_ALL_TEMPERAMENTS:
            return {...state, temperaments: action.payload};
        case SEARCH_BY_NAME:
            return {...state, dogFiltered: action.payload};
            
        case SET_FILTER:
            let value = action.payload;
            let filters = {};

            Object.assign(filters, state.filters);

            filters[value.name] = value.value;

            return {...state, filters: filters };    

        case APPLY_FILTERS:            
            let filteredDogs = [...state.dogsFromSource];

            for(const prop of Object.keys(state.filters)) {
                const value = state.filters[prop];

                switch(prop) {
                    case 'temperament':
                        filteredDogs = value === '' ? filteredDogs : filteredDogs.filter(d => d.temperament?.includes(value));
                        break;
                    case 'breed':
                        filteredDogs = value === '' ? filteredDogs : filteredDogs.filter(d => d.name?.includes(value));
                        break;                    
                }
            }

            switch(state.filters.order) {
                case 'A-Z':
                case 'Z-A':
                    filteredDogs = state.filters.order === 'A-Z'
                    ? filteredDogs.sort((a, b) => {
                        if(a.name.toUpperCase() > b.name.toUpperCase()) return 1
                        if(a.name.toUpperCase() < b.name.toUpperCase()) return -1
                        return 0
                      })
                    : filteredDogs.sort((a, b) => {
                        if(a.name.toUpperCase() < b.name.toUpperCase()) return 1
                        if(a.name.toUpperCase() > b.name.toUpperCase())return -1
                        return 0
                      });
                    break;
                case 'MIN-MAX':
                case 'MAX-MIN':
                    // filteredDogs = filteredDogs.sort((a, b) => {
                    //     a = a.weight.split(' - ')
                    //     b = b.weight.split(' - ')

                    //     const left = (a[0] + a[1]) / 2;
                    //     const right = (b[0] + b[1]) / 2;

                    //     return state.filters.order === 'MIN-MAX' ? left > right : right > left;
                    // });

                    filteredDogs = state.filters.order === 'MIN-MAX' 
                    ? filteredDogs.sort((a, b) => {
                        a = a.weight.split(' - ')
                        b = b.weight.split(' - ')
                        // return (a[0] + a[1]) / 2 - (b[0] + b[1]) / 2;
                        return a[1] - b[1]
                    }) 
                    : filteredDogs.sort((a, b) => {
                        a = a.weight.split(' - ')
                        b = b.weight.split(' - ')
                        return b[1] - a[1];
                    });
                    break;
            }        

            return { ...state, dogFiltered: filteredDogs }

        case SHOW_DOG_DETAIL:
            return {...state, dogDetail: action.payload};
        
        case CREATE_DOG:
            return {...state, dogs: [...state.dogs, action.payload]};

        case DELETE_DOG:
            const deleteDogs = allDogs.filter(dog => dog.id !== action.payload);
            return {...state, dogs: deleteDogs};

        case CLEAN_DETAIL:
            return {...state, dogDetail: {}}
        
        case DESDE_TODOS:
            if(action.payload === 'All') return {...state, dogsFromSource: state.dogs}
            else return {...state, dogsFromSource: action.payload}            
        default:
            return {...state};
    }
}

export default rootReducer;