const mysql=require('mysql');

module.exports=function () {
    return{
        init:function(){
            return mysql.createConnection({
                host: '52.78.123.184',
                port: '3306',
                user: 'GP',
                password: '1234',
                database: 'test'
            })
        },

        test_open: function(con){
            con.connect((err)=>{
                if(err)
                    console.error('mysql connection error : '+err);
                else
                    console.info('mysql is connected successfully');
            })
        }
    }
};
