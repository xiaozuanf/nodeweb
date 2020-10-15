var mysql  = require('mysql');  
var express = require('express');
var app = express();
var connection = mysql.createConnection({     
  host     : '81.68.195.90',       
  user     : 'root',              
  password : 'hgl131410040209',       
  port: '3306',                   
  database: 'nodeweb' 
}); 
 
connection.connect();
 
app.get('/userlist', function (req, res) {
    var  sql = 'SELECT * FROM user';
    connection.query(sql,function (err, result) {
            if(err){
                return result;
            }
    
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            console.log('------------------------------------------------------------\n\n');  
    });
 })
//增
  // var  addSql = 'INSERT INTO runoob_tbl(runoob_title,runoob_author,submission_date) VALUES(?,?,?)';
  // var  addSqlParams = ['UI设计', '总旋风','2019-05-01'];
  // connection.query(addSql,addSqlParams,function (err, result) {
  //         if(err){
  //          console.log('[INSERT ERROR] - ',err.message);
  //          return;
  //         }        
   
  //        console.log('--------------------------INSERT----------------------------');
  //        //console.log('INSERT ID:',result.insertId);        
  //        console.log('INSERT ID:',result);        
  //        console.log('-----------------------------------------------------------------\n\n');  
  // });


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