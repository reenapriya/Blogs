const User=require("../models/user-models")
const userRegisterValidation=({
    username:{
        exists:{
            errorMessage:"username is required"
        },
        notEmpty:{
            errorMessage:"username is  notEmpty"
        },
        trim :true

    },
    email:{
        exists:{
            errorMessage:"email is required"
        },
        notEmpty:{
            errorMessage:"email is  notEmpty"
        },
        normalizeEmail:true,
        trim:true,
        custom:{
            options:async(value)=>{
                try{
                const user=await User.findOne({email:value})
                if(user){
                    throw new Error("email is already present")
                }
                return true
            }
            catch(e){
                console.log(e)
            }
        }
    },
    isEmail:{
        errorMessage:"give proper email"
    }
},
    password:{
        exists:{
            errorMessage:"password is required"
        },
        notEmpty:{
            errorMessage:"password is  notEmpty"
        },
        isLength:{
            options:[{min:8,max:64}],
            errorMessage:"give password btw 8 to 64 character"
        },
        isStrongPassword:{
            options:[{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1}],
            errorMessage:"give strong password"
        },
        trim :true
    },
    profilePic:{},
    bio:{
        in:[["body"]],
        exists:{
            errorMessage:"bio is required"
        },
        notEmpty:{
            errorMessage:"bio is  notEmpty"
        },
    }
})
const userLoginValidation=({
    email:{
        exists:{
            errorMessage:"email is required"
        },
        notEmpty:{
            errorMessage:"email is  notEmpty"
        },
        normalizeEmail:true,
        trim:true,
        isEmail:{
            errorMessage:"give proper email"
        }
    },
    password:{
        exists:{
            errorMessage:"password is required"
    },
    notEmpty:{
        errorMessage:"password is  notEmpty"
    },
    isLength:{
        options:[{min:8,max:64}],
        errorMessage:"give password btw 8 to 64 character"
    },
    isStrongPassword:{
        options:[{minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1}],
        errorMessage:"give strong password"
    },
    trim :true
    }
})
const userUpdateValidation=({
    bio:{
        in:[["body"]],
        exists:{
            errorMessage:"bio is required"
        },
        notEmpty:{
            errorMessage:"bio is  notEmpty"
        },
    },
   
    
    email:{
        exists:{
            errorMessage:"email is required"
        },
        notEmpty:{
            errorMessage:"email is  notEmpty"
        },
        normalizeEmail:true,
        trim:true,
        isEmail:{
            errorMessage:"give proper email"
        }
    },
    username:{
        exists:{
            errorMessage:"username is required"
        },
        notEmpty:{
            errorMessage:"username is  notEmpty"
        },
        trim :true

    },
    
})
module.exports={userRegisterValidation,
    userLoginValidation,
userUpdateValidation}