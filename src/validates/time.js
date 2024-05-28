const db = require('../configs/pg')

const validateNewTeam = (teamData) => {
    const errors = [];

    if (!teamData.nome_time) {
        errors.push('O nome do time é obrigatório');
    } 

    if (!teamData.sigla_time) {
        errors.push('A sigla do time é obrigatória');
    }

    return errors;
};

const checkTeamNameExists = async (teamName) => {
    const result = await db.query('SELECT 1 FROM Times WHERE nome_time = $1', [teamName]);
    return result.rows.length > 0;
};

module.exports = {
    validateNewTeam,
    checkTeamNameExists
};
