const validateNewUser = (userData) => {
    const errors = [];

    if (!userData.nome) {
        errors.push('O nome de usuário é obrigatório');
    } 

    if (!userData.nick) {
        errors.push('O nick do usuário é obrigatório');
    }

    if (!userData.email) {
        errors.push('O email do usuário é obrigatório');
    }

    if (!userData.senha) {
        errors.push('A senha é obrigatória');
    } else if (userData.senha.length < 6) {
        errors.push('A senha deve ter pelo menos 6 caracteres');
    }

    return errors;
};

module.exports = {
    validateNewUser
};
