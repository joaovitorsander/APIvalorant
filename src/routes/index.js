const Usuario = require('./usuario')
const Mapa = require('./mapa')

module.exports = (app) => {
    Usuario(app)
    Mapa(app)
}