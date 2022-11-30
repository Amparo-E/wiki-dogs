const axios = require('axios')
const {Dog, Temperament} = require('../db')
const { Op } = require('sequelize');
const { get } = require('superagent');

let apiKey = 'live_FFCdYXabwlhHD0VND0xUzRa0zJTyXcvf7XxjCFSsCvvYd07s9dBt5JN0oLq0FYUI';

 const getApiInfo = async () => {
     const getApiInfo = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
     const filteredData = getApiInfo.data.map(data => {
        const entity = {
            id:data.id,
            name: data.name,
            height: data.height.metric,
            weight: data.weight.metric,
            life_span: data.life_span,
            image: data.image.url,
         };

         if(!data.temperament) return entity;

         entity.temperament = data.temperament


         return entity;
     })

     return filteredData;
 };

 const getFromDb = async () => {

    const fromDb = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    })

    const dog = fromDb.map(d => {

        const dogie = d.toJSON()
    
        
        if(Array.isArray(dogie.temperaments)) {
            dogie.temperament = dogie.temperaments.map(t => t.name).join(', ');
            dogie.temperaments = undefined;
        }

        return dogie;
    })


    return dog;
};

const getAll = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getFromDb()
    return [...apiInfo, ...dbInfo]
}




const getMaxId = async () => {
    const entities = await getAll();
    return Math.max(...entities.map(x => x.id));
}





const getByQuery = async (name, source) => {
    const dogsApi = await getApiInfo();
    const dogsDb = await getFromDb();

    let allDogs;

    switch(source) {
        case 'db':
            allDogs = [...dogsDb];
            break;
        case 'api':
            allDogs = [...dogsApi];
            break;
        default: 
            allDogs = [...dogsApi, ...dogsDb]
            
    }
    
    if(name) {

        allDogs = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        if(!allDogs.length) throw new Error("The dog doesn't exist");
        return [ ...allDogs];

    } else return allDogs;
}



const getById = async (idRaza) => {
        const dog = await getAll();
        let findDog = dog.find(d => d.id === parseInt(idRaza));
        // if(!findDog) { findDog = await Dog.findOne({ where : { id }}) }
        // findDog ?  res.status(200).send(findDog) : new Error('No dog found with that id');
        if(findDog) return findDog;
        else throw new Error('No dog found with that id');
}



const postedDog = async (body) => {
    const {
            name, 
            min_height, 
            max_height, 
            min_weight, 
            max_weight, 
            min_life_span, 
            max_life_span, 
            temperament,
            image} = body;

    const height = `${min_height}-${max_height}`;
    const weight = `${min_weight}-${max_weight}`;
    const life_span = `${min_life_span}-${max_life_span}`;
    const id = (await getMaxId()) + 1;


    if(!name || !height || !weight || !life_span) throw new Error('Fields are missing');
    else {
        const createDog = await Dog.create({ 
                id,
                name,
                height,
                weight,
                life_span,
                image            
            });

        const findTemperament = await Temperament.findAll({
                where: {name: temperament}
        });

        createDog.addTemperament(findTemperament);
            
        return createDog;
    }
}


const deletedDog = async (id) => {
 
        await Dog.destroy({
            where: { id }
        })
        
}

const putDog = async (id, body) => {

        const {
            name, 
            min_height,
            max_height, 
            min_weight, 
            max_weight, 
            max_life_span, 
            min_life_span, 
            temperament
        } = body;
        await Dog.update({name, 
            min_height, 
            max_height, 
            min_weight, 
            max_weight, 
            max_life_span, 
            min_life_span, 
            temperament
        }, { 
            where: { id } 
        });
        return 'updated dog';

}
module.exports = {
    getApiInfo,
    getByQuery,
    postedDog,
    getAll,
    getById,
    deletedDog,
    putDog,
}