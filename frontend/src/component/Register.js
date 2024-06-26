import axios from "../config/axios"
import { useState } from "react"
import _ from "lodash"
import {useNavigate}from "react-router-dom"
export default function Register({registerIn}){
    const navigate=useNavigate()
    const [form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        profilePic:null,
        bio:"",

        serverErrors:null,
        clientErrors:{}
    })
     const errors={}
    const runValidations = () => {
        if(form.email.trim().length == 0) {
            errors.email = 'email is required'}
        // } else if(!validator.isEmail(form.email)) {
        //     errors.email = 'invalid email format'
        // }

        if(form.password.trim().length == 0) {
            errors.password = 'password is required'
        } else if(form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'invalid password length'
        }
    }

    
    const displayErrors = () => {
        let result 
        if(typeof form.serverErrors == 'string') {
            result = <p> { form.serverErrors } </p>
        } else {
            result = (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { form.serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div>
            )
        }
        return result 
    }
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        //const FormData=_.pick(form,["username","email","password","bio","profilePic"])
        //console.log(formData)
        const formData = new FormData();
        formData.append('username', form.username);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('bio', form.bio);
        formData.append('profilePic', form.profilePic);

        runValidations()

        if(Object.keys(errors).length == 0 ) {
        try{
            const response=await axios.post("/api/users/register",formData)
            console.log(response.data)
             registerIn()
            navigate("/login")
        }
        catch(e){
            setForm({...form, serverErrors: e.response.data.errors, clientErrors: {} })
        }
    }else{
        setForm({...form, clientErrors: errors})
    }
        
        
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({...form,profilePic:file});
      };
    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Register Here</h1>

            { form.serverErrors && displayErrors() } 
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
           
                <label style={labelStyle} htmlFor="username"> Enter Username </label>
                <input type="text"
                  onChange={e=>setForm({...form,username:e.target.value})}
                  id="username"
                  value={form.username}
                  style={inputStyle}
                  />
                   { form.clientErrors.username && <span> { form.clientErrors.username } </span>}
                  <br/>
                  <label style={labelStyle}htmlFor="email">Enter Email</label>
                  <input type="text"
                  onChange={e=>setForm ({...form,email:e.target.value})}
                  id="email"
                  value={form.email}
                  style={inputStyle}/>
                   { form.clientErrors.email && <span> { form.clientErrors.email } </span>}
                  <br/>

                  <label  style={labelStyle}htmlFor="password">Enter password</label>
                  <input type="text"
                  onChange={e=>setForm({...form,password:e.target.value})}
                  value={form.password}
                  id="password"
                  style={inputStyle}/>
                   { form.clientErrors.password && <span> { form.clientErrors.password } </span>}
                  <br/>
                
                  <label   style={labelStyle}htmlFor="bio">Bio</label>
                  < input type="textarea"
                  onChange={e=>setForm({...form,bio:e.target.value})}
                  value={form.bio}
                  id="bio"
                  style={inputStyle}/>
                   { form.clientErrors.bio&& <span> { form.clientErrors.bio } </span>}
                  <br/>
                 <label style={labelStyle} >Update-profile</label>
                 <input type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  style={inputStyle}
                  />
                  <br/>

                  <input type="submit" 
                  style={{
                    padding: '10px',
                    backgroundColor: '#323ca8',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}/>
            </form>
        </div>

    )
}
const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0',
    boxSizing: 'border-box',
  };