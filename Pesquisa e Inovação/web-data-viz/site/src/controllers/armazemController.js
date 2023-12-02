var armazemModel = require("../models/armazemModel");

function buscarArmazemPorEmpresa(req, res) {
    var idEmpresa = req.body.idEmpresaServer;

    armazemModel.buscarArmazemPorEmpresa(idEmpresa)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado)
            } else {
                res.stats(400).send('Nenhum armazém cadastrado!')
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
};

function visaoGeral(req, res) {
    console.log('Estou no visão geral do controller')
    var idEmpresa = req.body.idEmpresa;
    var idUsuario = req.body.idUsuario;

    armazemModel.visaoGeral(idEmpresa, idUsuario)
        .then(
            function (resultadoSelect) {
                console.log(resultadoSelect);
                res.status(201).json(resultadoSelect);
            }
        );
};


function gerarDados(req, res) {
    var idArmazem = req.body.idArmazem;
    var sensores = [1, 2, 3, 4, 5];

    armazemModel.gerarDados(idArmazem, sensores[0])
        .then((resultadoS1) => {
            armazemModel.gerarDados(idArmazem, sensores[1])
                .then((resultadoS2) => {
                    armazemModel.gerarDados(idArmazem, sensores[2])
                        .then((resultadoS3) => {
                            armazemModel.gerarDados(idArmazem, sensores[3])
                                .then((resultadoS4) => {
                                    armazemModel.gerarDados(idArmazem, sensores[4])
                                        .then((resultadoS5) => {
                                            console.log(JSON.stringify(resultadoS1))
                                            console.log(JSON.stringify(resultadoS2))
                                            console.log(JSON.stringify(resultadoS3))
                                            console.log(JSON.stringify(resultadoS4))
                                            console.log(JSON.stringify(resultadoS5))
                                            res.json({
                                                resultadoS1: resultadoS1,
                                                resultadoS2: resultadoS2,
                                                resultadoS3: resultadoS3,
                                                resultadoS4: resultadoS4,
                                                resultadoS5: resultadoS5
                                            })
                                        })
                                })
                        })
                })
        }).catch(function (erro) {
            console.log(erro.sqlMessage)
            res.status(500)
        })
}

    function buscarDadoNovo(req, res) {
         var idArmazem = req.body.idArmazem;
         armazemModel.buscarDadoNovo(idArmazem)
         .then(function(dadoObtido){
            if(dadoObtido.length >=1){
                console.log(JSON.stringify(dadoObtido))
                res.json(dadoObtido)
            }else{
                res.status(400).send("dados não obtidos")
            }
         }).catch(function(erro){
            console.log(erro.sqlMessage)
            res.status(500).send("erro ao se comunicar com o servidor")
         })
    }



module.exports = {
    buscarArmazemPorEmpresa,
    visaoGeral,
    gerarDados,
    buscarDadoNovo
}