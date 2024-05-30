const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '154.56.48.52',
        user: 'u776607379_root',
        password: 'Geremail_123!',
        database: 'u776607379_geremail'
    }
});

module.exports = knex;