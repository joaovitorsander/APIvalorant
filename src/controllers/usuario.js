const { validateNewUser } = require('../validates/usuario');
const usuarioService = require('../services/usuario');

const newUser = async (req, res, next) => {
    const errors = validateNewUser(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    console.log("Dados recebidos no body:", req.body);

    try {
        const retorno = await usuarioService.newUser(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getUser = async (req, res, next) => {
    try {
        const retorno = await usuarioService.getUser();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchUser = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await usuarioService.patchUser(params)
        .then(ret => res.status(200).send(ret))
        .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await usuarioService.deleteUser(req.params);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message)
    }
};

module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.patchUser = patchUser
module.exports.deleteUser = deleteUser