const express= require('express')
const bodyParser=require('body-parser')
const app=express()
const cors=require('cors')

app.use(cors())


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//route handling
const router=require('./route/router.js')
app.use('/user',router)



app.listen('5000',()=>{
    console.log("listening")
})