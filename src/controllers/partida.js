const partidasService = require('../services/partida');
const { validateNewPartida } = require('../validates/partida');

const newPartida = async (req, res, next) => {
    const errors = validateNewPartida(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await partidasService.newPartida(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        if (err.code === 404 || err.message.includes('não encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }   
};

const getPartidas = async (req, res, next) => {
    try {
        const retorno = await partidasService.getPartidas();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchPartida = async (req, res, next) => {
    try {
        let params = req.body;
        params.id = req.params.id;
        const ret = await partidasService.patchPartida(params);
        res.status(200).send(ret);
    } catch (err) {
        if (err.code === 404 || err.message.includes('não encontrada') || err.message.includes('Time 1 não encontrado') || err.message.includes('Time 2 não encontrado')) {
            return res.status(404).json({ error: err.message });
        } else if (err.message === 'Nenhum campo válido para atualizar') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};


const deletePartida = async (req, res, next) => {
    try {
        await partidasService.deletePartida(req.params);
        res.status(204).send();
    } catch (err) {
        if (err.message === 'Partida não encontrada') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

module.exports.newPartida = newPartida;
module.exports.getPartidas = getPartidas;
module.exports.patchPartida = patchPartida;
module.exports.deletePartida = deletePartida;
