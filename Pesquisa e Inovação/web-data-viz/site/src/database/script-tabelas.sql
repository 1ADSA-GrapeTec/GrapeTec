CREATE DATABASE grapetec;
USE grapetec;

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY auto_increment,
nomeEmpresa VARCHAR(50) NOT NULL,
CNPJ CHAR(18) NOT NULL,
telefone CHAR(11) NOT NULL,
email VARCHAR(45) NOT NULL,
cep CHAR(9) NOT NULL
) auto_increment = 1000;

INSERT INTO empresa (CNPJ, nomeEmpresa, email,telefone, CEP) VALUES
('43.093.053/0001-77','Vinhos Viana','Vinhos Viana@gmail.com','282232-4086', '123456781'),
('78.581.354/0006-33','YabutaWine','YabutaWine@gmail.com','692763-2911', '123456782'),
('49.704.129/0009-99','Divinhos','Divinhos@gmail.com','823652-7289', '123456783');

truncate table dadosensor;
select * from dadosensor;
drop user 'usuario'@'localhost';

select*from usuario;

CREATE TABLE usuario(
idUsuario INT auto_increment,
email VARCHAR(50) NOT NULL,
senha VARCHAR(25) NOT NULL,
nome VARCHAR(45) NOT NULL,
tipoUsuario CHAR(13) NOT NULL,
CONSTRAINT chkTipoUsuario CHECK (tipoUsuario IN('administrador', 'comum')),
fkEmpresa INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
PRIMARY KEY (idUsuario, fkEmpresa)
) auto_increment = 1;

INSERT INTO usuario(email, senha, nome, tipoUsuario, fkEmpresa) VALUES
('Anna.Marinho@exemplo.com', 'Anna123', 'Anna', 'administrador', 1000),
('Amanda.Ribeiro@exemplo.com', 'Amanda123', 'Amanda', 'comum', 1001),
('Jean.Rocha@exemplo.com', 'Jean123', 'Jean', 'administrador', 1002),
('Jacson.Lima@exemplo.com', 'Jacson123', 'Jacson', 'administrador', 1000);

CREATE TABLE vinho(
idVinho INT PRIMARY KEY,
tipoVinho VARCHAR(30) NOT NULL,
CONSTRAINT chktipoVinho CHECK (tipovinho IN('tinto', 'branco', 'rosê', 'espumante')),
tempCritQuente FLOAT NOT NULL,
tempAlertaQuente FLOAT NOT NULL,
temperaturaIdeal FLOAT NOT NULL,
tempAlertaFrio FLOAT NOT NULL,
tempCritFrio FLOAT NOT NULL
);

INSERT INTO vinho (idVinho, tipoVinho, tempCritQuente, tempAlertaQuente, temperaturaIdeal, tempAlertaFrio, tempCritFrio) VALUES
(1, 'tinto', 15.9, 15.7, 15.5, 15.4, 13.9),
(2, 'rosê', 11.9, 11.4, 11, 10.8, 7.9),
(3, 'branco', 11.9, 11.7, 11.5, 11.4, 9.9),
(4, 'espumante', 7.9, 7.7, 7.5, 7.4, 5.9);

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45) NOT NULL,
numero INT NOT NULL,
bairro VARCHAR(45) NOT NULL,
estado CHAR(2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
pais VARCHAR(45) NOT NULL
)AUTO_INCREMENT = 100;

INSERT INTO endereco (rua, numero, cidade, bairro, estado,pais) VALUES
('Puxinana',100,'São Paulo','Vila rica','SP','Brasil'),
('Inajar de Souza',203,'Rio de Janeiro','Remédios','RJ','Brasil'),
('Penha Brasil',165,'Vitória','Lajeado','ES', 'Brasil'),
('Watannabe',543,'Belo Horizonte','Jardim Miriam','MG', 'Brasil');

