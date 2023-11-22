var database = require("../database/config");

function buscarAcesso(usuarioId) {
 instrucaoSql = `select fkArmazem from acesso where fkUsuario = ${usuarioId}`;

 console.log("Exexcutando a instrução SQL: \n" + instrucaoSql)
 return database.executar(instrucaoSql);
}

function buscarSensor(fkArmazem) {
    instrucaoSql = `select * from sensor where  fkArmazem=${fkArmazem}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarDadoSensor(fkArmazem, idSensor) {
    instrucaoSql = `select * from dadosensor where fkArmazem = ${fkArmazem} and fkSensor = ${idSensor} order by idDadoSensor desc limit 24`
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarAcesso,
    buscarSensor,
    buscarDadoSensor
}