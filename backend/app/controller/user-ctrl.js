const User=require("../models/user-models")
const bcryptjs=require("bcryptjs")
const _=require("lodash")
const {validationResult}=require("express-validator")
const jwt=require("jsonwebtoken")
const { userLoginValidation } = require("../validation/user-validation")


const userCtrl={}

userCtrl.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        
        const salt=await bcryptjs.genSalt()
        const hashPassword=await bcryptjs.hash(body.password,salt)
        console.log("hasshPassword",hashPassword)
        const user = new User({
            username: body.username,
            email: body.email,
            password: hashPassword,
            bio: body.bio,
           // profilePic: req.file ? req.file.filename : null // Set profilePic if file is uploaded
        });
        //const user=new User(body)
        user.password=hashPassword
        await user.save()
        console.log("user",user)
        res.status(201).json(user)

    }
    catch(e){
        res.status(500).json("internal errors")
    }
}
userCtrl.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=_.pick(req.body,['email','password'])
    try{
       
        const user=await User.findOne({email:body.email})
       if(user){
         const isAuth=await bcryptjs.compare(body.password,user.password)
         if(isAuth){
            const tokenData={
                id:user._id,

            }
            const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"7d"})
            return res.json({token:token})
         }
         return res.json("invalid email/password")
        }
    
    }
    catch(e){
        console.log(e)
        return res.status(500).json("internal errors")
    }
    
}
userCtrl.account=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id)
        return res.json(user)
    }
    catch(e){
        console.log(e)

        return  res.status(500).json("internal error")
    }
}
userCtrl.update=async(req,res)=>{

    const body=req.body
    try{
        const user=await User.findByIdAndUpdate(req.user.id,body,{new:true})
        console.log(user)
        
        
        return res.status(201).json(user)
        
        
    }
    catch(e){
        console.log(e)
        return res.json("internal error")
    }
}


module.exports=userCtrl