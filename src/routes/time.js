const teamsController = require('../controllers/time')

module.exports = (app) => {
    app.post('/team', teamsController.newTeam
        /*   
            #swagger.tags = ["Time"]
            #swagger.summary = 'Cria um novo time'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo usuário',
                type: 'json',
                schema: {
                    nome_time: "Exemplo FC",
                    sigla_time: "EXFC",
                    imagem_time: "teste.png",
                    Observacao: "teste"
                }
            }
            #swagger.responses[201] = {
                description: 'Time criado com sucesso',
                schema: {
                    id: 1,
                    nome_time: "Exemplo FC",
                    sigla_time: "EXFC",
                    imagem_time: "teste.png",
                    Observacao: "teste",
                    data_registro: "27/05/2024"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/team', teamsController.getTeam
        /* 
            #swagger.tags = ["Time"]
            #swagger.summary = 'Obtém a lista de times'
            #swagger.responses[200] = {
                description: 'Lista de times',
                schema: [
                    {
                        id: 1,
                        nome_time: "Exemplo FC",
                        sigla_time: "EXFC",
                        Observacao: "teste",
                        data_registro: "27/05/2024"
                    }
                ]
            }
        */
    )
    app.patch('/team/:id', teamsController.patchTeam
        /* 
            #swagger.tags = ["Time"]
            #swagger.summary = 'Atualiza informações de um time'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do time a ser atualizado',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados do time a serem atualizados',
                type: 'json',
                schema: {
                    nome_time: "Exemplo FC",
                    sigla_time: "EXFC",
                    imagem_time: "teste.png",
                    Observacao: "teste",
                    data_registro: "27/05/2024"
                }
            }
            #swagger.responses[200] = {
                description: 'Time atualizado com sucesso',
                schema: {
                    id: 1,
                    nome_time: "Exemplo FC",
                    sigla_time: "EXFC",
                    imagem_time: "teste.png",
                    Observacao: "teste",
                    data_registro: "27/05/2024"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Time não encontrado'
            }
            #swagger.responses[500] = {
                description: 'Erro ao atualizar time'
            }
        */
    )
    app.delete('/team/:id', teamsController.deleteTeam
        /* 
            #swagger.tags = ["Time"]
            #swagger.summary = 'Remove um time'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do time a ser removido',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[404] = {
                description: 'Time não encontrado'
            }
        */
    )
}
