


import { useEffect, useState } from "react";
import axios from "../config/axios";

export default function Mypost() {
    const [myPost, setMyPost] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [serverErrors, setServerErrors] = useState(null);
    const [clientErrors, setClientErrors] = useState({});
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        async function fetchingMyPost() {
            try {
                const response = await axios.get('/api/posts/mypost', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                console.log(response.data);
                setMyPost(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchingMyPost();
    }, []);

    const errors = {};

    const runValidations = () => {
        if (title.trim().length === 0) {
            errors.title = 'Title is required';
        }

        if (content.trim().length === 0) {
            errors.content = 'Content is required';
        }
    };

    const handleToggle = (id) => {
        setEdit(!edit);
        console.log(id);
        setId(id);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPostImage(file);
    };

    const handleRemove = async (id) => {
        try {
            const response = await axios.delete(`/api/posts/delete/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            const newArr = myPost.filter(ele => ele._id !== id);
            setMyPost(newArr);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            content: content
        };

        runValidations();

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.put(`/api/posts/update/${id}`, formData, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                const newArr = myPost.map(ele => {
                    if (ele._id === id) {
                        return response.data;
                    } else {
                        return ele;
                    }
                });
                console.log("newArr", newArr);
                setMyPost(newArr);
            } catch (err) {
                console.log(err.response.data);
                setServerErrors(err.response.data);
            }
        } else {
            setClientErrors(errors);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#333' }}>My Posts</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {myPost.map((ele) => {
                    return (
                        <li key={ele._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                            <h1 style={{ color: '#333' }}>{ele.title}</h1> <br />
                            <p>{ele.content}</p>
                            <button onClick={(e) => { handleToggle(ele._id) }}>{edit ? 'Cancel' : 'Update'}</button>
                            <button onClick={(e) => { handleRemove(ele._id) }}>Delete</button>
                            {ele.comments && ele.comments.length > 0 && (
                                <ul>
                                    {ele.comments.map((comment) => (
                                        <li key={comment._id}>
                                            <p>{comment.content}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>

            {edit &&
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Enter title</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={e => { setTitle(e.target.value) }}
                        id="title"
                    />
                    {clientErrors.title && <span> {clientErrors.title}</span>}

                    <br />

                    <label htmlFor="content">Enter content</label><br />
                    <input
                        type="textarea"
                        value={content}
                        onChange={e => { setContent(e.target.value) }}
                        id="content"
                        disabled={!edit}
                    />
                    {clientErrors.content && <span> {clientErrors.content}</span>}

                    <br /> <br />
                    <label>Upload Images</label>
                    <input
                        type="file"
                        name="postImage"
                        multiple
                        onChange={handleFileChange}
                        style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '0%' }}
                    />
                    <br />
                    <input type="submit" />
                </form>
            }
            <ul>
                {serverErrors && serverErrors.map((ele, i) => {
                    return <li key={i}> {ele.msg} </li>
                })}
            </ul>
        </div>
    )
}
