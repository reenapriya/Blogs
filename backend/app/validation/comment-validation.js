const commentValidation=({
    content:{
        notEmpty:{
            errorMessage:"content is not empty"
        },
        exists:{
            errorMessage:"content is required"
        }
    }
})

module.exports=commentValidation