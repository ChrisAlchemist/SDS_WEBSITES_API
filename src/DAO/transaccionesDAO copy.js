const { post } = require("../api/echo/echo");
const db = require("../config/database");

async function registrarTransaccion(postData){
    let response = {};
    try {
        let sql = `CALL SP_REGISTRAR_TRANSACCION(?,?,?,?,?,?,?,?,?,?,?,?)`;
        let result = await db.query(sql,[
          postData.idCliente,
          postData.idEmisor,
          postData.idTipoTransaccion,
          postData.monto,
          postData.idTipoTarget,
          postData.target,
          postData.referenciaCadena,
          postData.sucursal,
          postData.caja,
          postData.cajero,
          postData.fechaTransaccionCadena,
          postData.horaTransaccionCadena
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

async function registrarCashIn(postData){
    let response = {};
    try {
        let sql = `CALL SP_REGISTRAR_CASH_IN(?,?,?,?,?,?,?,?,?,?,?)`;
        let result = await db.query(sql,[
          postData.idCliente,
          postData.idEmisor,
          postData.monto,
          postData.idTipoTarget,
          postData.target,
          postData.cadena,
          postData.referenciaCadena,
          postData.sucursal,
          postData.caja,
          postData.cajero,
          postData.fechaTransaccionCadena,
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

async function consultarTransaccion(postData){
    let response = {}
    try {
        let sql = `CALL SP_CONSULTAR_TRANSACCION(?,?,?)`;
        let result = await db.query(sql,[
          postData.referenciaCadena,
          postData.folioProcesador,
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

async function actualizarTransaccion(folioProcesador,idEstatusTransaccion,mensajeEmisor,
                                     fechaTransaccion,horaTransaccion,folioAutorizacionEmisor, nombreClienteEmisor){
    let response = {};
    try {
        
        let sql = `CALL SP_ACTUALIZAR_TRANSACCION(?,?,?,?,?,?,?)`;
        let result = await db.query(sql,[
          folioProcesador,
          idEstatusTransaccion,
          mensajeEmisor,
          fechaTransaccion,
          horaTransaccion,
          folioAutorizacionEmisor,
          nombreClienteEmisor
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

async function actualizarTransaccionCashIn(folioProcesador,idEstatusTransaccion,mensajeEmisor,
                                     fechaTransaccion,horaTransaccion,folioAutorizacionEmisor){
    let response = {};
    try {
        
        let sql = `CALL SP_ACTUALIZAR_TRANSACCION_CASH_IN(?,?,?,?,?,?)`;
        let result = await db.query(sql,[
          folioProcesador,
          idEstatusTransaccion,
          mensajeEmisor,
          fechaTransaccion,
          horaTransaccion,
          folioAutorizacionEmisor
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

async function transaccionesTarget(postData){
    let response = {};
    try {
        let sql = `CALL SP_CONSULTAR_TRANSACCIONES_TARGET(?,?,?,?)`;
        let result = await db.query(sql,[
            postData.idTipoTransaccion,
            postData.idTipoTarget,
            postData.target,
            postData.idEmisor
        ]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if(response.estatus == 200){
            response.modelo = JSON.parse(JSON.stringify(result[1]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}

  async function consultarReverso(postData){
    let response = {}
    try {
        let sql = `CALL SP_CONSULTAR_REVERSO(?,?,?)`;
        let result = await db.query(sql,[
          postData.idCliente,
          postData.idEmisor,
          postData.folioProcesador
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

module.exports = {
    registrarTransaccion,
    registrarCashIn,
    actualizarTransaccion,
    transaccionesTarget,
    consultarTransaccion,
    actualizarTransaccionCashIn,
    consultarReverso
}
