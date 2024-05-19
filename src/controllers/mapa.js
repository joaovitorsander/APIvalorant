const { validateNewMapa } = require('../validates/mapa');
const mapaService = require('../services/mapa');

const newMap = async (req, res, next) => {
    const errors = validateNewMapa(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await mapaService.newMap(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getMap = async (req, res, next) => {
    try {
        const retorno = await mapaService.getMap();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const deleteMap = async (req, res, next) => {
    try {
        await mapaService.deleteMap(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newMap = newMap
module.exports.getMap = getMap
module.exports.deleteMap = deleteMap