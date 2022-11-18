const axios = require('axios')
const {Dog, Temperament} = require('../db')

let apiKey = 'live_FFCdYXabwlhHD0VND0xUzRa0zJTyXcvf7XxjCFSsCvvYd07s9dBt5JN0oLq0FYUI';

const getTemperament = async () => {
    const getApiInfo = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`);
    const filteredTemp = getApiInfo.data.map(el => el.temperament).toString().split(',');
   
    //  await filteredTemp
    //  .filter((t, i) => filteredTemp.indexOf(t) === i)
    //  .forEach((t) => t.trim() !== "" && Temperament.findOrCreate({
    //        where: {
    //          name: t,
    //        },
    //      })
    //  );

    const tempers = [...new Set(filteredTemp)].map(e => {
      return { name: e.trim() }
    });

  

    const created = Temperament.bulkCreate(tempers)
    return created

  //  const allTemperaments = await Temperament.findAll({ order: [["name"]] });
  //  return allTemperaments;

 }



 module.exports = {
    getTemperament
 }