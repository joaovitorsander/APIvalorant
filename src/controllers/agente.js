const { validateNewAgent } = require('../validates/agente');
const agenteService = require('../services/agente');

const newAgent = async (req, res, next) => {
    const errors = validateNewAgent(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await agenteService.newAgent(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getAgent = async (req, res, next) => {
    try {
        const retorno = await agenteService.getAgent();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchAgent = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await agenteService.patchAgent(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deleteAgent = async (req, res, next) => {
    try {
        await agenteService.deleteAgent(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newAgent = newAgent
module.exports.getAgent = getAgent
module.exports.patchAgent = patchAgent
module.exports.deleteAgent = deleteAgent