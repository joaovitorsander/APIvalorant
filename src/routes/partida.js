const partidaController = require('../controllers/partida')

module.exports = (app) => {
    app.post('/partida', partidaController.newPartida
        /*   
            #swagger.tags = ["Partida"]
            #swagger.summary = 'Cria uma nova partida'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar uma nova partida',
                type: 'json',
                schema: {
                    mapa: 1,
                    camp: 1,
                    time1: 1,
                    time2: 2,
                    duracao: "1h",
                    dataPartida: "25/05/2024",
                    roundsTime1: 13,
                    roundsTime2: 10,
                    observacao: "deve ser inserido uma dessas opções: [amistoso, eliminatoria, final, semifinal, quartas de final, oitavas de final, showmatch, qualificatória, treino]"
                }
            }
            #swagger.responses[201] = {
                description: 'Partida criada com sucesso',
                schema: {
                    id: 1,
                    mapa: 1,
                    camp: 1,
                    time1: 1,
                    time2: 2,
                    duracao: "1h",
                    dataPartida: "25/05/2024",
                    roundsTime1: 13,
                    roundsTime2: 10,
                    observacao: "eliminatória"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/partida', partidaController.getPartida
        /* 
            #swagger.tags = ["Partida"]
            #swagger.summary = 'Obtém a lista de partidas'
            #swagger.responses[200] = {
                description: 'Lista de partidas',
                schema: [
                    {
                        id: 1,
                        mapa: 1,
                        camp: 1,
                        time1: 1,
                        time2: 2,
                        duracao: "1h",
                        dataPartida: "25/05/2024",
                        roundsTime1: 13,
                        roundsTime2: 10,
                        observacao: "eliminatória"
                    }
                ]
            }
        */
    )
    app.patch('/partida/:id', partidaController.patchPartida
        /* 
            #swagger.tags = ["Partida"]
            #swagger.summary = 'Atualiza informações de uma partida'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da partida a ser atualizada',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados da partida a serem atualizados',
                type: 'json',
                schema: {
                    mapa: 1,
                    camp: 1,
                    time1: 1,
                    time2: 2,
                    duracao: "2h",
                    dataPartida: "26/05/2024",
                    roundsTime1: 15,
                    roundsTime2: 12,
                    observacao: "final"
                }
            }
            #swagger.responses[200] = {
                description: 'Partida atualizada com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Partida não encontrada'
            }
        */
    )
    app.delete('/partida/:id', partidaController.deletePartida
        /* 
            #swagger.tags = ["Partida"]
            #swagger.summary = 'Remove uma partida'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da partida a ser removida',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[200] = {
                description: 'Partida removida com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Partida não encontrada'
            }
        */
    )
}
