const express=require('express');
const fs = require('fs');
const multer = require('multer');
let upload = multer({ dest: './uploadedFile/' });
const router=express.Router();


router.get('/',(req,res)=>res.json({userName:'GraduationProject!'}));
router.get('/database',function (req,res){
        const mysql_dbc=require('./gp/src/config/database')();
        const connection=mysql_dbc.init();        
        mysql_dbc.test_open(connection);
        res.json({test:'hi'});
    }
)
router.get('/upload', (req, res) => {
    fs.readFile('./html/upload.html', 'utf8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});
router.post('/fileUpload', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    res.status(204).end()
});

module.exports=router;
