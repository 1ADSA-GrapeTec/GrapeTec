var database = require("../database/config");

function buscarAcesso(usuarioId) {
<<<<<<< HEAD
    var instrucaoSql = `select fkArmazem, fkEmpresa from acesso where fkUsuario = ${usuarioId}`;
=======
 instrucaoSql = `
 SELECT
 fkArmazem, 
 armazem.fkEmpresa, 
 rua, 
 numero 
 FROM acesso 
 JOIN armazem 
 ON fkArmazem = idArmazem 
 JOIN endereco 
 ON fkEndereco = idEndereco 
 WHERE fkUsuario = ${usuarioId}`;
>>>>>>> 762ccd103ab1de4a2aec89a46815bf9f0b565e62

 console.log("Executando a instrução SQL: \n" + instrucaoSql)
 return database.executar(instrucaoSql);
}

function buscarSensor(fkArmazem) {
    var instrucaoSql = `select * from sensor where  fkArmazem = ${fkArmazem}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function buscarArmazemPorEmpresa(idEmpresa){
    var instrucaoSql = `
    SELECT 
    idArmazem, 
    rua, 
    numero 
    FROM armazem 
    JOIN endereco 
    ON fkEndereco = idEndereco 
    WHERE armazem.fkEmpresa = ${idEmpresa} `
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

function visaoGeral(idEmpresa, idUsuario) {
    var instrucaoSql = `
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
function buscarDadoSensor(fkArmazem, idSensor) {
    var instrucaoSql = `select * from dadosensor where fkArmazem = ${fkArmazem} and fkSensor = ${idSensor} order by idDadoSensor desc limit 24`
    

    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
    buscarArmazemPorEmpresa,
    buscarDadoSensor,
    visaoGeral,
    buscarAcesso,
    buscarSensor,
    buscarDadoSensor
}