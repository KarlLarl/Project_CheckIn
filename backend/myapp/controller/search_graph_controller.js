const mysql = require('../config/mysql');

function search_graph(req, res){
    const data = [
        {
            uid:req.body.uid,
            search_day_start:req.body.search_day_start,
            search_day_stop:req.body.search_day_stop,
            search_month:req.body.search_month,
            search_year:req.body.search_year
        }
    ]

    const uid = data[0].uid;
    const search_day_start = data[0].search_day_start;
    const search_day_stop = data[0].search_day_stop;
    const search_month = data[0].search_month;
    const search_year = data[0].search_year;

    

    mysql.con.query("SELECT sum(date_check_in) as date_in, sum(date_check_out) as date_out, sum(date_leave) as date_leave, sum(date_late) as date_late FROM graph where uid = ? and month = ? and year = ? and (day BETWEEN ? and ?)", 
    [uid, search_month, search_year, search_day_start, search_day_stop],
    function (err, result1){
        if (result1){
            res.send(result1)
        }
    })
}

module.exports = {
    search_graph
}