CREATE TABLE armazem(
idArmazem INT auto_increment, 
area INT,
fkEndereco INT, 
fkVinho INT,
fkEmpresa INT,
CONSTRAINT fkEndereco_Armazem FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco),
CONSTRAINT fkVinho_Armazenado FOREIGN KEY (fkVinho) REFERENCES vinho(idVinho),
CONSTRAINT fkEmpresa_Armazenamento FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT pkArmazem PRIMARY KEY (idArmazem, fkEmpresa)
) auto_increment = 200;

INSERT INTO armazem (area, fkEndereco, fkVinho, fkEmpresa) VALUES
-- DOIS ARMAZNENS DA Vinhos Viana
(2000, 100, 1, 1000),
(300, 101, 2, 1000),
-- 1 ARMAZEM DA YabutaWine
(1000, 102, 3, 1001),
-- 1 ARMAZEM DA Divinhos
(500, 103, 4, 1002);

CREATE TABLE acesso(
fkUsuario INT,
fkEmpresa INT,
fkArmazem INT,
CONSTRAINT fkUsuario_acesso FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
CONSTRAINT fkEmpresa_acesso FOREIGN KEY (fkEmpresa) REFERENCES armazem(fkEmpresa),
CONSTRAINT fkArmazem_acesso FOREIGN KEY (fkArmazem) REFERENCES armazem(idArmazem),
CONSTRAINT pkAcesso PRIMARY KEY (fkUsuario, fkEmpresa, fkArmazem)
);

SELECT * FROM armazem;
SELECT * FROM usuario;
INSERT INTO acesso (fkUsuario, fkEmpresa, fkArmazem) VALUES
(1, 1000, 200),
(1, 1000, 201),
(4, 1000, 200),
(4, 1000, 201),
(2, 1001, 202),
(3, 1002, 203);

CREATE TABLE sensor(
idSensor INT,
nome VARCHAR(30) NOT NULL,
localizacao VARCHAR(20) NOT NULL,
statusSensor VARCHAR(9),
fkArmazem INT,
fkEmpresa INT,
CONSTRAINT ckStatusSensor CHECK (statusSensor IN ('Ligado','Desligado')), 
CONSTRAINT fkArmazem_sensor FOREIGN KEY(fkArmazem) REFERENCES armazem(idArmazem),
CONSTRAINT fkEmpresa_sensor FOREIGN KEY (fkEmpresa) REFERENCES armazem(fkEmpresa),
CONSTRAINT pkSensor PRIMARY KEY (idSensor, fkArmazem, fkEmpresa)
);

select * from Armazem;
select * from sensor order by fkEmpresa;
INSERT INTO sensor (idSensor, fkArmazem, fkEmpresa, localizacao, statusSensor, nome) VALUES
-- 5 sensores armazem 1
(1, 200, 1000, 'zona 1', 'Ligado', 'sensor 1'),
(2, 200, 1000, 'zona 2', 'Ligado', 'sensor 2'),
(3, 200, 1000, 'zona 3', 'Ligado' , 'sensor 3'),
(4, 200, 1000, 'zona 4', 'Ligado' , 'sensor 4'),
(5, 200, 1000, 'zona 5', 'Ligado' , 'sensor 5'),
-- 5 sensores armazem 2
(1, 201, 1000, 'zona 1', 'Ligado', 'sensor 1'),
(2, 201, 1000, 'zona 2', 'Ligado', 'sensor 2'),
(3, 201, 1000, 'zona 3', 'Ligado', 'sensor 3'),
(4, 201, 1000, 'zona 4', 'Ligado', 'sensor 4'),
(5, 201, 1000, 'zona 5', 'Ligado', 'sensor 5'),
-- 5 sensores armazem 3
(1, 202, 1001, 'zona 1', 'Ligado', 'sensor 1'),
(2, 202, 1001, 'zona 2', 'Ligado', 'sensor 2'),
(3, 202, 1001, 'zona 3', 'Ligado', 'sensor 3'),
(4, 202, 1001, 'zona 4', 'Ligado', 'sensor 4'),
(5, 202, 1001, 'zona 5', 'Ligado', 'sensor 5'),
-- 5 sensores armazem 4 :)
(1, 203, 1002, 'zona 1', 'Ligado', 'sensor 1'),
(2, 203, 1002, 'zona 2', 'Ligado', 'sensor 2'),
(3, 203, 1002, 'zona 3', 'Ligado', 'sensor 3'),
(4, 203, 1002, 'zona 4', 'Ligado', 'sensor 4'),
(5, 203, 1002, 'zona 5', 'Ligado', 'sensor 5');

