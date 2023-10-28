// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async (
    // valoresDht11Umidade,
    // valoresDht11Temperatura,
    // valoresLuminosidade,
    valoresLm35Temperatura
    // valoresChave
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO - MYSQL WORKBENCH
                host: 'localhost',
                user: 'insertGrupo1',
                password: 'grapetec123',
                database: 'grapeTec'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);
        
        const valores = data.split(';')
        const tempNormal = parseFloat(valores[0]);
        const tempTinto = parseFloat(valores[1]);
        const tempRose = parseFloat(valores[2]);
        const tempBranco = parseFloat(valores[3]);
        const tempEspumante = parseFloat(valores[4]);

        //sensores lógicos tinto
        const tempTinto2 = tempTinto * 0.8
        const tempTinto3 = tempTinto * 1.3
        const tempTinto4 = tempTinto * 0.6
        const tempTinto5 = tempTinto * 1.5
        //sensores lógicos rose
        const tempRose2 = tempRose * 0.8
        const tempRose3 = tempRose * 1.3
        const tempRose4 = tempRose * 0.6
        const tempRose5 = tempRose * 1.5
        //sensores lógicos branco
        const tempBranco2 = tempBranco * 0.8
        const tempBranco3 = tempBranco * 1.3
        const tempBranco4 = tempBranco * 0.6
        const tempBranco5 = tempBranco * 1.5
        //sensores lógicos espumante
        const tempEspumante2 = tempEspumante * 0.8
        const tempEspumante3 = tempEspumante * 1.3
        const tempEspumante4 = tempEspumante * 0.6
        const tempEspumante5 = tempEspumante * 1.5

        valoresLm35Temperatura.push(tempNormal);
        // valoresDht11Umidade.push(dht11Umidade);
        // valoresDht11Temperatura.push(dht11Temperatura);
        // valoresLuminosidade.push(luminosidade);
        // valoresChave.push(chave);

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";

                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                await poolBancoDados.execute(
                    'INSERT INTO dadoSensor (temperatura, dtAtual, fkSensor) VALUES ( ?, now(), 1), ( ?, now(), 2), ( ?, now(), 3), ( ?, now(), 4), ( ?, now(), 5), ( ?, now(), 6), ( ?, now(), 7), ( ?, now(), 8), ( ?, now(), 9), ( ?, now(), 10), ( ?, now(), 11), ( ?, now(), 12), ( ?, now(), 13), ( ?, now(), 14), ( ?, now(), 15), ( ?, now(), 16), ( ?, now(), 17), ( ?, now(), 18), ( ?, now(), 19), ( ?, now(), 20), ( ?, now(), 21)',
                    [tempNormal, tempTinto, tempTinto2, tempTinto3, tempTinto4, tempTinto5, tempRose, tempRose2, tempRose3, tempRose4, tempRose5, tempBranco, tempBranco2, tempBranco3, tempBranco4, tempBranco5, tempEspumante, tempEspumante2, tempEspumante3, tempEspumante4, tempEspumante5]
                );
                console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    // valoresDht11Umidade,
    // valoresDht11Temperatura,
    // valoresLuminosidade,
    valoresLm35Temperatura
    // valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // app.get('/sensores/dht11/umidade', (_, response) => {
    //     return response.json(valoresDht11Umidade);
    // });
    // app.get('/sensores/dht11/temperatura', (_, response) => {
    //     return response.json(valoresDht11Temperatura);
    // });
    // app.get('/sensores/luminosidade', (_, response) => {
    //     return response.json(valoresLuminosidade);
    // });
    app.get('/sensores/lm35/temperatura', (_, response) => {
        return response.json(valoresLm35Temperatura);
    });
    // app.get('/sensores/chave', (_, response) => {
    //     return response.json(valoresChave);
    // });
}

(async () => {
    // const valoresDht11Umidade = [];
    // const valoresDht11Temperatura = [];
    // const valoresLuminosidade = [];
    const valoresLm35Temperatura = [];
     
    // const valoresChave = [];
    await serial(
        // valoresDht11Umidade,
        // valoresDht11Temperatura,
        // valoresLuminosidade,
        valoresLm35Temperatura
        // valoresChave
    );
    servidor(
        // valoresDht11Umidade,
        // valoresDht11Temperatura,
        // valoresLuminosidade,
        valoresLm35Temperatura
        // valoresChave
    );
})();

