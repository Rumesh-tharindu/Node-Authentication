var mysql=require('mysql')

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'my$077nethmi',
    database:'test'
})

connection.connect((err)=>{
    if(!err){
        console.log('Database is connected')
    }
    else{
        console.log('Error while connect with database' +err)
    }
})

module.exports=connection