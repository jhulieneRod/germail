const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'germail',
        password: 'm5HtWbrSmtrjrJE',
        database: 'germail'
    }
});

module.exports = knex;