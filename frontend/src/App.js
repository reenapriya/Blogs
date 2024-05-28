import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routes,Link } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import Home from "./component/Home"
import Account from './component/Account';
import {useAuth}from "./context/AuthContext"
import axios from "./config/axios"
import PrivateRouter from './component/PrivateRoute';
import { useEffect } from 'react';
import Dashboard from './component/Dashboard';
import EditUser from './component/EditUser';
import Allpost from './component/Allpost';
import Mypost from './component/Mypost';
import SinglePost from './component/SinglePost';

function App() {
  const {user,dispatch}=useAuth()
  const registerIn=()=>{
    toast("successfully Registered !!")
     }

   const loggedIn=()=>{
      toast("successfully logged !!")
       }
       const postIn=()=>{
        toast("successfully posted !!")
         }
  
    useEffect(()=>{
      if(localStorage.getItem("token")){
        (async()=>{
       try {const userResponse=await axios.get("/api/users/account",{
        headers:{
          Authorization:
            localStorage.getItem("token")
          
        }
        })
        console.log(userResponse.data)
        dispatch({type:"LOGIN",payload:{account:userResponse.data}})
      }
        catch(err){
console.log(err)
        }
        })();
      }
      },[])
      
    
    

  return (
   
    <div>
      <h1>BLOG-APP</h1>
      <Link to="/">Home</Link>|
      {!user.isLoggedIn ?(
      <>
      
        <Link to="/register">Register</Link>|
        <Link to="/login">Login</Link>|
      </>) :(
      <>
       <Link to="/account">Account</Link>|
       <Link to="/allposts">Posts</Link>|
        <Link to="/" onClick={()=>{
             localStorage.removeItem("token")
             dispatch({type:"LOGOUT"})
          }}  >  Logout</Link>| 
      </>)}
       


        <Routes>
          <Route path="/" element={<Home/>}  />
          <Route path="/register" element={<Register   registerIn={registerIn} />}/>
          <Route path="/login" element={<Login  loggedIn={loggedIn}/>}/>
          <Route path="/account" element={
            <PrivateRouter>
              <Account/>
            </PrivateRouter>
          }  />
          <Route path="/dashboard" element={<Dashboard postIn={postIn}/>}  />
          <Route path="/editUser" element={<EditUser/>}  />
          <Route path="/allposts" element={<Allpost/>}  />
          <Route path="/myposts" element={<Mypost/>}  />
          <Route path="/api/posts/showOne/:PostId" element={<SinglePost/>}  />
          
        </Routes>
      <ToastContainer/>
    </div>
     
     
  )
}

export default App;
