const mysql = require('../config/mysql');
const md5 = require('md5');

function register(req, res){

    data = [
        {
            f_name: req.body.f_name,
            l_name: req.body.l_name,
            email:req.body.email,
            password:req.body.password,
            confirm_password:req.body.confirm_password,
            user_role: req.body.user_role
        }
    ]

    const f_name = data[0].f_name;
    const l_name = data[0].l_name;
    const email = data[0].email;
    const password = md5(data[0].password);
    const confirm_password = md5(data[0].confirm_password);
    const user_role = data[0].user_role;

    if (password == confirm_password){
        mysql.con.query('insert into member (f_name, l_name, email, password, user_role) values (?, ?, ?, ?, ?)', 
            [f_name, l_name, email, password, user_role],
            function (err, result) {
                if (result) {
                    res.send('insert success');
                    //res.redirect('/login');
                }else{
                    res.send('you not can use email');
                }
            });
    } else if (password != confirm_password){
        res.send('password not math');
    }else{
        res.send('error1');
    }
}

module.exports = {
    register
}