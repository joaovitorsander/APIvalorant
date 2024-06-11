const estatJogadorController = require('../controllers/estatJogador');

module.exports = (app) => {
    app.post('/statsjogador', estatJogadorController.newEstatistica
        /*   
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Insere estatísticas do jogador'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para inserir as estatísticas do jogador',
                type: 'json',
                schema: {
                    jog_id: 1,
                    partida_id: 1,
                    agente_id: 1,
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
                    jog_id: 1,
                    partida_id: 1,
                    agente_id: 1,
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
            #swagger.responses[404] = {
                description: 'Jogador, partida ou agente não encontrado'
            }
        */
    );
    app.get('/statsjogador', estatJogadorController.getEstatisticas
        /* 
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Obtém as estatísticas dos jogadores'
            #swagger.responses[200] = {
                description: 'Lista das estatísticas dos jogadores',
                schema: [
                    {
                    "estat_jog_id": 1,
                    "kills": 20,
                    "mortes": 18,
                    "assistencias": 1,
                    "plants": 4,
                    "defuses": 3,
                    "jogador": "carla_souza",
                    "partida": "2024-08-06T03:00:00.000Z",
                    "agente": "Cypher"
                    }
                ]
            }
        */
    );
    app.patch('/statsjogador/:id', estatJogadorController.patchEstatistica
        /* 
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Atualiza as estatísticas de um jogador'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da estatística a ser atualizada',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados das estatísticas do jogador a serem atualizadas',
                type: 'json',
                schema: {
                    jog_id: 1,
                    partida_id: 1,
                    agente_id: 1,
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
                description: 'Estatística, jogador, partida ou agente não encontrado'
            }
        */
    );
    app.delete('/statsjogador/:id', estatJogadorController.deleteEstatistica
        /* 
            #swagger.tags = ["Estatísticas Jogador"]
            #swagger.summary = 'Remove as estatísticas de um jogador'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da estatística a ser removida',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[404] = {
                description: 'Estatística não encontrada'
            }
        */
    );
};
