
import axios from "../config/axios"
import { useEffect, useState } from "react"


export default function Mypost(){
    const[myComment,setMyComment] = useState([])
    
    const [content,setContent]=useState('')
    //const [postImage,setPostImage]=useState(null)
    const [serverErrors,setServerErrors]=useState(null)
    const [clientErrors,setClientErrors]=useState({})
    const [edit,setEdit]=useState(false)
    const [id,setId]=useState(null)
    
    useEffect(() => {
       async function fetchingMyComment(){
            try {
                  const response = await axios.get(`/api/comments/${id}/show`
                    
                  )
                  console.log(response.data)
                  setMyComment(response.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchingMyComment()
    },[])

    const errors={}

    const runValidations = () => {
        
        

        if(content.trim().length === 0) {
            errors.content = 'content is required'
        }

       
    }
    const handleToggle=(id)=>{
        setEdit(!edit)
        console.log(id)
        setId(id)
    }
    
      const handleRemove=async(id)=>{
        try{ const response=await axios.delete(`/api/comments/${id}/delete/${commentId}`,{
             headers:{
                 Authorization:localStorage.getItem('token')
             }
         })
     
         const newArr=myComment.filter(ele=>{
             return ele._id!=id
         })
         setMyComment(newArr)
     
       }catch(err){
         console.log(err)
       }
     }
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData = {
           
            content:content,
        }
        
        runValidations()

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.put(`/api/comments/${id}/update/${commentId}`, formData,
                {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                }
                ) 
                const newArr=myComment.map(ele=>{
                    if(ele._id==id){
                        return response.data
                    }else{
                        return ele
                    }
                })
                console.log("newArr",newArr)
                setMyPost(newArr)
    }
    
    
 catch(err) {
    console.log(err.response.data)
    setServerErrors(err.response.data)
}
} else {
setClientErrors(errors)
}
}
    return (
        <div  style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#333' }}>My Posts</h2>
           <ul style={{ listStyle: 'none', padding: 0 }}>
                 {myComment.map((ele)=>{
                    return (
                        <li key={ele._id}style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                           <p style={{ color: '#333' }}> {ele.content}</p> <br/>
                         
                         <button onClick={(e)=>{handleToggle(ele._id)}}>{ edit ? 'Cancel' : 'Update' }</button>
                         <button onClick={(e)=>{handleRemove(ele._id)}}>Delete</button></li>

                        
                           
                        
                    )
                 })}
                 </ul>

                 {
                edit &&  <form onSubmit={handleSubmit}>
                
            
                
    
                    <label htmlFor="content">Enter content</label><br />
                    <input 
                        type="textarea" 
                        value={content} 
                        onChange={e=>{setContent(e.target.value)}} 
                        id="content"
                        disabled={!edit}
                    /> 
                    { clientErrors.content && <span> { clientErrors.content }</span>}
            
                    <br /> <br />
                    
                    <input type="submit"/>
                </form>
                     }
                     <ul>
                         { serverErrors && serverErrors.map((ele, i) => {
                             return <li key={i}> { ele.msg } </li>
                         })}
                     </ul>
            
            
        </div>
    )
}