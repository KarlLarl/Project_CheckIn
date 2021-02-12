const mysql = require('../config/mysql')

function search_add_ot(req, res){
    const data = [
        {
            id:req.params.id
        }
    ]

    const id = data[0].id;

    mysql.con.query("select * from add_ot where id = ?", [id],
    function (err, result){
        if (result){
            res.send(result)
        }
    })
}

module.exports = {
    search_add_ot
}