const validateNewMap = (mapData) => {
    const errors = [];

    if (!mapData.nome_do_mapa) {
        errors.push('O nome do mapa é obrigatório');
    } 

    if (!mapData.descricao) {
        errors.push('A descrição do mapa é obrigatório');
    }

    if (!mapData.data_lancamento) {
        errors.push('A data de lançamento do mapa é obrigatória');
    } else {
        const [day, month, year] = mapData.data_lancamento.split('/').map(Number);
        const date = new Date(`${year}-${month}-${day}`);
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            errors.push('A data de lançamento do mapa é inválida');
        }
    }

    if (!mapData.map_pool) {
        errors.push('Map pool é obrigatório');
    }

    return errors;
};

module.exports = {
    validateNewMap
};
