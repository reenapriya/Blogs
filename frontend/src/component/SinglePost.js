
import { useState, useEffect } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";

export default function SinglePost() {
    const { PostId } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                console.log(`Fetching post with ID: ${PostId}`);
                const response = await axios.get(`/api/posts/showOne/${PostId}`);
                console.log(response.data);
                setPost(response.data);
            } catch (e) {
                console.log(e);
                setError('Failed to fetch the post. Please try again later.');
            }
        };
        fetchSinglePost();
    }, [PostId]);

    if (error) {
        return <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: 'red' }}>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333' }}>{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.comment}</p>
        </div>
    );
}

