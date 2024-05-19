const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO Mapas (nome_do_mapa, descricao, imagem_mapa, data_lancamento, map_pool)
     VALUES ($1, $2, $3, $4, $5)`

//Quando for inserir se está no map_pool, para verdadeiro inserir 1 e para falso 0
const newMap = async (params) => {
    const { nome_do_mapa, descricao, imagem_mapa, data_lancamento, map_pool } = params;

    try {
        const result = await db.query(sql_insert, [nome_do_mapa, descricao, imagem_mapa, data_lancamento, map_pool]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir um novo mapa:', error);
        throw error;
    }
}

const sql_get = `SELECT nome_do_mapa, descricao FROM Mapas`;

const getMap = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter os mapas:', error);
        throw error;
    }
};

const sql_patch = `UPDATE mapas SET`;

const patchMap = async (params) => {
    
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.nome_do_mapa) {
        countParams++;
        fields += ` nome_do_mapa = $${countParams} `;
        binds.push(params.nome_do_mapa);
    }
    if (params.descricao) {
        countParams++;
        fields += (fields ? ',' : '') + ` descricao = $${countParams} `;
        binds.push(params.descricao);
    }
    if (params.imagem_mapa) {
        countParams++;
        fields += (fields ? ',' : '') + ` imagem_mapa = $${countParams} `;
        binds.push(params.imagem_mapa);
    }
    if (params.data_lancamento) {
        countParams++;
        fields += (fields ? ',' : '') + ` data_lancamento = $${countParams} `;
        binds.push(params.data_lancamento);
    }
    if (params.map_pool) {
        countParams++;
        fields += (fields ? ',' : '') + ` map_pool = $${countParams} `;
        binds.push(params.map_pool);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE mapa_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar mapa:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM mapas WHERE mapa_id = $1`;

const deleteMap = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o mapa:', error);
        throw error;
    }
};


module.exports.newMap = newMap
module.exports.getMap = getMap
module.exports.patchMap = patchMap
module.exports.deleteMap = deleteMap