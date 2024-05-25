const Usuario = require('./usuario')
const Mapa = require('./mapa')
const Time = require('./time')
const Agente = require('./agente');
const Camp = require('./camp')
const JogadoresTimes = require('./jogadoresTimes')
const Partida = require('./partida')

module.exports = (app) => {
    Usuario(app)
    Mapa(app)
    Time(app)
    Agente(app)
    Camp(app)
    JogadoresTimes(app)
    Partida(app)
}