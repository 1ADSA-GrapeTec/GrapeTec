// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function validacao() {
    if (
        sessionStorage.EMAIL_USUARIO == null ||
        sessionStorage.NOME_USUARIO == null ||
        sessionStorage.TIPO_USUARIO == null ||
        sessionStorage.ID_USUARIO == null ||
        sessionStorage.FKEMPRESA_USUARIO == null ||
        sessionStorage.FKARMAZEM_SENSOR == null
    ) {
        botoesHeader.innerHTML = `
        <span id="aqui"><a href="index.html">Página Inicial</a></span>
        <span><a href="login.html">| Login</a></span>
        <span><a href="#footer">| Contate-nos</a></span>
        <span><a href="sobreNos.html">| Sobre Nós</a></span>
        <span><a href="comoFunciona.html">| Como Funciona</a></span>
        <span><a href="calculadora.html">| Calculadora Orçamental</a></span>
    `
    } else {
        botoesHeader.innerHTML = `
    <span id="aqui"><a href="index.html">Página Inicial</a></span>
        <span><a href="visaoGeral.html">Dashboard</a></span>
        <span><a href="#footer">| Contate-nos</a></span> 
        <span><a href="sobreNos.html">| Sobre Nós</a></span>
        <span><a href="comoFunciona.html">| Como Funciona</a></span>
        <span><a href="calculadora.html">| Calculadora Orçamental</a></span>
    `
    }
}

