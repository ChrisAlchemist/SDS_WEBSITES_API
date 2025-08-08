const { Router } = require("express");
const router = Router();
const controller = require("./cadenaController");
const token = require("../token/tokenController");

/**
 * @swagger
 *  /api/cadena/consultarTargetEmisor:
 *  post:
 *     tags:
 *       - Cadena
 *     description: Este servicio debe de ser consumido por la cadena comercial para conocer al titular de la cuenta solicitado.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestConsultarTargetEmisor"
 *     responses:
 *       200:
 *         description: Response ConsultarTargetEmisor
 *         schema:
 *           $ref: '#/definitions/ConsultarTargetEmisor'
 *
 * definitions:
 *  RequestConsultarTargetEmisor:
 *   type: object
 *   properties:
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *   xml:
 *     name: RequestConsultarTargetEmisor
 * 
 *  ConsultarTargetEmisor:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *       $ref: '#/definitions/ItemConsultarTargetEmisor'
 *   xml:
 *     name: ConsultarTargetEmisor
 * 
 *  ItemConsultarTargetEmisor:
 *   type: object
 *   properties:
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *     titularEmisor:
 *       type: string
 *       description: Nombre del titular de la entidad emisora.
 *     leyendaEmisor:
 *       type: string
 *       description: Leyenda dirigida al usuario final por parte de su entidad Emisora.
 *   xml:
 *     name: ItemConsultarTargetEmisor
 * 
 */
router.post("/consultarTargetEmisor", token.validateToken, controller.consultarTargetEmisor);

/**
 * @swagger
 *  /api/cadena/consultarTransaccion:
 *  post:
 *     tags:
 *       - Cadena
 *     description: Este servicio debe de ser consumido por la cadena comercial para conocer el estatus de una transacción.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestConsultarTransaccion"
 *     responses:
 *       200:
 *         description: Response ConsultarTransaccion
 *         schema:
 *           $ref: '#/definitions/ConsultarTransaccion'
 *
 * definitions:
 *  RequestConsultarTransaccion:
 *   type: object
 *   properties:
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor.
 *     folioCadena:
 *       type: string
 *       description: Folio generado por el comercio.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *     idTipoTransaccion:
 *       type: integer
 *       description: Identificador del tipo de transaferencia.  1.- CashIn, 2.-CashOut
 *   xml:
 *     name: RequestConsultarTransaccion
 * 
 *  ConsultarTransaccion:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *       $ref: '#/definitions/ItemConsultarTransaccion'
 *   xml:
 *     name: ConsultarTransaccion
 * 
 *  ItemConsultarTransaccion:
 *   type: object
 *   properties:
 *     cadena:
 *       type: string
 *       description: Nombre de la cadena que emitio la transacción
 *     folioEmisor:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por la entidad Emisora del usuario.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *     folioTransaccion:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por el Procesador.
 *     fechaTransaccion:
 *       type: string
 *       format: YYYY-MM-DD
 *       description: Fecha de registro de la transacción emitida por el Procesador.
 *     monto:
 *       type: number
 *       multipleOf: 0.01
 *       format: 2 decimales
 *       description: Cantidad por la que se efectúa la transacción.
 *     estatusTransaccion:
 *       type: integer
 *       description: Descripción del estado actual de la transacción.
 *   xml:
 *     name: ItemConsultarTransaccion
 * 
 */
router.post("/consultarTransaccion", token.validateToken, controller.consultarTransaccion);

