const Usuario = require('./usuario')
const Mapa = require('./mapa')
const Time = require('./time')

module.exports = (app) => {
    Usuario(app)
    Mapa(app)
    Time(app)
}