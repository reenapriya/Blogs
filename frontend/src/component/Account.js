
    
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Account() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dashboard");
    }

    if (!user || !user.account) {
        return <p>Loading user data...</p>;
    }

    return (
        <div>
            <h1>My Account</h1>
            {user.account.profilePic && (
                <img src={`http://localhost:4444/backend/images/${user.account.profilePic}`} alt="Profile" width="200" height="200" />
            )}
            <p>Username - {user.account.username}</p>
            <p>Email - {user.account.email}</p>
            <p>Bio - {user.account.bio}</p>
            <h3>For create my post Area</h3>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}
