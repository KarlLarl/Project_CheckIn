const mysql = require('../config/mysql')

function save_ot(req, res){
    const data = [
        {
            uid:req.body.uid,
            date:req.body.date,
            time:req.body.time,
            time_start:req.body.time_start,
            time_stop:req.body.time_stop,
            ot_id:req.body.ot_id,
            ot_name:req.body.ot_name,
            sum_time_ot:req.body.sum_time_ot
        }
    ]

    const uid = data[0].uid;
    const date = data[0].date;
    const time = data[0].time;
    const time_start = data[0].time_start;
    const time_stop = data[0].time_stop;
    const ot_id = data[0].ot_id;
    const ot_name = data[0].ot_name;
    const sum_time_ot = data[0].sum_time_ot;

    mysql.con.query("select * from ot where uid = ? and date = ?", [uid, date],
    function (err, res1){
        if (res1.length > 0){
            res.send('error1')
        }else if (res1.length == 0){
            mysql.con.query("insert into ot (uid, date, time, time_start, time_stop, ot_id, ot_name, sum_time_ot) values (?, ?, ?, ?, ?, ?, ?, ?)",
                [uid, date, time, time_start, time_stop, ot_id, ot_name, sum_time_ot],
                function (err, result) {
                    if (result) {
                        res.send('success')
                    } else {
                        res.send('error2')
                    }
            })
        }
    })
}

module.exports = {
    save_ot
}