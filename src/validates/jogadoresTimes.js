const validateNewJogadorTime = (jogadoresTimeData) => {
    const errors = [];

    if (!jogadoresTimeData.jogador_id) {
        errors.push('O código do jogador é obrigatório');
    } 

    if (!jogadoresTimeData.time_id) {
        errors.push('O código do time é obrigatório');
    }

    if (!jogadoresTimeData.data_associacao) {
        errors.push('A data de associação no time é obrigatória');
    }

    if (!jogadoresTimeData.funcao) {
        errors.push('A função do jogador no time é obrigatória');
    }

    if (!jogadoresTimeData.situacao) {
        errors.push('A situação do jogador no time é obrigatório');
    }

    if (jogadoresTimeData.reserva == null) {
        errors.push('Deve ser inserido se o jogador é reserva ou não, 0-Não, 1-Sim');
    }

    return errors;
};

module.exports = {
    validateNewJogadorTime
};
