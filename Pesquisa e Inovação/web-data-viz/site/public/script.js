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
        window.location.href = 'dashboardArmazem1.html'; // window.location.href é uma propriedade JavaScript que contém o endereço completo (URL) da página atual no navegador. Ela é usada para acessar o endereço da página ou redirecionar o navegador para outro URL, controlando a navegação web.
    }else{
        alert('Usuario e/ou senha invalidos')
    }
}

function calcular () {
    var armazenamento = Number(litrosArmazenados.value)
    var lucro = Number(lucroAnual.value)
    var litrosVendidos = armazenamento * 0.75
    var lucroMaximo = armazenamento * lucro/litrosVendidos
    var perdaVinho = armazenamento * 0.25
    var perdaDinheiro = lucroMaximo - lucro
    var reduzirPerda = perdaVinho * 0.6
    var reduzirPerdaDinheiro = reduzirPerda*perdaDinheiro/perdaVinho

    exibirPerda.innerHTML =
    `
    <p>Conforme foi informado a quantidade de vinho que a sua empresa armazena é de ${armazenamento} litros, e o seu lucro anual é de R$${lucro}.<br><br>
    A média de perda de vinho causada por falta de controle de temperatura é de cerda de 25%, o que para a sua empresa significa uma perda de aproximadamente ${perdaVinho} litros. Esses litros perdidos representam aproximadamente R$${Math.round(perdaDinheiro)}, por tanto seu lucro total poderia ser de R$${Math.round(lucroMaximo)}.<br><br>
    Com a nossa solução sua empresa pode reduzir em até 60% a suas perdas, o que representa aproximadamente ${reduzirPerda} litros ou em dinheiro cerca de R$${Math.round(reduzirPerdaDinheiro)}.</p>
    `
}