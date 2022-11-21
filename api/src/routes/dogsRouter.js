const { Router } = require('express');
const { Dog } = require('../db');
const {getByQuery, postedDog, getById, deletedDog, putDog} = require('../controllers/controllerDogs')

const router = Router();

router.get('/', async (req, res) => {  
    try {                
        const { name, source } = req.query;
        const dogies = await getByQuery(name, source);

        res.status(200).send(dogies);
    } catch (error) {

        res.status(400).send(error.message)

    }     
});


router.get('/:idRaza', async (req, res) => {
    try {
        const { idRaza } = req.params;
        let dog = await getById(idRaza);

        
        
        res.status(200).send(dog);
    } catch (error) {
        res.status(404).send(error.message);
    }

});


router.post('/', async (req, res) => {
    try {
        const result = await postedDog(req.body)

        return res.status(201).send(result);
        
    } catch (error) {
        res.status(404).send(error.message)
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const dog = await deletedDog(id);
    res.status(200).send(dog)

})


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateDog = await putDog(id, req.body)
        res.status(200).send(updateDog)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;