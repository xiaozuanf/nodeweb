var mysql  = require('mysql');  
var connection = mysql.createConnection({     
    host     : '81.68.195.90',       
    user     : 'root',              
    password : 'hgl131410040209',       
    port: '3306',                   
    database: 'nodeweb' ,
    multipleStatements: true//用于分页返回总条数
}); 
connection.connect();
module.exports=connection