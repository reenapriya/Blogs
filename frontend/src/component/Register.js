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
        profilePic:"",
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
        const formData=_.pick(form,["username","email","password","bio"])
        console.log(formData)

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
    return (
        <div>
            <h1>Register Here</h1>

            { form.serverErrors && displayErrors() } 
            <form onSubmit={handleSubmit}>
           
                <label htmlFor="username"> Enter Username </label>
                <input type="text"
                  onChange={e=>setForm({...form,username:e.target.value})}
                  id="username"
                  value={form.username}
                  />
                   { form.clientErrors.username && <span> { form.clientErrors.username } </span>}
                  <br/>
                  <label htmlFor="email">Enter Email</label>
                  <input type="text"
                  onChange={e=>setForm ({...form,email:e.target.value})}
                  id="email"
                  value={form.email}/>
                   { form.clientErrors.email && <span> { form.clientErrors.email } </span>}
                  <br/>

                  <label htmlFor="password">Enter password</label>
                  <input type="text"
                  onChange={e=>setForm({...form,password:e.target.value})}
                  value={form.password}
                  id="password"/>
                   { form.clientErrors.password && <span> { form.clientErrors.password } </span>}
                  <br/>
                
                  <label htmlFor="bio">Bio</label>
                  < input type="textarea"
                  onChange={e=>setForm({...form,bio:e.target.value})}
                  value={form.bio}
                  id="bio"/>
                   { form.clientErrors.bio&& <span> { form.clientErrors.bio } </span>}
                  <br/>

                  <input type="submit"/>
            </form>
        </div>

    )
}