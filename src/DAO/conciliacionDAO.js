const db = require("../config/database");

async function conciliacion(postData) {
    let response = {};
    try {
        let sql = `CALL SP_CONCILIACION_TIPO_TRANSACCION(?,?,?)`;
        const params = [postData.idTipoTransaccion, postData.fechaConciliacion,postData.idCliente]
        let result = await db.query(sql,params);
        response.header = JSON.parse(JSON.stringify(result[0][0]));
        response.registros = JSON.parse(JSON.stringify(result[1]));
        response.footer = JSON.parse(JSON.stringify(result[2][0]));
        return response;
    } catch (ex) {
        throw ex;
    }
}

module.exports = {
    conciliacion
}
