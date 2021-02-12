const mysql = require('../config/mysql');

function check_in(req, res){
    const data = [
        {
            uid:req.body.uid,
            time:req.body.time,
            date:req.body.date
        }
    ]

    const uid = data[0].uid;
    const time = data[0].time;
    const date = data[0].date;
    const date_check_in = 1;
    const late = 1;

    const asiaTime = new Date().toLocaleString({ timeZone: "Asia/Bangkok" });
    const h = new Date(asiaTime).getHours();
    const m = new Date(asiaTime).getMinutes();
    const s = new Date(asiaTime).getSeconds();

    const day = new Date(asiaTime).getDate();
    const month = new Date(asiaTime).getMonth() + 1;
    const year = new Date(asiaTime).getFullYear(); 

    mysql.con.query("select * from check_in where uid = ? and date = ?", [uid, date], 
    function(err, check_result){
        if (check_result.length > 0){
            res.send('who')
        } else if (check_result.length == 0){
            mysql.con.query("insert into check_in (uid, time, date) values (?, ?, ?)", 
                [uid, time, date], 
            function(err, result){
                if (result){
                    mysql.con.query("insert into graph (uid, date_check_in, day, month, year) values (?, ?, ?, ?, ?)",
                        [uid, date_check_in, day, month, year]);

                    mysql.con.query("select * from check_in where uid = ?", [uid],
                    function (err1, result1){
                        const time_check1 = result1[0].time;
                        const time_check2 = parseFloat(9.15);
                        console.log(time_check1)
                        console.log(time_check2)
                        //console.log(parseFloat(time_check2))
                        if (parseFloat(time_check1) > time_check2){
                            mysql.con.query("insert into graph (uid, date_late, day, month, year) values (?, ?, ?, ?, ?)", [
                                uid, late, day, month, year]);
                        }
                    })
                    res.send('insert success')
                }else{
                    res.send('not area')
                }
            })
        }
    })
}

module.exports = {
    check_in
}

