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
         
        //  entity.temperament = data.temperament.split(',').map(s => s.trim());

         return entity;
     })

     return filteredData;
 };

 const getFromDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //atributos que quiero traer del modelo Temperament, el id lo trae automatico
            through: {
                attributes: [],//traer mediante los atributos del modelo
            },
        }
    })
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





const getByQuery = async (name) => {
    const dogsApi = await getApiInfo();
    const dogsDb = await Dog.findAll()
    let allDogs = [...dogsApi, ...dogsDb]

    if(name) {
        let getFoundDb = await Dog.findAll();
        getFoundDb = getFoundDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        const rejex = new RegExp('(' + name + ')', 'gi'); // rejex = metodo para string
        const dogFound = await dogsApi.filter(({ name }) => name.match(rejex));
        // allDogs = allDogs.filter(d => d.name.toLowerCase() === name.toLowerCase())
        return [...dogFound, ...getFoundDb];
    } else return allDogs
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
            temperament} = body;
    const height = `${min_height}-${max_height}`;
        const weight = `${min_weight}-${max_weight}`;
        const life_span = `${min_life_span}-${max_life_span}`;
        const id = (await getMaxId()) + 1;

        // hacer validacion 
        if(!name || !height || !weight || !life_span) throw new Error('Fields are missing')
        else {
            const createDog = await Dog.create({
                id,
                name,
                height,
                weight,
                life_span,
            });


            const findTemperament = await Temperament.findAll({
                where: {name: temperament}
            });
            createDog.addTemperament(findTemperament);
            
            return createDog
        }
}

module.exports = {
    getApiInfo,
    getByQuery,
    postedDog,
    getAll
}