const Post=require("../models/post-model")
const {validationResult}=require("express-validator")


const postCtrl={}

postCtrl.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    // const body=req.body
    const { title, content } = req.body;
    const postImage = req.files ? req.files.map(file => file.path) : []
    try{
           const post=new Post({
            title,
            content,
            postImage :postImage,

           })
       // const post=new Post(body)
        post.author=req.user.id
        await post.save()
        console.log("post",post)
         return res.status(201).json(post)
    }
    catch(e){
        console.log(e)
        return res.status(500).json("internal errors")
    }
}

postCtrl.retrieve=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const post=await Post.find({})
        return res.json(post)
    }
    catch(e){
        return res.status(500).json("internal errors")
    }

}

postCtrl.retrieveOne=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
    const postId=req.params.PostId
    try{
     const post=await Post.findOne({author:req.user.id,_id:postId})
     return res.json(post)


    }
    catch(e){
        res.status(500).json("internal errors")
    }
    

}
postCtrl.mypost=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
try{
    const post=await Post.find({author:req.user.id})
    res.json(post)
}
catch(e){
    console.log(e)
    return res.status(500).json("internal error")
}
}

postCtrl.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const postId=req.params.id
    try{
        const post=await Post.findOneAndUpdate({author:req.user.id,_id:postId},body,{new:true})
        if(post){
           return  res.json(post)
        }

        return res.json("record not found")
    }

  catch(e){
    console.log(e)
    res.status(500).json("internal errors")
  }


}
postCtrl.delete=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const postId=req.params.id
    try{
        const post=await Post.findOneAndDelete({author:req.user.id,_id:postId})
        return res.json(post)
    }
    catch(e){
        return res.status(500).json("internal errors")
    }

}
module.exports=postCtrl