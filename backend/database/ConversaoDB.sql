-- VERIFICA SE TEM ALGUM FUNCIONÁRIO COM INSCRIÇÃO NULL, SE TIVER ELE E O HITÓRICO DELE DEVEM SER APAGADOS
select * from funcionario where inscricao is null
delete from funcionario where inscricao is null
-- EX:
select * from evento_variavel where funcionario_id = 50841
delete from evento_variavel where funcionario_id = 50841
-------------------------------------------------------------------------

-- SELECIONA TODOS OS FUNCIONARIOS QUE NÃO TEM MOVIMENTAÇÃO E PODEM SER EXCLUIDOS
-- periodo_aquisitivo e recibo_ferias devem ser delete cascade
SELECT concat('delete from funcionario where cliente_id = ',f.cliente_id, ' and id = ',f.id, ';')
  from funcionario f
 left join evento_variavel ev on ev.funcionario_id = f.id
 left join banco_hora bh on bh.cliente_id = f.cliente_id
                        and bh.funcionario_id = f.id
 left join afastamento a on a.funcionario_id = f.id      
 left join despesa_medica dm on dm.funcionario_id = f.id
 left join funcadicional fa on fa.funcionario_id = f.id 
 left join funccargo fc on fc.funcionario_id = f.id
 left join funccentro_custo fcc on fcc.funcionario_id = f.id
 left join funcescala fe on fe.funcionario_id = f.id
 left join funcionario_dependente fd on fd.funcionario_id = f.id
 left join funcorganograma fo on fo.funcionario_id = f.id
 left join funcsalario fs on fs.funcionario_id = f.id
 left join funcsindicato fsi on fsi.funcionario_id = f.id
 left join rescisao rs on rs.funcionario_id = f.id
 left join tomador_servico ts on ts.funcionario_id = f.id
 where ev.id is null
   and bh.id is null
   and a.id  is null
   and dm.id is null
   and fa.id is null
   and fc.id is null
   and fcc.id is null
   and fe.id is null
   and fd.id is null
   and fo.id is null
   and fs.id is null
   and fsi.id is null
   and rs.id is null
   and ts.id is null   


-- FAZ O UPDATE GERANDO UMA SEQUENCIA NUMERICA NO CAMPO ID_AUX
UPDATE funcionario
JOIN (SELECT @rank := 0) r
SET id_aux=@rank:=@rank+1

-- DELETE TODAS AS FOREIGN KEY AMARRADAS AO FUNCIONARIO
ALTER TABLE banco_hora DROP FOREIGN KEY fk_banco_hora_funcionario1;
ALTER TABLE afastamento DROP FOREIGN KEY fk_afastamento_funcionario1;
ALTER TABLE despesa_medica DROP FOREIGN KEY fk_despesa_medica_funcionario_id1;
ALTER TABLE evento_variavel DROP FOREIGN KEY fk_evento_variavel_funcionario1;
ALTER TABLE funcadicional DROP FOREIGN KEY fk_funcadicional_funcionario1;
ALTER TABLE funccargo DROP FOREIGN KEY fk_funccargo_funcionario1;
ALTER TABLE funccentro_custo DROP FOREIGN KEY fk_funccentro_custo_funcionario_id1;
ALTER TABLE funcescala DROP FOREIGN KEY fk_funcescala_funcionario1;
ALTER TABLE funcionario_dependente DROP FOREIGN KEY fk_funcionario_dependente_funcionario_id1;
ALTER TABLE funcorganograma DROP FOREIGN KEY fk_funcorganograma_funcionario_id1;
ALTER TABLE funcsalario DROP FOREIGN KEY fk_funcsalario_funcionario1;
ALTER TABLE funcsindicato DROP FOREIGN KEY fk_funcsindicato_funcionario1;
ALTER TABLE periodo_aquisitivo DROP FOREIGN KEY fk_periodo_aquisitivo_funcionario1;
ALTER TABLE reciboferias DROP FOREIGN KEY fk_reciboferias_funcionario1;
ALTER TABLE reciboferiasdiasdescon DROP FOREIGN KEY fk_reciboferiasdiasdescon_reciboferias1;
ALTER TABLE rescisao DROP FOREIGN KEY fk_rescisao_funcionario1;
ALTER TABLE tomador_servico DROP FOREIGN KEY fk_tomador_servico_funcionario_id1;


alter table funcionario add id_aux bigint null default null after id;
alter table funcionario add func_bkp int after id_aux;
alter table banco_hora add func_bkp int;
alter table afastamento add func_bkp int;
alter table despesa_medica add func_bkp int;
alter table evento_variavel add func_bkp int;
alter table funcadicional add func_bkp int;
alter table funccargo add func_bkp int;
alter table funccentro_custo add func_bkp int;
alter table funcescala add func_bkp int;
alter table funcionario_dependente add func_bkp int;
alter table funcorganograma add func_bkp int;
alter table funcsalario add func_bkp int;
alter table funcsindicato add func_bkp int;
alter table periodo_aquisitivo add func_bkp int;
alter table reciboferias add func_bkp int;
alter table reciboferiasdiasdescon add func_bkp int;
alter table rescisao add func_bkp int;
alter table tomador_servico add func_bkp int;

