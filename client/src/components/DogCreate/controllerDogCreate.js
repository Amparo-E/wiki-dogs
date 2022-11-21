

export const validate = async (input) => {
    const error = {}

    if(!input.name.length) error.name = 'The dog should have a name';
    if(!isNaN(input.name)) error.name = 'Please use A-Z characters.'
    if(!input.min_height.length) error.min_height = 'The dog should have a min height';
    if(!input.max_height.length) error.max_height = 'The dog should have a max height';
    if(!input.min_weight.length) error.min_weight = 'The dog should have a min weight';
    if(!input.max_weight.length) error.max_weight = 'The dog should have a max weight';
    if(!input.min_life_span.length) error.min_life_span = 'The dog should have a min year';
    if(!input.max_life_span.length) error.max_life_span = 'The dog should have a max year';
    if(isNaN(input.min_height)) error.min_height = 'The dog height shoul be a number. Example "10-12"'
    
    if( input.min_height <= 0) error.min_height = 'the dog cannot have a height less than 0';
    if( input.max_height > 120) error.max_height = 'the dog cannot be taller than 120cm';   
    if(isNaN(input.min_height) || isNaN(input.max_height)) error.min_height = 'The age should be a number';

    if( input.min_height <= 0) error.min_height = 'the dog cannot have a height less than 0';
    if( input.max_height > 120) error.max_height = 'the dog cannot be taller than 120cm';   
    if(isNaN(input.min_height) || isNaN(input.max_height)) error.min_height = 'The age should be a number';
    
    if(input.image !== '') {
        try {
            const url = new URL(input.image);            
        } catch(er) {
            error.image = 'There was a problem getting the image'       
        }
    }
    
    return error
}