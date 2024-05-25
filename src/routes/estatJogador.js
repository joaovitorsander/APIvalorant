const estatJogadorController = require('../controllers/estatJogador')

module.exports = (app) => {
    app.post('/statsjogador', estatJogadorController.newStatJogador
        /*   
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Insere estatísticas do jogador'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para inserir as estatísticas do jogador',
                type: 'json',
                schema: {
                    jogador: 1,
                    partida: 1,
                    agente: 1,
                    kills: 20,
                    mortes: 18,
                    assistencias: 1,
                    plants: 4,
                    defuses: 3
                }
            }
            #swagger.responses[201] = {
                description: 'Estatísticas do jogador inseridas com sucesso',
                schema: {
                    jogador: 1,
                    partida: 1,
                    agente: 1,
                    kills: 20,
                    mortes: 18,
                    assistencias: 1,
                    plants: 4,
                    defuses: 3
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/statsjogador', estatJogadorController.getStatJogador
        /* 
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Obtém as estatísticas dos jogadores'
            #swagger.responses[200] = {
                description: 'Lista das estatísticas dos jogadores',
                schema: [
                    {
                        jogador: 1,
                        partida: 1,
                        agente: 1,
                        kills: 20,
                        mortes: 18,
                        assistencias: 1,
                        plants: 4,
                        defuses: 3
                    }
                ]
            }
        */
    )
    app.patch('/statsjogador/:id', estatJogadorController.patchStatJogador
        /* 
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Atualiza as estatísticas de um jogador'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do jogador cujas estatísticas serão atualizadas',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados das estatísticas do jogador a serem atualizadas',
                type: 'json',
                schema: {
                    jogador: 1,
                    partida: 1,
                    agente: 1,
                    kills: 20,
                    mortes: 18,
                    assistencias: 1,
                    plants: 4,
                    defuses: 3
                }
            }
            #swagger.responses[200] = {
                description: 'Estatísticas do jogador atualizadas com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Jogador não encontrado'
            }
        */
    )
    app.delete('/statsjogador/:id', estatJogadorController.deleteStatJogador
        /* 
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Remove as estatísticas de um jogador'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do jogador cujas estatísticas serão removidas',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[200] = {
                description: 'Estatísticas do jogador removidas com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Jogador não encontrado'
            }
        */
    )
}
