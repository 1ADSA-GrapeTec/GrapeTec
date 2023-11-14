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
('49.704.129/0009-99','Divinhos','Divinhos@gmail.com','823652-7289', '123456783'),
('52.478.266/0008-88','VinhedosLoureiro','VinhedosLoureiro@gmail.com','823514-3717', '123456784');

CREATE TABLE usuario(
idUsuario INT,
email VARCHAR(50) NOT NULL,
senha VARCHAR(25) NOT NULL,
nome VARCHAR(45) NOT NULL,
tipoUsuario CHAR(13) NOT NULL,
CONSTRAINT chkTipoUsuario CHECK (tipoUsuario IN('administrador', 'comum')),
fkEmpresa INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
PRIMARY KEY (idUsuario, fkEmpresa)
);

INSERT INTO usuario(idUsuario, email, senha, nome, tipoUsuario, fkEmpresa) VALUES
(1, 'Anna.Marinho@exemplo.com', 'Anna123', 'Anna', 'administrador', 1000),
(2,'Amanda.Ribeiro@exemplo.com', 'Amanda123', 'Amanda', 'comum', 1001),
(3, 'Jean.Rocha@exemplo.com', 'Jean123', 'Jean', 'administrador', 1002),
(4, 'Jacson.Lima@exemplo.com', 'Jacson123', 'Jacson', 'administrador', 1000);

CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'usuario';
GRANT insert, select, update, delete on grapetec.* TO 'usuario'@'localhost';
FLUSH PRIVILEGES;

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

CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45) NOT NULL,
numero INT NOT NULL,
bairro VARCHAR(45) NOT NULL,
estado CHAR(2) NOT NULL,
cidade VARCHAR(45) NOT NULL,
pais VARCHAR(45) NOT NULL
)AUTO_INCREMENT = 1000;

CREATE TABLE acesso(
fkUsuario INT,
fkEmpresa INT,
fkArmazem INT,
CONSTRAINT fkUsuario_acesso FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
CONSTRAINT fkEmpresa_acesso FOREIGN KEY (fkEmpresa) REFERENCES armazem(fkEmpresa),
CONSTRAINT fkArmazem_acesso FOREIGN KEY (fkArmazem) REFERENCES armazem(idArmazem),
CONSTRAINT pkAcesso PRIMARY KEY (fkUsuario, fkEmpresa, fkArmazem)
);

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

CREATE TABLE dadoSensor(
idDadoSensor INT,
temperatura FLOAT NOT NULL,
dtAtual datetime default current_timestamp,
fkSensor int, 
CONSTRAINT fkSensor foreign key (fkSensor) references sensor(idSensor),
CONSTRAINT pkDadoSensor PRIMARY KEY (idDadoSensor, fkSensor)
);