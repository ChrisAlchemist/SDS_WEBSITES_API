const { Router } = require("express");
const router = Router();
const controller = require("./catalogosController");
const token = require("../token/tokenController");

/**
 * @swagger
 *  /api/catalogo/emisores:
 *  get:
 *     tags:
 *       - Catalogos
 *     description: Servicio que proporciona el listado de entes Emisores disponibles para las operativas de Cash In, Cash Out y Pago Móvil.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Response emisores
 *         schema:
 *           $ref: '#/definitions/ResponseEmisores'
 *
 * definitions:
 *  ResponseEmisores:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: Mensaje de respuesta
 *     modelo: 
 *       type: array
 *       items:
 *          $ref: '#/definitions/ItemEmisor'
 *   xml:
 *     name: ResponseEmisores
 * 
 *  ItemEmisor:
 *   type: object
 *   properties:
 *     idEmisor:
 *       type: integer
 *       description: Identificador del emisor
 *     emisor:
 *       type: string
 *       description: Nombre del emisor
 *   xml:
 *     name: ItemEmisor
 *  
 */

router.get("/emisores", token.validateToken, controller.emisores);

/**
 * @swagger
 *  /api/catalogo/tipoTransaccion:
 *  get:
 *     tags:
 *       - Catalogos
 *     description: Servicio que proporciona el listado de las operativas disponibles de Cash In, Cash Out y Pago Móvil.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Response TipoTransaccion
 *         schema:
 *           $ref: '#/definitions/ResponseTipoTransaccion'
 *
 * definitions:
 *  ResponseTipoTransaccion:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: Mensaje de respuesta
 *     modelo: 
 *       type: array
 *       items:
 *          $ref: '#/definitions/ItemTipoTransaccion'
 *   xml:
 *     name: ResponseTipoTransaccion
 * 
 *  ItemTipoTransaccion:
 *   type: object
 *   properties:
 *     idTipoTransaccion:
 *       type: integer
 *       description: Identificador del tipo de transacción que se puede operar
 *     transaccion:
 *       type: string
 *       description: Nombre del tipo de transacción
 *   xml:
 *     name: ItemTipoTransaccion
 *  
 */

router.get("/tipoTransaccion", token.validateToken, controller.tipoTransaccion);

/**
 * @swagger
 *  /api/catalogo/estatusTransaccion:
 *  get:
 *     tags:
 *       - Catalogos
 *     description: Servicio que proporciona el listado de los estatus disponibles para cada transacción que se realiza acorde a su flujo y afectaciones.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "header"
 *       name: "authorization-pp"
 *       description: token para procesar petición
 *       required: true
 *       example: "Bearer-PP TOKEN"
 *     responses:
 *       200:
 *         description: Response EstatusTransaccion
 *         schema:
 *           $ref: '#/definitions/ResponseEstatusTransaccion'
 *
 * definitions:
 *  ResponseEstatusTransaccion:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: Mensaje de respuesta
 *     modelo: 
 *       type: array
 *       items:
 *          $ref: '#/definitions/ItemEstatusTransaccion'
 *   xml:
 *     name: ResponseEstatusTransaccion
 * 
 *  ItemEstatusTransaccion:
 *   type: object
 *   properties:
 *     idEstatusTransaccion:
 *       type: integer
 *       description: Identificador de los estatus de una transacción.
 *     estatusTransaccion:
 *       type: string
 *       description: Nombre del estatus de la transacción.
 *   xml:
 *     name: ItemEstatusTransaccion
 *  
 */

router.get("/estatusTransaccion", token.validateToken, controller.estatusTransaccion);

module.exports = router;
