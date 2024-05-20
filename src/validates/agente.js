const validateNewAgent = (agentData) => {
    const errors = [];

    if (!agentData.nome_agente) {
        errors.push('O nome do agente é obrigatório');
    } 

    if (!agentData.sexo) {
        errors.push('O sexo do agente é obrigatório');
    }

    if (!agentData.habilidade1) {
        errors.push('A habilidade 1 do agente é obrigatório');
    }

    if (!agentData.habilidade2) {
        errors.push('A habilidade 2 do agente é obrigatório');
    }

    if (!agentData.habilidade3) {
        errors.push('A habilidade 3 do agente é obrigatório');
    }

    if (!agentData.ultimate) {
        errors.push('A ultimate do agente é obrigatória');
    }

    return errors;
};

module.exports = {
    validateNewAgent
};
