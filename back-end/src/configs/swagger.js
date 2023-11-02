const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc')
// const swaggerDocument = require('./swagger.json');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SDN301',
            version: '1.0.0'
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    schema: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
    },
    apis: ['src/routes/index.js', 'src/models/*.js']
}
const swaggerSpec = swaggerJSDoc(options)
function swaggerDocs(app, port) {
    //Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Docs in json format
    app.get('docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        app.send(swaggerSpec)
    })
}
module.exports = {
    swaggerDocs
}