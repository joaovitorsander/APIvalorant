const campsController = require('../controllers/camp')

module.exports = (app) => {
    app.post('/camp', campsController.newCamp
        /*   
            #swagger.tags = ["Camp"]
            #swagger.summary = 'Cria um novo camp'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo camp',
                type: 'json',
                schema: {
                    time: 1,
                    premiacao: "10.000",
                    organizacao: "PGA",
                    nome: "Camp Horus Valorant",
                    edicao: "3°",
                    formato: "eliminatórias",
                    DataInicio: "24/05/2024"
                }
            }
            #swagger.responses[201] = {
                description: 'Camp criado com sucesso',
                schema: {
                    time: 1,
                    premiacao: "10.000",
                    organizacao: "PGA",
                    nome: "Camp Horus Valorant",
                    edicao: "3°",
                    formato: "eliminatórias",
                    DataInicio: "24/05/2024"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/camp', campsController.getCamp
        /* 
            #swagger.tags = ["Camp"]
            #swagger.summary = 'Obtém a lista de camps'
            #swagger.responses[200] = {
                description: 'Lista de camps',
                schema: [
                    {
                        time: 1,
                        premiacao: "10.000",
                        organizacao: "PGA",
                        nome: "Camp Horus Valorant",
                        edicao: "3°",
                        formato: "eliminatórias",
                        DataInicio: "24/05/2024"
                    }
                ]
            }
        */
    )
    app.patch('/camp/:id', campsController.patchCamp
        /* 
            #swagger.tags = ["Camp"]
            #swagger.summary = 'Atualiza informações de um camp'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do camp a ser atualizado',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados do camp a serem atualizados',
                type: 'json',
                schema: {
                    time: 1,
                    premiacao: "Nova premição",
                    organizacao: "Nova organização",
                    nome: "Novo nome",
                    edicao: "Nova edição",
                    formato: "Novo formato",
                    DataInicio: "Nova data"
                }
            }
            #swagger.responses[200] = {
                description: 'Camp atualizado com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Camp não encontrado'
            }
        */
    )
    app.delete('/camp/:id', campsController.deleteCamp
        /* 
            #swagger.tags = ["Camp"]
            #swagger.summary = 'Remove um camp'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do camp a ser removido',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[200] = {
                description: 'Camp removido com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Camp não encontrado'
            }
        */
    )
}
