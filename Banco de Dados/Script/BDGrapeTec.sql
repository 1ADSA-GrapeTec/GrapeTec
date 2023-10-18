create database GrapeTec;
drop database GrapeTec;
use GrapeTec;

CREATE TABLE empresa(
idEmpresa int primary key auto_increment,
nomeEmpresa varchar(50) not null,
CNPJ char(14) not null,
email varchar(45) not null,
telefone char(11) not null,
CEP char(9) not null
);

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY auto_increment,
rua varchar(45) not null,
numero int not null,
bairro varchar(45),
estado char(2) not null,
cidade varchar (45) not null,
pais varchar(45) not null
);

CREATE TABLE vinho (
idVinho int primary key auto_increment,
tipoVinho varchar(30),
tempIdeal float not null,
CONSTRAINT chkVinho CHECK (tipoVinho IN ('Tinto Leve', 'Branco','Espumante','Tinto Encorpado'))
);

CREATE TABLE armazem (
idArmazem int primary key auto_increment,
area int,
fkEmpresa int, CONSTRAINT fkEmpresa foreign key (fkEmpresa) references empresa (idEmpresa),
fkEndereco int, CONSTRAINT fkEndereco foreign key (fkEndereco) references endereco (idEndereco),
fkVinho int, CONSTRAINT fkVinho foreign key (fkVinho) references vinho (idVinho)
)auto_increment = 100;

CREATE TABLE usuarios(
idUsuarios int auto_increment,
email varchar(50) not null,
senha varchar(25) not null,
nome varchar(45) not null,
tipoUsuario char(12) not null, CONSTRAINT ckTIpoUsuario CHECK (tipoUsuario in('adminstrador', 'comum')),
fkEmpresa int, CONSTRAINT fkE foreign key (fkEmpresa) references empresa(idEmpresa),
fkArmazem int, CONSTRAINT fkArmazemm foreign key (fkArmazem) references armazem (idArmazem),
Primary key (idUsuarios, fkEmpresa)
);

CREATE TABLE sensor(
idSensor int primary key auto_increment,
nome varchar (30) not null,
localizacao varchar(20) not null,
statusSensor varchar (10), constraint ckStatusSensor check (statusSensor in ('ligado','desligado')), 
fkArmazem int, CONSTRAINT fkArmazem foreign key (fkArmazem) references armazem (idArmazem)
);

CREATE TABLE dadoSensor(
idDadoSensor int primary key auto_increment,
temperatura float not null,
dtAtual datetime default current_timestamp,
fkSensor int, CONSTRAINT fkSensor foreign key (fkSensor) references sensor (idSensor)
);

INSERT INTO empresa (CNPJ, nomeEmpresa, email,telefone, CEP) VALUES
('43.093.053/000','Vinhos Viana','Vinhos Viana@gmail.com','282232-4086', '123456781'),
('78.581.354/000','YabutaWine','YabutaWine@gmail.com','692763-2911', '123456782'),
('49.704.129/000','Divinhos','Divinhos@gmail.com','823652-7289', '123456783'),
('52.478.266/000','VinhedosLoureiro','VinhedosLoureiro@gmail.com','823514-3717', '123456784');

SELECT * FROM empresa;
SELECT * FROM empresa WHERE nomeEmpresa= 'VinhedosLoureiro';
SELECT CNPJ FROM empresa WHERE nomeEmpresa = 'Vinhos Viana';
SELECT email FROM empresa WHERE nomeEmpresa = 'Divinhos';
SELECT telefone FROM empresa WHERE nomeEmpresa = 'Divinhos';

INSERT INTO endereco (rua, numero, cidade, bairro, estado,pais) VALUES
('Puxinana',100,'São Paulo','Vila rica','SP','Brasil'),
('Inajar de Souza',203,'Rio de Janeiro','Remédios','RJ','Brasil'),
('Penha Brasil',165,'Vitória',null,'ES', 'Brasil'),
('Watannabe',543,'Belo Horizonte',null,'MG', 'Brasil');

SELECT * FROM endereço;


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
SELECT * FROM armazem JOIN endereço on fkEndereco = idEndereco JOIN empresa on fkEmpresa = idEmpresa;


INSERT INTO usuarios(email, senha, nome, tipoUsuario, fkEmpresa, fkArmazem) VALUES
('Anna.Marinho@exemplo.com', 'Anna123', 'Anna', 'adminstrador', 1, 100),
('Amanda.Ribeiro@exemplo.com', 'Amanda123', 'Amanda', 'comum', 2, 101),
('Jean.Rocha@exemplo.com', 'Jean123', 'Jean', 'adminstrador', 3, 102),
('Jacson.Lima@exemplo.com', 'Jacson123', 'Jacson', 'adminstrador', 2, 101);

SELECT * FROM usuarios JOIN empresa on fkEmpresa = idEmpresa JOIN armazem ON fkArmazem = idArmazem;
SELECT * FROM usuarios JOIN empresa on fkEmpresa = idEmpresa JOIN armazem ON fkArmazem = idArmazem where usuarios.nome = 'Anna';


SELECT * FROM vinho;
SELECT * FROM vinho JOIN armazem on fkvinho = idVinho;
SELECT * FROM vinho JOIN armazem on fkvinho = idVinho JOIN empresa on fkEmpresa = idEmpresa;
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

SELECT * FROM armazem JOIN empresa on fkEmpresa = idEmpresa JOIN endereço on fkEndereco = idEndereco;
SELECT * FROM empresa JOiN usuarios ON fkEmpresa = idEmpresa JOIN armazem ON fkArmazem = idArmazem JOIN endereço ON fkEndereco = idEndereco;

SELECT 
d.temperatura AS 'Temperatura captada',
d.dtAtual AS 'Data de captação',
s.nome AS 'Nome do sensor',
s.localizacao AS 'Localização do sensor',
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
FROM 
dadoSensor AS d JOIN sensor AS s ON idSensor = fkSensor 
	JOIN armazem AS a ON s.fkArmazem = a.idArmazem 
		JOIN endereco AS e ON a.fkEndereco = e.idEndereco 
			JOIN usuarios AS u ON  u.fkArmazem = a.idArmazem
				JOIN empresa AS emp ON a.fkEmpresa = emp.idEmpresa;