//#region CASH IN 
/**
 * @swagger
 *  /api/cadena/registrarCashIn:
 *  post:
 *     tags:
 *       - Cadena
 *     description: Este servicio debe de ser consumido por la cadena comercial para realizar una transacción de tipo Cash In.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestRegistrarCashIn"
 *     responses:
 *       200:
 *         description: Response ResponseRegistrarCashIn
 *         schema:
 *           $ref: '#/definitions/ResponseRegistrarCashIn'
 *
 * definitions:
 *  RequestRegistrarCashIn:
 *   type: object
 *   properties:
 *     monto:
 *       type: number
 *       multipleOf: 0.01
 *       format: 2 decimales
 *       description: Cantidad por la que se efectúa la transacción.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor.
 *     cadena:
 *       type: string
 *       description: Nombre de la cadena comercial donde se realiza la transacción.
 *     folioCadena:
 *       type: string
 *       format: maximo 12
 *       description: Identificador de la transacción por parte de la cadena comercial de la transacción a efectuar.
 *     sucursal:
 *       type: string
 *       description: Nombre de la sucursal de la cadena comercial donde se realiza la transacción.
 *     caja:
 *       type: string
 *       description: Descripción de la caja de la cadena comercial donde se realiza la transacción.
 *     cajero:
 *       type: string
 *       description: Descripción / identificador del operador de la cadena comercial donde se realiza la transacción.
 *     fechaTransaccionCadena:
 *       type: string
 *       format: YYYY-MM-DDThh:mm:ss
 *       description: Fecha y hora de registro de la transacción por parte de la cadena comercial.
 *   xml:
 *     name: RequestRegistrarCashIn
 * 
 *  ResponseRegistrarCashIn:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *       $ref: '#/definitions/ItemRegistrarCashIn'
 *   xml:
 *     name: ResponseRegistrarCashIn
 * 
 *  ItemRegistrarCashIn:
 *   type: object
 *   properties:
 *     folioTransaccion:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por el Procesador.
 *     fechaTransaccion:
 *       type: string
 *       format: YYYY-MM-DDThh:mm:ss
 *       description: Fecha y hora de registro de la transacción por parte del procesador.
 *     emisor:
 *       type: string
 *       description: Nombre de la entidad Emisora.
 *     folioEmisor:
 *       type: string
 *       format: maximo 12
 *       description: Identificador unico de la transacción emitido por la entidad Emisora.
 *     leyendaEmisor:
 *       type: string
 *       description: Leyenda dirigida al usuario final por parte de su entidad Emisora.
 *   xml:
 *     name: ItemRegistrarCashIn
 * 
 */
router.post("/registrarCashIn", token.validateToken, controller.registrarCashIn);

/**
 * @swagger
 *  /api/cadena/reversarCashIn:
 *  post:
 *     tags:
 *       - Cadena
 *     description: Este servicio debe de consumido por la cadena comercial para poder procesar una petición de reverso por parte de un usuario final o una cadena comercial.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestReversarCashIn"
 *     responses:
 *       200:
 *         description: Response ReversarCashIn
 *         schema:
 *           $ref: '#/definitions/ResponseReversarCashIn'
 *
 * definitions:
 *  RequestReversarCashIn:
 *   type: object
 *   properties:
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor.
 *     folioCadena:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por la Cadena Comercial.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *   xml:
 *     name: RequestReversarCashIn
 * 
 *  ResponseReversarCashIn:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *       $ref: '#/definitions/ItemReversarCashIn'
 *   xml:
 *     name: ResponseReversarCashIn
 * 
 *  ItemReversarCashIn:
 *   type: object
 *   properties:
 *     folioTransaccion:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por el Procesador.
 *     fechaTransaccion:
 *       type: string
 *       format: YYYY-MM-DDThh:mm:ss
 *       description: Fecha y hora de registro de la transacción por parte del procesador.
 *     emisor:
 *       type: string
 *       description: Nombre de la entidad Emisora.
 *     folioEmisor:
 *       type: string
 *       format: maximo 12
 *       description: Identificador unico de la transacción emitido por la entidad Emisora.
 *     leyendaEmisor:
 *       type: string
 *       description: Leyenda dirigida al usuario final por parte de su entidad Emisora.
 *   xml:
 *     name: ItemReversarCashIn
 * 
 */
router.post("/reversarCashIn", token.validateToken, controller.reversarCashIn);
//#endregion CASH IN 

