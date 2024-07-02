const knex = require('../../config/database');
const fs = require('fs');

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
        let html = dados[0][0].html;
        fs.writeFileSync('../../home/index.html', html);
        return res.send(true);
    })
    .catch(function (error) {
        return res.status(500);
    }, next);
};

module.exports = { getHomePage };