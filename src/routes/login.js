const loginController = require('../controllers/login')

module.exports = (app) => {
    app.post('/login', loginController.authenticateUser
        /*   
            #swagger.tags = ["Login"]
            #swagger.summary = 'Autenticação do usuário'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para autenticar o usuário',
                type: 'json',
                schema: {
                    nick_usuario: "brabo123",
                    senha: "senha123"
                }
            }
            #swagger.responses[200] = {
                description: 'Usuário logado com sucesso'
            }
            #swagger.responses[401] = {
                description: 'Usuário sem permissão'
            }
            #swagger.responses[404] = {
                description: 'Usuário não encontrado'
            }
            #swagger.responses[500] = {
                description: 'Erro de servidor'
            }
        */
    )
}