update funcionario set func_bkp = id;
update banco_hora set func_bkp = funcionario_id;
update afastamento set func_bkp = funcionario_id;
update despesa_medica set func_bkp = funcionario_id;
update evento_variavel set func_bkp = funcionario_id;
update funcadicional set func_bkp = funcionario_id;
update funccargo set func_bkp = funcionario_id;
update funccentro_custo set func_bkp = funcionario_id;
update funcescala set func_bkp = funcionario_id;
update funcionario_dependente set func_bkp = funcionario_id;
update funcorganograma set func_bkp = funcionario_id;
update funcsalario set func_bkp = funcionario_id;
update funcsindicato set func_bkp = funcionario_id;
update periodo_aquisitivo set func_bkp = funcionario_id;
update reciboferias set func_bkp = funcionario_id;
update reciboferiasdiasdescon set func_bkp = reciboferias_funcionario_id;
update rescisao set func_bkp = funcionario_id;
update tomador_servico set func_bkp = funcionario_id;


-- ALTER TABLE afastamento DROP PRIMARY KEY;
-- update afastamento t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
-- ALTER TABLE afastamento ADD CONSTRAINT PRIMARY KEY (funcionario_id,data_afastamento,seq);


update banco_hora b inner join funcionario f on f.cliente_id = b.cliente_id and f.id = b.func_bkp set b.funcionario_id = f.id_aux;
update afastamento t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update despesa_medica t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update evento_variavel t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funcadicional t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funccargo t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funccentro_custo t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funcescala t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funcionario_dependente t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funcorganograma t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funcsalario t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update funcsindicato t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update periodo_aquisitivo t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update reciboferias t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update reciboferiasdiasdescon t inner join funcionario f on f.id = t.func_bkp set t.reciboferias_funcionario_id = f.id_aux;
update rescisao t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;
update tomador_servico t inner join funcionario f on f.id = t.func_bkp set t.funcionario_id = f.id_aux;



-- CRIA NOVAMENTE TODAS AS FOREIGN KEY AMARRADAS AO FUNCIONARIO
ALTER TABLE banco_hora ADD CONSTRAINT fk_banco_hora_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE afastamento ADD CONSTRAINT fk_afastamento_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE despesa_medica ADD CONSTRAINT fk_despesa_medica_funcionario_id1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE evento_variavel ADD CONSTRAINT fk_evento_variavel_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funcadicional ADD CONSTRAINT fk_funcadicional_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funccargo ADD CONSTRAINT fk_funccargo_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funccentro_custo ADD CONSTRAINT fk_funccentro_custo_funcionario_id1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funcescala ADD CONSTRAINT fk_funcescala_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funcionario_dependente ADD CONSTRAINT fk_funcionario_dependente_funcionario_id1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funcorganograma ADD CONSTRAINT fk_funcorganograma_funcionario_id1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funcsalario ADD CONSTRAINT fk_funcsalario_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE funcsindicato ADD CONSTRAINT fk_funcsindicato_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE periodo_aquisitivo ADD CONSTRAINT fk_periodo_aquisitivo_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE reciboferias ADD CONSTRAINT fk_reciboferias_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE reciboferiasdiasdescon ADD CONSTRAINT fk_reciboferiasdiasdescon_reciboferias1 FOREIGN KEY (reciboferias_funcionario_id,reciboferias_data_inicial,reciboferias_data_inicial_ferias) REFERENCES reciboferias(funcionario_id,data_inicial,data_inicial_ferias) ON DELETE CASCADE;
ALTER TABLE rescisao ADD CONSTRAINT fk_rescisao_funcionario1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);
ALTER TABLE tomador_servico ADD CONSTRAINT fk_tomador_servico_funcionario_id1 FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);

ALTER TABLE funcionario AUTO_INCREMENT=47318;


--  ISSO NÃO VAI MAIS SER USADO, DEVE SER FEITO OUTRO BANCO PARA CONVERTER
-- CRIA O CAMPO DE ID AUXILIAR QUE VAI RECEBER O CPF CONVERTIDO PARA INTEIRO E SERÁ A NOVA CHAVE
alter table funcionario add id_aux bigint null default null after id;
-- FAZ O UPDATE PARA CARREGA O VALOR NO VAMPO ID_AUX
update funcionario set id_aux = cast (replace(replace(replace(inscricao,'.',''),'-',''),'/','') as int);

alter table funcionario add data_demissao date DEFAULT NULL;


select inscricao
      ,ativo
      ,count(*)
      ,min(id)
      ,max(id)
      ,concat('update funcionario set ativo = 0 where id = ', min(id), ';')
  from funcionario
  where ativo = 1
  group by inscricao
      ,ativo
   having count(*) > 1;