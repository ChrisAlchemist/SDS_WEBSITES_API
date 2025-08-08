const transaccionDAO = require("../../DAO/transaccionDAO");
const utils = require("../utilerias/utils");
const apiEmisor = require("../../vendors/emisor/emisor")

async function consultarTargetEmisor(req, res) {
    try {
        const postData = req.body;
        postData.idCliente = req.body.usuario.idCliente;
        if (Object.keys(postData).length !== 0) {
            postData.idTipoTarget = utils.getTipoTarget(postData.target);
            if(postData.idTipoTarget == utils.TIPO_TARGET.NINGUNO){
                delete postData.idTipoTarget;
                return res.status(500).json(utils.postDataInvalido(postData));
            }else{
                let responseUrl = await transaccionDAO.obtenerUrlEmisor(postData.idEmisor, utils.TIPO_URL_EMISOR.CONSULTAR_TITULAR);
                if (responseUrl.estatus == 200) {
                    const urlData = {url: responseUrl.modelo.urlEmisor, target: postData.target}
                    let respuestaEmisor = await apiEmisor.obtenerTitularEmisor(urlData)
                    return res.status(200).json(respuestaEmisor);
                }else{
                    return res.status(200).json(responseUrl);
                }
            }
        } else {
            return res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        return res.status(500).json(utils.errorGenerico(ex));
    }
}

async function consultarTransaccion(req, res) {
    try {
        const postData = req.body;
        postData.idCliente = req.body.usuario.idCliente;
        if (Object.keys(postData).length !== 0) {
            postData.idTipoTarget = utils.getTipoTarget(postData.target);
            if(postData.idTipoTarget == utils.TIPO_TARGET.NINGUNO){
                delete postData.idTipoTarget;
                return res.status(500).json(utils.postDataInvalido(postData));
            }else{
                let response = await transaccionDAO.consultarTransaccion(postData);
                return res.status(200).json(response);
            }
        } else {
            return res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        return res.status(500).json(utils.errorGenerico(ex));
    }
}

//#region CASH IN 
async function registrarCashIn(req, res) {
    try {
        const postData = req.body;
        postData.idCliente = req.body.usuario.idCliente;
        if (Object.keys(postData).length !== 0) {
            postData.idTipoTarget = utils.getTipoTarget(postData.target);
            if(postData.idTipoTarget == utils.TIPO_TARGET.NINGUNO){
                delete postData.idTipoTarget;
                return res.status(500).json(utils.postDataInvalido(postData));
            }else{
                let transaccion = await transaccionDAO.registrarCashIn(postData);
                if (transaccion.estatus == 200) {
                    transaccion = transaccion.modelo;
                    let respuestaEmisor = await apiEmisor.confirmarCashInEmisor(transaccion)
                    let idEstatusTransaccion = await utils.estatusTransaccionCashIn(respuestaEmisor.estatus)
                    let folioEmisor = ''
                    let titularEmisor = ''
                    let fechaTransaccionEmisor = '';
                    let leyendaEmisor = '';
    
                    if (respuestaEmisor.estatus == 200) {
                        folioEmisor = respuestaEmisor.modelo.folioEmisor
                        fechaTransaccionEmisor = respuestaEmisor.modelo.fechaTransaccionEmisor
                        titularEmisor = respuestaEmisor.modelo.titularEmisor
                        leyendaEmisor = respuestaEmisor.modelo.leyendaEmisor
                    }
    
                    let transaccionActualizada = await transaccionDAO.actualizarCashIn(
                        {
                            idTransaccion: transaccion.idTransaccion,
                            idEstatusTransaccion,
                            folioEmisor,
                            mensajeEmisor: respuestaEmisor.mensaje,
                            fechaTransaccionEmisor,
                            titularEmisor,
                            leyendaEmisor
                        }
                    )
    
                    const {estatus,mensaje} = transaccionActualizada;
                    let response = {estatus,mensaje};
                    if (estatus == 200) {
                        //enviamos solamente el response abreviado para la cadena que solicito el cash in
                        const { folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor } = transaccionActualizada.modelo;
                        response.modelo = {folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor};
                    }
                    return res.status(200).json(response);
                } else {
                    return res.status(200).json(transaccion);
                }
            }
        } else {
            return res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        return res.status(500).json(utils.errorGenerico(ex));
    }
}

async function reversarCashIn(req, res) {
    try {
        const postData = req.body;
        postData.idCliente = req.body.usuario.idCliente;
        if (Object.keys(postData).length !== 0) {
            let transaccionReverso = await transaccionDAO.consultarReversoCashIn(postData);
            if (transaccionReverso.estatus == 200) {
                transaccionReverso = transaccionReverso.modelo;
                const responseUrl = await transaccionDAO.obtenerUrlEmisor(postData.idEmisor, utils.TIPO_URL_EMISOR.SOLICITUD_REVERSO_CASH_IN);
                if (responseUrl.estatus == 200) {
                    transaccionReverso.url = responseUrl.modelo.urlEmisor;
                    let respuestaReversoEmisor = await apiEmisor.reversoCashInEmisor(transaccionReverso);
                    let idEstatusTransaccion = await utils.estatusTransaccionReverso(respuestaReversoEmisor.estatus);
    
                    let fechaTransaccionEmisor = '';
                    if (respuestaReversoEmisor.estatus == 200) {
                        fechaTransaccionEmisor = respuestaReversoEmisor.modelo.fechaTransaccionEmisor
                    }

                    let transaccionReversoActualizada = await transaccionDAO.actualizarCashIn(
                        {
                            idTransaccion: transaccionReverso.idTransaccion,
                            idEstatusTransaccion,
                            folioEmisor: transaccionReverso.folioEmisor,
                            mensajeEmisor: respuestaReversoEmisor.mensaje,
                            fechaTransaccionEmisor,
                        }
                    )
    
                    const {estatus,mensaje} = transaccionReversoActualizada;
                    let response = {estatus,mensaje};
                    if (estatus == 200) {
                        //enviamos solamente el response abreviado para la cadena que solicito el cash in
                        const { folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor } = transaccionReversoActualizada.modelo;
                        response.modelo = {folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor};
                    }
                    return res.status(200).json(response);
                }                 
            } else {
                return res.status(200).json(transaccionReverso);
            }
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}
//#endregion CASH IN 

//#region CASH OUT
async function registrarCashOut(req, res) {
    try {
        const postData = req.body;
        postData.idCliente = req.body.usuario.idCliente;
        if (Object.keys(postData).length !== 0) {
            postData.idTipoTarget = utils.getTipoTarget(postData.target);
            if(postData.idTipoTarget == utils.TIPO_TARGET.NINGUNO){
                delete postData.idTipoTarget;
                return res.status(500).json(utils.postDataInvalido(postData));
            }else{
                let transaccion = await transaccionDAO.registrarCashOut(postData);
                if (transaccion.estatus == 200) {
                    transaccion = transaccion.modelo;
                    let respuestaEmisor = await apiEmisor.confirmarCashOutEmisor(transaccion)
                    let idEstatusTransaccion = await utils.estatusTransaccionCashOut(respuestaEmisor.estatus)
                    let folioEmisor = ''
                    let titularEmisor = ''
                    let fechaTransaccionEmisor = '';
                    let leyendaEmisor = '';
    
                    if (respuestaEmisor.estatus == 200) {
                        folioEmisor = respuestaEmisor.modelo.folioEmisor
                        fechaTransaccionEmisor = respuestaEmisor.modelo.fechaTransaccionEmisor
                        titularEmisor = respuestaEmisor.modelo.titularEmisor
                        leyendaEmisor = respuestaEmisor.modelo.leyendaEmisor
                    }
    
                    let transaccionActualizada = await transaccionDAO.actualizarCashOut(
                        {
                            idTransaccion: transaccion.idTransaccion,
                            idEstatusTransaccion,
                            folioEmisor,
                            mensajeEmisor: respuestaEmisor.mensaje,
                            fechaTransaccionEmisor,
                            titularEmisor,
                            leyendaEmisor
                        }
                    )
    
                    const {estatus,mensaje} = transaccionActualizada;
                    let response = {estatus,mensaje};
                    if (estatus == 200) {
                        //enviamos solamente el response abreviado para la cadena que solicito el cash in
                        const { folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor } = transaccionActualizada.modelo;
                        response.modelo = {folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor};
                    }
                    return res.status(200).json(response);
                } else {
                    return res.status(200).json(transaccion);
                }
            }
        } else {
            return res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        return res.status(500).json(utils.errorGenerico(ex));
    }
}

async function reversarCashOut(req, res) {
    try {
        const postData = req.body;
        postData.idCliente = req.body.usuario.idCliente;
        if (Object.keys(postData).length !== 0) {
            let transaccionReverso = await transaccionDAO.consultarReversoCashOut(postData);
            if (transaccionReverso.estatus == 200) {
                transaccionReverso = transaccionReverso.modelo;
                const responseUrl = await transaccionDAO.obtenerUrlEmisor(postData.idEmisor, utils.TIPO_URL_EMISOR.SOLICITUD_REVERSO_CASH_OUT);
                if (responseUrl.estatus == 200) {
                    transaccionReverso.url = responseUrl.modelo.urlEmisor;
                    let respuestaReversoEmisor = await apiEmisor.reversoCashOutEmisor(transaccionReverso);
                    let idEstatusTransaccion = await utils.estatusTransaccionReverso(respuestaReversoEmisor.estatus);
    
                    let fechaTransaccionEmisor = '';
                    if (respuestaReversoEmisor.estatus == 200) {
                        fechaTransaccionEmisor = respuestaReversoEmisor.modelo.fechaTransaccionEmisor
                    }

                    let transaccionReversoActualizada = await transaccionDAO.actualizarCashOut(
                        {
                            idTransaccion: transaccionReverso.idTransaccion,
                            idEstatusTransaccion,
                            folioEmisor: transaccionReverso.folioEmisor,
                            mensajeEmisor: respuestaReversoEmisor.mensaje,
                            fechaTransaccionEmisor,
                        }
                    )
    
                    const {estatus,mensaje} = transaccionReversoActualizada;
                    let response = {estatus,mensaje};
                    if (estatus == 200) {
                        //enviamos solamente el response abreviado para la cadena que solicito el cash in
                        const { folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor } = transaccionReversoActualizada.modelo;
                        response.modelo = {folioTransaccion, fechaTransaccion, emisor, folioEmisor, leyendaEmisor};
                    }
                    return res.status(200).json(response);
                }                 
            } else {
                return res.status(200).json(transaccionReverso);
            }
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}
//#endregion CASH OUT

module.exports = {
    consultarTargetEmisor,
    consultarTransaccion,
    registrarCashIn,
    reversarCashIn,
    registrarCashOut,
    reversarCashOut
}
