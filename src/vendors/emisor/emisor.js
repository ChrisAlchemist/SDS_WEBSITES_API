const axios = require("axios");
const configGlobal = require('../../config/config');
const ERROR_INTEGRACION_EMISOR = 'An integration error occurred, please try again later.'
//generacion de token para pp

async function obtenerTokenEmisor() {
    try {
        var header = { headers: { "Content-Type": 'application/json' } }
        var postData = {
            username: configGlobal.USER_NAME_PAGACEL,
            password: configGlobal.PASS_NAME_PAGACEL
        }
        return new Promise((resolve, reject) => {
            let path = configGlobal.URL_API_PP
            axios.post(path, postData, header)
                .then(function (response) {
                    let res = {
                        estatus: response.data.estatus,
                        mensaje: response.data.mensaje
                    }
                    if (response.data.estatus == 200) {
                        res.modelo = response.data.modelo
                    }

                    return resolve(res);
                })
                .catch(function (error) {
                    let data = { "estatus": -1, "mensaje": error.message }
                    console.log('[obtenerTokenEmisor]',data);
                    return resolve(data);
                });
        });

    } catch (error) {
        return { "estatus": -1, "mensaje": error.message }
    }
}

async function obtenerTitularEmisor(urlData) {
    try {
        const token = await obtenerTokenEmisor();
        if(token.estatus != 200){
            throw { "estatus": -1, "mensaje": ERROR_INTEGRACION_EMISOR }
        }
        var header = { headers: { 
            "Content-Type": 'application/json',
            "authorization-pp": `Bearer ${token.modelo.token}`
        }}
        var postData = {
            target: urlData.target,
        }
        return new Promise((resolve, reject) => {
            if (!configGlobal.DEBUG) {
                let path = urlData.url
                axios.post(path, postData, header)
                    .then(function (response) {

                        let res = {
                            estatus: response.data.estatus,
                            mensaje: response.data.mensaje
                        }
                        if (response.data.estatus == 200) {
                            const { target, titularEmisor, leyendaEmisor } = response.data.modelo
                            res.modelo = { target, titularEmisor, leyendaEmisor };
                        }

                        return resolve(res);
                    })
                    .catch(function (error) {
                        let data = { "estatus": -1, "mensaje": error.message }
                        return reject(data);
                    });
            } else {
                let data = {
                    estatus: 200,
                    mensaje: "Titular encontrado correctamente",
                    modelo: {
                        target: Math.floor(Math.random() * (90000 - 10000)),
                        titularEmisor: 'Test',
                        leyendaEmisor: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
                    }
                }
                return resolve(data);
            }
        });

    } catch (error) {
        console.log('[obtenerTitularEmisor]',error)
        return { "estatus": -1, "mensaje": error.message }
    }
}

async function confirmarCashInEmisor(transaccion) {
    try {
        const token = await obtenerTokenEmisor();
        if(token.estatus != 200){
            throw { "estatus": -1, "mensaje": ERROR_INTEGRACION_EMISOR }
        }
        var header = { headers: { 
            "Content-Type": 'application/json',
            "authorization-pp": `Bearer ${token.modelo.token}`
        }}

        var postData = {
            monto: transaccion.monto,
            target: transaccion.target,
            cadena: transaccion.cadena,
            folioCadena: transaccion.folioCadena,
            sucursal: transaccion.sucursal,
            caja: transaccion.caja,
            cajero: transaccion.cajero,
            fechaTransaccionCadena: transaccion.fechaTransaccionCadena,
            folioTransaccion: transaccion.folioTransaccion,
        }

        return new Promise((resolve, reject) => {
            if (!configGlobal.DEBUG) {
                let path = transaccion.urlSolicitudCashIn
                axios.post(path, postData, header)
                    .then(function (response) {

                        let res = {
                            estatus: response.data.estatus,
                            mensaje: response.data.mensaje
                        }
                        if (response.data.estatus == 200) {
                            res.modelo = response.data.modelo
                        }

                        return resolve(res);
                    })
                    .catch(function (error) {
                        let data = { "estatus": -1, "mensaje": error.message }
                        return reject(data);
                    });
            } else {
                let data = {
                    estatus: 200,
                    mensaje: "CashIn autorizado correctamente",
                    modelo: {
                        folioEmisor: Math.floor(Math.random() * (90000 - 10000)),
                        titularEmisor: 'Test Apellidos',
                        fechaTransaccionEmisor: "2023-07-12T04:08:36",
                        leyendaTransaccionEmisor: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
                    }
                }
                return resolve(data);
            }
        });

    } catch (error) {
        return { "estatus": -1, "mensaje": error.message };
    }
}

