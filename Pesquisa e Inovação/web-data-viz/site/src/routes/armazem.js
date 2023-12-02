var express = require("express");
var router = express.Router();

var armazemController = require("../controllers/armazemController");

router.post("/visaoGeral", function (req, res) {
    armazemController.visaoGeral(req, res);
});

router.post("/buscarArmazemPorEmpresa", function (req, res) {
    armazemController.buscarArmazemPorEmpresa(req, res);
});

router.post("/gerarDados", function(req, res){
    armazemController.gerarDados(req,res);
});

router.post("/buscarDadoNovo", function(req, res){
    armazemController.buscarDadoNovo(req,res);
});

module.exports = router;