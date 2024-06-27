const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/configuracao', (req, res, next) => {
        const sqlCommand = `select 
                                c.id,
                                c.titulo,
                                c.html, 
                                c.design, 
                                c.status, 
                                case
                                    when c.status = 1
                                    then 'Ativo'
                                    else 'Desativo'
                                end as status_descricao
                              from 
                                homepage c`;

        knex.raw(sqlCommand, [])
        .then((dados) => {
            return res.send(dados[0]);
        })
        .catch(function (error) {
            return res.status(500);
        }, next);
    });

    route.put('/configuracao/:id', (req, res, next) => {
        const id = req.params.id;
        const values = req.body;
        console.log(values);
        knex('homepage')
        .where('id', id)
        .update(values)
        .then(() => {})
        .catch(function (error) {}, next); 

        return res.status(200).send(true);
    });

    route.delete('/configuracao/:id', (req, res, next) => {
        knex('homepage')
        .where('id', [req.params.id])
        .delete()
        .then(() => {})
        .catch(function (error) {}, next); 

        return res.status(200).send(true);
    });

    route.post('/configuracao/', (req, res, next) => {
        const values = req.body;
        knex('homepage')
        .insert(values)
        .then(() => {})
        .catch(function (error) {}, next); 

        return res.status(200).send(true);
    });
}