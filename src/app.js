const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser')
var winston = require('./config/winston');
const configGlobal = require('./config/config');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

//const swaggerDocument = require('./swagger.json');
const app = express()

//Configuración
app.set("puerto", configGlobal.PORT);
app.set("json spaces", 2);

//Middleware
app.options('*', cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    console.log('Mensaje de Entrada |  Metodo Api: ' + req.url + ' - Ip Request: ' + req.ip + ' - Metodo HTTP: ' + req.method + ' - \\n Body Request: ' + JSON.stringify(req.body));
    let respuesta = res.send;
    res.send = function(data) {
        respuesta.apply(res, arguments);
        console.log('Mensaje de salida : ' + data)
    }
    next();
});

app.get('/', function(req, res) {
    let init = {
        mensaje: 'Ready for TO DO APi...!!',
        version: configGlobal.VERSION
    }
    res.send(init);
});

//'./src/api/**/*.js',
const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'api',
            version: '1.0.0'
        }
    },
    apis: [
        './src/api/cadena/cadena.js',
        './src/api/catalogos/catalogos.js',
        './src/api/token/token.js',
    ],
    host: 'localhost:3020',
    definitions: {
        resp: {
            type: "object",
            properties: {
                id: {
                    type: "integer",
                    format: "int64"
                },
                petId: {
                    type: "integer",
                    format: "int64"
                },
                quantity: {
                    type: "integer",
                    format: "int32"
                },
                status: {
                    type: "string",
                    description: "asdasdsd"
                }
            },
            xml: { name: "resp" }
        }
    },
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/echo", require("./api/echo/echo"));
app.use("/api/token", require("./api/token/token"));
app.use("/api/catalogo", require("./api/catalogos/catalogos"));
app.use("/api/cadena", require("./api/cadena/cadena"));
//app.use("/api/emisor", require("./api/emisor/emisor"));
//app.use("/api/conciliacion", require("./api/conciliacion/conciliacion"));

//inicio de servicio
app.listen(app.get("puerto"), () => {
    console.log("Inicio de servidor", app.get("puerto"));
});
