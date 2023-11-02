const AccountRouter = require('./AccountRouter.js');
const UserRouter = require('./UserRouter.js');
const CategoryRouter = require('./CategoryRouter.js');
const SubCategoryRouter = require('./SubCategoryRouter.js');
const ProductRouter = require('./ProductRouter.js');
const FeedbackRouter = require('./FeedbackRouter.js');
const OrderRouter = require('./OrderRouter.js');
const AddressShippingRouter = require('./AddressShippingRouter.js');
const ShippingRouter = require('./ShippingRouter.js');
const CompanyRouter = require('./CompanyRouter.js');
const InvoiceRouter = require('./InvoiceRouter.js');
const inventoryRouter = require('./InventoryRouter.js');
const adminRouter = require('./AdminRouter.js');
const routes = (app) => {
    /**
     * @openapi
     * /test-swagger:
     *   get:
     *     tag: 
     *       description: TestSwagger
     *       responses:
     *         200:
     *           description: Swagger is running 
     */
    app.get('/test-swagger', (req, res) => res.sendStatus(200))
    app.use('/api/account', AccountRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/subCategory', SubCategoryRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/feedback', FeedbackRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/address', AddressShippingRouter)
    app.use('/api/shipping', ShippingRouter)
    app.use('/api/company', CompanyRouter)
    app.use('/api/invoice', InvoiceRouter)
    app.use('/api/inventory', inventoryRouter)
    app.use('/api/admin', adminRouter)
}
module.exports = routes
