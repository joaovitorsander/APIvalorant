const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO Times (nome_time, sigla_time, imagem_time, Observacao, data_registro)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`


const newTeam = async (params) => {
    const { nome_time, sigla_time, imagem_time, Observacao } = params;
    const data_registro = new Date();

    try {
        const result = await db.query(sql_insert, [nome_time, sigla_time, imagem_time, Observacao, data_registro]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir um novo time:', error);
        throw error;
    }
}

const sql_get = `SELECT time_id, nome_time, sigla_time, Observacao, data_registro FROM Times`;

const getTeam = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter os times:', error);
        throw error;
    }
};

const sqlPatchTeam = `UPDATE times SET`;

const patchTeam = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.nome_time) {
        fields += ` nome_time = $${countParams} `;
        binds.push(params.nome_time);
        countParams++;
    }
    if (params.sigla_time) {
        fields += (fields ? ', ' : '') + ` sigla_time = $${countParams} `;
        binds.push(params.sigla_time);
        countParams++;
    }
    if (params.imagem_time) {
        fields += (fields ? ', ' : '') + ` imagem_time = $${countParams} `;
        binds.push(params.imagem_time);
        countParams++;
    }
    if (params.Observacao) {
        fields += (fields ? ', ' : '') + ` observacao = $${countParams} `;
        binds.push(params.observacao);
        countParams++;
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    try {
        let sql = sqlPatchTeam + fields + ` WHERE time_id = $${countParams} RETURNING time_id, nome_time, sigla_time, imagem_time, observacao;`;
        binds.push(params.id);

        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar time:', error);
        throw error;
    }
};


const deleteTeamSql = 'DELETE FROM times WHERE time_id = $1';

const deleteTeam = async (params) => {
    try {
        await db.query(deleteTeamSql, [params.id]);
        return true; 
    } catch (error) {
        console.error('Erro ao deletar o time:', error);
        throw error;
    }
};

const checkTeamExistsById = async (teamId) => {
    const result = await db.query('SELECT 1 FROM Times WHERE time_id = $1', [teamId]);
    return result.rows.length > 0;
};


module.exports.newTeam = newTeam
module.exports.getTeam = getTeam
module.exports.patchTeam = patchTeam
module.exports.deleteTeam = deleteTeam
module.exports.checkTeamExistsById = checkTeamExistsById