const mysql = require('../config/mysql');

function leave(req, res){
    const data = [
        {
            uid:req.body.uid,
            start: req.body.start,
            stop: req.body.stop,
            type_select: req.body.type_select,
            note: req.body.note,
            date_leave: req.body.date_leave
        }
    ]
    
    const uid = data[0].uid;
    const start = data[0].start;
    const stop = data[0].stop;
    const type_select = data[0].type_select;
    const note = data[0].note;
    const date_leave = data[0].date_leave;

    const asiaTime = new Date().toLocaleString({ timeZone: "Asia/Bangkok" });
    const h = new Date(asiaTime).getHours();
    const m = new Date(asiaTime).getMinutes();
    const s = new Date(asiaTime).getSeconds();

    const day = new Date(asiaTime).getDate();
    const month = new Date(asiaTime).getMonth() + 1;
    const year = new Date(asiaTime).getFullYear();

    const time_check = String(h + '.' + m);
    const date_check = String(year + '-' + month + '-' + day);

    mysql.con.query('select sum(date_leave) as sum_date from leaves where uid = ?', [uid], function(err, result){
        if (result){
            const sum_result = JSON.stringify(result[0].sum_date + date_leave);
            mysql.con.query("select * from member where id = ?", [uid], function(err, res1){
                if (res1){
                    if (sum_result > res1[0].fix_leave) {
                        res.send('error1')
                    } else {
                        mysql.con.query("insert into leaves (uid, start, stop, type_select, note, date_leave) values (?, ?, ?, ?, ?, ?)", [
                            uid, start, stop, type_select, note, date_leave
                        ], function (err, result) {
                            if (result) {
                                mysql.con.query("insert into graph (uid, date_leave, day, month, year) values (?, ?, ?, ?, ?)", 
                                [uid, date_leave, day, month, year]);
                                res.send('success')
                                console.log(JSON.stringify(result))
                            } else {
                                res.send('failed')
                            }
                        });
                    }
                }
            })
        }else{
            res.send('error2')
        }
    });

}

module.exports = {
    leave
}