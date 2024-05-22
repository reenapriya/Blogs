const postValidation=({
    title:{
        exists:{
            errorMessage:"title is required"
        },
        notEmpty:{
            errorMessage:"title is not empty"
        }
    },
    content:{
        exists:{
            errorMessage:"content is required"
        },
        notEmpty:{
            errorMessage:"content is not empty"
        }
    }
})

module.exports=postValidation