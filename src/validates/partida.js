const observacaoType = [
    'amistoso',
    'eliminatoria',
    'final',
    'semifinal',
    'quartas de final',
    'oitavas de final',
    'showmatch',
    'qualificatória',
    'treino'
]

const validateNewPartida = (partidaData) => {
    const errors = [];

    if (!partidaData.mapa_id) {
        errors.push('O código do mapa é obrigatório');
    } 

    if (!partidaData.camp_id) {
        errors.push('O código do campeonato é obrigatório');
    }

    if (!partidaData.time_id_1) {
        errors.push('O código do time 1 é obrigatório');
    }

    if (!partidaData.time_id_2) {
        errors.push('O código do time 2 é obrigatório');
    }

    if (!partidaData.duracao) {
        errors.push('A duração da partida é obrigatória');
    }

    if (!partidaData.data_da_partida) {
        errors.push('A data da partida é obrigatória');
    }

    if (partidaData.rounds_time_1 == null) {
        errors.push('Os rounds do time 1 são obrigatórios');
    }

    if (partidaData.rounds_time_2 == null) {
        errors.push('Os rounds do time 2 são obrigatórios');
    }

    if (!partidaData.observacao) {
        errors.push('A observação da partida é obrigatória');
    }

    if (!observacaoType.includes(partidaData.observacao)) {
        errors.push(`A observação da partida deve ser especificamente uma dessas: ${observacaoType.join(", ")}`);
    }

    return errors;
};

module.exports = {
    validateNewPartida
};
