const catalogosDAO = require("../../DAO/catalogosDAO");
const utils = require("../../api/utilerias/utils");

async function emisores(req, res) {
  try {
      let data = await catalogosDAO.emisores();
      return res.status(200).json(data);
  } catch (ex) {
      res.status(500).json(utils.errorGenerico(ex));
  }
}

async function tipoTransaccion(req, res) {
    try {
        let data = await catalogosDAO.tipoTransaccion();
        return res.status(200).json(data);
    } catch (ex) {
        res.status(500).json(utils.errorGenerico(ex));
    }
}

async function estatusTransaccion(req, res) {
  try {
      let data = await catalogosDAO.estatusTransaccion();
      return res.status(200).json(data);
  } catch (ex) {
      res.status(500).json(utils.errorGenerico(ex));
  }
}

module.exports = {
  emisores,
  tipoTransaccion,
  estatusTransaccion
}
