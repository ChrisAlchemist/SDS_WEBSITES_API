const tokenDAO = require("../../DAO/tokenDAO");
var jwt = require('jsonwebtoken')
const configGlobal = require('../../config/config');
var jwtClave = configGlobal.JWT_KEY;
var jwtTiempoToken = 60 * 60 * 24; // expires in 24 hours
const utils = require("../../api/utilerias/utils")

async function generarToken(req, res) {
    try {
        const postData = req.body;
        if (Object.keys(postData).length !== 0) {
            let data = await tokenDAO.validarCredencialesCliente(postData.usuario, postData.password)
            if (data.estatus == 200) {
                let token = generateTokenUser(data.modelo);
                data.modelo = {}
                data.modelo.token = token
            }
            return res.status(200).json(data);
        } else {
            res.status(400).json(utils.postDataInvalido(postData));
        }
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}

function generateTokenUser(user) {
    try {
        var token = jwt.sign(user, jwtClave, {
            expiresIn: jwtTiempoToken
        })
        return token;
    }
    catch (err) {
        throw err;
    }
}

function validateToken(request, response, next) {
    var token = request.headers['authorization-pp']
    var result = { estatus: -1, mensaje: " " }

    if (!token) {
        result.mensaje = "Authentication token is required."
        return response.status(401).json(result);
    }
    if (!token.includes("Bearer-PP")) {
        result.mensaje = "Authentication bearer is required."
        return response.status(401).json(result);
    }
    token = token.replace('Bearer-PP ', '')
    jwt.verify(token, jwtClave, function (err, user) {
        if (err) {
            result.mensaje = "Invalid Token.";
            return response.status(401).json(result);
        } else {
            result.mensaje = "Valid Token."
            result.estatus = 200;
            request.body.usuario = user;
            return next();
        }
    });

}

module.exports = {
    generarToken,
    validateToken,
    generateTokenUser
}
