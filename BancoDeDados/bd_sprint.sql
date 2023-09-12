create database Sprint;

use Sprint;

create table empresa(
id int primary key auto_increment,
nome varchar(50) not null,
CNPJ char(18) not null,
email varchar(30) not null,
numero char(14) not null,
senha varchar (20) not null
);

create table instalacao(
id int primary key auto_increment,
CEP char(9) not null,
tamanhoLocal float not null
);

create table vinho(
id int primary key auto_increment,
tipoVinho varchar(20),
tempIdeal float not null
);

create table sensor(
id int primary key auto_increment,
nome varchar (20) not null,
localizacao varchar(10) not null
);

create table dadoSensor(
id int primary key auto_increment,
temperatura float not null,
dtAtual datetime default current_timestamp
);

insert into empresa (nome, CNPJ, email,numero,senha) values
('43.093.053/0001-07','Vinhos Viana','Vinhos Viana@gmail.com','(28) 2232-4086','&6Pdl$%f(UesU9BPI=RU'),
('78.581.354/0001-64','YabutaWine','YabutaWine@gmail.com','(69) 2763-2911','7X0i%eXrnz%wnjRgv@W8'),
('49.704.129/0001-70','Divinhos','Divinhos@gmail.com','(82) 3652-7289','Su_CbXH2FQS4)i0Wq4Yy'),
('52.478.266/0001-48','VinhedosLoureiro','VinhedosLoureiro@gmail.com','(82) 3514-3717','*=Ctw4cgbym)E7k3%XfQ');

select * from empresa;
select* from empresa where nome = 'VinhedosLoureiro';
select CNPJ from empresa where nome = 'Vinhos Viana';
select email from empresa where nome = 'Divinhos';
select numero from empresa where nome = 'YatubaWine';
truncate table empresa;
drop table empresa;

insert into instalacao (CEP,tamanhoLocal) values
('69303-457','202'),
('87043-495','357'),
('67020-665','275'),
('75535-105','482');

select * from instalacao;
select * from instalacao where id = 3;
select CEP from instalacao where CEP like '%5';
select * from instalacao where tamanhoLocal > 400;
truncate table instalacao;
drop table instalacao;

alter table vinho add constraint chkVinho check (tipoVinho in ('Tinto Leve', 'Branco','Espumante','Tinto Encorpado'));
insert into vinho (tipoVinho,tempIdeal) values
('Tinto Leve','14'),
('Branco','10'),
('Espumante','9'),
('Tinto Encorpado','18');

select * from vinho;
select tempIdeal from vinho where tipoVinho like '%Tinto%';
select * from vinho where tempIdeal < 10;
truncate table vinho;
drop table vinho;

insert into sensor(nome,localizacao) values
('Sensor1','zona1'),
('Sensor2','zona1'),
('Sensor3','zona1'),
('Sensor4','zona2'),
('Sensor5','zona2'),
('Sensor6','zona3'),
('Sensor7','zona3'),
('Sensor8','zona3'),
('Sensor9','zona4');

select * from sensor;
select * from sensor where localizacao = 'zona1';
select * from sensor where nome = 'Sensor5';
truncate table sensor;
drop table sensor;

insert into dadoSensor (temperatura) values
('0'),
('5'),
('7'),
('2');

select * from dadoSensor;
select * from dadoSensor where temperatura > 4;
select * from dadoSensor where temperatura < 3; 	
truncate table dadoSensor;
drop table dadoSensor;
