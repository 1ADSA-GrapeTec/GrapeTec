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