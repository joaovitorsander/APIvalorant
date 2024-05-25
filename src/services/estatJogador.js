const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO Estatisticas_do_jogador (jog_id, partida_id, agente_id, kills, mortes, assistencias, plants, defuses)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

const newStatJogador = async (params) => {
    const { jog_id, partida_id, agente_id, kills, mortes, assistencias, plants, defuses } = params;

    try {
        const result = await db.query(sql_insert, [jog_id, partida_id, agente_id, kills, mortes, assistencias, plants, defuses]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir a estatística do jogador:', error);
        throw error;
    }
}

const sql_get = `SELECT kills, mortes FROM Estatisticas_do_jogador`;

const getStatJogador = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter a estatística do jogador:', error);
        throw error;
    }
};

const sql_patch = `UPDATE Estatisticas_do_jogador SET`;

const patchStatJogador = async (params) => {
    
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.jog_id) {
        countParams++;
        fields += ` jog_id = $${countParams} `;
        binds.push(params.jog_id);
    }
    if (params.agente_id) {
        countParams++;
        fields += (fields ? ',' : '') + ` agente_id = $${countParams} `;
        binds.push(params.agente_id);
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
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE estat_jog_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar a estatística do jogador:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM Estatisticas_do_jogador WHERE estat_jog_id = $1`;

const deleteStatJogador = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar a estatística do jogador:', error);
        throw error;
    }
};


module.exports.newStatJogador = newStatJogador
module.exports.getStatJogador = getStatJogador
module.exports.patchStatJogador = patchStatJogador
module.exports.deleteStatJogador= deleteStatJogador