const knex = require('../../config/database');

module.exports = function (route) {

    route.get('/lead/', (req, res, next) => {
        const sqlCommand = `select 
                                l.id,
                                l.nome, 
                                l.email, 
                                l.status,
                                case
                                    when l.status = 1
                                    then 'Ativo'
                                    else 'Desativo'
                                end as status_descricao,
                                (select
                                	GROUP_CONCAT(CONCAT(t.titulo,':::', t.cor, ':::', t.id))
                                	from tag_lead tl
                              		left join tag t
                              		on t.id = tl.id_tag
                              		where tl.id_lead = l.id
                                	) as tags
                              from 
                                lead l`;

        knex.raw(sqlCommand, [])
            .then((dados) => {
                return res.send(dados[0]);
            })
            .catch(function (error) {
                return res.status(500);
            }, next);
    });

    route.put('/lead/:id', (req, res, next) => {
        const id = req.params.id;
        const tags = req.body.tags;
        delete req.body.tags;
        const values = req.body;
        knex('lead')
            .where('id', id)
            .update(values)
            .then(() => {
                knex('tag_lead')
                    .where('id_lead', id)
                    .delete()
                    .then(() => {
                        let valuesTag = [];
                        tags.map((tag) => {
                            valuesTag.push({ id_lead: id, id_tag: tag.id });
                        });

                        knex('tag_lead')
                            .insert(valuesTag)
                            .then(() => {
                                return res.status(200).send(true);
                            })
                    })
            })
            .catch(function (error) { }, next);
    });

    route.delete('/lead/:id', (req, res, next) => {
        const id = req.params.id;

        knex('lead')
            .where('id', id)
            .delete()
            .then((dados) => {
                return res.status(200).send(true);
            })
            .catch(function (error) {
                return res.status(500);
            }, next);
    });

    route.post('/lead/', (req, res, next) => {
        const tags = req.body.tags;
        delete req.body.tags;
        const values = req.body;

        knex('lead')
            .insert(values)
            .then((dados) => {
                let valuesTag = [];
                tags.map((tag) => {
                    valuesTag.push({ id_lead: dados[0], id_tag: tag.id });
                });

                knex('tag_lead')
                .insert(valuesTag)
                .then(() => {
                    return res.status(200).send(true);
                })
            })
            .catch(function (error) {
                return res.status(500);
            }, next);
    });
}