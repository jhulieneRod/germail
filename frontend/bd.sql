CREATE TABLE geremail.tag (
	id INT auto_increment NOT NULL,
	titulo varchar(100) NOT NULL,
	descricao varchar(100) NULL,
	cor varchar(100) NULL,
	CONSTRAINT tag_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE geremail.`lead` (
	id INT auto_increment NOT NULL,
	nome varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	status SMALLINT DEFAULT 0 NOT NULL,
	pontuacao BIGINT DEFAULT 0 NOT NULL,
	CONSTRAINT lead_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;

CREATE TABLE geremail.email (
	id INT auto_increment NOT NULL,
	assunto varchar(100) NULL,
	conteudo TEXT NOT NULL,
	status SMALLINT DEFAULT 1 NOT NULL,
	automatico SMALLINT DEFAULT 0 NOT NULL,
	CONSTRAINT email_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
