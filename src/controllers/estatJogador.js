const { validateNewStatsJogador } = require('../validates/estatJogador');
const estatJogadorService = require('../services/estatJogador');

const newStatJogador = async (req, res, next) => {
    const errors = validateNewStatsJogador(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await estatJogadorService.newStatJogador(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getStatJogador = async (req, res, next) => {
    try {
        const retorno = await estatJogadorService.getStatJogador();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchStatJogador = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await estatJogadorService.patchStatJogador(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deleteStatJogador = async (req, res, next) => {
    try {
        await estatJogadorService.deleteStatJogador(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newStatJogador = newStatJogador
module.exports.getStatJogador = getStatJogador
module.exports.patchStatJogador = patchStatJogador
module.exports.deleteStatJogador = deleteStatJogador