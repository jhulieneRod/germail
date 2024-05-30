const knexCli = require('../../config/databaseCliente');
const { format, parseISO } = require('date-fns');

module.exports = function (route) {

    // Rotas REST
    route.get('/dashboard/avisos', (req, res, next) => {

        const sqlCommand = `select * from
                                (select cast(concat(le.competencia,'-01') as date) as competencia
                                    ,ifnull(max(CASE when le.tipo_email = 2 then le.total end),0) as contrato
                                    ,ifnull(max(CASE when le.tipo_email = 3 then le.total end),0) as ferias
                                    ,ifnull(max(CASE when le.tipo_email = 4 then le.total end),0) as afastamento
                                    ,ifnull(max(CASE when le.tipo_email = 5 then le.total end),0) as imposto
                                from (select count(*) as total
                                            ,l.tipo_email             
                                            ,concat(year(l.data_log), '-', month(l.data_log)) as competencia
                                        from log_email l
                                    where l.data_log between concat(year(DATE_ADD(curdate(), INTERVAL -11 month)), '-', month(DATE_ADD(curdate(), INTERVAL -11 month)),'-01') 
                                                            and LAST_DAY(curdate())
                                    group by l.tipo_email, concat(year(l.data_log), '-', month(l.data_log))) le 
                                group by le.competencia) gt
                            order by 1`;

        knexCli(req).then((knex) => {
            if (knex)
                knex.raw(sqlCommand, [])
                    .then((dados) => {
                        let aviso = {
                            label: [],
                            contrato: [],
                            ferias: [],
                            afastamento: [],
                            imposto: []

                        }
                        for (let idx = 0; idx < dados[0].length; idx++) {
                            const element = dados[0][idx];
                            aviso.label.push(format(element.competencia, 'MM/yyyy'));
                            aviso.contrato.push(element.contrato);
                            aviso.ferias.push(element.ferias);
                            aviso.afastamento.push(element.afastamento);
                            aviso.imposto.push(element.imposto);
                        }

                        return res.send(aviso);
                    })
                    .catch(function (error) {
                        console.log('Erro', error.sqlCommand)
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next);
            else
                return res.status(511).send({ errors: ['Acesso inválido'] });
        }, next);

    });

    route.get('/dashboard/widgets', (req, res, next) => {

        const sqlCommand = `   select sum(origem_geral.admissao) as admissao
                                    , sum(origem_geral.historico) as historico
                                    , sum(origem_geral.afastamento) as afastamento
                                    , sum(origem_geral.fechamento_periodo) as fechamento_periodo
                                    , sum(origem_geral.reciboferias) as reciboferias
                                    , sum(origem_geral.rescisao) as rescisao
                            from (select 0 as admissao
                                            , 0 as historico
                                            , count(*) as afastamento
                                            , 0 as fechamento_periodo
                                            , 0 as reciboferias
                                            , 0 as rescisao
                                    from afastamento af
                                    inner join funcionario f on f.id = af.funcionario_id
                                                            and f.ativo = 1
                                    inner join cliente c on c.id = f.cliente_id
                                    left join estado e on e.id = af.uf_orgao_classe
                                    where (c.data_encerramento_veloxdp is null 
                                            or c.data_encerramento = '2100-12-31' 
                                            or c.data_encerramento = '0000-00-00' 
                                            or c.data_encerramento is null)
                                        and (af.importado = 0 or af.importado is null)
                                        and af.data_afastamento between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                                                    and LAST_DAY(curdate())
                                    

                                    union

                                    select count(*) as admissao
                                            , 0 as historico
                                            , 0 as afastamento
                                            , 0 as fechamento_periodo
                                            , 0 as reciboferias
                                            , 0 as rescisao
                                    from vw_funcionario_contrato fc2
                                    inner join cliente c on c.id = fc2.cliente_id
                                    where cast(fc2.importado as char(3)) = 'Não'
                                        and (c.data_encerramento_veloxdp is null 
                                            or c.data_encerramento = '2100-12-31' 
                                            or c.data_encerramento = '0000-00-00' 
                                            or c.data_encerramento is null)
                                        and fc2.data_admissao between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                                                and DATE_ADD(LAST_DAY(curdate()),INTERVAL 1 month)

                            union

                                    select 0 as admissao
                                            , 0 as historico
                                            , 0 as afastamento
                                            , 0 as fechamento_periodo
                                            , count(*) as reciboferias
                                            , 0 as rescisao
                                    from reciboferias rf
                                    inner join funcionario f on f.id = rf.funcionario_id
                                    inner join cliente c on c.id = f.cliente_id
                                    where rf.importado is null
                                        and (c.data_encerramento_veloxdp is null 
                                            or c.data_encerramento = '2100-12-31' 
                                            or c.data_encerramento = '0000-00-00' 
                                            or c.data_encerramento is null)     
                                        and rf.data_inicial_ferias between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01')  
                                                                and LAST_DAY(curdate())

                            union

                                        select 0 as admissao
                                            , 0 as historico
                                            , 0 as afastamento
                                            , 0 as fechamento_periodo
                                            , 0 as reciboferias
                                            , count(*) as rescisao
                                        from rescisao r
                                        inner join funcionario f on f.id = r.funcionario_id
                                        inner join cliente c on c.id = f.cliente_id
                                        where r.importado is null
                                        and (c.data_encerramento_veloxdp is null 
                                                or c.data_encerramento = '2100-12-31' 
                                                or c.data_encerramento = '0000-00-00' 
                                                or c.data_encerramento is null)     
                                        and r.data_rescisao between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01')  
                                                                and DATE_ADD(LAST_DAY(curdate()),INTERVAL 1 month)

                            union

                                        select 0 as admissao
                                            , 0 as historico
                                            , 0 as afastamento
                                            , count(*) as fechamento_periodo
                                            , 0 as reciboferias
                                            , 0 as rescisao
                                        from fechamento fp
                                        inner join cliente c on c.id = fp.cliente_id
                                        where (c.data_encerramento_veloxdp is null 
                                                or c.data_encerramento = '2100-12-31' 
                                                or c.data_encerramento = '0000-00-00' 
                                                or c.data_encerramento is null) 
                                    and fp.competencia >= concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                    and fp.importado = 0

                                        union

                                        select 0 as admissao
                                            , (adicional+cargo+escala+salario+sindicato) as historico
                                            , 0 as afastamento
                                            , 0 as fechamento_periodo
                                            , 0 as reciboferias
                                            , 0 as rescisao
                                        from (select sum(origem_historico.adicional) as adicional
                                                    , sum(origem_historico.cargo)     as cargo
                                                    , sum(origem_historico.escala)    as escala
                                                    , sum(origem_historico.salario)   as salario
                                                    , sum(origem_historico.sindicato) as sindicato
                                                from (select count(*) as adicional
                                                            , 0 as cargo
                                                            , 0 as escala
                                                            , 0 as salario
                                                            , 0 as sindicato
                                                        from funcadicional fa
                                                        inner join funcionario f on f.id = fa.funcionario_id
                                                                                and f.ativo = 1
                                                        inner join cliente c on c.id = f.cliente_id
                                                                            and (c.data_encerramento_veloxdp is null
                                                                                or c.data_encerramento = '2100-12-31' 
                                                                                or c.data_encerramento = '0000-00-00' 
                                                                                or c.data_encerramento is null) 
                                                        where fa.importado = 0
                                                        

                                                        union

                                                        select 0 as adicional 
                                                            , count(*) as cargo
                                                            , 0 as escala
                                                            , 0 as salario
                                                            , 0 as sindicato
                                                        from funccargo fc
                                                        inner join funcionario f on f.id = fc.funcionario_id
                                                                                and f.ativo = 1
                                                        inner join cliente c on c.id = f.cliente_id
                                                                            and (c.data_encerramento_veloxdp is null
                                                                                or c.data_encerramento = '2100-12-31' 
                                                                                or c.data_encerramento = '0000-00-00' 
                                                                                or c.data_encerramento is null) 
                                                        where fc.importado = 0
                                                        

                                                        union

                                                        select 0 as adicional 
                                                            , 0 as cargo
                                                            , count(*) as escala
                                                            , 0 as salario
                                                            , 0 as sindicato
                                                        from funcescala fe
                                                        inner join funcionario f on f.id = fe.funcionario_id
                                                                                and f.ativo = 1
                                                        inner join cliente c on c.id = f.cliente_id
                                                                            and (c.data_encerramento_veloxdp is null
                                                                                or c.data_encerramento = '2100-12-31' 
                                                                                or c.data_encerramento = '0000-00-00' 
                                                                                or c.data_encerramento is null) 
                                                        where fe.importado = 0
                                                                                                        

                                                        union

                                                        select 0 as adicional 
                                                            , 0 as cargo
                                                            , 0 as escala
                                                            , count(*) as salario
                                                            , 0 as sindicato
                                                        from funcsalario fs
                                                        inner join funcionario f on f.id = fs.funcionario_id
                                                                                and f.ativo = 1
                                                        inner join cliente c on c.id = f.cliente_id
                                                                            and (c.data_encerramento_veloxdp is null
                                                                                or c.data_encerramento = '2100-12-31' 
                                                                                or c.data_encerramento = '0000-00-00' 
                                                                                or c.data_encerramento is null) 
                                                        where fs.importado = 0
                                                        

                                                        union

                                                        select 0 as adicional 
                                                            , 0 as cargo
                                                            , 0 as escala
                                                            , 0 as salario
                                                            , count(*) as sindicato
                                                        from funcsindicato fsi
                                                        inner join funcionario f on f.id = fsi.funcionario_id
                                                                                and f.ativo = 1
                                                        inner join cliente c on c.id = f.cliente_id
                                                                            and (c.data_encerramento_veloxdp is null
                                                                                or c.data_encerramento = '2100-12-31' 
                                                                                or c.data_encerramento = '0000-00-00' 
                                                                                or c.data_encerramento is null) 
                                                        where fsi.importado = 0
                                                    ) origem_historico
                                            ) origem_historico_2
                                ) origem_geral`;

        knexCli(req).then((knex) => {
            if (knex)
                knex.raw(sqlCommand, [])
                    .then((dados) => {

                        let widget = {
                            admissao: [],
                            historico: [],
                            afastamento: [],
                            fechamento_periodo: [],
                            ferias: [],                            
                            rescisao: []

                        }
                        for (let idx = 0; idx < dados[0].length; idx++) {
                            const element = dados[0][idx];
                            widget.admissao.push(element.admissao)    
                            widget.historico.push(element.historico);
                            widget.afastamento.push(element.afastamento);
                            widget.fechamento_periodo.push(element.fechamento_periodo);
                            widget.ferias.push(element.reciboferias);                            
                            widget.rescisao.push(element.rescisao);
                        }

                        return res.send(widget);

                    })
                    .catch(function (error) {
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next);
            else
                return res.status(511).send({ errors: ['Acesso inválido'] });
        }, next);

    });


    route.post('/dashboard/widgets/pesquisar', (req, res, next) => {

        let sqlCommand = ``;

        if (req.body.tipo == '1'){
            sqlCommand = `select *
                            from (select count(*) as total
                                        , c.id as codigo_sistema
                                        , c.nome as nome_empresa
                                        , c.questor_empresa as codigo_questor_empresa
                                        , c.questor_filial as codigo_questor_filial
                                    from vw_funcionario_contrato fc
                                inner join cliente c on c.id = fc.cliente_id
                                where cast(fc.importado as char(3)) = 'Não'
                                    and (c.data_encerramento_veloxdp is null 
                                        or c.data_encerramento = '2100-12-31' 
                                        or c.data_encerramento = '0000-00-00' 
                                        or c.data_encerramento is null)
                                    and fc.data_admissao between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                                            and DATE_ADD(LAST_DAY(curdate()),INTERVAL 1 month)
                                group by 2,3,4,5) origem
                        where origem.total > 0`;

        } else if (req.body.tipo == '2'){
            sqlCommand = `select *
                            from (select *,
                                ((select count(*) as adicional
                                    from funcadicional fa
                            inner join funcionario f on f.id = fa.funcionario_id
                                                        and f.ativo = 1
                            inner join cliente c on c.id = f.cliente_id
                                    where c.id = origem.codigo_sistema
                                    and fa.importado = 0
                                    and c.data_encerramento_veloxdp is null
                                    and (c.data_encerramento = '2100-12-31' or c.data_encerramento = '0000-00-00' or c.data_encerramento is null))
                                +
                                (select count(*) as cargo
                                    from funccargo fc
                            inner join funcionario f on f.id = fc.funcionario_id
                                                    and f.ativo = 1
                            inner join cliente c on c.id = f.cliente_id
                                    where c.id = origem.codigo_sistema
                                    and fc.importado = 0
                                    and c.data_encerramento_veloxdp is null
                                    and (c.data_encerramento = '2100-12-31' or c.data_encerramento = '0000-00-00' or c.data_encerramento is null))
                                +
                                (select count(*) as escala
                                    from funcescala fe
                            inner join funcionario f on f.id = fe.funcionario_id
                                                    and f.ativo = 1
                            inner join cliente c on c.id = f.cliente_id
                                    where c.id = origem.codigo_sistema
                                    and fe.importado = 0
                                    and c.data_encerramento_veloxdp is null
                                    and (c.data_encerramento = '2100-12-31' or c.data_encerramento = '0000-00-00' or c.data_encerramento is null))
                                +
                                (select count(*) as salario
                                    from funcsalario fs
                            inner join funcionario f on f.id = fs.funcionario_id 
                                                            and f.ativo = 1
                            inner join cliente c on c.id = f.cliente_id
                                    where c.id = origem.codigo_sistema
                                    and fs.importado = 0
                                    and c.data_encerramento_veloxdp is null
                                    and (c.data_encerramento = '2100-12-31' or c.data_encerramento = '0000-00-00' or c.data_encerramento is null))
                                +
                                (select count(*) as sindicato
                                    from funcsindicato fsi
                            inner join funcionario f on f.id = fsi.funcionario_id
                                                    and f.ativo = 1
                            inner join cliente c on c.id = f.cliente_id
                                where c.id = origem.codigo_sistema
                                    and fsi.importado = 0
                                    and c.data_encerramento_veloxdp is null
                                    and (c.data_encerramento = '2100-12-31' or c.data_encerramento = '0000-00-00' or c.data_encerramento is null))
                                    
                                ) as total
                        
                        from (select c.id   as codigo_sistema,
                                    c.nome as nome_empresa,
                                    c.questor_empresa as codigo_questor_empresa,
                                    c.questor_filial as codigo_questor_filial
                                from cliente c) origem )origem2
                       where origem2.total > 0`;
        
        } else if (req.body.tipo == '3'){
            sqlCommand = `select *
                            from (select count(*) as total
                                        , c.id as codigo_sistema
                                        , c.nome as nome_empresa
                                        , c.questor_empresa as codigo_questor_empresa
                                        , c.questor_filial as codigo_questor_filial
                                    from afastamento af
                                inner join funcionario f on f.id = af.funcionario_id
                                                        and f.ativo = 1
                                inner join cliente c on c.id = f.cliente_id
                                where (af.importado = 0 or af.importado is null)
                                    and (c.data_encerramento_veloxdp is null
                                        or c.data_encerramento = '2100-12-31' 
                                        or c.data_encerramento = '0000-00-00' 
                                        or c.data_encerramento is null) 
                                    and af.data_afastamento between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                                                and LAST_DAY(curdate())
                                group by 2,3,4,5) as origem
                        where origem.total > 0`;
        
        } else if (req.body.tipo == '4'){
            sqlCommand = `select *
                            from (select count(*) as total
                                        , c.id as codigo_sistema
                                        , c.nome as nome_empresa
                                        , c.questor_empresa as codigo_questor_empresa
                                        , c.questor_filial as codigo_questor_filial
                                    from fechamento fp
                                inner join cliente c on c.id = fp.cliente_id
                                where fp.competencia >= concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01')  
                                    and fp.importado = 0 
                                group by 2,3,4,5) as origem
                        where origem.total > 0`;
        
        } else if (req.body.tipo == '5'){
            sqlCommand = `select *
                            from (select count(*) as total
                                        , c.id as codigo_sistema
                                        , c.nome as nome_empresa
                                        , c.questor_empresa as codigo_questor_empresa
                                        , c.questor_filial as codigo_questor_filial
                                    from reciboferias rf
                                inner join funcionario f on f.id = rf.funcionario_id                                           
                                inner join cliente c on c.id = f.cliente_id
                                where rf.importado is null
                                    and rf.data_inicial_ferias between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                                                    and LAST_DAY(curdate())
                                group by 2,3,4,5) as origem
                        where origem.total > 0`;
        
        } else if (req.body.tipo == '6'){
            sqlCommand = `select *
                            from (select count(*) as total
                                        , c.id as codigo_sistema
                                        , c.nome as nome_empresa
                                        , c.questor_empresa as codigo_questor_empresa
                                        , c.questor_filial as codigo_questor_filial
                                    from rescisao r
                                inner join funcionario f on f.id = r.funcionario_id      
                                inner join cliente c on c.id = f.cliente_id
                                where r.importado is null 
                                    and r.data_rescisao between concat(year(DATE_ADD(curdate(), INTERVAL -1 month)), '-', month(DATE_ADD(curdate(), INTERVAL -1 month)),'-01') 
                                                            and DATE_ADD(LAST_DAY(curdate()),INTERVAL 1 month)
                                    group by 2,3,4,5) as origem
                        where origem.total > 0`;       
        }

        knexCli(req).then((knex) => {
            if (knex)
                knex.raw(sqlCommand, [])
                    .then((dados) => {
                        return res.send(dados[0]);
                    })
                    .catch(function (error) {
                        return res.status(500).send({ errors: [error.sqlMessage] });
                    }, next);
            else
                return res.status(511).send({ errors: ['Acesso inválido'] });
        }, next);

    });




}