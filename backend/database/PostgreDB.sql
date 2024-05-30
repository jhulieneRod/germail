CREATE TABLE IF NOT EXISTS tbl_configuracao (
  cd_configuracao smallint NOT NULL DEFAULT 1,
  cd_modulo smallint DEFAULT 1,
  evento_percentual smallint DEFAULT NULL,
  valor_padrao_admissao boolean not null DEFAULT true,
  utiliza_codigo_empresa_erp boolean not null DEFAULT false,
  utiliza_novo_layout_pessoa boolean not null DEFAULT true,
  email_notificacao varchar(250) DEFAULT NULL,
  dias_experiencia smallint not null DEFAULT 7,
  dias_ferias_antes smallint not null DEFAULT 60,
  dias_ferias_depois smallint not null DEFAULT 60,
  logo varchar(250) DEFAULT NULL,
  email_cor_fundo varchar(10) DEFAULT '#ffffff',
  email_experiencia_obs varchar(250) DEFAULT 'Obs: Se for prorrogado, não esquecer de pegar as assinaturas na prorrogação anexada na pasta do funcionário. Caso seja rescindido o contrato, por gentileza nos comunicar.',
  email_ferias_obs varchar(250) DEFAULT 'Entre em contato com o departamento pessoal de sua contabilidade por e-email ou telefone.',
  sincroniza_tipo smallint DEFAULT 1,
  sincroniza_hora time DEFAULT NULL,
  logo_size integer DEFAULT NULL,
  data_atu TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_atu integer DEFAULT NULL,  
  PRIMARY KEY (id)
)
COMMENT ON COLUMN configuracao.evento_percentual IS '0 - Referência/Valor; 1 - Referência; 2 - Valor;';
COMMENT ON COLUMN configuracao.valor_padrao_admissao IS 'Se a admissão vai possúir campo com valores padrões pré definidos';
COMMENT ON COLUMN configuracao.utiliza_codigo_empresa_erp IS 'Se nos relatório e consultas do sistema o código de cliente utilizado deve ser o do Velox ou o do ERP';
COMMENT ON COLUMN configuracao.sincroniza_tipo IS '0 - As; 1 - A cada';
COMMENT ON COLUMN configuracao.modulo IS '1 - Avisos, 2 - Eventos/Banco de horas, 3 - Completo';

CREATE TABLE IF NOT EXISTS empresa (
  id smallint NOT NULL,
  nome varchar(200) DEFAULT NULL,
  inscricao varchar(20) DEFAULT NULL,
  email_fechamento varchar(250) DEFAULT NULL,
  ultimo_acesso TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email_servidor varchar(250) DEFAULT NULL,
  email_porta varchar(10) DEFAULT NULL,
  email_usuario varchar(250) DEFAULT NULL,
  email_senha varchar(250) DEFAULT NULL,
  email_ssl boolean not null DEFAULT true,
  data_cad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_cad integer DEFAULT NULL,
  data_atu TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_atu integer DEFAULT NULL,
  base_nome varchar(100) DEFAULT NULL,
  base_usuario varchar(100) DEFAULT NULL,
  base_senha varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS modulo (
  id serial NOT NULL,
  nome varchar(100) DEFAULT NULL,
  descricao varchar(250) DEFAULT NULL,
  ordem smallint DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS empresa_modulo (
  id serial NOT NULL,
  empresa_id smallint NOT NULL,
  modulo_id smallint NOT NULL,
  permissao boolean not null DEFAULT true,
  PRIMARY KEY (id,empresa_id,modulo_id),  
  CONSTRAINT fk_empresa_has_modulo_empresa1 FOREIGN KEY (empresa_id) REFERENCES empresa (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_empresa_has_modulo_modulo1 FOREIGN KEY (modulo_id) REFERENCES modulo (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);


CREATE TABLE IF NOT EXISTS estado (
	sigla varchar(2) not null,
	descricao varchar(45) NULL,
	CONSTRAINT estado_pkey PRIMARY KEY (sigla)
);

CREATE TABLE IF NOT EXISTS cidade (
	id serial NOT NULL,
	estado_sigla varchar(2),
	sequencia int null default 0,	
	descricao varchar(250) NULL,
    id_erp int null default 0,
	codigo_estadual int null default 0,
    codigo_federal int null default 0,
    codigo_rais int null default 0,
    cep varchar(10) null,
	PRIMARY KEY(id),
    CONSTRAINT fk_estado FOREIGN KEY(estado_sigla) REFERENCES estado(sigla)
);
COMMENT ON COLUMN cidade.id IS 'OBS: não deve ser informando manualmente nunca. SERIAL tipo auto-incremento de 4 bytes que vai de 1 até 2,147,483,647';
COMMENT ON COLUMN cidade.sequencia IS 'codigomunic: reinicia a sequencia quando muda o estado';
COMMENT ON COLUMN cidade.id_erp IS 'codigomunicipio: sequencia infinita e nunca reinicia';


CREATE TABLE IF NOT EXISTS cliente (
	id serial NOT NULL,	
	nome varchar(250) NULL,
  erp_empresa int default null,
  erp_filial int default null,
  email varchar(250) DEFAULT NULL,
  inscricao varchar(20) not NULL unique,
  usuario_cadastro_id int DEFAULT NULL,
  data_encerramento date DEFAULT NULL,
  data_encerramento_veloxdp date DEFAULT NULL,
  estado_sigla varchar(2),
  cidade_id int DEFAULT NULL,
  email_responsavel varchar(250) DEFAULT NULL,
  evento_chx boolean DEFAULT true,
  cargo_chx boolean DEFAULT true,
  escala_chx boolean DEFAULT true,
  sindicato_chx boolean DEFAULT true,
  tipo_contrato_chx boolean DEFAULT true,
  local_contabil_chx boolean DEFAULT true,
  endereco varchar(500) DEFAULT NULL,
  numero varchar(50) DEFAULT NULL,
  bairro varchar(500) DEFAULT NULL,
  cep varchar(10) DEFAULT NULL,
  tipo_inscricao smallint DEFAULT 1,
  data_cad TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_cad int DEFAULT NULL,
  data_atu TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  usuario_atu int DEFAULT NULL,
  x_importado boolean DEFAULT false,
	
	PRIMARY KEY(id),
  CONSTRAINT fk_estado FOREIGN KEY(estado_sigla) REFERENCES estado(sigla),
  CONSTRAINT fk_cidade FOREIGN KEY(cidade_id) REFERENCES cidade(id)
);

/* SELECT NO QUESTOR

select siglaestado,
       codigomunic,
       codigomunicipio,
       nomemunic,
       codigoestad,
       codigofederal,
       codigorais,
       cepmunic
  from municipio

select'('''||m.siglaestado||''''||','||m.codigomunic||','||''''||m.nomemunic||''''||','||m.codigomunicipio||','||m.codigoestad||','||m.codigofederal||','||m.codigorais||','||''''||m.cepmunic||'''),'
  from municipio m
  inner join estado e on e.siglaestado = m.siglaestado
  order by e.estadobrasil desc, e.nomeestado asc, m.codigomunic asc


select m.siglaestado,
       m.codigomunic,
       m.codigomunicipio,
       m.nomemunic,
       m.codigoestad,
       m.codigofederal,
       m.codigorais,
       m.cepmunic
  from municipio m
  inner join estado e on e.siglaestado = m.siglaestado
  order by e.estadobrasil desc, e.nomeestado asc, m.codigomunic asc
  */

  