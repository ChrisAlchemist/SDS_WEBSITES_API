const db = require("../config/database");

async function emisores() {
    let response = {};
    try {
        let sql = `CALL SP_CONSULTAR_EMISORES()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function tipoTransaccion() {
    let response = {};
    try {
        let sql = `CALL SP_CONSULTAR_TIPO_TRANSACCION()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function estatusTransaccion() {
    let response = {};
    try {
        let sql = `CALL SP_CONSULTAR_ESTATUS_TRANSACCION()`;
        let result = await db.query(sql);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function clientes(activos=1) {
    let response = {};
    try {
        let sql = `CALL SP_CONSULTAR_CLIENTES(?)`;
        const params = [activos]
        let result = await db.query(sql,params);
        response = JSON.parse(JSON.stringify(result[0]));
        return response;
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    emisores,
    tipoTransaccion,
    estatusTransaccion,
    clientes
}
