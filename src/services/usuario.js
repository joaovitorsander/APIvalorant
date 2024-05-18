const db = require('../configs/pg')

const sql_insert =
    `INSERT INTO usuarios (nome_de_usuario, nick_usuario, imagem_perfil, senha, data_registro)
     VALUES ($1, $2, $3, $4, $5)`

const newUser = async (params) => {
    const { nome_de_usuario, nick_usuario, imagem_perfil, senha } = params;
    const data_registro = new Date();

    try {
        const result = await db.query(sql_insert, [nome_de_usuario, nick_usuario, imagem_perfil, senha, data_registro]);
        return result;
    } catch (error) {
        console.error('Erro ao inserir novo usuário:', error);
        throw error;
    }
}

const sql_get = `SELECT usuario_id, nome_de_usuario FROM usuarios`;

const getUser = async () => {
    try {
        const result = await db.query(sql_get, []);
        return {
            total: result.rows.length,
            usuarios: result.rows
        };
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
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
        console.error('Erro ao deletar usuário:', error);
        throw error;
    }
};


module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser