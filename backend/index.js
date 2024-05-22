require ("dotenv").config()
const express=require("express")
const  fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const {chechSchema, checkSchema}=require("express-validator")
const {userRegisterValidation,userLoginValidation,userUpdateValidation}=require("./app/validation/user-validation")
const authenticateUser=require("./app/middleware/authenticateUser")
const configurationDb=require("./configure/db")
const userCtrl=require("./app/controller/user-ctrl")
const cors=require("cors")
const helmet=require("helmet")
const app=express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms' /* 'common '*/, {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  }))
configurationDb()
const port=4444


//users-api
app.post("/api/users/register",checkSchema(userRegisterValidation),userCtrl.register)
app.post("/api/users/login",checkSchema(userLoginValidation),userCtrl.login)
app.get("/api/users/account",authenticateUser,userCtrl.account)
app.put("/api/users/update",authenticateUser,checkSchema(userUpdateValidation),userCtrl.update)
app.listen(port,()=>{
    console.log("successfully connect to portal")
})