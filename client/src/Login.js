import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function LoginForm(){
    const [formData , setFormData] = React.useState({
        username:'',
        password:''
    })
    
    const navigate = useNavigate();

    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value

        setFormData((prev)=>{
            return {
                ...prev,
                [name]:value
            }

        })
    }

    const handleLogin = async (event)=>{
        
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };


        event.preventDefault()
        axios.post('http://localhost:9000/login',formData,config).then((response)=>{
            if (response.status === 200){
                navigate('/')
            }

        })
        .catch((error)=>{
            console.log("Invalid Username/Password")
        })
    }

    return(
        <div className="form" >
            <h1>LOGIN</h1>
            <label htmlFor="username"></label><input type='text' name='username' id='username' onChange={handleChange} value={formData.username} autoComplete='off'/><br/><br/>
            <label htmlFor="password"></label><input type='password' name='password' id='password' onChange={handleChange} value={formData.password} autoComplete='off'/><br/><br/>
            <input type='button' value='Login' onClick={handleLogin}/>

        </div>
    )
}

export default LoginForm