async function reversoCashInEmisor(transaccion) {
    try {

        const token = await obtenerTokenEmisor();
        if(token.estatus != 200){
            throw { "estatus": -1, "mensaje": ERROR_INTEGRACION_EMISOR }
        }
        var header = { headers: { 
            "Content-Type": 'application/json',
            "authorization-pp": `Bearer ${token.modelo.token}`
        }}

        var postData = {
            folioCadena: transaccion.folioCadena,
            folioTransaccion: transaccion.folioTransaccion,
            target: transaccion.target,
        }

        return new Promise((resolve, reject) => {
            if (!configGlobal.DEBUG) {

                let path = transaccion.url
                axios.post(path, postData, header)
                    .then(function (response) {

                        let res = {
                            estatus: response.data.estatus,
                            mensaje: response.data.mensaje
                        }
                        if (response.data.estatus == 200) {
                            res.modelo = response.data.modelo
                        }

                        return resolve(res);
                    })
                    .catch(function (error) {
                        let data = { "estatus": -1, "mensaje": error.message }
                        return reject(data);
                    });

            } else {
                let data = {
                    estatus: 200,
                    mensaje: "Reverso realizado exitosamente",
                    modelo: {
                        folioEmisor: Math.floor(Math.random() * (90000 - 10000)),
                        fechaTransaccionEmisor: "05-11-2021",
                        leyendaTransaccionEmisor: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
                    }
                }
                return resolve(data);
            }
        });

    } catch (error) {
        return { "estatus": -1, "mensaje": error.message }
    }
}

async function confirmarCashOutEmisor(transaccion) {
    try {
        const token = await obtenerTokenEmisor();
        if(token.estatus != 200){
            throw { "estatus": -1, "mensaje": ERROR_INTEGRACION_EMISOR }
        }
        var header = { headers: { 
            "Content-Type": 'application/json',
            "authorization-pp": `Bearer ${token.modelo.token}`
        }}

        var postData = {
            monto: transaccion.monto,
            target: transaccion.target,
            cadena: transaccion.cadena,
            folioCadena: transaccion.folioCadena,
            sucursal: transaccion.sucursal,
            caja: transaccion.caja,
            cajero: transaccion.cajero,
            fechaTransaccionCadena: transaccion.fechaTransaccionCadena,
            folioTransaccion: transaccion.folioTransaccion,
            idTipoOperacion: 2,
        }

        return new Promise((resolve, reject) => {
            if (!configGlobal.DEBUG) {
                let path = transaccion.urlSolicitudCashOut
                axios.post(path, postData, header)
                    .then(function (response) {

                        let res = {
                            estatus: response.data.estatus,
                            mensaje: response.data.mensaje
                        }
                        if (response.data.estatus == 200) {
                            res.modelo = response.data.modelo
                        }

                        return resolve(res);
                    })
                    .catch(function (error) {
                        let data = { "estatus": -1, "mensaje": error.message }
                        return reject(data);
                    });
            } else {
                let data = {
                    estatus: 200,
                    mensaje: "CashIn autorizado correctamente",
                    modelo: {
                        folioEmisor: Math.floor(Math.random() * (90000 - 10000)),
                        titularEmisor: 'Test Apellidos',
                        fechaTransaccionEmisor: "2023-07-12T04:08:36",
                        leyendaTransaccionEmisor: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
                    }
                }
                return resolve(data);
            }
        });

    } catch (error) {
        return { "estatus": -1, "mensaje": error.message };
    }
}

