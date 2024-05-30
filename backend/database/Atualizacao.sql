alter table configuracao add data_atu datetime default current_timestamp;
alter table configuracao add usuario_atu int default null;

alter table configuracao add email_notificacao varchar(250);
alter table configuracao add dias_experiencia integer default 7;
alter table configuracao add dias_ferias_antes integer default 60;
alter table configuracao add dias_ferias_depois integer default 60;
alter table configuracao add logo varchar(250);
alter table configuracao add email_cor_fundo varchar(10) default '#ffffff';
alter table configuracao add email_experiencia_obs varchar(250) default 'Obs: Se for prorrogado, não esquecer de pegar as assinaturas na prorrogação anexada na pasta do funcionário. Caso seja rescindido o contrato, por gentileza nos comunicar.';
alter table configuracao add email_ferias_obs varchar(250) default 'Entre em contato com o departamento pessoal de sua contabilidade por e-email ou telefone.';
alter table configuracao add sincroniza_tipo tinyint(2) default 1 ;
alter table configuracao add sincroniza_hora time default '00:20:00';
alter table configuracao add logo_size integer;
alter table configuracao add dias_afastamento integer default 5;
alter table configuracao add filtro_dias_afastamento integer default 5;
alter table configuracao add email_afastamento_obs varchar(250) default '';
alter table configuracao add dias_imposto integer default 7;
alter table configuracao add filtro_imposto varchar(250) default '561,2003,2100';
alter table configuracao add email_imposto_obs varchar(250) default '';

alter table empresa add data_cad datetime default current_timestamp;
alter table empresa add usuario_cad int default null;
alter table empresa add data_atu datetime default current_timestamp;
alter table empresa add usuario_atu int default null;


alter table usuario add x_ativo tinyint(1) not null default 0;
update usuario set x_ativo = replace(replace(upper(ativo), 'SIM',1), 'NÃO',0);

alter table usuario add senha_hash varchar(100) null;

alter table usuario add data_cad datetime default current_timestamp;
alter table usuario add usuario_cad int default null;
alter table usuario add data_atu datetime default current_timestamp;
alter table usuario add usuario_atu int default null;

alter table cliente add data_cad datetime default current_timestamp;
alter table cliente add usuario_cad int default null;
alter table cliente add data_atu datetime default current_timestamp;
alter table cliente add usuario_atu int default null;

alter table cliente add x_importado tinyint(1) not null default 0;

alter table cliente add erp_empresa int null;
alter table cliente add erp_filial int null;
update cliente set erp_empresa = questor_empresa
                  ,erp_filial = questor_filial
where erp_empresa is null
  and erp_filial is null;                 

alter table funcionario add mensagem varchar(250);
alter table funcionario add chave_email varchar(18);

alter table evento add x_ativo boolean default 1;
update evento set x_ativo = replace(replace(evento_ativo, 'Sim', 1), 'Não', 0);

alter table log_email add erp_empresa int null;
alter table log_email add erp_filial int null;
update log_email set erp_empresa = questor_empresa
                    ,erp_filial = questor_filial
where erp_empresa is null
  and erp_filial is null;

alter table fechamento add data_cad datetime default current_timestamp;

alter table evento_variavel add constraint `FK_evento_variavel_cliente_evento1` FOREIGN KEY (`evento_id`) REFERENCES `cliente_evento` (`evento_id`) ON UPDATE NO ACTION ON DELETE NO ACTION

alter table centro_custo add erp_empresa int;
update centro_custo set erp_empresa = questor_empresa;

alter table configuracao add modulo int(1) default 1 COMMENT '1 - Avisos, 2 - Eventos/Banco de horas, 3 - Completo';

alter table funcionario add data_cad datetime default current_timestamp;
alter table funcionario add email varchar(250);

alter table usuario_cliente drop foreign key fk_usuario_has_cliente_cliente1;
alter table usuario_cliente add constraint fk_usuario_has_cliente_cliente1 foreign key (cliente_id) references cliente(id) on delete cascade;

