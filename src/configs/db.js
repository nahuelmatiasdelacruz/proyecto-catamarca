const knex = require('knex')({
    client: 'pg',
      connection: {
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        port: process.env.DBPORT,
      }
});

module.exports = {knex};