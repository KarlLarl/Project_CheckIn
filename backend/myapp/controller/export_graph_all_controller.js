const mysql = require('../config/mysql')

function export_all(req, res){
    mysql.con.query("select * from graph", 
    function (err, result){
        if (result){
            res.send(result)
        }
    })
}

module.exports = {
    export_all
}