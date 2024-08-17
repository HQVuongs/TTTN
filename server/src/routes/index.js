const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')

const routes = (app) => {
    app.use('/api/product', ProductRouter)
    app.use('/api/user', UserRouter)
}

module.exports = routes