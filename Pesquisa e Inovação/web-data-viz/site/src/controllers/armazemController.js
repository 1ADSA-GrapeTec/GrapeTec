var armazemModel = require("../models/armazemModel");

function buscarArmazemPorEmpresa(req, res) {
    var idUsuario = req.params.idUsuario

    armazemModel.buscarArmazemPorEmpresa(idUsuario).then((resultado) => {
        if(resultado.length > 0) {
            res.status(200).json(resultado)
        }else {
            res.stats(200).json([])
        }
    }).catch(function(erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
};

function visaoGeral(req, res){
    console.log('Estou no visão geral do controller')
    var idEmpresa = req.body.idEmpresa;
    var idUsuario = req.body.idUsuario;

    armazemModel.visaoGeral(idEmpresa, idUsuario)
    .then(
        function(resultadoSelect){
            console.log(resultadoSelect);
            res.status(201).json(resultadoSelect);
        }
    );
};

module.exports = {
    buscarArmazemPorEmpresa,
    visaoGeral
}