const db = require('../configs/pg')
const bcrypt = require('bcrypt')

const sql_getNickUser = `SELECT nick_usuario, senha FROM usuarios WHERE nick_usuario = $1`;

const userAuthentication = async (params) => {
    try {
        const result = await db.query(sql_getNickUser, [params.nick_usuario]);

        if (result.rows.length === 0) {
            console.log('Usuário não encontrado');
            return { success: false, message: 'Usuário não encontrado' };
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(params.senha, user.senha);

        if (isPasswordValid) {
            console.log('Logado com sucesso');
            return { success: true, message: 'Logado com sucesso' };
        } else {
            console.log('Usuário sem acesso');
            return { success: false, message: 'Usuário sem acesso' };
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        throw new Error('Erro ao autenticar usuário');
    }
};

module.exports.userAuthentication = userAuthentication