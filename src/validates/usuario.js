const db = require('../configs/pg')

const validateUser = (userData) => {
    const errors = [];

    if (!userData.nome_de_usuario) {  
        errors.push('O nome de usuário é obrigatório');
    } 

    if (!userData.nick_usuario) {  
        errors.push('O nick do usuário é obrigatório');
    } 

    if (!userData.senha) {
        errors.push('A senha é obrigatória');
    } else if (userData.senha.length < 6) {
        errors.push('A senha deve ter pelo menos 6 caracteres');
    }

    return errors;
};

const checkNickExists = async (nickUsuario) => {
    const result = await db.query('SELECT 1 FROM usuarios WHERE nick_usuario = $1', [nickUsuario]);
    return result.rows.length > 0;
};

module.exports = {
    validateUser: validateUser,
    checkNickExists: checkNickExists
};
