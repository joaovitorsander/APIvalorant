const jogadoresTimesService = require('../services/jogadoresTimes');
const {validateNewJogadorTime} = require('../validates/jogadoresTimes');

const newJogadoresTimes = async (req, res, next) => {
    const errors = validateNewJogadorTime(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await jogadoresTimesService.newJogadorTime(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        if (err.message === 'Jogador não encontrado' || err.message === 'Time não encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }   
};

const getJogadoresTimes = async (req, res, next) => {
    try {
        const retorno = await jogadoresTimesService.getJogadorTime();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchJogadoresTimes = async (req, res, next) => {
    try {
        let params = req.body;
        params.id = req.params.id;
        const ret = await jogadoresTimesService.patchJogadorTime(params);
        res.status(200).send(ret);
    } catch (err) {
        if (err.message === 'Jogador não encontrado' || err.message === 'Time não encontrado' || err.message === 'Registro não encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

const deleteJogadoresTimes = async (req, res, next) => {
    try {
        await jogadoresTimesService.deleteJogadorTime(req.params);
        res.status(204).send();
    } catch (err) {
        if (err.message === 'Registro não encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

module.exports.newJogadoresTimes = newJogadoresTimes;
module.exports.getJogadoresTimes = getJogadoresTimes;
module.exports.patchJogadoresTimes = patchJogadoresTimes;
module.exports.deleteJogadoresTimes = deleteJogadoresTimes;
