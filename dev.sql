-- CREATE DATABASE IF NOT EXISTS germail CHARACTER SET utf8 COLLATE utf8_general_ci;
-- USE germail;

-- Tabela Lead
CREATE TABLE lead (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status TINYINT NOT NULL
);

-- Tabela Tag
CREATE TABLE tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    cor VARCHAR(7)
);

-- Tabela Email
CREATE TABLE email (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assunto VARCHAR(255) NOT NULL,
    conteudo TEXT,
    design TEXT,
    status TINYINT NOT NULL
);

-- Tabela Log_Destinatario_Email
CREATE TABLE log_destinatario_email (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_email INT NOT NULL,
    id_lead INT NOT NULL,
    datahora DATETIME NOT NULL,
    acao TINYINT NOT NULL,
    FOREIGN KEY (id_email) REFERENCES email(id),
    FOREIGN KEY (id_lead) REFERENCES lead(id)
);

-- Tabela Tag_Lead
CREATE TABLE tag_lead (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_lead INT NOT NULL,
    id_tag INT NOT NULL,
    FOREIGN KEY (id_lead) REFERENCES lead(id),
    FOREIGN KEY (id_tag) REFERENCES tag(id)
);

-- Tabela Sequencia_Lead
CREATE TABLE sequencia_lead (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seq INT NOT NULL,
    id_lead INT NOT NULL,
    id_sequencia INT NOT NULL,
    FOREIGN KEY (id_lead) REFERENCES lead(id),
    FOREIGN KEY (id_sequencia) REFERENCES sequencia(id)
);

-- Tabela Sequencia
CREATE TABLE sequencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ultima_alteracao DATETIME NOT NULL
);

-- Tabela Etapa
CREATE TABLE etapa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo TINYINT NOT NULL,
    id_passo INT,
    FOREIGN KEY (id_passo) REFERENCES passo(id)
);

-- Tabela Gatilho
CREATE TABLE gatilho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Tabela Gatilho_Condicao
CREATE TABLE gatilho_condicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_gatilho INT NOT NULL,
    id_condicao INT NOT NULL,
    FOREIGN KEY (id_gatilho) REFERENCES gatilho(id),
    FOREIGN KEY (id_condicao) REFERENCES condicao(id)
);

-- Tabela Condicao
CREATE TABLE condicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL
);

-- Tabela Acao
CREATE TABLE acao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seq INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Tabela Atraso
CREATE TABLE atraso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

-- Tabela Etapa_Conteudo
CREATE TABLE etapa_conteudo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_etapa INT NOT NULL,
    id_conteudo INT NOT NULL,
    valor TEXT,
    id_passo INT,
    tipo_condicao TINYINT NOT NULL,
    FOREIGN KEY (id_etapa) REFERENCES etapa(id),
    FOREIGN KEY (id_passo) REFERENCES passo(id)
);

-- Tabela Passo
CREATE TABLE passo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_etapaIni INT,
    id_proxEtapa INT,
    FOREIGN KEY (id_etapaIni) REFERENCES etapa(id),
    FOREIGN KEY (id_proxEtapa) REFERENCES etapa(id)
);

-- Inserção de registros na tabela Gatilho
INSERT INTO gatilho (id, titulo, descricao) VALUES
(1, 'Data/Hora', 'Gatilho ativado por data ou hora'),
(2, 'Tag Incluída', 'Gatilho ativado por inclusão de tag'),
(3, 'Tag Removida', 'Gatilho ativado por remoção de tag'),
(4, 'Novo Contato', 'Gatilho ativado por novo contato');

-- Inserção de registros na tabela Acao
INSERT INTO acao (id, seq, titulo, descricao) VALUES
(1, 1, 'Adicionar Tag', 'Ação de adicionar uma tag ao lead'),
(2, 2, 'Remover Tag', 'Ação de remover uma tag do lead'),
(3, 3, 'Desativar Lead', 'Ação de desativar um lead'),
(4, 4, 'Ativar Lead', 'Ação de ativar um lead');

-- Inserção de registros na tabela Atraso
INSERT INTO atraso (id, tipo) VALUES
(1, 'Segundos'), -- Segundos
(2, 'Minutos'), -- Minutos
(3, 'Horas'), -- Horas
(4, 'Dias'); -- Dias
