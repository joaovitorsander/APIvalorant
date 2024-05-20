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

module.exports = {
    validateNewTeam
};
