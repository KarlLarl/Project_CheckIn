const mysql = require('../config/mysql')

function edit_ot(req, res){
    const data = [
        {
            date:req.body.date,
            time_start:req.body.time_start,
            time_stop:req.body.time_stop,
            ot_name:req.body.ot_name,
            id:req.body.id,
        }
    ]

    const id = data[0].id;
    const date = data[0].date;
    const time_start = data[0].time_start;
    const time_stop = data[0].time_stop;
    const ot_name = data[0].ot_name;

    mysql.con.query("update add_ot set date = ?, time_start = ?, time_stop = ?, ot_name = ? where id = ?",[
        date, time_start, time_stop, ot_name, id
    ], function(err, result){
        if (result){
            res.send('success')
        }else{
            res.send('error')
        }
    })

}

module.exports = {
    edit_ot
}