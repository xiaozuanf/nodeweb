const connection = require("../mysql/mysql.js")//  mysql连接
const express = require("express")
var router = express.Router();
//文章列表
router.get('/ariclelist', function (req, res) {
    var  sql = 'SELECT * FROM article';
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
            code:299,
            data:err.message
            })
            return;
        }
        res.json({
            code:200,
            data:result
        })
    });
  })
//文章列表分页
router.get('/ariclepage', function (req, res) {
    var  sql = 'SELECT COUNT(*) FROM article ; SELECT * FROM article ORDER BY date DESC LIMIT '+(req.query.page-1)*req.query.size+', '+req.query.size;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:299,
                data:err.message
            })
            return;
        }
        res.json({
            code:200,
            data:{
                total:result[0][0]['COUNT(*)'],
                list:result[1]
            }
        })
    });
})
//文章列表详情
router.get('/aricleinfo', function (req, res) {
    var  sql = 'SELECT * FROM article where id='+req.query.id;
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
                code:299,
                data:err.message
            })
            return;
        }
        res.json({
            code:200,
            data:result[0]
        })
    });
})
//文章分类列表
router.get('/aricletype', function (req, res) {
    var  sql = 'SELECT * FROM articletype';
    connection.query(sql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            res.json({
            code:299,
            data:err.message
            })
            return;
        }
        res.json({
            code:200,
            data:result
        })
    });
})
module.exports = router