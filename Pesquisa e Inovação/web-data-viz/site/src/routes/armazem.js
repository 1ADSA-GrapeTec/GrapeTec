var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

router.post("/visaoGeral", function (req, res) {
    armazemController.visaoGeral(req, res);
});

router.post("/buscarArmazemPorEmpresa", function (req, res) {
    armazemController.buscarArmazemPorEmpresa(req, res);
});

module.exports = router;