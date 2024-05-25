const db = require('../configs/pg')
const bcrypt = require('bcrypt')

const sql_insert =
    `INSERT INTO usuarios (nome_de_usuario, nick_usuario, imagem_perfil, senha, data_registro)
     VALUES ($1, $2, $3, $4, $5)`

     const newUser = async (params) => {
        const { nome_de_usuario, nick_usuario, imagem_perfil, senha } = params;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const data_registro = new Date();
    
        console.log("Dados a serem inseridos:", { nome_de_usuario, nick_usuario, imagem_perfil, hashedPassword, data_registro });
    
        try {
            const result = await db.query(sql_insert, [nome_de_usuario, nick_usuario, imagem_perfil, hashedPassword, data_registro]);
            console.log("Resultado da inserção:", result);
            return result;
        } catch (error) {
            console.error('Erro ao inserir um novo usuário:', error);
            throw error;
        }
};

// const userAuthentication = async (params) => {
//     try {

//     } catch (error) {
//         console.error('Usuário não autenticado:', error);
//         throw error;        
//     }
// }

const sql_get = `SELECT nome_de_usuario, nick_usuario, senha, data_registro FROM usuarios`;

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
    let binds = [params.id];
    let countParams = 1;

    if (params.nome_de_usuario) {
        countParams++;
        fields += ` nome_de_usuario = $${countParams} `;
        binds.push(params.nome_de_usuario);
    }
    if (params.nick_usuario) {
        countParams++;
        fields += (fields ? ',' : '') + ` nick_usuario = $${countParams} `;
        binds.push(params.nick_usuario);
    }
    if (params.imagem_perfil) {
        countParams++;
        fields += (fields ? ',' : '') + ` imagem_perfil = $${countParams} `;
        binds.push(params.imagem_perfil);
    }
    if (params.senha) {
        countParams++;
        fields += (fields ? ',' : '') + ` senha = $${countParams} `;
        binds.push(params.senha);
    }

    if (fields === '') {
        throw new Error('Nenhum campo válido para atualizar');
    }

    let sql = sql_patch + fields + ' WHERE usuario_id = $1 RETURNING *;';
    try {
        const result = await db.query(sql, binds);
        return result.rows[0];
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
    }
};

const sql_delete = `DELETE FROM usuarios WHERE usuario_id = $1`;

const deleteUser = async (params) => {
    try {
        const { id } = params;
        const result = await db.query(sql_delete, [id]);
        return result.rowCount > 0; // Retorna true se um usuário foi deletado, false caso contrário
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        throw error;
    }
};


module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.patchUser = patchUser
module.exports.deleteUser = deleteUser