const mysql = require('../config/mysql')

function post_edit(req, res){
    const data = [
        {
            f_name:req.body.f_name,
            l_name:req.body.l_name,
            email:req.body.email,
            user_role:req.body.user_role,
            fix_leave:req.body.fix_leave,
            id:req.body.id
        }
    ]

    const f_name = data[0].f_name;
    const l_name = data[0].l_name;
    const email = data[0].email;
    const user_role = data[0].user_role;
    const fix_leave = data[0].fix_leave;
    const id = data[0].id;

    mysql.con.query("update member set f_name = ?, l_name = ?, email = ?, user_role = ?, fix_leave = ? where id = ?",[
        f_name, l_name, email, user_role, fix_leave, id
    ], function(err, result){
        if (result){
            res.send('success');
        }else{
            res.send('failed');
        }
    });

}

module.exports = {
    post_edit
}