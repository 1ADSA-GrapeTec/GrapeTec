var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idUsuario, nome, email, fkEmpresa, tipoUsuario FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, tipoUser, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkEmpresa, tipoUsuario) VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa},'${tipoUser}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarEmail(email){
    console.log('Estou no verificarEmail() do models');

    var instrucao = `
    SELECT email FROM usuario WHERE email = '${email}';
    `

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarAcesso(idUsuario, armazensSelecionados, fkEmpresa){
    console.log('ARRAY NO MODEL' + armazensSelecionados) 
    var instrucao = `
    INSERT INTO acesso (fkUsuario, fkEmpresa, fkArmazem) VALUES
    `
    for(var i = 0; i < armazensSelecionados.length; i++){
        if(i == armazensSelecionados.length - 1){
            instrucao += `
            (${idUsuario}, ${fkEmpresa}, ${armazensSelecionados[i]});
            `
        } else{
            instrucao += `
            (${idUsuario}, ${fkEmpresa}, ${armazensSelecionados[i]}),
            `
        };
    };
    console.log('Executando instrução SQL: ' + instrucao)
    return database.executar(instrucao);
};

module.exports = {
    cadastrarAcesso,
    verificarEmail,
    autenticar,
    cadastrar
};