const { validateNewMap, checkNameMapExists } = require('../validates/mapa');
const mapaService = require('../services/mapa');

const newMap = async (req, res, next) => {
    const errors = validateNewMap(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    
    try {
        const retorno = await mapaService.newMap(req.body);
        res.status(201).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const getMap = async (req, res, next) => {
    try {
        const retorno = await mapaService.getMap();
        res.status(200).json(retorno);
    } catch (err) {
        res.status(500).send(err.message)
    }
};

const patchMap = async (req, res, next) => {
    try {
        const params = req.body;
        const mapaId = req.params.id;

        const mapaExists = await mapaService.checkMapExistsById(mapaId);
        if (!mapaExists) {
            return res.status(404).json({ message: 'Mapa não encontrado' });
        }

        if (params.nome_do_mapa) {
            const nameMapExists = await checkNameMapExists(params.nome_do_mapa);
            if (nameMapExists) {
                return res.status(400).json({ errors: ['O nome do mapa já está em uso'] });
            }
        }

        params.id = mapaId; 

        const updatedMap = await mapaService.patchMap(params);
        res.status(200).json(updatedMap);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteMap = async (req, res, next) => {
    try {
        const mapId = req.params.id;

        const mapExists = await mapaService.checkMapExistsById(mapId);
        if (!mapExists) {
            return res.status(404).json({ message: 'Mapa não encontrado' });
        }

        await mapaService.deleteMap({ id: mapId });

        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.newMap = newMap
module.exports.getMap = getMap
module.exports.patchMap = patchMap
module.exports.deleteMap = deleteMap