//#region CASH OUT
/**
 * @swagger
 *  /api/cadena/registrarCashOut:
 *  post:
 *     tags:
 *       - Cadena
 *     description: Este servicio debe de ser consumido por la cadena comercial para realizar una transacción de tipo Cash Out.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestRegistrarCashOut"
 *     responses:
 *       200:
 *         description: Response ResponseRegistrarCashOut
 *         schema:
 *           $ref: '#/definitions/ResponseRegistrarCashOut'
 *
 * definitions:
 *  RequestRegistrarCashOut:
 *   type: object
 *   properties:
 *     monto:
 *       type: number
 *       multipleOf: 0.01
 *       format: 2 decimales
 *       description: Cantidad por la que se efectúa la transacción.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor.
 *     cadena:
 *       type: string
 *       description: Nombre de la cadena comercial donde se realiza la transacción.
 *     folioCadena:
 *       type: string
 *       format: maximo 12
 *       description: Identificador de la transacción por parte de la cadena comercial de la transacción a efectuar.
 *     sucursal:
 *       type: string
 *       description: Nombre de la sucursal de la cadena comercial donde se realiza la transacción.
 *     caja:
 *       type: string
 *       description: Descripción de la caja de la cadena comercial donde se realiza la transacción.
 *     cajero:
 *       type: string
 *       description: Descripción / identificador del operador de la cadena comercial donde se realiza la transacción.
 *     fechaTransaccionCadena:
 *       type: string
 *       format: YYYY-MM-DDThh:mm:ss
 *       description: Fecha y hora de registro de la transacción por parte de la cadena comercial.
 *   xml:
 *     name: RequestRegistrarCashOut
 * 
 *  ResponseRegistrarCashOut:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *       $ref: '#/definitions/ItemRegistrarCashOut'
 *   xml:
 *     name: ResponseRegistrarCashOut
 * 
 *  ItemRegistrarCashOut:
 *   type: object
 *   properties:
 *     folioTransaccion:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por el Procesador.
 *     fechaTransaccion:
 *       type: string
 *       format: YYYY-MM-DDThh:mm:ss
 *       description: Fecha y hora de registro de la transacción por parte del procesador.
 *     emisor:
 *       type: string
 *       description: Nombre de la entidad Emisora.
 *     folioEmisor:
 *       type: string
 *       format: maximo 12
 *       description: Identificador unico de la transacción emitido por la entidad Emisora.
 *     leyendaEmisor:
 *       type: string
 *       description: Leyenda dirigida al usuario final por parte de su entidad Emisora.
 *   xml:
 *     name: ItemRegistrarCashOut
 * 
 */
router.post("/registrarCashOut", token.validateToken, controller.registrarCashOut);

/**
 * @swagger
 *  /api/cadena/reversarCashOut:
 *  post:
 *     tags:
 *       - Cadena
 *     description: Este servicio debe de consumido por la cadena comercial para poder procesar una petición de reverso por parte de un usuario final o una cadena comercial.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestReversarCashOut"
 *     responses:
 *       200:
 *         description: Response ReversarCashOut
 *         schema:
 *           $ref: '#/definitions/ResponseReversarCashOut'
 *
 * definitions:
 *  RequestReversarCashOut:
 *   type: object
 *   properties:
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor.
 *     folioCadena:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por la Cadena Comercial.
 *     target:
 *       type: string
 *       format: minimo 10 / maximo 16
 *       description: Número celular o de tarjeta del cliente de la entidad emisora.
 *   xml:
 *     name: RequestReversarCashOut
 * 
 *  ResponseReversarCashOut:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *       $ref: '#/definitions/ItemReversarCashOut'
 *   xml:
 *     name: ResponseReversarCashOut
 * 
 *  ItemReversarCashOut:
 *   type: object
 *   properties:
 *     folioTransaccion:
 *       type: string
 *       format: maximo 12
 *       description: Folio de identificación única de la transacción emitido por el Procesador.
 *     fechaTransaccion:
 *       type: string
 *       format: YYYY-MM-DDThh:mm:ss
 *       description: Fecha y hora de registro de la transacción por parte del procesador.
 *     emisor:
 *       type: string
 *       description: Nombre de la entidad Emisora.
 *     folioEmisor:
 *       type: string
 *       format: maximo 12
 *       description: Identificador unico de la transacción emitido por la entidad Emisora.
 *     leyendaEmisor:
 *       type: string
 *       description: Leyenda dirigida al usuario final por parte de su entidad Emisora.
 *   xml:
 *     name: ItemReversarCashOut
 * 
 */
router.post("/reversarCashOut", token.validateToken, controller.reversarCashOut);
//#endregion CASH OUT


module.exports = router;
