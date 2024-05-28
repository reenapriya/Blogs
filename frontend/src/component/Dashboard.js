import axios from "../config/axios";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default function Dashboard({postIn}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postImage, setPostImage] = useState([]);
    const [serverErrors, setServerErrors] = useState(null);
    const [clientErrors, setClientErrors] = useState({});

    const errors = {};

    const runValidations = () => {
        if (title.trim().length === 0) {
            errors.title = 'title is required';
        }

        if (content.trim().length === 0) {
            errors.content = 'content is required';
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPostImage(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        runValidations();

        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            postImage.forEach((image, index) => {
                formData.append('postImage', image);
            });

            try {
                const response = await axios.post('/api/posts/create', formData, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                postIn()

            } catch (err) {
                console.log(err.response.data);
                setServerErrors(err.response.data);
            }
        } else {
            setClientErrors(errors);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h1 style={{ color: '#333' }}>Create Your Post Here </h1>

            <form  style={{ marginTop: '15px', width: '50%', margin: '0 auto' }}onSubmit={handleSubmit}>
                <label htmlFor="title" style={{ width: '100%', padding: '5px', marginBottom: '10px' }}>Enter Title</label><br />
                <input
                    type="text"
                    value={title}
                    id="title"
                    onChange={e => setTitle(e.target.value)}
                />
                {clientErrors.title && <div style={{ color: 'red' }}>{clientErrors.title}</div>}
                <br />
                <label htmlFor="content">Enter Content</label><br />
                {/* <textarea
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
                /> */}
                <ReactQuill 
            type='text'
            theme="snow"
            id="content"
             value={content} 
             onChange={setContent} />
                {clientErrors.content && <div style={{ color: 'red' }}>{clientErrors.content}</div>}
                <br />
                <label>Upload Images</label>
                <input
                    type="file"
                    name="postImage"
                    multiple
                    onChange={handleFileChange}
                    style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '0%' }}
                />
                <br />
                {serverErrors && <div style={{ color: 'red' }}>{serverErrors}</div>}
                <br />
                <input type="submit" style={{ padding: '8px', backgroundColor: '#323ca8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
            </form>
        </div>
    );
}


// / import React, { useState } from "react";
// // import { useFormik } from "formik";
// // import * as yup from "yup";
// // import axios from "../config/axios";

// // export const postValidationSchema = yup.object({
// //   title: yup.string().required(),
// //   content: yup.string().required()
// // });

// // export default function Dashboard({ postIn }) {
// //   const [serverErrors, setServerErrors] = useState([]);

//   const formik = useFormik({
//     initialValues: {    
   // /   title: "",
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
    //     postIn();} catch (e) {
    //     setServerErrors(e.response.data.errors || []);
    //   }
    // }
//   });

//   return (
//     <div>
//       <h1>MY POSTS</h1>
//       {serverErrors.map((error, index) => (
//         <div key={index}>
//<b>{error.msg}</b>
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
/>*/}
       // {formik.errors.conState(null)
    // const [clientErrors,setClientErrors]=useState({})
    
    
