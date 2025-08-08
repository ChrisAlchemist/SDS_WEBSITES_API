const db = require("../config/database");

async function validarCredencialesCliente(usuario, password) {
    let response = {};
    try {
        let sql = `CALL SP_VALIDAR_CREDENCIALES_CLIENTE (?,?)`;
        let result = await db.query(sql, [usuario, password]);
        response = JSON.parse(JSON.stringify(result[0][0]));
        if (response.estatus == 200) {
            response.modelo = JSON.parse(JSON.stringify(result[1][0]));
        }
        return response;
    } catch (ex) {
        throw ex;
    }
}


module.exports = {
    validarCredencialesCliente
}
