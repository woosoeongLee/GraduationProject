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
module.exports=router;
