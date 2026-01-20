var mysql = require("mysql");
var util = require("util");




var conn = mysql.createConnection({
    host: "b0k6qqhrzevmtw3tzyji-mysql.services.clever-cloud.com",
    user: "uly80en6wtvio1cr",
    password: "7NRn0HRFsK9gTDp2nOdL",
    database: "b0k6qqhrzevmtw3tzyji"
});

var exe = util.promisify(conn.query).bind(conn);






module.exports = exe;
