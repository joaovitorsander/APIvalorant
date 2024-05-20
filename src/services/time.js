const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO Times (nome_time, sigla_time, imagem_time, Observacao, data_registro)
     VALUES ($1, $2, $3, $4, $5)`


const newTeam = async (params) => {
    const { nome_time, sigla_time, imagem_time, Observacao } = params;
    const data_registro = new Date();

    try {
        const result = await db.query(sql_insert, [nome_time, sigla_time, imagem_time, Observacao, data_registro]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir um novo time:', error);
        throw error;
    }
}

const sql_get = `SELECT nome_time, sigla_time FROM Times`;

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

const sql_patch = `UPDATE times SET`;

const patchTeam = async (params) => {
    
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.nome_time) {
        countParams++;
        fields += ` nome_time = $${countParams} `;
        binds.push(params.nome_time);
    }
    if (params.sigla_time) {
        countParams++;
        fields += (fields ? ',' : '') + ` sigla_time = $${countParams} `;
        binds.push(params.sigla_time);
    }
    if (params.imagem_time) {
        countParams++;
        fields += (fields ? ',' : '') + ` imagem_time = $${countParams} `;
        binds.push(params.imagem_time);
    }
    if (params.Observacao) {
        countParams++;
        fields += (fields ? ',' : '') + ` Observacao = $${countParams} `;
        binds.push(params.Observacao);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE time_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar time:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM times WHERE time_id = $1`;

const deleteTeam = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o time:', error);
        throw error;
    }
};


module.exports.newTeam = newTeam
module.exports.getTeam = getTeam
module.exports.patchTeam = patchTeam
module.exports.deleteTeam = deleteTeam