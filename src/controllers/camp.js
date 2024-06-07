const { validateNewCamp } = require('../validates/camp');
const campService = require('../services/camp');

const newCamp = async (req, res, next) => {
    const errors = validateNewCamp(req.body);
    const teamId = req.body.time_id;
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const teamExists = await campService.checkTeamExistsById(teamId);
        if (!teamExists) {
            return res.status(404).json({ message: 'Time não encontrado' });
        }
        
        const retorno = await campService.newCamp(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message); 
    }
};

const getCamp = async (req, res, next) => {
    try {
        const retorno = await campService.getCamp();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const patchCamp = async (req, res, next) => {
    try {
        const params = req.body;
        const campId = req.params.id;
        params.id = campId;

        const campExists = await campService.checkCampExistsById(campId);
        if (!campExists) {
            return res.status(404).json({ message: 'Camp não encontrado' });
        }

        if (params.time_id) {
            const teamExists = await campService.checkTeamExistsById(params.time_id);
            if (!teamExists) {
                return res.status(404).json({ message: 'Time não encontrado' });
            }
        }

        const result = await campService.patchCamp(params);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteCamp = async (req, res, next) => {
    try {
        const campId = req.params.id;

        const campExists = await campService.checkCampExistsById(campId);
        if (!campExists) {
            return res.status(404).json({ message: 'Camp não encontrado' });
        }

        await campService.deleteCamp({ id: campId });
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.newCamp = newCamp;
module.exports.getCamp = getCamp;
module.exports.patchCamp = patchCamp;
module.exports.deleteCamp = deleteCamp;
