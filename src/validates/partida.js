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

    if (!partidaData.mapa) {
        errors.push('O código do mapa é obrigatório');
    } 

    if (!partidaData.camp) {
        errors.push('O código do campeonato é obrigatório');
    }

    if (!partidaData.time1) {
        errors.push('O código do time 1 é obrigatório');
    }

    if (!partidaData.time2) {
        errors.push('O código do time 2 é obrigatório');
    }

    if (!partidaData.duracao) {
        errors.push('A duração da partida é obrigatória');
    }

    if (!partidaData.dataPartida) {
        errors.push('A data da partida é obrigatória');
    }

    if (!partidaData.roundsTime1) {
        errors.push('A quantidade de rounds do time 1 é obrigatória');
    }

    if (!partidaData.roundsTime2) {
        errors.push('A quantidade de rounds do time 2 é obrigatória');
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
