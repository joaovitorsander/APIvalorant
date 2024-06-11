const estatisticasService = require('../services/estatJogador');
const { validateNewStatsJogador } = require('../validates/estatJogador');

const newEstatistica = async (req, res, next) => {
    const errors = validateNewStatsJogador(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await estatisticasService.newEstatistica(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        if (err.code === 404 || err.message.includes('não encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }   
};

const getEstatisticas = async (req, res, next) => {
    try {
        const retorno = await estatisticasService.getEstatisticas();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchEstatistica = async (req, res, next) => {
    try {
        let params = req.body;
        params.id = req.params.id;
        const ret = await estatisticasService.patchEstatistica(params);
        res.status(200).send(ret);
    } catch (err) {
        if (err.code === 404 || err.message.includes('não encontrada') || err.message.includes('Jogador não encontrado') || err.message.includes('Partida não encontrada') || err.message.includes('Agente não encontrado')) {
            return res.status(404).json({ error: err.message });
        } else if (err.message === 'Nenhum campo válido para atualizar') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

const deleteEstatistica = async (req, res, next) => {
    try {
        await estatisticasService.deleteEstatistica(req.params);
        res.status(204).send();
    } catch (err) {
        if (err.code === 404 || err.message.includes('Estatística não encontrada')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).send(err.message);
    }
};

module.exports.newEstatistica = newEstatistica;
module.exports.getEstatisticas = getEstatisticas;
module.exports.patchEstatistica = patchEstatistica;
module.exports.deleteEstatistica = deleteEstatistica;
