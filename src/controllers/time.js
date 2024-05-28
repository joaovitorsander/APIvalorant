const { validateNewTeam } = require('../validates/time');
const { checkTeamNameExists } = require('../validates/time')
const teamService = require('../services/time');

const newTeam = async (req, res, next) => {
    const teamNameExists = await checkTeamNameExists(req.body.nome_time);
    if (teamNameExists) {
        return res.status(400).json({ errors: ['O nome do time já está em uso'] });
    }

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
        const params = req.body; 
        const teamId = req.params.id; 

        const teamExists = await teamService.checkTeamExistsById(teamId);
        if (!teamExists) {
            return res.status(404).json({ message: 'Time não encontrado' });
        }

        if (params.nome_time) {
            const teamNameExists = await checkTeamNameExists(params.nome_time);
            if (teamNameExists) {
                return res.status(400).json({ errors: ['O nome do time já está em uso'] });
            }
        }

        params.id = teamId;

        const result = await teamService.patchTeam(params);
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


const deleteTeam = async (req, res, next) => {
    try {
        const teamId = req.params.id;

        const teamExists = await teamService.checkTeamExistsById(teamId);
        if (!teamExists) {
            return res.status(404).json({ message: 'Time não encontrado' });
        }

        const result = await teamService.deleteTeam({ id: teamId });

        res.status(204).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports.newTeam = newTeam
module.exports.getTeam = getTeam
module.exports.patchTeam = patchTeam
module.exports.deleteTeam = deleteTeam