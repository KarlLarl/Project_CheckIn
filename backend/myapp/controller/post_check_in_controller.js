const mysql = require('../config/mysql')

function post_check_in(req, res){
    const data = [
        {
            uid: req.body.uid
        }
    ]

    const uid = data[0].uid;

    mysql.con.query("select * from graph where uid = ?", [uid], 
    function (err, result){
        if (result){
            res.send(result)
        }
    })
}

module.exports = {
    post_check_in
}