var mysql  = require('mysql');  
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
var connection = mysql.createConnection({     
  host     : '81.68.195.90',       
  user     : 'root',              
  password : 'hgl131410040209',       
  port: '3306',                   
  database: 'nodeweb' 
}); 
 
connection.connect();
 //用户列表
app.get('/userlist', function (req, res) {
    var  sql = 'SELECT * FROM user';
    connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            res.json({
              code:200,
              data:result
            })
    });
 })
//增
app.post('/useradd',function(req,res){
  var  addSql = 'INSERT INTO user(name,phone) VALUES(?,?)';
  var  addSqlParams = [req.body.name, req.body.phone];
  connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }   
      res.json(result)
  });
})


//改
  // var modSql = 'UPDATE runoob_tbl SET runoob_title = ?,runoob_author = ? WHERE runoob_id = ?';
  // var modSqlParams = ['菜鸟移动站', 'xiaoxiao',5];
  // connection.query(modSql,modSqlParams,function (err, result) {
  //    if(err){
  //          console.log('[UPDATE ERROR] - ',err.message);
  //          return;
  //    }        
  //   console.log('--------------------------UPDATE----------------------------');
  //   console.log('UPDATE affectedRows',result.affectedRows);
  //   console.log('-----------------------------------------------------------------\n\n');
  // });


//删
//   var delSql = 'DELETE FROM runoob_tbl where runoob_id=5';
//   connection.query(delSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }        
 
//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result.affectedRows);
//        console.log('-----------------------------------------------------------------\n\n');  
//   });
var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
  })
  