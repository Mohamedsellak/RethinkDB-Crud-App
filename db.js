r = require('rethinkdb')

function connect() {
    return r.connect({
        host: 'localhost', // RethinkDB server host
        port: 28015,        // RethinkDB server port
        db: 'mydb' // database name
    });
}

module.exports = connect;