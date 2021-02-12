const mysql = require('../config/mysql')

function show_add_ot(req, res){
    mysql.con.query("select * from add_ot",
    function(err, result){
        res.send(result)
    })
}

module.exports = {
    show_add_ot
}