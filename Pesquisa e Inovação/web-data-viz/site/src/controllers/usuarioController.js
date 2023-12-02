var usuarioModel = require("../models/usuarioModel");
var armazemModel = require("../models/armazemModel")

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length >= 1) {
                        armazemModel.buscarAcesso(resultadoAutenticar[0].idUsuario).then((resultadoAcesso)=> {
                            armazemModel.buscarSensor(resultadoAcesso[0].fkArmazem).then((resultadoSensor)=> {
                                armazemModel.buscarDadoSensor(resultadoSensor[0].fkArmazem, resultadoSensor[0].idSensor).then((resultadoDadoSensor1)=> {
                                    armazemModel.buscarDadoSensor(resultadoSensor[0].fkArmazem, resultadoSensor[1].idSensor).then((resultadoDadoSensor2)=> {
                                        armazemModel.buscarDadoSensor(resultadoSensor[0].fkArmazem, resultadoSensor[2].idSensor).then((resultadoDadoSensor3)=> {
                                            armazemModel.buscarDadoSensor(resultadoSensor[0].fkArmazem, resultadoSensor[3].idSensor).then((resultadoDadoSensor4)=> {
                                                armazemModel.buscarDadoSensor(resultadoSensor[0].fkArmazem, resultadoSensor[4].idSensor).then((resultadoDadoSensor5)=> {
                                                    console.log(resultadoAcesso)
                                                    res.json({
                                                        idUsuario: resultadoAutenticar[0].idUsuario,
                                                        fkEmpresa: resultadoAcesso[0].fkEmpresa,
                                                        email: resultadoAutenticar[0].email,
                                                        nome: resultadoAutenticar[0].nome,
                                                        tipoUsuario: resultadoAutenticar[0].tipoUsuario,
                                                        fkArmazem: resultadoAcesso,
                                                        sensorArmazem: resultadoSensor,
                                                        dadoSensor1: resultadoDadoSensor1,
                                                        dadoSensor2: resultadoDadoSensor2,
                                                        dadoSensor3: resultadoDadoSensor3,
                                                        dadoSensor4: resultadoDadoSensor4,
                                                        dadoSensor5: resultadoDadoSensor5
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    }
                }) .catch(function(erro){
                    console.log(erro.sqlMessage)
                    res.status(500).send('Erro com o banco')
                })

    }
}

function verificarEmail(req, res) {
    var email = req.body.emailServer;

    usuarioModel.verificarEmail(email)
        .then(
            function (resultadoVerificacao) {
                if (resultadoVerificacao.length == 0) {
                    console.log(JSON.stringify(resultadoVerificacao));
                    res.status(200).json('E-mail válido');
                } else if (resultadoVerificacao.length > 0) {
                    res.status(400).json('E-mail já está em uso')
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                res.status(500).send('Erro ao se conectar com o servidor');
            }
        );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipoUser = req.body.tipoUsuarioServer;
    var armazensSelecionados = req.body.armazens;
    var fkEmpresa = req.body.fkEmpresa;
    console.log('ARRAY NO CONTROLER' + armazensSelecionados)
    
    // var empresaId = req.body.empresaServer;

    // Faça as validações dos valores
    if (
        nome.indexOf("0") >-1 ||
        nome.length < 2 ||
        nome.indexOf(" ") >-1 ||
        nome.indexOf("1") >-1 ||
        nome.indexOf("2") >-1 ||
        nome.indexOf("3") >-1 ||
        nome.indexOf("4") >-1 ||
        nome.indexOf("5") >-1 ||
        nome.indexOf("6") >-1 ||
        nome.indexOf("7") >-1 ||
        nome.indexOf("8") >-1 ||
        nome.indexOf("9") >-1) {
            
        console.log("errou nome")
        res.status(400).json("Seu nome está inválido!");
    } else 
    if (email.indexOf(".com") < email.length - 4 || email.indexOf("@") < 1) {
        
        console.log("erro email")
        res.status(400).json("Seu email está inválido!");
    } else if (senha.length < 8 ) {
        console.log("erro senha")
        res.status(400).json("Sua senha está inválido!");
        // } else if (empresaId == inválido) {
        //     res.status(400).json("Sua empresa está inválido!");
    } else if (tipoUser != "comum" && tipoUser != "administrador"){
        console.log("user errado")
        res.status(400).json("Seu tipo de usuário está inválido!")
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, tipoUser, fkEmpresa)
            .then((resultado) => {
                    usuarioModel.autenticar(email, senha)
                    .then((resultadoAutenticar)=> {
                        usuarioModel.cadastrarAcesso(resultadoAutenticar[0].idUsuario, armazensSelecionados, fkEmpresa)
                        .then(
                            function(resultadoAcesso){
                                    res.status(200).json(resultadoAcesso);
                            }
                        )
                    })
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    verificarEmail,
    autenticar,
    cadastrar
}

