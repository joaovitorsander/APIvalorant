const agentsController = require('../controllers/agente')

module.exports = (app) => {
    app.post('/agent', agentsController.newAgent)
    app.get('/agent', agentsController.getAgent)
    app.patch('/agent/:id', agentsController.patchAgent)
    app.delete('/agent/:id', agentsController.deleteAgent)
}