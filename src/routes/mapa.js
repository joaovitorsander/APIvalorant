const mapsController = require('../controllers/mapa')

module.exports = (app) => {
    app.post('/map', mapsController.newMap)
    app.get('/map', mapsController.getMap)
    app.patch('/map/:id', mapsController.patchMap)
    app.delete('/map/:id', mapsController.deleteMap)
}