const db = require("../config/database");


async function obtenerUrlEmisor(idEmisor,tipoUrl) {
    let response = {};
    try {
        let sql = `CALL SP_CONSULTAR_URL_EMISOR(?,?)`;
        const params = [idEmisor, tipoUrl]
        let result = await db.query(sql, params);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function consultarTransaccion(postData){
    let response = {}
    try {
        let sql = `CALL SP_CONSULTAR_TRANSACCION(?,?,?,?,?)`;
        let result = await db.query(sql,[
          postData.idCliente,
          postData.idEmisor,
          postData.folioCadena,
          postData.target,
          postData.idTipoTransaccion
        ]);
        
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}
//#region  Cash In
async function registrarCashIn(postData) {
    let response = {};
    try {
        let sql = `CALL SP_REGISTRAR_CASH_IN(?,?,?,?,?,?,?,?,?,?,?)`;
        const params = [postData.idCliente,
        postData.idEmisor,
        postData.monto,
        postData.idTipoTarget,
        postData.target,
        postData.folioCadena,
        postData.cadena,
        postData.sucursal,
        postData.caja,
        postData.cajero,
        postData.fechaTransaccionCadena
        ]
        let result = await db.query(sql, params);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function actualizarCashIn(postData = { idTransaccion, idEstatusTransaccion, folioEmisor, mensajeEmisor, fechaTransaccionEmisor, titularEmisor, leyendaEmisor }) {
    let response = {};
    try {
        let sql = `CALL SP_ACTUALIZAR_TRANSACCION_CASH_IN(?,?,?,?,?,?,?)`;
        const params = [
            postData.idTransaccion,
            postData.idEstatusTransaccion,
            postData.folioEmisor,
            postData.mensajeEmisor,
            postData.fechaTransaccionEmisor,
            postData.titularEmisor,
            postData.leyendaEmisor || ''
        ]
        let result = await db.query(sql, params);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function consultarReversoCashIn(postData){
    let response = {}
    try {
        let sql = `CALL SP_CONSULTAR_REVERSO_CASH_IN(?,?,?,?)`;
        let result = await db.query(sql,[
          postData.idCliente,
          postData.idEmisor,
          postData.folioCadena,
          postData.target
        ]);
        
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}
//#endregion  Cash In

//#region  Cash out 
async function registrarCashOut(postData) {
    let response = {};
    try {
        let sql = `CALL SP_REGISTRAR_CASH_OUT(?,?,?,?,?,?,?,?,?,?,?)`;
        const params = [postData.idCliente,
        postData.idEmisor,
        postData.monto,
        postData.idTipoTarget,
        postData.target,
        postData.folioCadena,
        postData.cadena,
        postData.sucursal,
        postData.caja,
        postData.cajero,
        postData.fechaTransaccionCadena
        ]
        let result = await db.query(sql, params);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function actualizarCashOut(postData = { idTransaccion, idEstatusTransaccion, folioEmisor, mensajeEmisor, fechaTransaccionEmisor, titularEmisor, leyendaEmisor }) {
    let response = {};
    try {
        let sql = `CALL SP_ACTUALIZAR_TRANSACCION_CASH_OUT(?,?,?,?,?,?,?)`;
        const params = [
            postData.idTransaccion,
            postData.idEstatusTransaccion,
            postData.folioEmisor,
            postData.mensajeEmisor,
            postData.fechaTransaccionEmisor,
            postData.titularEmisor,
            postData.leyendaEmisor
        ]
        let result = await db.query(sql, params);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

async function consultarReversoCashOut(postData){
    let response = {}
    try {
        let sql = `CALL SP_CONSULTAR_REVERSO_CASH_OUT(?,?,?,?)`;
        let result = await db.query(sql,[
          postData.idCliente,
          postData.idEmisor,
          postData.folioCadena,
          postData.target
        ]);
        
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}
//#endregion Cash out 




module.exports = {
    obtenerUrlEmisor,
    consultarTransaccion,
    registrarCashIn,
    actualizarCashIn,
    consultarReversoCashIn,
    registrarCashOut,
    actualizarCashOut,
    consultarReversoCashOut
}
