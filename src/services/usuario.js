const db = require('../configs/pg')
const bcrypt = require('bcrypt')

const sql_insert =
    `INSERT INTO usuarios (nome_de_usuario, nick_usuario, imagem_perfil, senha, data_registro)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING usuario_id, nome_de_usuario, nick_usuario, data_registro;`;

     const newUser = async (params) => {
        const { nome_de_usuario, nick_usuario, imagem_perfil, senha } = params;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const data_registro = new Date();
    
        try {
            const result = await db.query(sql_insert, [nome_de_usuario, nick_usuario, imagem_perfil, hashedPassword, data_registro]);
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao inserir um novo usuário:', error);
            throw error;
        }
};

const sql_get = `SELECT usuario_id, nome_de_usuario, nick_usuario, data_registro FROM usuarios`;

const getUser = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter os usuários:', error);
        throw error;
    }
};

const sql_patch = `UPDATE usuarios SET`;

const patchUser = async (params) => {
    let fields = '';
    let binds = [];
    let countParams = 1;

    if (params.nome_de_usuario) {
        fields += ` nome_de_usuario = $${countParams} `;
        binds.push(params.nome_de_usuario);
        countParams++;
    }
    if (params.nick_usuario) {
        fields += (fields ? ', ' : '') + ` nick_usuario = $${countParams} `;
        binds.push(params.nick_usuario);
        countParams++;
    }
    if (params.imagem_perfil) {
        fields += (fields ? ', ' : '') + ` imagem_perfil = $${countParams} `;
        binds.push(params.imagem_perfil);
        countParams++;
    }
    if (params.senha) {
        fields += (fields ? ', ' : '') + ` senha = $${countParams} `;
        binds.push(params.senha);
        countParams++;
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    const checkUserSql = 'SELECT * FROM usuarios WHERE usuario_id = $1';
    try {
        const userResult = await db.query(checkUserSql, [params.id]);
        if (userResult.rows.length === 0) {
            return null; 
        }

        let sql = sql_patch + fields + ` WHERE usuario_id = $${countParams} RETURNING usuario_id, nome_de_usuario, nick_usuario, imagem_perfil, senha;`;
        binds.push(params.id); 

        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }

};

const checkUserSql = 'SELECT * FROM usuarios WHERE usuario_id = $1';
const deleteUserSql = 'DELETE FROM usuarios WHERE usuario_id = $1';

const deleteUser = async (params) => {
    try {
        const userResult = await db.query(checkUserSql, [params.id]);
        if (userResult.rows.length === 0) {
            return null; 
        }

        await db.query(deleteUserSql, [params.id]);
        return true; 
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
};


module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.patchUser = patchUser
module.exports.deleteUser = deleteUser