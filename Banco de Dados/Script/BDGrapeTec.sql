create database GrapeTec;

use GrapeTec;

CREATE TABLE cliente
(
idcliente int primary key auto_increment,
nome varchar(50) not null,
CNPJ char(18) not null,
email varchar(30) not null,
numero char(14) not null,
senha varchar (20) not null,
CEP char(9) not null
)auto_increment = 1;

CREATE TABLE endereço
(
idEndereco int primary key auto_increment,
rua varchar(50) not null,
numero int not null,
bairro varchar(30),
estado char(2) not null,
cidade varchar (30) not null,
pais varchar(45) not null
);

CREATE TABLE vinho (
idVinho int primary key auto_increment,
tipoVinho varchar(30),
tempIdeal float not null

);

CREATE TABLE armazem (
idArmazem int primary key auto_increment,
area int,
fkcliente int, CONSTRAINT fkCliente foreign key (fkCliente) references cliente (idcliente),
fkEndereco int, CONSTRAINT fkEndereco foreign key (fkEndereco) references endereço (idEndereco),
fkVinho int, CONSTRAINT fkVinho foreign key (fkVinho) references vinho (idVinho)
)auto_increment = 100;



CREATE TABLE sensor(
idSensor int primary key auto_increment,
nome varchar (30) not null,
localizacao varchar(20) not null,
statusSensor varchar (10), constraint ckStatusSensor check (statusSensor in ('ligado','desligado')), 
fkArmazem int, CONSTRAINT fkArmazemm foreign key (fkArmazem) references armazem (idArmazem)
)
;


CREATE TABLE dadoSensor(
idDadoSensor int primary key auto_increment,
temperatura float not null,
dtAtual datetime default current_timestamp,
fkSensor int, CONSTRAINT fkSensor foreign key (fkSensor) references sensor (idSensor)
);

INSERT INTO cliente (CNPJ, nome, email,numero,senha, CEP) VALUES
('43.093.053/0001-07','Vinhos Viana','Vinhos Viana@gmail.com','(28) 2232-4086','&6Pdl$%f(UesU9BPI=RU', '123456781'),
('78.581.354/0001-64','YabutaWine','YabutaWine@gmail.com','(69) 2763-2911','7X0i%eXrnz%wnjRgv@W8', '123456782'),
('49.704.129/0001-70','Divinhos','Divinhos@gmail.com','(82) 3652-7289','Su_CbXH2FQS4)i0Wq4Yy', '123456783'),
('52.478.266/0001-48','VinhedosLoureiro','VinhedosLoureiro@gmail.com','(82) 3514-3717','*=Ctw4cgbym)E7k3%XfQ', '123456784');

SELECT * FROM cliente;
SELECT * FROM cliente WHERE nome = 'VinhedosLoureiro';
SELECT CNPJ FROM cliente WHERE nome = 'Vinhos Viana';
SELECT email FROM cliente WHERE nome = 'Divinhos';
SELECT numero FROM cliente WHERE nome = 'Divinhos';



INSERT INTO endereço (rua, numero, cidade, bairro, estado,pais) VALUES
('Puxinana',100,'São Paulo','Vila rica','SP','Brasil'),
('Inajar de Souza',203,'Rio de Janeiro','Remédios','RJ','Brasil'),
('Penha Brasil',165,'Vitória',null,'ES', 'Brasil'),
('Watannabe',543,'Belo Horizonte',null,'MG', 'Brasil');

SELECT * FROM endereço;

ALTER TABLE vinho ADD CONSTRAINT chkVinho CHECK (tipoVinho IN ('Tinto Leve', 'Branco','Espumante','Tinto Encorpado'));
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

SELECT * FROM armazem;

SELECT * FROM armazem JOIN endereço on fkEndereco = idEndereco JOIN cliente on fkcliente = idcliente;

SELECT * FROM vinho;
SELECT * FROM vinho JOIN armazem on fkvinho = idVinho;
SELECT * FROM vinho JOIN armazem on fkvinho = idVinho JOIN cliente on fkcliente = idcliente;
SELECT tempIdeal FROM vinho WHERE tipoVinho LIKE '%Tinto%';
SELECT * FROM vinho WHERE tempIdeal < 10;

INSERT INTO sensor(nome,localizacao, fkArmazem) VALUES
('Sensor1','zona1', 100),
('Sensor2','zona1', 100),
('Sensor3','zona1', 100),
('Sensor4','zona2', 101),
('Sensor5','zona2', 102),
('Sensor6','zona3', 103),
('Sensor7','zona3', 102),
('Sensor8','zona3', 103),
('Sensor9','zona4', 101);

SELECT * FROM sensor;
SELECT * FROM sensor JOIN armazem on fkArmazem = idArmazem;
SELECT * FROM sensor WHERE localizacao = 'zona1';
SELECT * FROM sensor WHERE nome = 'Sensor5';

INSERT INTO dadoSensor (temperatura, fkSensor) VALUES
('0', 1),
('5', 2),
('7', 3),
('2', 4);

SELECT * FROM dadoSensor;
SELECT * FROM dadoSensor JOIN sensor on fkSensor = idSensor;
SELECT * FROM dadoSensor WHERE temperatura > 4;
SELECT * FROM dadoSensor WHERE temperatura < 3; 	

SELECT * FROM armazem JOIN cliente on fkcliente = idcliente JOIN endereço on fkEndereco = idEndereco;
SELECT * from armazem JOIN vinho JOIN dadoSensor;
