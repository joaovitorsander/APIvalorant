const mapsController = require('../controllers/mapa')
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.post('/map', authMiddleware, mapsController.newMap
        /*   
            #swagger.tags = ["Mapa"]
            #swagger.summary = 'Cria um novo mapa'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo mapa',
                type: 'json',
                schema: {
                    nome_do_mapa: "Exemplo Mapa",
                    descricao: "Pequeno",
                    imagem_mapa: "teste.png",
                    data_lancamento: "24/05/2024",
                    map_pool: 1
                }
            }
            #swagger.responses[201] = {
                description: 'Mapa criado com sucesso',
                schema: {
                    id: 1,
                    nome_do_mapa: "Exemplo Mapa",
                    descricao: "Pequeno",
                    imagem_mapa: "teste.png",
                    data_lancamento: "24/05/2024",
                    map_pool: 1
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/map', authMiddleware, mapsController.getMap
        /* 
            #swagger.tags = ["Mapa"]
            #swagger.summary = 'Obtém a lista de mapas'
            #swagger.responses[200] = {
                description: 'Lista de mapas',
                schema: [
                    {
                        id: 1,
                        nome_do_mapa: "Exemplo Mapa",
                        descricao: "Pequeno",
                        data_lancamento: "24/05/2024",
                        map_pool: 1
                    }
                ]
            }
        */
    )
    app.patch('/map/:id', authMiddleware, mapsController.patchMap
        /* 
            #swagger.tags = ["Mapa"]
            #swagger.summary = 'Atualiza informações de um mapa'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do mapa a ser atualizado',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados do mapa a serem atualizados',
                type: 'json',
                schema: {
                    nome_do_mapa: "Exemplo Mapa",
                    descricao: "Pequeno",
                    data_lancamento: "24/05/2024",
                    map_pool: 1
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Mapa não encontrado'
            }
        */
    )
    app.delete('/map/:id', authMiddleware, mapsController.deleteMap
        /* 
            #swagger.tags = ["Mapa"]
            #swagger.summary = 'Remove um mapa'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do mapa a ser removido',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[404] = {
                description: 'Mapa não encontrado'
            }
        */
    )
}
