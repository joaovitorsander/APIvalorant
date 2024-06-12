const jogadoresTimesController = require('../controllers/jogadoresTimes');
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.post('/jogadorestimes', authMiddleware, jogadoresTimesController.newJogadoresTimes
        /*   
            #swagger.tags = ["JogadoresTimes"]
            #swagger.summary = 'Associa um jogador a um time'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para associar um jogador a um time',
                type: 'json',
                schema: {
                    jogador_id: 1,
                    time_id: 1,
                    data_associacao: "2024-08-06",
                    data_desligamento: "2024-08-06",
                    funcao: "IGL",
                    situacao: "Treinando",
                    reserva: 1
                }
            }
            #swagger.responses[201] = {
                description: 'Associação criada com sucesso',
                schema: {
                    jogador_id: 1,
                    time_id: 1,
                    data_associacao: "2024-08-06",
                    data_desligamento: "2024-08-06",
                    funcao: "IGL",
                    situacao: "Treinando",
                    reserva: 1
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos',
            }
            #swagger.responses[404] = {
                description: 'Jogador ou time não encontrado'
            }
        */
    );
    app.get('/jogadorestimes', authMiddleware, jogadoresTimesController.getJogadoresTimes
        /* 
            #swagger.tags = ["JogadoresTimes"]
            #swagger.summary = 'Obtém a lista de associações de jogadores a times'
            #swagger.responses[200] = {
                description: 'Lista de associações',
                schema: [
                    {
                        jogador_id: 1,
                        funcao: "IGL",
                        situacao: "Treinando",
                        reserva: 1,
                        nick: "brabo123",
                        nome_time: "furia"
                    }
                ]
            }
        */
    );
    app.patch('/jogadorestimes/:id', authMiddleware, jogadoresTimesController.patchJogadoresTimes
        /* 
            #swagger.tags = ["JogadoresTimes"]
            #swagger.summary = 'Atualiza informações de uma associação de jogador a time'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da associação a ser atualizada',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados da associação a serem atualizados',
                type: 'json',
                schema: {
                    jogador_id: 1,
                    time_id: 1,
                    data_associacao: "2024-08-06",
                    data_desligamento: "2024-08-06",
                    funcao: "IGL",
                    situacao: "Treinando",
                    reserva: 1
                }
            }
            #swagger.responses[200] = {
                description: 'Associação atualizada com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos',
            }
            #swagger.responses[404] = {
                description: 'Jogador, time ou associação não encontrada'
            }
        */
    );
    app.delete('/jogadorestimes/:id', authMiddleware, jogadoresTimesController.deleteJogadoresTimes
        /* 
            #swagger.tags = ["JogadoresTimes"]
            #swagger.summary = 'Remove uma associação de jogador a time'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da associação a ser removida',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[204] = {
                description: 'Associação removida com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Associação não encontrada'
            }
        */
    );
};