ALTER TABLE funcionario DROP FOREIGN KEY fk_funcionario_cliente1;
ALTER TABLE funcionario ADD CONSTRAINT fk_funcionario_cliente1 FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE local_contabil DROP FOREIGN KEY fk_local_contabil_cliente;
ALTER TABLE local_contabil ADD CONSTRAINT fk_local_contabil_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE organograma DROP FOREIGN KEY fk_organograma_cliente;
ALTER TABLE organograma ADD CONSTRAINT fk_organograma_cliente FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_local_contabil DROP FOREIGN KEY fk_cliente_local_contabil_cliente_id;
ALTER TABLE cliente_local_contabil ADD CONSTRAINT fk_cliente_local_contabil_cliente_id FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_causa_demissao DROP FOREIGN KEY fk_cliente_causa_demissao_cliente_id;
ALTER TABLE cliente_causa_demissao ADD CONSTRAINT fk_cliente_causa_demissao_cliente_id FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_cargo DROP FOREIGN KEY fk_cliente_cargo_cliente_id;
ALTER TABLE cliente_cargo ADD CONSTRAINT fk_cliente_cargo_cliente_id FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_escala DROP FOREIGN KEY fk_cliente_escala_cliente_id;
ALTER TABLE cliente_escala ADD CONSTRAINT fk_cliente_escala_cliente_id FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_evento DROP FOREIGN KEY fk_cliente_has_evento_cliente1;
ALTER TABLE cliente_evento ADD CONSTRAINT fk_cliente_has_evento_cliente1 FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_situacao_questor DROP FOREIGN KEY fk_cliente_has_situacao_questor_cliente1;
ALTER TABLE cliente_situacao_questor ADD CONSTRAINT fk_cliente_has_situacao_questor_cliente1 FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_sindicato DROP FOREIGN KEY fk_cliente_sindicato_cliente_id;
ALTER TABLE cliente_sindicato ADD CONSTRAINT fk_cliente_sindicato_cliente_id FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE cliente_tipo_contrato DROP FOREIGN KEY fk_cliente_tipo_contrato_cliente_id;
ALTER TABLE cliente_tipo_contrato ADD CONSTRAINT fk_cliente_tipo_contrato_cliente_id FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;

ALTER TABLE funcionario DROP FOREIGN KEY fk_funcionario_cliente1;
ALTER TABLE funcionario ADD CONSTRAINT fk_funcionario_cliente1 FOREIGN KEY (cliente_id) REFERENCES cliente(id) ON DELETE CASCADE;


ALTER TABLE funccargo DROP FOREIGN KEY fk_funccargo_funcionario1;
ALTER TABLE funccargo ADD CONSTRAINT fk_funccargo_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE;

ALTER TABLE funcescala DROP FOREIGN KEY fk_funcescala_funcionario1;
ALTER TABLE funcescala ADD CONSTRAINT fk_funcescala_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE;

--------- folha_implantacao atualizado ----------------

delimiter //
drop trigger usuario_valida_insert //
CREATE TRIGGER usuario_valida_insert BEFORE INSERT ON usuario FOR EACH ROW begin	
	if exists(select usuario 
                from veloxdp2_gestor_folha.usuario 
               where usuario = new.usuario 
                 and ativo = 'Sim') then
		signal sqlstate '45000';
	end if;
end //

alter table funcionario add data_demissao date DEFAULT NULL;

alter table fechamento add data_cad datetime default current_timestamp;

ALTER TABLE periodo_aquisitivo DROP FOREIGN KEY fk_periodo_aquisitivo_funcionario1;
ALTER TABLE periodo_aquisitivo ADD CONSTRAINT fk_periodo_aquisitivo_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE;

ALTER TABLE reciboferias DROP FOREIGN KEY fk_reciboferias_funcionario1;
ALTER TABLE reciboferias ADD CONSTRAINT fk_reciboferias_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE;

