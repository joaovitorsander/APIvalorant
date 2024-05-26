const { validateUser } = require('../validates/usuario');
const { checkNickExists } = require('../validates/usuario')
const usuarioService = require('../services/usuario');

const newUser = async (req, res, next) => {
    const nickExists = await checkNickExists(req.body.nick_usuario);
    if (nickExists) {
        return res.status(400).json({ errors: ['O nick do usuário já está em uso'] });
    }
    
    const errors = validateUser(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

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
        let params = req.body;
        params.id = req.params.id;

        const nickExists = await checkNickExists(req.body.nick_usuario);
        if (nickExists) {
            return res.status(400).json({ errors: ['O nick do usuário já está em uso'] });
        }

        const result = await usuarioService.patchUser(params);
        if (result === null) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const result = await usuarioService.deleteUser({ id: req.params.id });
        if (result === null) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(204).send(); 
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.patchUser = patchUser
module.exports.deleteUser = deleteUser