const db = require('../configs/pg');

const sql_insert = `
    INSERT INTO Estatisticas_do_jogador (jog_id, partida_id, agente_id, kills, mortes, assistencias, plants, defuses)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;

const newEstatistica = async (params) => {
    const { jog_id, partida_id, agente_id, kills, mortes, assistencias, plants, defuses } = params;

    const jogExists = await db.query('SELECT 1 FROM Usuarios WHERE usuario_id = $1', [jog_id]);
    const partidaExists = await db.query('SELECT 1 FROM Partidas WHERE partida_id = $1', [partida_id]);
    const agenteExists = await db.query('SELECT 1 FROM Agentes WHERE agente_id = $1', [agente_id]);

    if (jogExists.rowCount === 0) {
        const error = new Error('Jogador não encontrado');
        error.code = 404;
        throw error;
    }
    if (partidaExists.rowCount === 0) {
        const error = new Error('Partida não encontrada');
        error.code = 404;
        throw error;
    }
    if (agenteExists.rowCount === 0) {
        const error = new Error('Agente não encontrado');
        error.code = 404;
        throw error;
    }

    try {
        const result = await db.query(sql_insert, [jog_id, partida_id, agente_id, kills, mortes, assistencias, plants, defuses]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir estatística do jogador:', error);
        throw error;
    }
};

const sql_get = `
    SELECT e.estat_jog_id, e.kills, e.mortes, e.assistencias, e.plants, e.defuses,
           u.nick_usuario AS jogador, p.data_da_partida AS partida, a.nome_agente AS agente
    FROM Estatisticas_do_jogador e
    JOIN Usuarios u ON e.jog_id = u.usuario_id
    JOIN Partidas p ON e.partida_id = p.partida_id
    JOIN Agentes a ON e.agente_id = a.agente_id`;

const getEstatisticas = async () => {
    try {
        const result = await db.query(sql_get);
        return {
            total: result.rows.length,
            estatisticas: result.rows[0]
        };
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        throw error;
    }
};

const sql_patch = `UPDATE Estatisticas_do_jogador SET`;

const patchEstatistica = async (params) => {
    const estatisticaExists = await db.query('SELECT 1 FROM Estatisticas_do_jogador WHERE estat_jog_id = $1', [params.id]);
    if (estatisticaExists.rowCount === 0) {
        const error = new Error('Estatística não encontrada');
        error.code = 404;
        throw error;
    }

    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    try {
        if (params.jog_id) {
            const jogExists = await db.query('SELECT 1 FROM Usuarios WHERE usuario_id = $1', [params.jog_id]);
            if (jogExists.rowCount === 0) {
                const error = new Error('Jogador não encontrado');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += ` jog_id = $${countParams} `;
            binds.push(params.jog_id);
        }
        if (params.partida_id) {
            const partidaExists = await db.query('SELECT 1 FROM Partidas WHERE partida_id = $1', [params.partida_id]);
            if (partidaExists.rowCount === 0) {
                const error = new Error('Partida não encontrada');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += (fields ? ',' : '') + ` partida_id = $${countParams} `;
            binds.push(params.partida_id);
        }
        if (params.agente_id) {
            const agenteExists = await db.query('SELECT 1 FROM Agentes WHERE agente_id = $1', [params.agente_id]);
            if (agenteExists.rowCount === 0) {
                const error = new Error('Agente não encontrado');
                error.code = 404;
                throw error;
            }
            countParams++;
            fields += (fields ? ',' : '') + ` agente_id = $${countParams} `;
            binds.push(params.agente_id);
        }
    } catch (error) {
        console.error('Erro ao validar IDs:', error);
        throw error;
    }

    if (params.kills) {
        countParams++;
        fields += (fields ? ',' : '') + ` kills = $${countParams} `;
        binds.push(params.kills);
    }
    if (params.mortes) {
        countParams++;
        fields += (fields ? ',' : '') + ` mortes = $${countParams} `;
        binds.push(params.mortes);
    }
    if (params.assistencias) {
        countParams++;
        fields += (fields ? ',' : '') + ` assistencias = $${countParams} `;
        binds.push(params.assistencias);
    }
    if (params.plants) {
        countParams++;
        fields += (fields ? ',' : '') + ` plants = $${countParams} `;
        binds.push(params.plants);
    }
    if (params.defuses) {
        countParams++;
        fields += (fields ? ',' : '') + ` defuses = $${countParams} `;
        binds.push(params.defuses);
    }

    if (fields === '') {
        const error = new Error('Nenhum campo válido para atualizar');
        error.code = 400;
        throw error;
    }

    let sql = sql_patch + fields + ' WHERE estat_jog_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar a estatística:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM Estatisticas_do_jogador WHERE estat_jog_id = $1 RETURNING *`;

const deleteEstatistica = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        if (result.rowCount === 0) {
            const error = new Error('Estatística não encontrada');
            error.code = 404;
            throw error;
        }
        return true;
    } catch (error) {
        console.error('Erro ao deletar a estatística:', error);
        throw error;
    }
};

module.exports.newEstatistica = newEstatistica;
module.exports.getEstatisticas = getEstatisticas;
module.exports.patchEstatistica = patchEstatistica;
module.exports.deleteEstatistica = deleteEstatistica;