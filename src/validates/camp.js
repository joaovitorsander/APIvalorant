const validateNewCamp = (campData) => {
    const errors = [];

    if (!campData.time) {
        errors.push('O código do time é obrigatório');
    } 

    if (!campData.premiacao) {
        errors.push('A premiação do campeonato é obrigatória');
    }

    if (!campData.organizacao) {
        errors.push('A organização do campeonato é obrigatória');
    }

    if (!campData.nome) {
        errors.push('O nome do campeonato é obrigatório');
    }

    if (!campData.edicao) {
        errors.push('A edição do campeonato é obrigatória');
    }

    if (!campData.formato) {
        errors.push('O formato do campeonato é obrigatório');
    }

    if (!campData.DataInicio) {
        errors.push('A data de início do campeonato é obrigatória');
    }

    return errors;
};

module.exports = {
    validateNewCamp
};