CREATE TABLE dadoSensor(
idDadoSensor INT auto_increment,
temperatura FLOAT NOT NULL,
dtAtual datetime default current_timestamp,
fkSensor int, 
fkArmazem int,
fkEmpresa int,
CONSTRAINT fkSensor foreign key (fkSensor) references sensor(idSensor),
CONSTRAINT fkArmazemdoSensor FOREIGN KEY (fkArmazem) REFERENCES sensor(fkArmazem),
CONSTRAINT fkEmpresaDado FOREIGN KEY (fkEmpresa) REFERENCES sensor(fkEmpresa),
CONSTRAINT pkDadoSensor PRIMARY KEY (idDadoSensor, fkSensor, fkArmazem, fkEmpresa)
) auto_increment = 1;

SELECT sensor.*, vinho.tipoVinho FROM sensor join armazem on fkArmazem = idArmazem join vinho on fkVinho = idVinho;

INSERT INTO dadoSensor (temperatura, fkSensor, fkArmazem, fkEmpresa) VALUES
-- tinto
(10, 1, 200, 1000),
(12, 2, 200, 1000),
(11, 3, 200, 1000),
(13, 4, 200, 1000),
-- rosê
(9, 1, 201, 1000),
(10, 2, 201, 1000),
(11, 3, 201, 1000),
(10, 4, 201, 1000),
(8, 5, 201, 1000),
-- branco
(9, 1, 202, 1001),
(5, 2, 202, 1001),
(6, 3, 202, 1001),
(7, 4, 202, 1001),
(7.5, 5, 202, 1001),
-- espumante
(10, 1, 203, 1002),
(11, 2, 203, 1002),
(9, 3, 203, 1002),
(5, 4, 203, 1002),
(6, 5, 203, 1002);

select * from usuario;
delete from usuario where idUsuario=7;
select * from dadosensor;

CREATE USER 'usuario'@'10.18.33.116' IDENTIFIED BY 'usuario';
GRANT insert, select, update, delete on grapetec.* TO 'usuario'@'10.18.33.116';
FLUSH PRIVILEGES;

select * from acesso;

-- SELECT PARA A TELA DE VISÃO GERAL
SELECT
ds.temperatura,
ar.idArmazem,
ar.fkEmpresa empresaArmazem,
v.tipoVinho,
v.tempCritQuente,
v.tempAlertaQuente,
v.temperaturaIdeal,
v.tempAlertaFrio,
v.tempCritFrio,
en.rua,
en.numero,
en.bairro,
en.estado,
en.cidade,
en.pais
FROM dadosensor ds
JOIN sensor
ON sensor.idSensor = ds.fkSensor
AND sensor.fkArmazem = ds.fkArmazem
AND sensor.fkEmpresa = ds.fkEmpresa
JOIN armazem ar
ON sensor.fkArmazem = ar.idArmazem
AND sensor.fkEmpresa = ar.fkEmpresa
JOIN acesso acs
ON acs.fkEmpresa = ar.fkEmpresa
AND acs.fkArmazem = ar.idArmazem
JOIN usuario usr
ON usr.idUsuario = acs.fkUsuario
AND usr.fkEmpresa = acs.fkEmpresa
JOIN vinho v
ON ar.fkVinho = v.idVinho
JOIN endereco en
ON en.idEndereco = ar.fkEndereco
WHERE acs.fkEmpresa = 1000 AND acs.fkUsuario = 1 order by ds.dtAtual;