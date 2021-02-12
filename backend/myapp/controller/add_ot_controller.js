const mysql = require('../config/mysql')

function add_ot(req, res){
    const data = [
        {
            date:req.body.date,
            time:req.body.time,
            time_start:req.body.time_start,
            time_stop:req.body.time_stop,
            ot_name: req.body.ot_name
        }
    ]

    const date = data[0].date;
    const time = data[0].time;
    const time_start = data[0].time_start;
    const str = data[0].time_stop;
    const time_stop = str.replace(":", ".");
    const ot_name = data[0].ot_name;

    mysql.con.query("insert into add_ot (date, time, time_start, time_stop, ot_name) values (?, ?, ?, ?, ?)", [date, time, time_start, time_stop, ot_name],
    function (err, result){
        if (result){
            res.send('success');
        }else{
            res.send('error');
        }
    })
}

module.exports = {
    add_ot
}