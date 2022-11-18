const { Router } = require('express');
const {Dog, Temperament} = require('../db');
const { Op } = require('sequelize');
const {getByQuery, postedDog, getApiInfo, getAll} = require('../controllers/controllerDogs')

const router = Router();

router.get('/', async (req, res) => {  
    try {
        
        const { name } = req.query;

        const dogie = await getByQuery(name)
        res.status(200).send(dogie);

    } catch (error) {

        res.status(400).send(error.message)

    } 
     
})

router.get('/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params;
        const dog = await getAll()
        let findDog = dog.find(d => d.id === parseInt(idRaza))
        // if(!findDog) { findDog = await Dog.findOne({ where : { id }}) }

        res.status(200).send(findDog)
        // const findDog = await Dog.findByPk(idRaza, {include : Temperament})
        // findDog
        // ? res.status(200).send(findDog)
        // : res.status(404).send("id no encontrado");
    } catch (error) {
        res.status(404).send(error.message)
    }

});

router.post('/', async (req, res) => {
    try {
        const result = await postedDog(req.body)

        return res.status(201).send({
            status: 'created',
            payload: result
        });
        
    } catch (error) {
        res.status(404).send(error.message)
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let dog = await getAll();
        dog = dog.filter(d => d.id !== parseInt(id))
        // await Dog.destroy({ where: { id } })
        res.status(200).send('Dog was delete')
    } catch (error) {
        res.status(404).send(error.message)
    } 
})


router.put('/:id', async (req, res) => {
    try {
        
        const { id } = req.params;
        const {name, min_height, max_height, min_weight, max_weight, max_life_span, min_life_span, temperament} = req.body;
        const dog = await getAll()
        const findDog = dog.find(d => d.id === parseInt(id))

        await Dog.update({name, min_height, max_height, min_weight, max_weight, max_life_span, min_life_span, temperament}, { where:{ id } })
        res.status(200).send('update dog')
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;