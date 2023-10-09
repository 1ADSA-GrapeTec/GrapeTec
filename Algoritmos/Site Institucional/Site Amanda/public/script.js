function verificaEmail(){
    var email = id_email.value;


    id_erroEmail.innerHTML = ""
    if(email.indexOf('@') == -1 || email.indexOf('.') == -1 || email.endsWith("@") == true || email.endsWith(".") == true ){
        id_erroEmail.innerHTML = `Email invalido.`
    } 
}

function verificaSenha(){
    var senha = id_senha.value;

    id_erroSenha.innerHTML = ""
    if(senha.length < 8 ){
        id_erroSenha.innerHTML = `Senha invalida`
    }
}