const { validateNewJogadoresTimes } = require('../validates/jogadoresTimes');
const jogadoresTimesService = require('../services/jogadoresTimes');

const newJogadoresTimes = async (req, res, next) => {
    const errors = validateNewJogadoresTimes(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await jogadoresTimesService.newJogadoresTimes(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }   
};

const getJogadoresTimes = async (req, res, next) => {
    try {
        const retorno = await jogadoresTimesService.getJogadoresTimes();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchJogadoresTimes = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await jogadoresTimesService.patchJogadoresTimes(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deleteJogadoresTimes = async (req, res, next) => {
    try {
        await jogadoresTimesService.deleteJogadoresTimes(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newJogadoresTimes = newJogadoresTimes
module.exports.getJogadoresTimes = getJogadoresTimes
module.exports.patchJogadoresTimes= patchJogadoresTimes
module.exports.deleteJogadoresTimes = deleteJogadoresTimes