const express=require('express')
const router=express.Router()
const connection=require('../config')
const bycrypt=require('bcrypt')


router.post('/register', async(req,res)=>{
 
   const today= new Date()
   const salt= await bycrypt.genSalt(10)
   const password= await bycrypt.hash(req.body.password,salt)
   const users ={
    "name":req.body.name,
    "email":req.body.email,
    "password":password,
    "created_at":today,
    "updated_at":today
}
   
   
   connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      res.json({
          status:false,
          message:error
      })
    }else{
        res.json({
          status:true,
          data:results,
          message:'user registered sucessfully'
      })
    }
  });
 
})
router.post('/login',(req,res)=>{
   const email=req.body.email
   const password=req.body.password
   connection.query("SELECT * FROM users WHERE email =?",[email],(error,rows,field)=>{
        
      if(!error){
        if(rows.length>0){
           if(password==rows[0].password){
             res.json({
               status:true,
               message:"Successfully authenticated"

             })
           }

        }else{
          res.json({
            status:false,
            message : "email or  password not match "
          })
        }
      }
      else{
        res.json(error)
      }
   })

})

module.exports=router