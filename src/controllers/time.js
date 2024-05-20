const { validateNewTeam } = require('../validates/time');
const teamService = require('../services/time');

const newTeam = async (req, res, next) => {
    const errors = validateNewTeam(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await teamService.newTeam(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getTeam = async (req, res, next) => {
    try {
        const retorno = await teamService.getTeam();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchTeam = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await teamService.patchTeam(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deleteTeam = async (req, res, next) => {
    try {
        await teamService.deleteTeam(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newTeam = newTeam
module.exports.getTeam = getTeam
module.exports.patchTeam = patchTeam
module.exports.deleteTeam = deleteTeam