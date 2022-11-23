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
    
    if( input.min_height <= 0) error.min_height = 'the dog cannot have a height less than 0';
    if( input.max_height > 120) error.max_height = 'the dog cannot be taller than 120cm';   
    if(input.max_height < input.min_height) error.max_height = 'The max height cannot be less than the min height';
    if(isNaN(input.min_height) || isNaN(input.max_height)) error.min_height = 'The age should be a number. Example "10-12"';

    if( input.min_weight <= 0) error.min_weight = 'the dog cannot have a height less than 0';
    if( input.max_weight > 120) error.max_weight = 'the dog cannot be taller than 120cm';   
    if(input.max_weight < input.min_weight) error.max_height = 'The max height cannot be less than the min height';
    if(isNaN(input.min_weight) || isNaN(input.max_weight)) error.min_height = 'The age should be a number. Example "10-12"';

    if( input.min_life_span <= 0) error.min_weight = 'the dog cannot have a life less than 0';
    if( input.max_life_span > 30) error.max_weight = 'the dog cannot have a life taller than 30';   
    if(input.max_life_span < input.min_life_span) error.max_height = 'The max height cannot be less than the min height';
    if(isNaN(input.min_life_span) || isNaN(input.max_life_span)) error.min_height = 'The age should be a number. Example "10-12"';
    
    if(input.image !== '') {
        try {
            const url = new URL(input.image);            
        } catch(er) {
            error.image = 'There was a problem getting the image';   
        }
    }

    return error
}