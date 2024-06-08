const partidasController = require('../controllers/partida');

module.exports = (app) => {
    app.post('/partidas', partidasController.newPartida
        /*   
            #swagger.tags = ["Partidas"]
            #swagger.summary = 'Insere uma nova partida'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para inserir uma nova partida',
                type: 'json',
                schema: {
                    mapa_id: 1,
                    camp_id: 1,
                    time_id_1: 1,
                    time_id_2: 2,
                    duracao: "30 minutos",
                    data_da_partida: "2024-08-06",
                    rounds_time_1: 16,
                    rounds_time_2: 10,
                    observacao: "final"
                }
            }
            #swagger.responses[201] = {
                description: 'Partida criada com sucesso',
                schema: {
                    mapa_id: 1,
                    camp_id: 1,
                    time_id_1: 1,
                    time_id_2: 2,
                    duracao: "30 minutos",
                    data_da_partida: "2024-08-06",
                    rounds_time_1: 16,
                    rounds_time_2: 10,
                    observacao: "final"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos',
                }
            }
            #swagger.responses[404] = {
                description: 'Mapa, camp ou time não encontrado'
            }
        */
    );
    app.get('/partidas', partidasController.getPartidas
        /* 
            #swagger.tags = ["Partidas"]
            #swagger.summary = 'Obtém a lista de partidas'
            #swagger.responses[200] = {
                description: 'Lista de partidas',
                schema: [
                    {
                        partida_id: 1,
                        duracao: "30 minutos",
                        data_da_partida: "2024-08-06",
                        rounds_time_1: 16,
                        rounds_time_2: 10,
                        observacao: "final",
                        nome_do_mapa: "Dust II",
                        nome_camp: "Major",
                        time1: "Team Liquid",
                        time2: "Furia"
                    }
                ]
            }
        */
    );
    app.patch('/partidas/:id', partidasController.patchPartida
        /* 
            #swagger.tags = ["Partidas"]
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
                    mapa_id: 1,
                    camp_id: 1,
                    time_id_1: 1,
                    time_id_2: 2,
                    duracao: "30 minutos",
                    data_da_partida: "2024-08-06",
                    rounds_time_1: 16,
                    rounds_time_2: 10,
                    observacao: "final"
                }
            }
            #swagger.responses[200] = {
                description: 'Partida atualizada com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos',
            }
            #swagger.responses[404] = {
                description: 'Mapa, camp, time ou partida não encontrado'
            }
        */
    );
    app.delete('/partidas/:id', partidasController.deletePartida
        /* 
            #swagger.tags = ["Partidas"]
            #swagger.summary = 'Remove uma partida'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID da partida a ser removida',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[204] = {
                description: 'Partida removida com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Partida não encontrada'
            }
        */
    );
};
