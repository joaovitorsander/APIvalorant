const usuariosController = require('../controllers/usuario')
const authMiddleware = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.post('/user', authMiddleware, usuariosController.newUser
        /*   
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Cria um novo usuário'
            #swagger.parameters['json'] = {
                in: 'body',
                description: 'Dados para criar um novo usuário',
                type: 'json',
                schema: {
                    nome_de_usuario: "Exemplo Nome",
                    nick_usuario: "brabo123",
                    imagem_perfil: "image.png",
                    senha: "senha123"
                }
            }
            #swagger.responses[201] = {
                description: 'Usuário criado com sucesso',
                schema: {
                    id: 1,
                    nome_de_usuario: "Exemplo Nome",
                    nick_usuario: "brabo123",
                    data_registro: "26/05/2024"
                }
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
    )
    app.get('/user', authMiddleware, usuariosController.getUser
        /* 
            #swagger.tags = ["Usuário"]
            #swagger.summary = 'Obtém a lista de usuários'
            #swagger.responses[200] = {
                description: 'Lista de usuários',
                schema: [
                    {
                        usuario_id: 1,
                        nome_de_usuario: "Exemplo Nome",
                        nick_usuario: "exemplo@email.com",
                        data_registro: "26/05/2024"
                    }
                ]
            }
        */
    )
    app.patch('/user/:id', authMiddleware, usuariosController.patchUser
    /* 
        #swagger.tags = ["Usuário"]
        #swagger.summary = 'Atualiza um usuário'
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
                nome_de_usuario: "Novo Nome",
                nick_usuario: "Novo Nick",
                imagem_perfil: "nova_imagem_url",
                senha: "nova_senha"
            }
        }
        #swagger.responses[200] = {
            description: 'Usuário atualizado com sucesso',
            schema: {
                id: 1,
                nome_de_usuario: "Novo Nome",
                nick_usuario: "Novo Nick",
                imagem_perfil: "nova_imagem_url",
                senha: "nova_senha"
            }
        }
        #swagger.responses[400] = {
            description: 'Dados inválidos'
        }
        #swagger.responses[404] = {
            description: 'Usuário não encontrado'
        }
        #swagger.responses[500] = {
            description: 'Erro ao atualizar usuário'
        }
    */
)
    app.delete('/user/:id', authMiddleware, usuariosController.deleteUser
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
            #swagger.responses[404] = {
                description: 'Usuário não encontrado'
            }
        */
    )
}
