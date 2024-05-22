const mongoose=require("mongoose")
const {Schema,model}=mongoose


const configurationDb=async()=>{

    try{
        const db=mongoose.connect(`${process.env.url}`)
        console.log("successfully connect on db")
    }
    catch(e){
        console.log(e)
    }

}
module.exports=configurationDb