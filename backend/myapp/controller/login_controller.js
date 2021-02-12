const mysql = require('../config/mysql');
const md5 = require('md5');

function login(req, res){
    const data = [
        {
            email:req.body.email,
            password:req.body.password
        }
    ]

    const email = data[0].email;
    const password = md5(data[0].password);

    mysql.con.query("select * from member where email = ? and password = ?", [email, password],
        function (err, result) {
            if (result.length > 0) {
                //const data_uid = JSON.stringify(result)
                res.json({
                    data_uid: result[0]
                })
            } else {
                res.json({
                    data_uid: 'who'
                })
            }

        })
}

module.exports = {
    login
}
