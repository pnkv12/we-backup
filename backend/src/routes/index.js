const siteRouter = require('./site')
const apiRouter = require('./api')

function route(app) {

    app.use('/v1', apiRouter)

    app.use('/', siteRouter)

}


module.exports = route