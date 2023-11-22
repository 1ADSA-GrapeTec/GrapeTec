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

function visaoGeral(idEmpresa, idUsuario) {
    instrucaoSql = `
    SELECT
    AVG(ds.temperatura) tempMedia,
    ar.idArmazem,
    ar.fkEmpresa empresaArmazem,
    v.tipoVinho,
    v.tempCritQuente,
    v.tempAlertaQuente,
    v.temperaturaIdeal,
    v.tempAlertaFrio,
    v.tempCritFrio,
    en.rua,
    en.numero,
    en.bairro,
    en.estado,
    en.cidade,
    en.pais
    FROM dadosensor ds
    JOIN sensor
    ON sensor.idSensor = ds.fkSensor
    AND sensor.fkArmazem = ds.fkArmazem
    AND sensor.fkEmpresa = ds.fkEmpresa
    JOIN armazem ar
    ON sensor.fkArmazem = ar.idArmazem
    AND sensor.fkEmpresa = ar.fkEmpresa
    JOIN acesso acs
    ON acs.fkEmpresa = ar.fkEmpresa
    AND acs.fkArmazem = ar.idArmazem
    JOIN usuario usr
    ON usr.idUsuario = acs.fkUsuario
    AND usr.fkEmpresa = acs.fkEmpresa
    JOIN vinho v
    ON ar.fkVinho = v.idVinho
    JOIN endereco en
    ON en.idEndereco = ar.fkEndereco
    WHERE acs.fkEmpresa = ${idEmpresa} AND acs.fkUsuario = ${idUsuario} AND ds.dtAtual = (SELECT MAX(dtAtual) FROM dadoSensor) GROUP BY ar.idArmazem;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarArmazemPorEmpresa,
    buscarDadoSensor,
    visaoGeral
}