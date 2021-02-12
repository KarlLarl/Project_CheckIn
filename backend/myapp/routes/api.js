const express = require('express');
const route = express.Router();
const show_controller = require('../controller/show_controller');
const login_controller = require('../controller/login_controller');
const register_controller = require('../controller/register_controller');
const leave_controller = require('../controller/leave_controller');
const check_in_controller = require('../controller/check_in_controller');
const check_out_controller = require('../controller/check_out_controller');
const view_controller = require('../controller/view_controller');
const get_edit_controller = require('../controller/get_edit_controller');
const post_edit_controller = require('../controller/post_edit_controller');
const get_delete_controller = require('../controller/get_delete_controller');
const post_delete_controller = require('../controller/post_delete_controller');
const get_check_in_controller = require('../controller/post_check_in_controller');
const add_ot_controller = require('../controller/add_ot_controller');
const show_add_ot_controller = require('../controller/show_add_ot_controller');
const save_ot_controller = require('../controller/save_ot_controller');
const search_add_ot_controller = require('../controller/search_add_ot_controller');
const check_day_leave_controller = require('../controller/check_day_leave_controller');
const edit_ot_controller = require('../controller/edit_ot_controller');
const delete_ot_controller = require('../controller/delete_ot_controller');
const search_graph_controller = require('../controller/search_graph_controller');
const export_graph_all_controller = require('../controller/export_graph_all_controller');

route.get('/', function(req, res){
    res.render('index')
})

route.get('/show', show_controller.show);
route.post('/login', login_controller.login);
route.post('/register', register_controller.register);
route.post('/leave', leave_controller.leave);
route.post('/check_in', check_in_controller.check_in);
route.post('/check_out', check_out_controller.check_out);
route.get('/view/:id', view_controller.view);
route.get('/get_edit/:id', get_edit_controller.get_edit);
route.put('/post_edit', post_edit_controller.post_edit);
route.get('/get_delete/:id', get_delete_controller.get_delete);
route.post('/post_delete_controller', post_delete_controller.delete_data);
route.post('/post_check_in_controller', get_check_in_controller.post_check_in);
route.post('/add_ot_controller', add_ot_controller.add_ot);
route.get('/show_add_ot', show_add_ot_controller.show_add_ot);
route.get('/search_data_ot/:id', search_add_ot_controller.search_add_ot);
route.post('/save_ot', save_ot_controller.save_ot);
route.post('/check_day_leave', check_day_leave_controller.check_day_leave);
route.put('/edit_ot', edit_ot_controller.edit_ot);
route.post('/delete_ot', delete_ot_controller.delete_ot);
route.post('/search_graph', search_graph_controller.search_graph);
route.get('/export_graph_all', export_graph_all_controller.export_all);

module.exports = route;
