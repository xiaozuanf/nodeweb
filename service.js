const connection = require("./mysql/mysql.js")//  mysql连接
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // 解析application/json
app.use(bodyParser.urlencoded({ extended: true })); // 解析application/x-www-form-urlencoded

app.use('/static', express.static('html'));//静态托管html 通过路径 /static/ 访问HTML内的文件
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  next();
});


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

//路由 社交网站所需的接口
var useRouter=require("./article")
app.use(useRouter)
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
  