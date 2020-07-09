const apiRoutes = require('./api/routes')

module.exports = (app) => {
    app.get('/', (req, res) => res.send({error: false, message: 'Welcome to the template. Check /status for tracking the api status.'}))
    //status api for live tracking app
    app.get('/status', (req, res) => { res.sendStatus(200) })
    app.use('/api', apiRoutes)

}