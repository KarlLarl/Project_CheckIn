const mysql = require('../config/mysql')

function get_delete(req, res){
    const data = [
        {
            id:req.params.id
        }
    ]

    const id = data[0].id;

    mysql.con.query("select * from member where id = ?", [id],
    function(err, result){
        if (result){
            res.send(result)
        }else{
            res.send('failed')
        }
    })
}

module.exports = {
    get_delete
}