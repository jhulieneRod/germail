- graficos de Eventos
- graficos de funcionários 
    - quem ta de ferias, 
    - quem precisa pegar ferias, 
    - quem está de atestado

-- relação dos ultimos 12 meses de eventos variaveis agrupados por mês, tipo(hora,valor,percentual), tipoevento(1-pagos, 2- discontos, 4- não sei)

select ev.competencia
      ,e.tipo
      ,e.tipoevento      
      ,ev.evento_id
      ,sum(time_to_sec(ev.referencia)) as referencia_sec
      ,floor(sum(time_to_sec(ev.referencia))/60/60) referencia_hor
      ,(floor(sum(time_to_sec(ev.referencia))/60) - (floor(sum(time_to_sec(ev.referencia))/60/60)*60)) referencia_min
      ,sum(ev.valor) as valor
      ,sum(ev.percentual) as percentual
  from evento_variavel ev 
 inner join funcionario f on f.id = ev.funcionario_id
 inner join evento e on e.id = ev.evento_id
 where f.cliente_id = 17
   and ev.competencia between concat(year(DATE_ADD(curdate(), INTERVAL -11 month)), '-', month(DATE_ADD(curdate(), INTERVAL -11 month)),'-01') 
                          and DATE_ADD(concat(year(curdate()), '-', month(DATE_ADD(curdate(), INTERVAL 1 month)), '-01'), INTERVAL -1 day) 
 group by ev.competencia
         ,e.tipo
         ,e.tipoevento      
         ,ev.evento_id                                            
 order by ev.competencia
         ,e.tipo
         ,e.tipoevento      
         ,ev.evento_id