const agentsController = require('../controllers/agente')

module.exports = (app) => {
    app.post('/agent', agentsController.newAgent
    /*   
        #swagger.tags = ["Agente"]
        #swagger.summary = 'Insere um agente'
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados para inserir um novo agente',
            type: 'json',
            schema: {
                nome_agente: "Cypher",
                sexo: "Masculino",
                habilidade1: "fios",
                habilidade2: "camera",
                habilidade3: "jaula",
                ultimate: "acha todos os inimigos"
            }
        }
        #swagger.responses[201] = {
            description: 'Agente criado com sucesso',
            schema: {
                id: 1,
                nome_agente: "Cypher",
                sexo: "Masculino",
                habilidade1: "fios",
                habilidade2: "camera",
                habilidade3: "jaula",
                ultimate: "acha todos os inimigos"
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
    */
    )

    app.get('/agent', agentsController.getAgent
    /* 
        #swagger.tags = ["Agente"]
        #swagger.summary = 'Consulta lista de agentes cadastrados'
        #swagger.responses[200] = {
            description: 'Lista de agentes',
            schema: [
                {
                    id: 1,
                    nome_agente: "Cypher",
                    sexo: "Masculino",
                    habilidade1: "fios",
                    habilidade2: "camera",
                    habilidade3: "jaula",
                    ultimate: "acha todos os inimigos"
                }
            ]
        }
    */
    )

    app.patch('/agent/:id', agentsController.patchAgent
    /* 
        #swagger.tags = ["Agente"]
        #swagger.summary = 'Atualiza um agente'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id do agente a ser atualizado',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.parameters['json'] = {
            in: 'body',
            description: 'Dados do agente a serem atualizados',
            type: 'json',
            schema: {
                nome_agente: "Cypher",
                sexo: "Masculino",
                habilidade1: "fios",
                habilidade2: "camera",
                habilidade3: "jaula",
                ultimate: "acha todos os inimigos"
            }
        }
        #swagger.responses[200] = {
            description: 'Agente atualizado com sucesso'
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Agente não encontrado'
        }
    */
    )

    app.delete('/agent/:id', agentsController.deleteAgent
    /* 
        #swagger.tags = ["Agente"]
        #swagger.summary = 'Deleta um agente'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Id do agente a ser deletado',
            required: true,
            type: 'integer',
            example: 1
        }
        #swagger.responses[404] = {
            description: 'Agente não encontrado'
        }
    */
    )
}
