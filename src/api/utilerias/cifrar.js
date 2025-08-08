const CryptoAES = require('crypto-js/aes');
const CryptoENC = require('crypto-js/enc-utf8');
const crypto = require('crypto');
var BTOA = require('btoa');
const configGlobal = require('../../config/config');
const key = 'PagaPhone'


async function encriptarContrasenaApi(texto) {
  let encryptPass = await encodeURIComponent(CryptoAES.encrypt(JSON.stringify(texto), key).toString());

  try {
    return encryptPass
  } catch (error) {
    throw error;
  }
}

async function desencriptarContrasenaApi(texto) {
  var encryptPass = await CryptoAES.decrypt(decodeURIComponent(texto), key);
  var originalPass = await JSON.parse(encryptPass.toString(CryptoENC));
  if (originalPass == '') {
    originalPass = texto
  }

  return originalPass
}

async function generarContrasena(texto) {
  try {
    return await crypto.createHmac('sha256', key)
      .update(texto)
      .digest('hex');;
  } catch (error) {
    throw error;
  }

}


module.exports = {
  encriptarContrasenaApi,
  desencriptarContrasenaApi,
  generarContrasena
}