CREATE OR REPLACE VIEW vw_funcionario_contrato_sub AS (
select
        fc.id AS funcionario_contrato_id,
        p.id AS pessoa_id,
        p.nome AS nome,
        fc.data_admissao AS data_admissao,
        p.cpf AS cpf,
        p.pis AS pis,
        fc.tipo_contrato_id AS tipo_contrato_id,
        tp.descricao AS tipo_contrato_descricao,
        f.codigo_sistema AS codigo_sistema,
        f2.codigo_sistema AS codigo_sistema2,
        fc.cliente_id AS cliente_id,
        fc.situacao AS situacao,
        (case
            when (f.id > 0) then 'Sim'
            when isnull(f2.id) then 'Não'
        end) AS importado,
        f.ativo AS ativo
    from
        ((((funcionario_contrato fc
    join pessoa p on
        ((p.id = fc.pessoa_id)))
    join tipo_contrato tp on
        ((tp.id = fc.tipo_contrato_id)))
    left join funcionario f on
        (((f.inscricao = convert(p.cpf
            using utf8))
            and (f.dataadm = fc.data_admissao)
                and (f.cliente_id = fc.cliente_id)
                    and (f.ativo = 1))))
    left join funcionario f2 on
        (((f2.inscricao = convert(p.cpf
            using utf8))
            and (f2.dataadm = fc.data_admissao)
                and (f2.cliente_id = fc.cliente_id)
                    and (f2.ativo = 0))))
    group by
        fc.id,
        p.id,
        p.nome,
        fc.data_admissao,
        p.cpf,
        p.pis,
        fc.tipo_contrato_id,
        tp.descricao,
        f.codigo_sistema,
        f2.codigo_sistema,
        fc.cliente_id,
        fc.situacao
    order by
        p.nome);

CREATE OR REPLACE VIEW vw_funcionario_contrato AS (
select
    gt.funcionario_contrato_id AS funcionario_contrato_id,
    gt.pessoa_id AS pessoa_id,
    gt.nome AS nome,
    gt.data_admissao AS data_admissao,
    gt.cpf AS cpf,
    gt.pis AS pis,
    gt.tipo_contrato_id AS tipo_contrato_id,
    gt.tipo_contrato_descricao AS tipo_contrato_descricao,
    (case
        when (gt.codigo_sistema is not null) then gt.codigo_sistema
        else gt.codigo_sistema2
    end) AS codigo_sistema,
    gt.cliente_id AS cliente_id,
    gt.situacao AS situacao,
    gt.importado AS importado,
    gt.ativo AS ativo
from vw_funcionario_contrato_sub gt
where
    ((gt.ativo = 1)
        or isnull(gt.ativo))
order by
    gt.nome);        

-------------------------------------------------------------------------------------

alter table dependente add data_entrega_certidao date;
alter table cliente add telefone varchar(20) default null;



