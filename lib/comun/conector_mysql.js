// conector_mysql.js
var mysql = require('mysql');
var cfg2 = require('../../config/mysql_config.json');

module.exports.getConnection = function() {
    var connection = mysql.createConnection({
        host: cfg2.server,
        user: cfg2.user,
        password: cfg2.password,
        database: cfg2.database,
        port: cfg2.port
    });
    connection.connect(function(err) {
        if (err) throw err;
        return null;
    });
    return connection;
};

module.exports.closeConnection = function(connection) {
    connection.end(function(err) {
        if (err) throw err;
    });
};
