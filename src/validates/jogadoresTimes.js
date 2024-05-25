const validateNewJogadorTime = (jogadoresTimeData) => {
    const errors = [];

    if (!jogadoresTimeData.jogador) {
        errors.push('O código do jogador é obrigatório');
    } 

    if (!jogadoresTimeData.time) {
        errors.push('O código do time é obrigatório');
    }

    if (!jogadoresTimeData.dataAssociacao) {
        errors.push('A data de associação no time é obrigatória');
    }

    if (!jogadoresTimeData.funcao) {
        errors.push('A função do jogador no time é obrigatória');
    }

    if (!jogadoresTimeData.situacao) {
        errors.push('A situação do jogador no time é obrigatório');
    }

    if (!jogadoresTimeData.reserva) {
        errors.push('Deve ser inserido se o usuário é reserva ou não');
    }

    return errors;
};

module.exports = {
    validateNewJogadorTime
};
