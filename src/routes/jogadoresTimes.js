const jogadoresTimesController = require('../controllers/jogadoresTimes')

module.exports = (app) => {
    app.post('/jogadorestimes', jogadoresTimesController.newJogadoresTimes
        /*   
            #swagger.tags = ["JogadoresTimes"]
            #swagger.summary = 'Associa um jogador a um time'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para associar um jogador a um time',
                type: 'json',
                schema: {
                    jogador: 1,
                    time: 1,
                    dataAssociacao: "24/05/2024",
                    funcao: "IGL",
                    situacao: "Treinando",
                    reserva: 1
                }
            }
            #swagger.responses[201] = {
                description: 'Associação criada com sucesso',
                schema: {
                    jogador: 1,
                    time: 1,
                    dataAssociacao: "24/05/2024",
                    funcao: "IGL",
                    situacao: "Treinando",
                    reserva: 1
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/jogadorestimes', jogadoresTimesController.getJogadoresTimes
        /* 
            #swagger.tags = ["JogadoresTimes"]
            #swagger.summary = 'Obtém a lista de associações de jogadores a times'
            #swagger.responses[200] = {
                description: 'Lista de associações',
                schema: [
                    {
                        jogador: 1,
                        time: 1,
                        dataAssociacao: "24/05/2024",
                        funcao: "IGL",
                        situacao: "Treinando",
                        reserva: 1
                    }
                ]
            }
        */
    )
    app.patch('/jogadorestimes/:id', jogadoresTimesController.patchJogadoresTimes
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
                    jogador: 1,
                    time: 1,
                    dataAssociacao: "24/05/2024",
                    funcao: "Novo IGL",
                    situacao: "Nova situação",
                    reserva: 0
                }
            }
            #swagger.responses[200] = {
                description: 'Associação atualizada com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Associação não encontrada'
            }
        */
    )
    app.delete('/jogadorestimes/:id', jogadoresTimesController.deleteJogadoresTimes
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
            #swagger.responses[200] = {
                description: 'Associação removida com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Associação não encontrada'
            }
        */
    )
}
