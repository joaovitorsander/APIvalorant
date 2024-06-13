const db = require('../configs/pg')
const { validateNewMap } = require('../validates/mapa')

const sql_insert =
    `INSERT INTO Mapas (nome_do_mapa, descricao, imagem_mapa, data_lancamento, map_pool)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`

//Quando for inserir se está no map_pool, para verdadeiro inserir 1 e para falso 0
const newMap = async (params) => {
    const { nome_do_mapa, descricao, imagem_mapa, data_lancamento, map_pool } = params;

    const errors = validateNewMap(params);
    if (errors.length > 0) {
        throw new Error(`Erro(s) de validação: ${errors.join(', ')}`);
    }
    
    const dateParts = data_lancamento.split('/');
    const formattedDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

    try {
        const result = await db.query(sql_insert, [nome_do_mapa, descricao, imagem_mapa, formattedDate, map_pool]);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao inserir um novo mapa:', error);
        throw error;
    }
}

const sql_get = `SELECT mapa_id, nome_do_mapa, descricao, data_lancamento, map_pool FROM Mapas`;

const getMap = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            mapa: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter os mapas:', error);
        throw error;
    }
};

const sql_patch = `UPDATE mapas SET`;

const patchMap = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.nome_do_mapa) {
        fields += ` nome_do_mapa = $${countParams} `;
        binds.push(params.nome_do_mapa);
        countParams++;
    }
    if (params.descricao) {
        fields += (fields ? ', ' : '') + ` descricao = $${countParams} `;
        binds.push(params.descricao);
        countParams++;
    }
    if (params.imagem_mapa) {
        fields += (fields ? ', ' : '') + ` imagem_mapa = $${countParams} `;
        binds.push(params.imagem_mapa);
        countParams++;
    }
    if (params.data_lancamento) {
        const [day, month, year] = params.data_lancamento.split('/');
        const formattedDate = new Date(`${year}-${month}-${day}`);
        fields += (fields ? ', ' : '') + ` data_lancamento = $${countParams} `;
        binds.push(formattedDate);
        countParams++;
    }
    if (typeof params.map_pool !== 'undefined') {
        fields += (fields ? ', ' : '') + ` map_pool = $${countParams} `;
        binds.push(params.map_pool);
        countParams++;
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    try {
        let sql = sql_patch + fields + ` WHERE mapa_id = $${countParams} RETURNING *;`;
        binds.push(params.id);

        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar mapa:', error);
        throw error;
    }
};

const deleteMapSql = 'DELETE FROM mapas WHERE mapa_id = $1';

const deleteMap = async (params) => {
    try {
        await db.query(deleteMapSql, [params.id]);
        return true; 
    } catch (error) {
        console.error('Erro ao deletar o mapa:', error);
        throw error;
    }
};

const checkMapExistsById = async (mapId) => {
    const result = await db.query('SELECT 1 FROM Mapas WHERE mapa_id = $1', [mapId]);
    return result.rows.length > 0;
};



module.exports.newMap = newMap
module.exports.getMap = getMap
module.exports.patchMap = patchMap
module.exports.deleteMap = deleteMap
module.exports.checkMapExistsById = checkMapExistsById