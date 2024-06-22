const knex = require('../../config/database');
const DateFormat = require('date-fns');

module.exports = function (route) {

    route.get('/sequencia/', (req, res, next) => {
        const sqlCommand = `select 
                                s.id,
                                s.nome, 
                                date_format(s.ultima_alteracao, '%d/%m/%Y %H:%mm') as ultima_alteracao,
                                coalesce(fluxo, 0) as fluxo
                              from 
                                sequencia s`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/sequencia/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        let datahora = DateFormat.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        req.body.ultima_alteracao = datahora;
        knex('sequencia')
            .where('id', id)
            .update(values)
            .then(() => {
                return res.status(200).send(true);
            })
            .catch(function (error) {}, next);
    });

    route.delete('/sequencia/:id', (req, res, next) => {
        const id = req.params.id;

        knex('sequencia')
        .where('id', id)
        .delete()
        .then((dados) => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/sequencia/', (req, res, next) => {
        let datahora = DateFormat.format(new Date(), 'yyyy-MM-dd hh:mm:ss');
        req.body.ultima_alteracao = datahora;
        knex('sequencia')
        .insert(req.body)
        .then(() => {
            return res.status(200).send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/fluxoSequencia/:id', (req, res, next) => {
        let fluxo = {id: `react_flow_${Date.now()}`, nodes: JSON.stringify([]), edges: JSON.stringify([])}
        knex('fluxo')
        .insert(fluxo)
        .then((dados) => {
            return res.status(200).send({fluxo});
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.get('/fluxoSequencia/:id', (req, res, next) => {
        const sqlCommand = `select 
                                *
                              from 
                                fluxo
                            where id = ?`;

        knex.raw(sqlCommand, [req.params.id])
        .then((dados) => {
            const fluxo = dados[0][0];
            fluxo.nodes = JSON.parse(fluxo.nodes);
            fluxo.edges = JSON.parse(fluxo.edges);
            return res.send(fluxo);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.get('/fluxoEtapa/:id', (req, res, next) => {
        const sqlCommand = `select 
                                *
                              from 
                                etapa
                            where id = ?`;

        knex.raw(sqlCommand, [req.params.id])
        .then((dados) => {
            if(dados[0].length){
                const etapa = dados[0][0];
                etapa.data = JSON.parse(etapa.data);
                return res.send(etapa);
            }
            return res.send(false);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/fluxoSequencia/:id', (req, res, next) => {
        knex('fluxo')
        .update(req.body)
        .where('id', req.params.id)
        .then((dados) => {
            return res.send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/fluxoEtapa/:id', (req, res, next) => {
        knex('etapa')
        .update(req.body)
        .where('id', req.params.id)
        .then((dados) => {
            return res.send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.post('/fluxoEtapa/:id', (req, res, next) => {
        knex('etapa')
        .insert(req.body)
        .then((dados) => {
            return res.send(true);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });
}