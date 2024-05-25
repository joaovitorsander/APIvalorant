const validateNewStatsJogador = (statsJogadorData) => {
    const errors = [];

    if (!statsJogadorData.jogador) {
        errors.push('O código do jogador é obrigatório');
    } 

    if (!statsJogadorData.partida) {
        errors.push('O código da partida é obrigatória');
    }

    if (!statsJogadorData.agente) {
        errors.push('O código do agente é obrigatório');
    }

    if (!statsJogadorData.kills) {
        errors.push('A quantidade de kills é obrigatória');
    }

    if (!statsJogadorData.mortes) {
        errors.push('A quantidade de mortes é obrigatória');
    }

    if (!statsJogadorData.assistencias) {
        errors.push('A quantidade de assistências é obrigatória');
    }

    if (!statsJogadorData.plants) {
        errors.push('A quantidade de plants é obrigatória');
    }

    if (!statsJogadorData.defuses) {
        errors.push('A quantidade de defuses é obrigatória');
    }

    return errors;
};

module.exports = {
    validateNewStatsJogador
};
