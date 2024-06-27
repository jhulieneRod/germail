const knex = require('../../config/database');

const getHomePage = (req, res, next) => {
    const sqlCommand = `select 
                            c.html, 
                            c.design
                          from 
                            homepage c
                            where c.status = 1
                            limit 1`;

    knex.raw(sqlCommand, [])
    .then((dados) => {
        return res.send(dados[0][0].html);
    })
    .catch(function (error) {
        return res.status(500);
    }, next);
};

module.exports = { getHomePage };