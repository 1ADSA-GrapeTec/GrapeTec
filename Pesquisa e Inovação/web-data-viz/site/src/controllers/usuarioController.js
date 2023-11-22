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
                        armazemModel.buscarArmazemPorEmpresa(resultadoAutenticar[0].fkEmpresa).then((resultadoArmazem)=> {
                            if(resultadoArmazem.length > 0) {
                                armazemModel.buscarDadoSensor(resultadoArmazem[0].idSensor).then((resultadoDadoSensor1)=> {
                                    armazemModel.buscarDadoSensor(resultadoArmazem[1].idSensor).then((resultadoDadoSensor2)=> {
                                        armazemModel.buscarDadoSensor(resultadoArmazem[2].idSensor).then((resultadoDadoSensor3)=> {
                                            armazemModel.buscarDadoSensor(resultadoArmazem[3].idSensor).then((resultadoDadoSensor4)=> {
                                                armazemModel.buscarDadoSensor(resultadoArmazem[4].idSensor).then((resultadoDadoSensor5)=> {
                                                    res.json({
                                                        email:resultadoAutenticar[0].email,
                                                        nome:resultadoAutenticar[0].nome,
                                                        tipoUsuario:resultadoAutenticar[0].tipoUsuario,
                                                        fkEmpresa:resultadoAutenticar[0].fkEmpresa,
                                                        idUsuario:resultadoAutenticar[0].idUsuario,
                                                        fkArmazem:resultadoArmazem,
                                                        fkSensor1: resultadoDadoSensor1,
                                                        fkSensor2: resultadoDadoSensor2,
                                                        fkSensor3: resultadoDadoSensor3,
                                                        fkSensor4: resultadoDadoSensor4,
                                                        fkSensor5: resultadoDadoSensor5
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                                
                            }
                        })
                    }

                });

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
        usuarioModel.cadastrar(nome, email, senha, tipoUser)
            .then(
                function (resultado) {
                    res.json(resultado);
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