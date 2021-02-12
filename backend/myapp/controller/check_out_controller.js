const mysql = require('../config/mysql');

function check_out(req, res) {
    const data = [
        {
            uid: req.body.uid,
            time: req.body.time,
            date: req.body.date
        }
    ]

    const uid = data[0].uid;
    const time = data[0].time;
    const date = data[0].date;
    const date_check_out = 1;

    const asiaTime = new Date().toLocaleString({ timeZone: "Asia/Bangkok" });
    const h = new Date(asiaTime).getHours();
    const m = new Date(asiaTime).getMinutes();
    const s = new Date(asiaTime).getSeconds();

    const day = new Date(asiaTime).getDate();
    const month = new Date(asiaTime).getMonth() + 1;
    const year = new Date(asiaTime).getFullYear(); 

    mysql.con.query("select * from check_out where uid = ? and date = ?", [uid, date],
        function (err, check_result) {
            if (check_result.length > 0) {
                res.send('who')
            } else if (check_result.length == 0) {
                mysql.con.query("insert into check_out (uid, time, date) values (?, ?, ?)", [uid, time, date],
                    function (err, result) {
                        if (result) {
                            mysql.con.query("insert into graph (uid, date_check_out, day, month, year) values (?, ?, ?, ?, ?)",
                                [uid, date_check_out, day, month, year]);
                            res.send('insert success')
                        } else {
                            res.send('not area')
                        }
                    })
            }
        })
}

module.exports = {
    check_out
}

