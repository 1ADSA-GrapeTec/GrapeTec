CREATE DATABASE grapeTec;
USE grapeTec;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(50) NOT NULL,
CNPJ CHAR(18) NOT NULL,
email VARCHAR(45) NOT NULL,
telefone CHAR(11) NOT NULL,
CEP CHAR(9) NOT NULL
)AUTO_INCREMENT = 1;

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45) NOT NULL,
numero INT NOT NULL,
bairro VARCHAR(45) NOT NULL,
estado CHAR(2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
pais VARCHAR(45) NOT NULL
)AUTO_INCREMENT = 1;

CREATE TABLE vinho (
idVinho INT PRIMARY KEY AUTO_INCREMENT,
tipoVinho VARCHAR(30),
tempIdeal FLOAT NOT NULL,
CONSTRAINT chkVinho CHECK (tipoVinho IN ('Tinto Leve', 'Branco','Espumante','Tinto Encorpado'))
)AUTO_INCREMENT = 1;

CREATE TABLE armazem (
idArmazem INT PRIMARY KEY AUTO_INCREMENT,
area INT,
fkEmpresa INT,
fkEndereco INT, 
fkVinho INT, 
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa (idEmpresa),
CONSTRAINT fkEndereco FOREIGN KEY (fkEndereco) REFERENCES endereco (idEndereco),
CONSTRAINT fkVinho FOREIGN KEY (fkVinho) REFERENCES vinho (idVinho)
)AUTO_INCREMENT = 100;

CREATE TABLE usuario(
idUsuarios INT AUTO_INCREMENT,
email VARCHAR(50) NOT NULL,
senha VARCHAR(25) NOT NULL,
nome VARCHAR(45) NOT NULL,
tipoUsuario CHAR(12) NOT NULL, 
fkEmpresa INT NOT NULL, 
fkArmazem INT NOT NULL, 
CONSTRAINT ckTIpoUsuario CHECK (tipoUsuario IN('adminstrador', 'comum')),
CONSTRAINT fkEmpresa_usuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkArmazem FOREIGN KEY(fkArmazem) REFERENCES armazem (idArmazem),
CONSTRAINT pkUsuario PRIMARY KEY (idUsuarios, fkEmpresa)
)AUTO_INCREMENT = 1;

CREATE TABLE sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(30) NOT NULL,
localizacao VARCHAR(20) NOT NULL,
statusSensor VARCHAR(9),
fkArmazem INT,
CONSTRAINT ckStatusSensor CHECK (statusSensor IN ('Ligado','Desligado')), 
CONSTRAINT fkArmazem_sensor FOREIGN KEY(fkArmazem) REFERENCES armazem (idArmazem)
)AUTO_INCREMENT = 1;

CREATE TABLE dadoSensor(
idDadoSensor INT PRIMARY KEY AUTO_INCREMENT,
temperatura FLOAT NOT NULL,
dtAtual datetime default current_timestamp,
fkSensor int, CONSTRAINT fkSensor foreign key (fkSensor) references sensor (idSensor)
)AUTO_INCREMENT = 1;

INSERT INTO empresa (CNPJ, nomeEmpresa, email,telefone, CEP) VALUES
('43.093.053/0001-77','Vinhos Viana','Vinhos Viana@gmail.com','282232-4086', '123456781'),
('78.581.354/0006-33','YabutaWine','YabutaWine@gmail.com','692763-2911', '123456782'),
('49.704.129/0009-99','Divinhos','Divinhos@gmail.com','823652-7289', '123456783'),
('52.478.266/0008-88','VinhedosLoureiro','VinhedosLoureiro@gmail.com','823514-3717', '123456784');

INSERT INTO endereco (rua, numero, cidade, bairro, estado,pais) VALUES
('Puxinana',100,'São Paulo','Vila rica','SP','Brasil'),
('Inajar de Souza',203,'Rio de Janeiro','Remédios','RJ','Brasil'),
('Penha Brasil',165,'Vitória','Lajeado','ES', 'Brasil'),
('Watannabe',543,'Belo Horizonte','Jardim Miriam','MG', 'Brasil');

INSERT INTO vinho (tipoVinho,tempIdeal ) VALUES
('Tinto Leve','14' ),
('Branco','10'),
('Espumante','9'),
('Tinto Encorpado','18');

INSERT INTO armazem VALUES
(null, 234, 1, 1,1),
(null, 100, 2, 4,2),
(null, 560, 3, 2,3),
(null, 700, 4, 3,4);

INSERT INTO usuario(email, senha, nome, tipoUsuario, fkEmpresa, fkArmazem) VALUES
('Anna.Marinho@exemplo.com', 'Anna123', 'Anna', 'adminstrador', 1, 100),
('Amanda.Ribeiro@exemplo.com', 'Amanda123', 'Amanda', 'comum', 2, 101),
('Jean.Rocha@exemplo.com', 'Jean123', 'Jean', 'adminstrador', 3, 102),
('Jacson.Lima@exemplo.com', 'Jacson123', 'Jacson', 'adminstrador', 2, 101);

