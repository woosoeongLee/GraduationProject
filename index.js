const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>res.json({userName:'GraduationProject'}));

router.get('/database',function (req,res){
        const mysql_dbc=require('./gp/src/config/database')();
        const connection=mysql_dbc.init();        
        mysql_dbc.test_open(connection);
        res.json({test:'hi'});
    }
)
// node서버 아마존서버에 디비에 insert하고 테이블 설정, 

router.post('/uploadMusic',function(req,res){
    
})
module.exports=router;
