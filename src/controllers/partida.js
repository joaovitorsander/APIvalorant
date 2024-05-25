const { validateNewPartida } = require('../validates/partida');
const partidaService = require('../services/partida');

const newPartida = async (req, res, next) => {
    const errors = validateNewPartida(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await partidaService.newPartida(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getPartida = async (req, res, next) => {
    try {
        const retorno = await partidaService.getPartida();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchPartida = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await partidaService.patchPartida(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deletePartida = async (req, res, next) => {
    try {
        await partidaService.deletePartida(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newPartida = newPartida
module.exports.getPartida = getPartida
module.exports.patchPartida= patchPartida
module.exports.deletePartida = deletePartida