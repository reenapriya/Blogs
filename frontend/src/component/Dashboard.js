import axios from "../config/axios";
import { useState } from "react";


// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import axios from "../config/axios";

// export const postValidationSchema = yup.object({
//   title: yup.string().required(),
//   content: yup.string().required()
// });

// export default function Dashboard({ postIn }) {
//   const [serverErrors, setServerErrors] = useState([]);

//   const formik = useFormik({
//     initialValues: {
    //   title: "",
    //   content: ""
    // },
    // validateOnChange: false,
   // validationSchema: postValidationSchema,
    // onSubmit: async (values) => {
    //   try {
    //     const response = await axios.post("/api/posts/create", values, {
    //       headers: {
    //         Authorization: localStorage.getItem("token"),
    //         "Content-Type": "multipart/form-data"
    //       }
    //     });
    //     console.log("post", response.data);
    //     postIn();
    //   } catch (e) {
    //     setServerErrors(e.response.data.errors || []);
    //   }
    // }
//   });

//   return (
//     <div>
//       <h1>MY POSTS</h1>
//       {serverErrors.map((error, index) => (
//         <div key={index}>
//           <b>{error.msg}</b>
//         </div>
//       ))}
//       <form onSubmit={formik.handleSubmit}>
        // <label htmlFor="title">Title</label>
        // <input
        //   type="text"
        //   onChange={formik.handleChange}
        //   name="title"
        //   value={formik.values.title}
        //   id="title"
        // />
        // {formik.errors.title && <div>{formik.errors.title}</div>}

        // <br />
        // <br />
        {/* <label htmlFor="content">Content</label>
        <textarea
          onChange={formik.handleChange}
          name="content"
          value={formik.values.content}
          id="content"
        />
        {formik.errors.content && <div>{formik.errors.content}</div>}

        <br />
        <br />
        <input type="submit" name="post" />
      </form>
    </div>
  );
} */}


//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
//import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    //const navigate=useNavigate()
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    //const [img,setImg]=useState('')
    const [serverErrors,setServerErrors]=useState(null)
    const [clientErrors,setClientErrors]=useState({})

    const errors={}

    const runValidations = () => {
        
        if(title.trim().length === 0) {
            errors.title = 'title is required'
        }

        if(content.trim().length === 0) {
            errors.content = 'content is required'
        }

        // if(img.trim().length === 0) {
        //     errors.img = 'img is required'
        // }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title:title,
            content:content,
           // img:img
        }

        
        runValidations()

        if(Object.keys(errors).length === 0) {
            try {
                const response = await axios.post('/api/posts/create', formData,
                {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                }
                ) 
                //navigate('/allblogs')
                console.log(response.data)
            } catch(err) {
                console.log(err.response.data)
                setServerErrors(err.response.data)
            }
        } else {
            setClientErrors(errors)
        }
    }
    
    return (
        <div>
            <h1>AddBlogs</h1>

            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Enter Title</label><br/>
            <input type="text"
            value={title}
            id="title"
            onChange={e=>{setTitle(e.target.value)}}
            />
            <br/>
            <label htmlFor="content">Enter Content</label><br/>
            {/* <ReactQuill  */}
            
            {/* theme="snow" */}
            <textarea
            id="content"
             value={content} 
             onChange={e=>{setContent(e.target.value)}} />
             <br/>
             {/* <label htmlFor="img">Add images</label><br/> */}
            {/* <input type="text"
            value={img}
            id="img"
            onChange={e=>{setImg(e.target.value)}}
            /> */}
             <br/>
             <input type="submit"/>
             </form>

        </div>
    )
}
