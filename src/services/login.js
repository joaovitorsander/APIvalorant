const db = require('../configs/pg'); // Importa a configuração do banco de dados PostgreSQL
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografia e verificação de senhas
const jwt = require('jsonwebtoken'); // Importa o jsonwebtoken para gerar e verificar tokens JWT
const fs = require('fs'); // Importa o módulo fs para ler arquivos do sistema de arquivos
const path = require('path'); // Importa o módulo path para manipulação de caminhos de arquivos

// Consulta SQL para obter o nick_usuario e a senha de um usuário específico
const sql_getNickUser = `SELECT nick_usuario, senha FROM usuarios WHERE nick_usuario = $1`;

// Função assíncrona para autenticar um usuário
const userAuthentication = async (params) => {
    try {
        // Executa a consulta no banco de dados para obter o usuário com o nick_usuario fornecido
        const result = await db.query(sql_getNickUser, [params.nick_usuario]);

        // Se o usuário não for encontrado, lança um erro com status 404
        if (result.rows.length === 0) {
            console.log('Usuário não encontrado');
            throw { status: 404, message: 'Usuário não encontrado' };
        }

        const user = result.rows[0]; // Pega o primeiro resultado da consulta (o usuário)

        // Compara a senha fornecida com a senha armazenada no banco de dados
        const isPasswordValid = await bcrypt.compare(params.senha, user.senha);

        if (isPasswordValid) {
            // Se a senha for válida, gera um token JWT
            console.log('Logado com sucesso');
            const privateKeyPath = path.join(__dirname, '../private/private_key.pem'); // Caminho para a chave privada
            const privateKey = fs.readFileSync(privateKeyPath, 'utf8'); // Lê a chave privada do arquivo
            const token = jwt.sign({ user: user.nick_usuario }, privateKey, { algorithm: 'RS256', expiresIn: '7d' }); // Gera o token
            return { success: true, message: 'Logado com sucesso', user: user.nick_usuario, token: token }; // Retorna sucesso, mensagem e token
        } else {
            // Se a senha não for válida, retorna uma mensagem de acesso negado
            console.log('Usuário sem acesso');
            return { success: false, message: 'Usuário sem acesso' };
        }
    } catch (error) {
        // Se o erro tiver um status (erro esperado), lança o erro
        if (error.status) {
            throw error;
        }
        // Caso contrário, loga o erro e lança um erro genérico de autenticação
        console.error('Erro ao autenticar usuário:', error);
        throw new Error('Erro ao autenticar usuário');
    }
};

module.exports.userAuthentication = userAuthentication; // Exporta a função de autenticação para ser usada em outras partes da aplicação
