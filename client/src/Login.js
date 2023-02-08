import React from "react";

function LoginForm(){
    const [formData , setFormData] = React.useState({
        username:'',
        password:''
    })
    console.log(formData)
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
    return(
        <div className="form">
            <h1>LOGIN</h1>
            <label htmlFor="username"></label><input type='text' name='username' id='username' onChange={handleChange} value={formData.username} autoComplete='off'/><br/><br/>
            <label htmlFor="password"></label><input type='password' name='password' id='password' onChange={handleChange} value={formData.password} autoComplete='off'/><br/><br/>
            <input type='button' value='Login' />

        </div>
    )
}

export default LoginForm