const mapsController = require('../controllers/mapa')

module.exports = (app) => {
    app.post('/map', mapsController.newMap)
    app.get('/map', mapsController.getMap)
    app.delete('/map/:id', mapsController.deleteMap)
}