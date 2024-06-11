const validateNewStatsJogador = (statsJogadorData) => {
    const errors = [];

    if (!statsJogadorData.jog_id) {
        errors.push('O código do jogador é obrigatório');
    } 

    if (!statsJogadorData.partida_id) {
        errors.push('O código da partida é obrigatória');
    }

    if (!statsJogadorData.agente_id) {
        errors.push('O código do agente é obrigatório');
    }

    return errors;
};

module.exports = {
    validateNewStatsJogador
};
