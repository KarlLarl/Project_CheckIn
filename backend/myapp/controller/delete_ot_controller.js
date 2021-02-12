const mysql = require('../config/mysql')

function delete_ot(req, res){
    const data = [
        {
            id:req.body.id
        }
    ]

    const id = data[0].id;

    mysql.con.query('delete from add_ot where id = ?', [id],
    function(err, result){
        if (result){
            res.send('success')
        }else{
            res.send('error')
        }
    })
}

module.exports = {
    delete_ot
}