const Usuario = require('./usuario')
const Mapa = require('./mapa')
const Time = require('./time')
const Agente = require('./agente');
const Camp = require('./camp')

module.exports = (app) => {
    Usuario(app)
    Mapa(app)
    Time(app)
    Agente(app)
    Camp(app)
}