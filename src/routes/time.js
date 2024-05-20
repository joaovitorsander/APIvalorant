const teamsController = require('../controllers/time')

module.exports = (app) => {
    app.post('/team', teamsController.newTeam)
    app.get('/team', teamsController.getTeam)
    app.patch('/team/:id', teamsController.patchTeam)
    app.delete('/team/:id', teamsController.deleteTeam)
}