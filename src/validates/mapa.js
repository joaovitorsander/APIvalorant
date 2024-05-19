const validateNewMapa = (mapData) => {
    const errors = [];

    if (!mapData.nome_do_mapa) {
        errors.push('O nome do mapa é obrigatório');
    } 

    if (!mapData.descricao) {
        errors.push('A descrição do mapa é obrigatório');
    }

    if (!mapData.data_lancamento) {
        errors.push('A data de lançamento do mapa é obrigatório');
    }

    if (!mapData.map_pool) {
        errors.push('Map pool é obrigatório');
    }

    return errors;
};

module.exports = {
    validateNewMapa
};