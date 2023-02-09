import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function RegistrationForm(){
    const [formData,setFormData] = React.useState({
        username:'',
        password:''
    })
    const navigate = useNavigate()

    const handleChange=(event)=>{
        const name = event.target.name
        const value = event.target.value
        
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }


    const handleRegister = ()=>{
        axios.post('http://localhost:9000/register',formData).then((response)=>{
            console.log(response)
            if (response.data.status === 'ok'){
                navigate('/login')
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return(
        <div className="form">
            <h1>Register</h1>
            <label htmlFor="username"></label>
            <input type='text' name='username' id='username' onChange={handleChange} value={formData.username} autoComplete='off'/><br/><br/>
            <label htmlFor="password"></label>
            <input type='password' name='password' id='password' onChange={handleChange} value={formData.password} autoComplete='off'/><br/><br/>
            <input type='button' value='Register' onClick={handleRegister}/>
        </div>
    )
}

export default RegistrationForm