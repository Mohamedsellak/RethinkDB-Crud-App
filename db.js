require('dotenv').config()
r = require('rethinkdb')

function connect() {
    return r.connect({
        host: process.env.DB_HOST || 'localhost',   // RethinkDB server host
        port: process.env.DB_PORT || 28015,        // RethinkDB server port
        db: process.env.DB_NAME   || 'mydb'       // database name
    });
}

module.exports = connect;