async function reversoCashOutEmisor(transaccion) {
    try {

        const token = await obtenerTokenEmisor();
        if(token.estatus != 200){
            throw { "estatus": -1, "mensaje": ERROR_INTEGRACION_EMISOR }
        }
        var header = { headers: { 
            "Content-Type": 'application/json',
            "authorization-pp": `Bearer ${token.modelo.token}`
        }}

        var postData = {
            folioCadena: transaccion.folioCadena,
            folioTransaccion: transaccion.folioTransaccion,
            target: transaccion.target,
            idTipoOperacion: 2
        }

        return new Promise((resolve, reject) => {
            if (!configGlobal.DEBUG) {
                let path = transaccion.url
                axios.post(path, postData, header)
                    .then(function (response) {

                        let res = {
                            estatus: response.data.estatus,
                            mensaje: response.data.mensaje
                        }
                        if (response.data.estatus == 200) {
                            res.modelo = response.data.modelo
                        }

                        return resolve(res);
                    })
                    .catch(function (error) {
                        let data = { "estatus": -1, "mensaje": error.message }
                        return reject(data);
                    });

            } else {
                let data = {
                    estatus: 200,
                    mensaje: "Reverso de cash out realizado exitosamente",
                    modelo: {
                        folioEmisor: Math.floor(Math.random() * (90000 - 10000)),
                        fechaTransaccionEmisor: "05-11-2021",
                        leyendaTransaccionEmisor: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`
                    }
                }
                return resolve(data);
            }
        });

    } catch (error) {
        return { "estatus": -1, "mensaje": error.mensaje }
    }
}

async function solicitudTransaccionEmisor(transaccion) {
    try {

        var header = { headers: { "authorization-pp": '' } }

        var postData = {
            "idTipoTransaccion": transaccion.idTipoTransaccion,
            "cadena": transaccion.cadena,
            "referenciaCadena": transaccion.referenciaCadena,
            "monto": transaccion.monto,
            "idTipoTarget": transaccion.idTipoTarget,
            "target": transaccion.target,
            "fechaTransaccionCadena": transaccion.fechaTransaccionCadena,
            "horaTransaccionCadena": transaccion.horaTransaccionCadena,
            "folioProcesador": transaccion.folioProcesador
        }

        return new Promise((resolve, reject) => {
            if (!configGlobal.DEBUG) {

                let path = transaccion.urlSolicitudTransaccion + "/transaccionEmisor/solicitudTransaccion"
                axios.post(path, postData, header)
                    .then(function (response) {

                        let res = {
                            estatus: response.data.estatus,
                            mensaje: response.data.mensaje
                        }
                        if (response.data.estatus == 200) {
                            res.modelo = response.data.modelo
                        }

                        return resolve(res);
                    })
                    .catch(function (error) {
                        let data = { "estatus": -1, "mensaje": error.message }
                        return reject(data);
                    });

            } else {
                let data = {
                    "estatus": 200,
                    "mensaje": "usuario existe",
                    "modelo": {
                        "folioProcesador": transaccion.folioProcesador,
                        "folioAutorizacionEmisor": Math.floor(Math.random() * (90000 - 10000)),
                        "nombreClienteEmisor": "Test Developer"
                    }
                }
                return resolve(data);
            }
        });

    } catch (error) {
        return { "estatus": -1, "mensaje": error.message }
    }
}

module.exports = {
    obtenerTitularEmisor,
    //Cash in
    confirmarCashInEmisor,
    reversoCashInEmisor,
    //Cash out
    confirmarCashOutEmisor,
    reversoCashOutEmisor,
    //
    solicitudTransaccionEmisor,
}
