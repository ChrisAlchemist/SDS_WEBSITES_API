const winston = require("../../config/winston");
const fs = require('fs');
const { Readable } = require('stream');

const idEstatusTransaccion = {
	REGISTRADA : 1,
    RECHAZADA_POR_EL_EMISOR : 2,
    TRANSACCION_EXITOSA : 3,
    TRANSACCION_PAGADA : 4,
    REVERSO_DE_TRANSACCION : 5,
    REVERSO_DENEGADO_POR_EL_EMISOR : 6,
    RECHAZADA_USUARIO : 7,
    ACEPTADA_USUARIO : 8,
}

const TIPO_TARGET = {
    NINGUNO: 0,
    CELULAR: 1,
    TARJETA: 2,
    CUENTA: 3,
}

const TIPO_URL_EMISOR = {
    NINGUNO: 0,
    SOLICITUD_CASH_IN: 1,
    SOLICITUD_CASH_OUT: 2,
    SOLICITUD_REVERSO_CASH_IN: 3,
    CONSULTAR_TITULAR: 4,
    SOLICITUD_REVERSO_CASH_OUT: 5,
}

const TIPO_TRANSACCION = {
    NINGUNO: 0,
    SOLICITUD_CASH_IN: 1,
    SOLICITUD_CASH_OUT: 2,
}

function getTipoTarget(target){
    if(target){
        const lengthTarget = target.toString().length;
        if(lengthTarget == 10 || lengthTarget == 16 || lengthTarget == 18){
            return lengthTarget == 10 ? TIPO_TARGET.CELULAR : (lengthTarget == 16 ? TIPO_TARGET.TARJETA : TIPO_TARGET.CUENTA)
        }
    }
    return TIPO_TARGET.NINGUNO
}

async function estatusTransaccionCashIn(estatus){
    if(estatus == 200)
     return idEstatusTransaccion.TRANSACCION_EXITOSA
    else if (estatus == 101)
     return idEstatusTransaccion.RECHAZADA_POR_EL_EMISOR
}

async function estatusTransaccionCashOut(estatus){
    if(estatus == 200)
     return idEstatusTransaccion.TRANSACCION_EXITOSA
    else if (estatus == 101)
     return idEstatusTransaccion.RECHAZADA_POR_EL_EMISOR
}

async function estatusTransaccionReverso(estatus){
    if(estatus == 200)
     return idEstatusTransaccion.REVERSO_DE_TRANSACCION
    else if (estatus == 101)
     return idEstatusTransaccion.REVERSO_DENEGADO_POR_EL_EMISOR
}

function postDataInvalido(postData) {
    if(postData.usuario){
        postData.usuario = undefined
    }

    return {
        estatus: -1,
        mensaje: "Por favor revisa los parametro de entrada.",
        error: postData
    }
}

function errorGenerico(ex) {
    winston.error(ex);
    return {
        estatus: -1,
        mensaje: "Ocurrio un error interno, por favor contactar a soporte tecnico.",
        error: `${ex.mensaje ? ex.mensaje: ''} ${ex.message ? ex.message: ''} ${ex.stack? ex.stack: ''}`
    }
}

function getDate(){
    var date = new Date();
    date = date.toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
    const parts = date.split(',')[0].split('/');
    return `${parts[2]}-${parts[0]}-${parts[1]}`
}

function generateStreamConciliation(data){
    const contenidoStream = new Readable();
    contenidoStream._read = () => {}; // Esta función es necesaria para un flujo de lectura
    contenidoStream.push(`${data.header.header}\n`);
    for(row of data.registros){
        let rowPipe = '';
        delete row.total; //se borra la propidad q va sumando el total para el footer
        Object.getOwnPropertyNames(row).map(x=> {rowPipe +=`${row[x]}|`});
        rowPipe = rowPipe.slice(0, -1);
        rowPipe +='\n';
        //console.log(rowPipe)
        contenidoStream.push(rowPipe);
    }
    contenidoStream.push(`${data.footer.footer}`);
    return contenidoStream;
}

module.exports = {
    getTipoTarget,
    postDataInvalido,
    errorGenerico,
    idEstatusTransaccion,
    TIPO_TARGET,
    TIPO_URL_EMISOR,
    TIPO_TRANSACCION,
    estatusTransaccionCashIn,
    estatusTransaccionCashOut,
    estatusTransaccionReverso,
    getDate,
    generateStreamConciliation
}
