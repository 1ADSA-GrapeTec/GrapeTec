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

function login(){
    const email = 'usuario@sptech.school'
    const senha = 'sptech123'

    var emailDigitado = id_email.value;
    var senhaDigitada = id_senha.value;

    if(emailDigitado == email && senhaDigitada == senha){
        alert('Login efetuado!');
        window.location.href = 'dashboard.html'; // window.location.href é uma propriedade JavaScript que contém o endereço completo (URL) da página atual no navegador. Ela é usada para acessar o endereço da página ou redirecionar o navegador para outro URL, controlando a navegação web.
    }else{
        alert('Usuario e/ou senha invalidos')
    }
}