const mysql = require('../config/mysql');
const md5 = require('md5');

function show(req, res){
    mysql.con.query('select * from member', 
        function(err, result){
            res.send(result);
    })
}

module.exports = {
    show
}