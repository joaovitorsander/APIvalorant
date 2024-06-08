const db = require('../configs/pg')

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

    if (mapData.map_pool == nul) {
        errors.push('Deve ser inserido se o mapa estão no map pool ou não, 0-Não, 1-Sim');
    }

    return errors;
};

const checkNameMapExists = async (nome_do_mapa) => {
    const result = await db.query('SELECT 1 FROM mapas WHERE nome_do_mapa = $1', [nome_do_mapa]);
    return result.rows.length > 0;
};

module.exports = {
    validateNewMap,
    checkNameMapExists
};
