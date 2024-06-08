const db = require('../configs/pg');

const sql_insert = `
    INSERT INTO Jogadores_Times (jogador_id, time_id, data_associacao, data_desligamento, funcao, situacao, reserva)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;

const newJogadorTime = async (params) => {
    const { jogador_id, time_id, data_associacao, data_desligamento, funcao, situacao, reserva } = params;

    const jogadorExists = await db.query('SELECT 1 FROM Usuarios WHERE usuario_id = $1', [jogador_id]);
    const timeExists = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [time_id]);

    if (jogadorExists.rowCount === 0) {
        throw new Error('Jogador não encontrado');
    }

    if (timeExists.rowCount === 0) {
        throw new Error('Time não encontrado');
    }

    try {
        const result = await db.query(sql_insert, [jogador_id, time_id, data_associacao, data_desligamento, funcao, situacao, reserva]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir um jogador no time:', error);
        throw error;
    }
};

const sql_get = `
    SELECT jt.jogador_time_id, jt.funcao, jt.situacao, jt.reserva, u.nick_usuario AS nick, t.nome_time
    FROM Jogadores_Times jt
    JOIN Usuarios u ON jt.jogador_id = u.usuario_id
    JOIN Times t ON jt.time_id = t.time_id`;


const getJogadorTime = async () => {
    try {
        const result = await db.query(sql_get);
        return {
            total: result.rows.length,
            jogadoresTimes: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter o jogador do time:', error);
        throw error;
    }
};

const sql_patch = `UPDATE Jogadores_Times SET`;

const patchJogadorTime = async (params) => {
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.jogador_id) {
        const jogadorExists = await db.query('SELECT 1 FROM Usuarios WHERE usuario_id = $1', [params.jogador_id]);
        if (jogadorExists.rowCount === 0) {
            throw new Error('Jogador não encontrado');
        }
        countParams++;
        fields += ` jogador_id = $${countParams} `;
        binds.push(params.jogador_id);
    }
    if (params.time_id) {
        const timeExists = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [params.time_id]);
        if (timeExists.rowCount === 0) {
            throw new Error('Time não encontrado');
        }
        countParams++;
        fields += (fields ? ',' : '') + ` time_id = $${countParams} `;
        binds.push(params.time_id);
    }
    if (params.data_associacao) {
        countParams++;
        fields += (fields ? ',' : '') + ` data_associacao = $${countParams} `;
        binds.push(params.data_associacao);
    }
    if (params.data_desligamento) {
        countParams++;
        fields += (fields ? ',' : '') + ` data_desligamento = $${countParams} `;
        binds.push(params.data_desligamento);
    }
    if (params.funcao) {
        countParams++;
        fields += (fields ? ',' : '') + ` funcao = $${countParams} `;
        binds.push(params.funcao);
    }
    if (params.situacao) {
        countParams++;
        fields += (fields ? ',' : '') + ` situacao = $${countParams} `;
        binds.push(params.situacao);
    }
    if (params.reserva) {
        countParams++;
        fields += (fields ? ',' : '') + ` reserva = $${countParams} `;
        binds.push(params.reserva);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE jogador_time_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        if (result.rowCount === 0) {
            throw new Error('Registro não encontrado');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar o jogador do time:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM Jogadores_Times WHERE jogador_time_id = $1 RETURNING *`;

const deleteJogadorTime = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        if (result.rowCount === 0) {
            throw new Error('Registro não encontrado');
        }
        return true;
    } catch (error) {
        console.error('Erro ao deletar o jogador do time:', error);
        throw error;
    }
};

module.exports.newJogadorTime = newJogadorTime;
module.exports.getJogadorTime = getJogadorTime;
module.exports.patchJogadorTime = patchJogadorTime;
module.exports.deleteJogadorTime = deleteJogadorTime;
