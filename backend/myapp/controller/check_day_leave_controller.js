const mysql = require('../config/mysql')

function check_day_leave(req, res){

    const data = [
        {
            uid:req.body.uid,
        }
    ]

    const uid = data[0].uid;

    mysql.con.query("select fix_leave from member where id = ?", [uid],
    function(err1, result1){
        if (result1){
            //res.send(result1[0])
            
            mysql.con.query("select sum(date_leave) as sum_leave from leaves where uid = ?", [uid],
            function(err2, result2){
                if (result1[0].fix_leave - result2[0].sum_leave == 0){
                    res.json({
                        result3: 'you dont not leave'
                    })
                }else{
                    const result3 = result1[0].fix_leave - result2[0].sum_leave;
                    res.json({
                        result3: result3
                    })
                }
            })
        }
    })
}

module.exports = {
    check_day_leave
}