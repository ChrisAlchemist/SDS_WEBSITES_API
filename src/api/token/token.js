const { Router } = require("express");
const router = Router();
const controller = require("./tokenController");

/**
 * @swagger
 *  /api/token/generarToken:
 *  post:
 *     tags:
 *       - GenerarToken
 *     description: Servicio que proporciona un Token, mismo que debe de ser enviado en la petición del consumo de servicios en el encabezado de seguridad basado en JWT.
 *     produces:
 *       - application/json
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Estructura del request para la peticion del servicio"
 *       required: true
 *       schema:
 *         $ref: "#/definitions/RequestGenerarToken"
 *     responses:
 *       200:
 *         description: Response GenerarToken
 *         schema:
 *           $ref: '#/definitions/ResponseGenerarToken'
 *
 * definitions:
 *  RequestGenerarToken:
 *   type: object
 *   properties:
 *     usuario:
 *       type: string
 *       description: Usuario proporcionado por CloudTransfer.
 *     password:
 *       type: string
 *       description: Contraseña proporcionada por CloudTransfer.
 *   xml:
 *     name: RequestGenerarToken
 * 
 *  ResponseGenerarToken:
 *   type: object
 *   properties:
 *     estatus:
 *       type: integer
 *       description: código de respuesta <>200 representa un error
 *     mensaje:
 *       type: string
 *       description: mensaje de respuesta
 *     modelo:
 *         type: array
 *         items:
 *            $ref: '#/definitions/ItemToken'
 *   xml:
 *     name: ResponseGenerarToken
 * 
 *  ItemToken:
 *   type: object
 *   properties:
 *     token:
 *       type: string
 *       description: token para consumo de servicios
 *   xml:
 *     name: ItemToken
 *  
 */

router.post("/generarToken",controller.generarToken);

module.exports = router;
