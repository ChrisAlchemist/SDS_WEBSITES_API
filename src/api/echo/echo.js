const { Router } = require("express");
const router = Router();
const controller = require("./echoController.js");

router.get("/",controller.echo);

module.exports = router;