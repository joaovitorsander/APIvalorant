const mapsController = require('../controllers/mapa')

module.exports = (app) => {
    app.post('/map', mapsController.newMap
        /*   
            #swagger.tags = ["Mapa"]
            #swagger.summary = 'Cria um novo mapa'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo mapa',
                type: 'json',
                schema: {
                    nome: "Exemplo Mapa",
                    tamanho: "Pequeno",
                    tipo: "Assalto"
                }
            }
            #swagger.responses[201] = {
                description: 'Mapa criado com sucesso',
                schema: {
                    id: 1,
                    nome: "Exemplo Mapa",
                    tamanho: "Pequeno",
                    tipo: "Assalto"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/map', mapsController.getMap
        /* 
            #swagger.tags = ["Mapa"]
            #swagger.summary = 'Obtém a lista de mapas'
            #swagger.responses[200] = {
                description: 'Lista de mapas',
                schema: [
                    {
                        id: 1,
                        nome: "Exemplo Mapa",
                        tamanho: "Pequeno",
                        tipo: "Assalto"
                    }
                ]
            }
        */
    )
    app.patch('/map/:id', mapsController.patchMap
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
                    nome: "Novo Nome",
                    tamanho: "Grande",
                    tipo: "Assalto"
                }
            }
            #swagger.responses[200] = {
                description: 'Mapa atualizado com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Mapa não encontrado'
            }
        */
    )
    app.delete('/map/:id', mapsController.deleteMap
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
            #swagger.responses[200] = {
                description: 'Mapa removido com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Mapa não encontrado'
            }
        */
    )
}
