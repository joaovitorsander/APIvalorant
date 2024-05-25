const validateNewJogadorTime = (campData) => {
    const errors = [];

    if (!campData.jogador) {
        errors.push('O código do jogador é obrigatório');
    } 

    if (!campData.time) {
        errors.push('O código do time é obrigatório');
    }

    if (!campData.dataAssociacao) {
        errors.push('A data de associação no time é obrigatória');
    }

    if (!campData.funcao) {
        errors.push('A função do jogador no time é obrigatória');
    }

    if (!campData.situacao) {
        errors.push('A situação do jogador no time é obrigatório');
    }

    if (!campData.reserva) {
        errors.push('Deve ser inserido se o usuário é reserva ou não');
    }

    return errors;
};

module.exports = {
    validateNewJogadorTime
};