INSERT INTO sensor(nome,statusSensor,localizacao, fkArmazem) VALUES
('Sensor1','Ligado','zona1', 100),
('Sensor2','Ligado','zona1', 100),
('Sensor3','Ligado','zona1', 100),
('Sensor4','Ligado','zona2', 101),
('Sensor5','Ligado','zona2', 102),
('Sensor6','Ligado','zona3', 103),
('Sensor7','Ligado','zona3', 102),
('Sensor8','Ligado','zona3', 103),
('Sensor9','Ligado','zona4', 101);

INSERT INTO dadoSensor (temperatura, fkSensor) VALUES
('25', 1),
('23', 2),
('14', 3),
('13', 4);

SELECT 
usuario.nome AS 'Nome do usuário',
usuario.email AS 'E-mail do usuário',
usuario.senha AS 'Senha do usuário',
tipoUsuario AS 'Tipo de usuário',
empresa.nomeEmpresa AS 'Nome da empresa responsável',
empresa.CNPJ,
empresa.email AS 'E-mail da empresa',
empresa.telefone AS 'Telefone da empresa',
empresa.cep
FROM empresa JOIN usuario ON fkEmpresa = idEmpresa;

SELECT 
armazem.idArmazem AS 'identificação do armazem',
armazem.area AS 'Área do armazem',
empresa.nomeEmpresa AS 'Nome da empresa responsável',
empresa.CNPJ,
empresa.email AS 'E-mail da empresa',
empresa.telefone AS 'Telefone da empresa',
empresa.cep
FROM empresa JOIN armazem ON fkEmpresa = idEmpresa;

SELECT 
armazem.idArmazem AS 'identificação do armazem',
armazem.area AS 'Área do armazem',
endereco.rua AS 'Rua do armazem',
endereco.numero AS 'Número do armazem',
endereco.bairro AS 'Bairro do armazem',
endereco.cidade AS 'Cidade do armazem',
endereco.estado AS 'Estado do armazem',
endereco.pais AS 'País do armazem'
FROM armazem JOIN endereco ON fkEndereco = idEndereco;

SELECT 
armazem.idArmazem AS 'identificação do armazem',
armazem.area AS 'Área do armazem',
usuario.nome AS 'Usuário associado',
usuario.email AS 'E-mail do usuário',
usuario.senha AS 'Senha do usuário',
tipoUsuario AS 'Tipo de usuário'
FROM armazem JOIN usuario ON fkArmazem = idArmazem;

SELECT 
armazem.idArmazem AS 'identificação do armazem',
armazem.area AS 'Área do armazem',
vinho.tipoVinho AS 'Tipo de vinho armazenado',
vinho.tempIdeal AS 'Temperatura ideal do tipo de vinho'
FROM armazem JOIN vinho ON fkVinho = idVinho;

SELECT 
sensor.nome AS 'Nome do sensor',
sensor.localizacao AS 'Localização do sensor',
sensor.statusSensor AS 'Status do sensor',
armazem.idArmazem AS 'identificação do armazem',
armazem.area AS 'Área do armazem'
FROM sensor JOIN armazem ON fkArmazem = idArmazem;

SELECT 
dadoSensor.temperatura AS 'Temperatura captada',
sensor.nome AS 'Nome do sensor',
sensor.localizacao AS 'Localização do sensor',
sensor.statusSensor AS 'Status do sensor'
FROM dadoSensor JOIN sensor ON fkSensor = idSensor;

SELECT 
d.temperatura AS 'Temperatura captada',
d.dtAtual AS 'Data de captação',
s.nome AS 'Nome do sensor',
s.statusSensor AS 'Status do sensor',
s.localizacao AS 'Localização do sensor',
a.idArmazem AS 'Identificador do armazem',
a.area AS 'Area do armazem',
e.rua AS 'Rua do armazem',
e.numero AS 'Número do armazem',
e.bairro AS 'Bairro do armazem',
e.estado AS 'Estado do armazem',
e.cidade AS 'Cidade do armazem',
e.pais AS 'País do armazem',
u.nome AS 'Dono da conta responsável',
u.email AS 'E-mail',
u.senha AS 'Senha',
u.tipoUsuario AS 'Tipo de usuário',
emp.nomeEmpresa AS 'Empresa responsável',
emp.CNPJ,
emp.email AS 'E-mail de contato',
emp.telefone AS 'Telefone de contato',
emp.CEP
FROM dadoSensor AS d JOIN sensor AS s ON idSensor = fkSensor 
JOIN armazem AS a ON s.fkArmazem = a.idArmazem 
JOIN endereco AS e ON a.fkEndereco = e.idEndereco 
JOIN usuario AS u ON  u.fkArmazem = a.idArmazem
JOIN empresa AS emp ON a.fkEmpresa = emp.idEmpresa;

