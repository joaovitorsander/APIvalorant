const usuariosController = require('../controllers/usuario')

module.exports = (app) => {
    app.post('/user', usuariosController.newUser)
    app.get('/user', usuariosController.getUser)
    app.patch('/user/:id', usuariosController.patchUser)
    app.delete('/user/:id', usuariosController.deleteUser)
}