const db = require('../configs/pg')

const checkExistence = async (table, column, value) => {
    const query = `SELECT 1 FROM ${table} WHERE ${column} = $1`;
    const result = await db.query(query, [value]);
    return result.rowCount > 0;
}

const validateParams = async (params) => {
    const { mapa_id, camp_id, time_id_1, time_id_2 } = params;

    if (!await checkExistence('Mapas', 'mapa_id', mapa_id)) {
        throw new Error(`Mapa com ID ${mapa_id} não existe.`);
    }
    if (!await checkExistence('Camp', 'camp_id', camp_id)) {
        throw new Error(`Campeonato com ID ${camp_id} não existe.`);
    }
    if (!await checkExistence('Times', 'time_id', time_id_1)) {
        throw new Error(`Time com ID ${time_id_1} não existe.`);
    }
    if (!await checkExistence('Times', 'time_id', time_id_2)) {
        throw new Error(`Time com ID ${time_id_2} não existe.`);
    }
}

const sql_insert =
    `INSERT INTO Camp (mapa_id, camp_id, time_id_1, time_id_2, duracao, data_da_partida, rounds_time_1, rounds_time_2, observacao)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`

const newPartida = async (params) => {
    const { mapa_id, camp_id, time_id_1, time_id_2, duracao, data_da_partida, rounds_time_1, rounds_time_2, observacao } = params;

    try {
        await validateParams(params);
        
        const result = await db.query(sql_insert, [mapa_id, camp_id, time_id_1, time_id_2, duracao, data_da_partida, rounds_time_1, rounds_time_2, observacao]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir uma nova partida:', error);
        throw error;
    }
}

const sql_get = `SELECT duracao, data_da_partida FROM Partidas`;

const getPartida = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter a partida:', error);
        throw error;
    }
};

const sql_patch = `UPDATE Partidas SET`;

const patchPartida = async (params) => {
    
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.mapa_id) {
        countParams++;
        fields += ` mapa_id = $${countParams} `;
        binds.push(params.mapa_id);
    }
    if (params.camp_id) {
        countParams++;
        fields += (fields ? ',' : '') + ` camp_id = $${countParams} `;
        binds.push(params.camp_id);
    }
    if (params.time_id_1) {
        countParams++;
        fields += (fields ? ',' : '') + ` time_id_1 = $${countParams} `;
        binds.push(params.time_id_1);
    }
    if (params.time_id_2) {
        countParams++;
        fields += (fields ? ',' : '') + ` time_id_2 = $${countParams} `;
        binds.push(params.time_id_2);
    }
    if (params.duracao) {
        countParams++;
        fields += (fields ? ',' : '') + ` duracao = $${countParams} `;
        binds.push(params.duracao);
    }
    if (params.data_da_partida) {
        countParams++;
        fields += (fields ? ',' : '') + ` data_da_partida = $${countParams} `;
        binds.push(params.data_da_partida);
    }
    if (params.rounds_time_1) {
        countParams++;
        fields += (fields ? ',' : '') + ` rounds_time_1 = $${countParams} `;
        binds.push(params.rounds_time_1);
    }

    if (params.rounds_time_2) {
        countParams++;
        fields += (fields ? ',' : '') + ` rounds_time_2 = $${countParams} `;
        binds.push(params.rounds_time_2);
    }

    if (params.observacao) {
        countParams++;
        fields += (fields ? ',' : '') + ` observacao = $${countParams} `;
        binds.push(params.observacao);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE partida_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar a partida:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM Partidas WHERE partida_id = $1`;

const deletePartida = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar a partida:', error);
        throw error;
    }
};


module.exports.newPartida = newPartida
module.exports.getCamp = getPartida
module.exports.patchPartida = patchPartida
module.exports.deletePartida = deletePartida