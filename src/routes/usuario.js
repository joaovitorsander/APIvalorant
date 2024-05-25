const usuariosController = require('../controllers/usuario')

module.exports = (app) => {
    app.post('/user', usuariosController.newUser
        /*   
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Cria um novo usuário'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo usuário',
                type: 'json',
                schema: {
                    nome: "Exemplo Nome",
                    nick: "brabo123",
                    email: "exemplo@email.com",
                    senha: "senha123"
                }
            }
            #swagger.responses[201] = {
                description: 'Usuário criado com sucesso',
                schema: {
                    id: 1,
                    nome: "Exemplo Nome",
                    email: "exemplo@email.com"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/user', usuariosController.getUser
        /* 
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Obtém a lista de usuários'
            #swagger.responses[200] = {
                description: 'Lista de usuários',
                schema: [
                    {
                        id: 1,
                        nome: "Exemplo Nome",
                        email: "exemplo@email.com"
                    }
                ]
            }
        */
    )
    app.patch('/user/:id', usuariosController.patchUser
        /* 
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Atualiza informações de um usuário'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do usuário a ser atualizado',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados do usuário a serem atualizados',
                type: 'json',
                schema: {
                    nome: "Novo Nome",
                    email: "novo@email.com"
                }
            }
            #swagger.responses[200] = {
                description: 'Usuário atualizado com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
            #swagger.responses[404] = {
                description: 'Usuário não encontrado'
            }
        */
    )
    app.delete('/user/:id', usuariosController.deleteUser
        /* 
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Remove um usuário'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID do usuário a ser removido',
                required: true,
                type: 'integer',
                example: 1
            }
            #swagger.responses[200] = {
                description: 'Usuário removido com sucesso'
            }
            #swagger.responses[404] = {
                description: 'Usuário não encontrado'
            }
        */
    )
}
