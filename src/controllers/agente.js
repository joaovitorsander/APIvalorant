const { validateNewAgent } = require('../validates/agente');
const { checkAgentNameExists } = require('../validates/agente')
const agenteService = require('../services/agente');

const newAgent = async (req, res, next) => {
    try {
        const agentNameExists = await checkAgentNameExists(req.body.nome_agente);
        if (agentNameExists) {
            return res.status(400).json({ errors: ['O nome do agente já está em uso'] });
        }
        
        const errors = validateNewAgent(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        
        const retorno = await agenteService.newAgent(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
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
        const params = req.body; 
        const agentId = req.params.id; 

        const agentExists = await agenteService.checkAgentExistsById(agentId);
        if (!agentExists) {
            return res.status(404).json({ message: 'Agente não encontrado' });
        }
        
        if (params.nome_agente) {
            const agentNameExists = await checkAgentNameExists(params.nome_agente);
            if (agentNameExists) {
                return res.status(400).json({ errors: ['O nome do agente já está em uso'] });
            }
        }

        params.id = agentId;

        const result = await agenteService.patchAgent(params);
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};



const deleteAgent = async (req, res, next) => {
    try {
        const agentId = req.params.id;

        const agentExists = await agenteService.checkAgentExistsById(agentId);
        if (!agentExists) {
            return res.status(404).json({ message: 'Agente não encontrado' });
        }

        const result = await agenteService.deleteAgent({ id: agentId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports.newAgent = newAgent
module.exports.getAgent = getAgent
module.exports.patchAgent = patchAgent
module.exports.deleteAgent = deleteAgent