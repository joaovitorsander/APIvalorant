const db = require('../configs/pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const sql_getNickUser = `SELECT nick_usuario, senha FROM usuarios WHERE nick_usuario = $1`;

const userAuthentication = async (params) => {
    try {
        const result = await db.query(sql_getNickUser, [params.nick_usuario]);

        if (result.rows.length === 0) {
            console.log('Usuário não encontrado');
            throw { status: 404, message: 'Usuário não encontrado' };
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(params.senha, user.senha);

        if (isPasswordValid) {
            console.log('Logado com sucesso');
            const privateKeyPath = path.join(__dirname, '../private/private_key.pem');
            const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
            const token = jwt.sign({ user: user.nick_usuario }, privateKey, { algorithm: 'RS256', expiresIn: '7d' });
            return { success: true, message: 'Logado com sucesso', user: user.nick_usuario, token: token };
        } else {
            console.log('Usuário sem acesso');
            return { success: false, message: 'Usuário sem acesso' };
        }
    } catch (error) {
        if (error.status) {
            throw error;
        }
        console.error('Erro ao autenticar usuário:', error);
        throw new Error('Erro ao autenticar usuário');
    }
};

module.exports.userAuthentication = userAuthentication;
