const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO Camp (time_id, premiacao, organizacao, nome_camp, edicao, formato, data_inicio_camp)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`

const newCamp = async (params) => {
    const { time_id, premiacao, organizacao, nome_camp, edicao, formato, data_inicio_camp } = params;

    try {
        const result = await db.query(sql_insert, [time_id, premiacao, organizacao, nome_camp, edicao, formato, data_inicio_camp]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir um novo camp:', error);
        throw error;
    }
}

const sql_get = `SELECT premiacao, nome_camp FROM Camp`;

const getCamp = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter o camp:', error);
        throw error;
    }
};

const sql_patch = `UPDATE Camp SET`;

const patchCamp = async (params) => {
    
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.time_id) {
        countParams++;
        fields += ` time_id = $${countParams} `;
        binds.push(params.time_id);
    }
    if (params.premiacao) {
        countParams++;
        fields += (fields ? ',' : '') + ` premiacao = $${countParams} `;
        binds.push(params.premiacao);
    }
    if (params.organizacao) {
        countParams++;
        fields += (fields ? ',' : '') + ` organizacao = $${countParams} `;
        binds.push(params.organizacao);
    }
    if (params.nome_camp) {
        countParams++;
        fields += (fields ? ',' : '') + ` nome_camp = $${countParams} `;
        binds.push(params.nome_camp);
    }
    if (params.edicao) {
        countParams++;
        fields += (fields ? ',' : '') + ` edicao = $${countParams} `;
        binds.push(params.edicao);
    }
    if (params.formato) {
        countParams++;
        fields += (fields ? ',' : '') + ` formato = $${countParams} `;
        binds.push(params.formato);
    }
    if (params.data_inicio_camp) {
        countParams++;
        fields += (fields ? ',' : '') + ` data_inicio_camp = $${countParams} `;
        binds.push(params.data_inicio_camp);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE camp_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar camp:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM Camp WHERE camp_id = $1`;

const deleteCamp = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o camp:', error);
        throw error;
    }
};


module.exports.newCamp = newCamp
module.exports.getCamp = getCamp
module.exports.patchCamp = patchCamp
module.exports.deleteCamp = deleteCamp