CREATE TABLE log_whatsapp (
  cd_erp_empresa int(11) NOT NULL,
  cd_erp_filial int(11) NOT NULL,
  cd_funcionario int(11) NOT NULL,
  dt_log date NOT NULL,
  cd_tipo int(1) NOT NULL DEFAULT '1' COMMENT '1 - Geral, 2 - experiência, 3 - férias, 4 - Afastamento, 5 - Impostos',
  ds_telefone varchar(20) NOT NULL,
  data_cad datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (cd_erp_empresa,cd_erp_filial,cd_funcionario,dt_log,cd_tipo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE log_email 
ENGINE=InnoDB
DEFAULT CHARSET=utf8;

alter table empresa add whats_token varchar(1000);
alter table empresa add whats_numero varchar(20);

alter table configuracao add x_resposta_experiencia tinyint(1) not null default 1;
alter table configuracao add x_retorno_ferias tinyint(1) not null default 1;


CREATE TABLE tela (
  cd_tela int(11) NOT NULL,
  ds_nome varchar(200) DEFAULT NULL,
  ds_descricao varchar(250) DEFAULT NULL,
  x_ativo tinyint(4) DEFAULT '0',
  nr_ordem int(11) DEFAULT NULL,
  sub_menu_pai varchar(250) DEFAULT NULL,
  sub_menu tinyint(1) DEFAULT NULL,
  PRIMARY KEY (cd_tela),
  UNIQUE KEY ds_nome (ds_nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE tela_permissao (
  cd_tela int(11) NOT NULL,
  cd_usuario int(11) NOT NULL,
  x_permissao tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (cd_tela,cd_usuario),
  CONSTRAINT fk_tela_permissao_usuario FOREIGN KEY (cd_usuario) REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_tela_permissao_tela FOREIGN KEY (cd_tela) REFERENCES tela (cd_tela) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


------------------------------------------------------------------------------
/* Criação campos menor aprendiz */

ALTER TABLE funcionario_contrato ADD indicador_aprendiz CHAR(1);
ALTER TABLE funcionario_contrato ADD cnpj_entidade_qualificadora VARCHAR(18);
ALTER TABLE funcionario_contrato ADD empregador_contratante_aprendiz SMALLINT(6);
ALTER TABLE funcionario_contrato ADD cnpj_estabelecimento_atividades VARCHAR(18);

INSERT INTO tabela (id,nome,store) 
     VALUES ('48',
             'empregador_contratante_aprendiz',
             'Folha.store.folhaCadastroEmpregadorContratanteAprendiz');

INSERT INTO campo (nome,descricao,filtro,tamanho,ordem,flex,xtype,format,class_name,tabela_id)
     VALUES	 ('empregador_contratante_aprendiz','Outra Empresa','S',97,2,0,NULL,NULL,'id',48),
             ('empresa_nome','Nome','S',300,2,1,NULL,NULL,'descricao',48),
             ('inscricao','CNPJ/CNO','S',300,2,1,NULL,NULL,'descricao',48),
             ('tipo_outra_empresa','Tipo Outra Empresa','S',300,2,1,NULL,NULL,'descricao',48);

INSERT INTO combobox (id, descricao)
     VALUES ('49', 'Modalidade de Contratação');


INSERT INTO combobox_item (id, combobox_id, valor, descricao) 
     VALUES ('289',
             '49',
             '1',
             'Contratação Direta');

INSERT INTO combobox_item (id, combobox_id, valor, descricao) 
     VALUES ('290',
             '49',
             '2',
             'Contratação Indireta');

---------------------------------Criação tabelas Anexos-----------------------------------------------
create table if not exists tipo_anexo_documento (
  id int not null auto_increment,
  descricao varchar(200) not null,
  tipo smallint(2) not null default 0 comment '0- outros, 1 - admissão, 2 - afastamento',
  primary key (id))
engine = innodb;

create table if not exists anexo_documento (
  id int not null auto_increment,
  tipo_anexo_documento_id int not null,
  descricao varchar(250) null,
  file_name varchar(250) not null,
  file_path varchar(250) not null,
  file_size int not null,
  usuario_cad int null,
  data_cad datetime null default current_timestamp,
  usuario_atu int null,
  data_atu datetime null default current_timestamp,
  primary key (id),
  index fk_anexo_documento_tipo_anexo_documento_idx (tipo_anexo_documento_id asc),
  constraint fk_anexo_documento_tipo_anexo_documento
    foreign key (tipo_anexo_documento_id)
    references tipo_anexo_documento (id)
    on delete no action
    on update no action)
engine = innodb;

create table if not exists funcionario_contrato_anexo_documento (
  funcionario_contrato_id int not null,
  anexo_documento_id int not null,
  primary key (funcionario_contrato_id, anexo_documento_id),
  index fk_funcionario_contrato_anexo_documento_anexo_documento_idx (anexo_documento_id asc) ,
  index fk_funcionario_contrato_anexo_documento_funcionario_con_idx (funcionario_contrato_id asc) ,
  constraint fk_funcionario_contrato_anexo_documento_funcionario_contr1
    foreign key (funcionario_contrato_id)
    references funcionario_contrato (id)
    on delete no action
    on update no action,
  constraint fk_funcionario_contrato_anexo_documento_anexo_documento1
    foreign key (anexo_documento_id)
    references anexo_documento (id)
    on delete no action
    on update no action)
engine = innodb;

create table if not exists anexo_documento_afastamento (
  anexo_documento_id int not null,
  afastamento_id int not null,
  primary key (anexo_documento_id, afastamento_id),
  index fk_anexo_documento_has_afastamento_afastamento1_idx (afastamento_id asc) ,
  index fk_anexo_documento_has_afastamento_anexo_documento1_idx (anexo_documento_id asc) ,
  constraint fk_anexo_documento_has_afastamento_anexo_documento1
    foreign key (anexo_documento_id)
    references anexo_documento (id)
    on delete no action
    on update no action,
  constraint fk_anexo_documento_has_afastamento_afastamento1
    foreign key (afastamento_id)
    references afastamento (id)
    on delete no action
    on update no action)
engine = innodb


alter table usuario_cliente drop foreign key fk_usuario_has_cliente_usuario1;
alter table usuario_cliente add constraint fk_usuario_has_cliente_usuario1 foreign key (usuario_id) references usuario(id) on delete cascade;

/**********************Criaçao conf layout**********************************************/

INSERT INTO combobox (id,descricao) VALUES (51,'Tipo de layout');

INSERT INTO combobox_item (id,combobox_id,valor,descricao) VALUES
	(294,51,1,'Admissão'),
	(295,51,2,'Afastamento'),
	(296,51,3,'Centro de Custo'),
	(297,51,4,'Despesa Médica'),
	(298,51,5,'Dependente Funcionário'),
	(299,51,6,'Histórico'),
	(300,51,7,'Organograma'),
	(301,51,8,'Plano de Saúde'),
	(302,51,9,'Programação Férias'),
	(303,51,10,'Recibo Férias'),
	(304,51,11,'Rescisão'),
	(305,51,12,'Terceiros'),
	(306,51,13,'Tomador de Serviço');

CREATE TABLE integracao_configuracao(
	id INT NOT NULL AUTO_INCREMENT,
	token_nweb VARCHAR(250),
	ip VARCHAR(250),
	porta VARCHAR(250),
	importacao_automatica INT,
	PRIMARY KEY(id)
);

insert into integracao_configuracao values (1, '');

create table log_importacao(
	id int not null auto_increment,
	usuario int not null,
	datahora datetime not null,
	json text not null,
	primary key(id) 
);

create table layout_importacao(
	id int not null auto_increment,
	nome varchar(250) not null,
  data64 text not null,
  tipo int not null,
  ordem int not null,
	primary key (id)
);

INSERT INTO folha_demo.layout_importacao (nome,base64,tipo,ordem) VALUES
	 ('1P - Pessoa','',1,1),
	 ('2C - Funccontrato','',1,2),
	 ('3D - Dependente','',1,3),
	 ('C1 - Cargo','',1,4),
	 ('C2 - Salario','',1,5),
	 ('C3 - Local','',1,6),
	 ('C4 - Escala','',1,7),
	 ('C5 - Adicional','',1,8),
	 ('C6 - Sindicato','',1,9),
	 ('C7 - Local Contabil','',1,10),
	 ('C8 - Periodo Aquisitivo','',1,11),
	 ('C9 - Funcionario CTPS','',1,12),
	 ('C10 - Exame Medico','',1,13),
	 ('C48 - Pessoa - Cadastrado','',1,14),
	 ('C49 - Funccontrato - Cadastrado','',1,15),
	 ('C50 - Dependente - Cadastrado','',1,16),
	 ('C51 - Cargo - Cadastrado','',1,17),
	 ('C52 - Salario - Cadastrado','',1,18),
	 ('C53 - Local - Cadastrado','',1,19),
	 ('C54 - Escala - Cadastrado','',1,20),
	 ('C55 - Adicional - Cadastrado','',1,21),
	 ('C56 - Sindicato - Cadastrado','',1,22),
	 ('C57 - Local Contabil - Cadastrado','',1,23),
	 ('C58 - Periodo Aquisitivo - Cadastrado','',1,24),
	 ('C59 - Funcionario CTPS - Cadastrado','',1,25),
	 ('C60 - Exame Medico - Cadastrado','',1,26);

   INSERT INTO tela (cd_tela,ds_nome,ds_descricao,x_ativo,nr_ordem,sub_menu_pai,sub_menu) VALUES
	 (66,'subintegracao','Integração',1,7000,NULL,1),
	 (67,'subconfiguracaointegracao','Integração ➙ Configuração',1,7500,'subintegracao',1),
	 (68,'integracaoconfiguracaogeral','Integração ➙ Configuração ➙ Geral',1,7501,'subconfiguracaointegracao',0),
	 (69,'integracaoconfiguracaolayout','Integração ➙ Configuração ➙ Layout',1,7502,'subconfiguracaointegracao',0);

   ALTER TABLE funcionario_contrato ADD status INT NULL;

   INSERT INTO combobox_item (id,combobox_id,valor,descricao) VALUES
	 (307,52,1,'Cadastrada'),
	 (308,52,2,'Finalizada'),
	 (309,52,3,'Importada');