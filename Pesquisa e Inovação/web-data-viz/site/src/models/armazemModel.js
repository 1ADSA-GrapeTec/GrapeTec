var database = require("../database/config");

function buscarArmazemPorEmpresa(empresaId) {
 instrucaoSql = `select * from sensor where fkEmpresa = ${empresaId}`;

 console.log("Exexcutando a instrução SQL: \n" + instrucaoSql)
 return database.executar(instrucaoSql);
}

function buscarDadoSensor(sensorId) {
    instrucaoSql = `select * from dadosensor where fkSensor =${sensorId} ORDER BY idDadoSensor DESC LIMIT 24`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarArmazemPorEmpresa,
    buscarDadoSensor
}