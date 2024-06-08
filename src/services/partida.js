const db = require('../configs/pg');

const sql_insert = `
    INSERT INTO Partidas (mapa_id, camp_id, time_id_1, time_id_2, duracao, data_da_partida, rounds_time_1, rounds_time_2, observacao)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;

    const newPartida = async (params) => {
        const { mapa_id, camp_id, time_id_1, time_id_2, duracao, data_da_partida, rounds_time_1, rounds_time_2, observacao } = params;
    
        const time1Exists = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [time_id_1]);
        const time2Exists = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [time_id_2]);
        const mapaExists = await db.query('SELECT 1 FROM Mapas WHERE mapa_id = $1', [mapa_id]);
        const campExists = await db.query('SELECT 1 FROM Camp WHERE camp_id = $1', [camp_id]);
    
        if (time1Exists.rowCount === 0) {
            const error = new Error('Time 1 não encontrado');
            error.code = 404;
            throw error;
        }
        if (time2Exists.rowCount === 0) {
            const error = new Error('Time 2 não encontrado');
            error.code = 404;
            throw error;
        }
        if (mapaExists.rowCount === 0) {
            const error = new Error('Mapa não encontrado');
            error.code = 404;
            throw error;
        }
        if (campExists.rowCount === 0) {
            const error = new Error('Camp não encontrado');
            error.code = 404;
            throw error;
        }
    
        try {
            const result = await db.query(sql_insert, [mapa_id, camp_id, time_id_1, time_id_2, duracao, data_da_partida, rounds_time_1, rounds_time_2, observacao]);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao inserir uma partida:', error);
            throw error;
        }
    };
    

const sql_get = `
    SELECT p.partida_id, p.duracao, p.data_da_partida, p.rounds_time_1, p.rounds_time_2, p.observacao, 
           m.nome_do_mapa, c.nome_camp, t1.nome_time AS time1, t2.nome_time AS time2
    FROM Partidas p
    JOIN Mapas m ON p.mapa_id = m.mapa_id
    JOIN Camp c ON p.camp_id = c.camp_id
    JOIN Times t1 ON p.time_id_1 = t1.time_id
    JOIN Times t2 ON p.time_id_2 = t2.time_id`;

const getPartidas = async () => {
    try {
        const result = await db.query(sql_get);
        return {
            total: result.rows.length,
            partidas: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter partidas:', error);
        throw error;
    }
};

const sql_patch = `UPDATE Partidas SET`;

const patchPartida = async (params) => {
    const partidaExists = await db.query('SELECT 1 FROM Partidas WHERE partida_id = $1', [params.id]);
    if (partidaExists.rowCount === 0) {
        const error = new Error('Partida não encontrada');
        error.code = 404;
        throw error;
    }

    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    try {
        if (params.mapa_id) {
            const mapaExists = await db.query('SELECT 1 FROM Mapas WHERE mapa_id = $1', [params.mapa_id]);
            if (mapaExists.rowCount === 0) {
                const error = new Error('Mapa não encontrado');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += ` mapa_id = $${countParams} `;
            binds.push(params.mapa_id);
        }
        if (params.camp_id) {
            const campExists = await db.query('SELECT 1 FROM Camp WHERE camp_id = $1', [params.camp_id]);
            if (campExists.rowCount === 0) {
                const error = new Error('Camp não encontrado');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += (fields ? ',' : '') + ` camp_id = $${countParams} `;
            binds.push(params.camp_id);
        }
        if (params.time_id_1) {
            const time1Exists = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [params.time_id_1]);
            if (time1Exists.rowCount === 0) {
                const error = new Error('Time 1 não encontrado');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += (fields ? ',' : '') + ` time_id_1 = $${countParams} `;
            binds.push(params.time_id_1);
        }
        if (params.time_id_2) {
            const time2Exists = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [params.time_id_2]);
            if (time2Exists.rowCount === 0) {
                const error = new Error('Time 2 não encontrado');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += (fields ? ',' : '') + ` time_id_2 = $${countParams} `;
            binds.push(params.time_id_2);
        }
    } catch (error) {
        console.error('Erro ao validar IDs:', error);
        throw error;
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
        const error = new Error('Nenhum campo válido para atualizar');
        error.code = 400;
        throw error;
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


const sql_delete = `DELETE FROM Partidas WHERE partida_id = $1 RETURNING *`;

const deletePartida = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        if (result.rowCount === 0) {
            throw new Error('Partida não encontrada');
        }
        return true;
    } catch (error) {
        console.error('Erro ao deletar a partida:', error);
        throw error;
    }
};

module.exports.newPartida = newPartida;
module.exports.getPartidas = getPartidas;
module.exports.patchPartida = patchPartida;
module.exports.deletePartida = deletePartida;
