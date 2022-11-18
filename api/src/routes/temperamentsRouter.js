const { Router } = require('express')
const {Dog, Temperament} = require('../db')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await Temperament.findAll();
    res.status(200).send(data)
    } catch (error) {
        res.status(404).send('temperament not found')
    }
    
})


module.exports = router;