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
                    time_id: 1,
                    premiacao: "10.000",
                    organizacao: "PGA",
                    nome_camp: "Camp Horus Valorant",
                    edicao: "3°",
                    formato: "eliminatórias",
                    data_inicio_camp: "2024-06-06"
                }
            }
            #swagger.responses[201] = {
                description: 'Camp criado com sucesso',
                schema: {
                    time_id: 1,
                    premiacao: "10.000",
                    organizacao: "PGA",
                    nome_camp: "Camp Horus Valorant",
                    edicao: "3°",
                    formato: "eliminatórias",
                    data_inicio_camp: "2024-06-06"
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
                        time_id: 1,
                        premiacao: "10.000",
                        organizacao: "PGA",
                        nome_camp: "Camp Horus Valorant",
                        edicao: "3°",
                        formato: "eliminatórias",
                        data_inicio_camp: "2024-06-06"
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
                    time_id: 1,
                    premiacao: "10.000",
                    organizacao: "PGA",
                    nome_camp: "Camp Horus Valorant",
                    edicao: "3°",
                    formato: "eliminatórias",
                    data_inicio_camp: "2024-06-06"
                }
            }
            #swagger.responses[200] = {
                description: 'Camp atualizado com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Camp ou time não encontrado'
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
            #swagger.responses[404] = {
                description: 'Camp não encontrado'
            }
        */
    )
}
