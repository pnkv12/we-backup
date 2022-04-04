const siteRouter = require('./site')
const endPointRouter = require('./endpoint')

function route(app) {

    app.use('/v1.0', endPointRouter)

    app.use('/', siteRouter)

}

module.exports = route