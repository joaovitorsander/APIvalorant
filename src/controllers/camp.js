const { validateNewCamp } = require('../validates/camp');
const campService = require('../services/camp');

const newCamp = async (req, res, next) => {
    const errors = validateNewCamp(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await campService.newCamp(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getCamp = async (req, res, next) => {
    try {
        const retorno = await campService.getCamp();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchCamp = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await campService.patchCamp(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deleteCamp = async (req, res, next) => {
    try {
        await campService.deleteCamp(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newCamp = newCamp
module.exports.getCamp = getCamp
module.exports.patchCamp = patchCamp
module.exports.deleteCamp = deleteCamp