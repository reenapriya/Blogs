import axios  from "../config/axios"
import {useFormik}from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import {useState}from "react"
import {useAuth}from "../context/AuthContext"
const loginValidationSchema=yup.object({
    email:yup.string().required().email(),
    password:yup.string().required().min(8).max(64)
})
export default function Login ({loggedIn}){
    const {dispatch,user}=useAuth()
    const navigate=useNavigate()
    const [serverErrors,setServerErrors]=useState('')
    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validateOnChange:false,
        validationSchema:loginValidationSchema,
        onSubmit:async(values)=>{
            try{
                const response=await axios.post("/api/users/login",values)
                localStorage.setItem("token",response.data.token)
               loggedIn()
                 console.log(response.data)
                const userResponse=await axios.get("/api/users/account",{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                    
                })
                console.log("userResponse",userResponse.data)
                dispatch({type:"LOGIN",payload:{account:userResponse.data}})
                
                 navigate("/")
            }
            catch(e){
                setServerErrors(e.response.data.errors)
            }
        }
    })
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
           <h1 style={{ color: '#333' }}>Login Here</h1>
           {serverErrors && <b style={{ color: 'red' }}>
            {serverErrors}</b>}

            <form onSubmit={formik.handleSubmit}>
                <label style={{ marginRight: '10px' }}>Enter Email</label>
                <input type="text"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                style={{ padding: '5px', marginBottom: '10px' }}/>
                {formik.errors.email}
                <br/>

                <label style={{ padding: '5px', marginBottom: '10px' }}>Enter Password</label>
                <input type="password"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}
                style={{ padding: '5px', marginBottom: '10px' }}/>
                {formik.errors.password}
                <br/>
                <input type="submit" style={{
            padding: '8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}/>
            </form>
        </div>
    )
}