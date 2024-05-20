const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO Agentes (nome_agente, sexo, habilidade1, habilidade2, habilidade3, ultimate)
     VALUES ($1, $2, $3, $4, $5, $6)`

const newAgent = async (params) => {
    const { nome_agente, sexo, habilidade1, habilidade2, habilidade3, ultimate } = params;

    try {
        const result = await db.query(sql_insert, [nome_agente, sexo, habilidade1, habilidade2, habilidade3, ultimate]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir um novo agente:', error);
        throw error;
    }
}

const sql_get = `SELECT nome_agente, ultimate FROM Agentes`;

const getAgent = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter os agentes:', error);
        throw error;
    }
};

const sql_patch = `UPDATE agentes SET`;

const patchAgent = async (params) => {
    
    let fields = '';
    let binds = [params.id];
    let countParams = 1;

    if (params.nome_agente) {
        countParams++;
        fields += ` nome_agente = $${countParams} `;
        binds.push(params.nome_agente);
    }
    if (params.sexo) {
        countParams++;
        fields += (fields ? ',' : '') + ` sexo = $${countParams} `;
        binds.push(params.sexo);
    }
    if (params.habilidade1) {
        countParams++;
        fields += (fields ? ',' : '') + ` habilidade1 = $${countParams} `;
        binds.push(params.habilidade1);
    }
    if (params.habilidade2) {
        countParams++;
        fields += (fields ? ',' : '') + ` habilidade2 = $${countParams} `;
        binds.push(params.habilidade2);
    }
    if (params.habilidade3) {
        countParams++;
        fields += (fields ? ',' : '') + ` habilidade3 = $${countParams} `;
        binds.push(params.habilidade3);
    }
    if (params.ultimate) {
        countParams++;
        fields += (fields ? ',' : '') + ` ultimate = $${countParams} `;
        binds.push(params.ultimate);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE agente_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar agente:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM agentes WHERE agente_id = $1`;

const deleteAgent = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('Erro ao deletar o agente:', error);
        throw error;
    }
};


module.exports.newAgent = newAgent
module.exports.getAgent = getAgent
module.exports.patchAgent = patchAgent
module.exports.deleteAgent = deleteAgent