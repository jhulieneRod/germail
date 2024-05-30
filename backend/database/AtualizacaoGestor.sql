alter table configuracao add data_cad datetime default current_timestamp;
alter table configuracao add usuario_cad int default null;
alter table configuracao add data_atu datetime default current_timestamp;
alter table configuracao add usuario_atu int default null;

alter table empresa add base_nome varchar(45) default null;
alter table empresa add base_usuario varchar(45) default null;
alter table empresa add base_senha varchar(45) default null;

alter table empresa add data_cad datetime default current_timestamp;
alter table empresa add usuario_cad int default null;
alter table empresa add data_atu datetime default current_timestamp;
alter table empresa add usuario_atu int default null;

update empresa e 
 inner join (select empresa_id
                   ,base_nome
                   ,base_usuario
                   ,base_senha
               from usuario
              group by empresa_id) u on u.empresa_id = e.id
   set e.base_nome = u.base_nome
      ,e.base_usuario = u.base_usuario
      ,e.base_senha = u.base_senha;

alter table usuario add x_ativo tinyint(1) not null default 0;
update usuario set x_ativo = replace(replace(upper(ativo), 'SIM',1), 'NÃO',0);

alter table usuario add senha_hash varchar(100) null;

alter table usuario add data_cad datetime default current_timestamp;
alter table usuario add usuario_cad int default null;
alter table usuario add data_atu datetime default current_timestamp;
alter table usuario add usuario_atu int default null;

alter table usuario add usuario_id int default null;

------------------------------------------------------------------------

create table if not exists integracao_sistema (
  id int not null auto_increment,
  descricao varchar(100) null,
  contato varchar(250) null,
  primary key (id))
engine = innodb;

-- A IDEIA É BUSCAR AQUI OS SQLs QUE O EXE PRECISA EXECUTAR PARA CADA SISTEMA(QUESTOR, SCI, DOMINIO...)
create table if not exists integracao_sistema_sql (
  id int not null auto_increment,
  integracao_sistema_id int not null,
  descricao varchar(100) null,
  comando mediumtext null,
  primary key (id, integracao_sistema_id),
  index fk_integracao_sistema_sql_integracao_sistema_idx (integracao_sistema_id asc),
  constraint fk_integracao_sistema_sql_integracao_sistema
    foreign key (integracao_sistema_id)
    references integracao_sistema (id)
    on delete no action
    on update no action)
engine = innodb;


alter table empresa add x_ativo tinyint(1) not null default 1;
update empresa set x_ativo = 0 where permissao <> 'Sim';

alter table empresa add x_velox2 tinyint(1) not null default 0;

ALTER TABLE empresa ADD email VARCHAR(255);