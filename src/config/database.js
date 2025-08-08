var mysql = require('mysql');
const { promisify } = require("util");
const winston = require("./winston");
const configGlobal = require('./config');

const config = {
    host: configGlobal.HOST_BD,
    user: configGlobal.USER_BD,
    password: configGlobal.PASSWORD_BD,
    database: configGlobal.DATABASE,
    port: configGlobal.PORT_BD,
    multipleStatements: true,
    typeCast: function castField(field, useDefaultTypeCasting) {
        // We only want to cast bit fields that have a single-bit in them. If the field
        // has more than one bit, then we cannot assume it is supposed to be a Boolean.
        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            // A Buffer in Node represents a collection of 8-bit unsigned integers.
            // Therefore, our single "bit field" comes back as the bits '0000 0001',
            // which is equivalent to the number 1.
            return (bytes[0] === 1);

        }
        return (useDefaultTypeCasting());
    }
};

const mysqlPool = mysql.createPool(config);
//const mysqlPool = mysql.createConnection(config);
mysqlPool.query = promisify(mysqlPool.query); // Magic happens here, Promisify for Node.js async/await.

mysqlPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            winston.error("Se ha perdido la conexión con la base de datos");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            winston.error("Se ha llegado al limite de conexiones con la base de datos");
        }
        if (err.code === "ECONNREFUSED") {
            winston.error("Se ha rechazado la conexión con la base de datos");
        }
    }
    if (connection) {
        connection.release();
        winston.info("Se ha logrado la conexión con la base de datos");
    }
});
module.exports = mysqlPool;