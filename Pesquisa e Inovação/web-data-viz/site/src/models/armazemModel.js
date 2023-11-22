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

<<<<<<< HEAD
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
=======
function buscarDadoSensor(fkArmazem, idSensor) {
    instrucaoSql = `select * from dadosensor where fkArmazem = ${fkArmazem} and fkSensor = ${idSensor} order by idDadoSensor desc limit 24`
    
>>>>>>> 0fea7187ebe7ea52f73317bceb6e68c040525280
    console.log("Executando a instrução SQL: \n" + instrucaoSql)
    return database.executar(instrucaoSql)
}

module.exports = {
<<<<<<< HEAD
    buscarArmazemPorEmpresa,
    buscarDadoSensor,
    visaoGeral
=======
    buscarAcesso,
    buscarSensor,
    buscarDadoSensor
>>>>>>> 0fea7187ebe7ea52f73317bceb6e68c040525280
}