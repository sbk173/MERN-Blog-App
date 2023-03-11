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
        <div className="flex h-screen w-screen bg-gray-900 justify-center items-center">

        <div className="form bg-slate-800 shadow-md rounded px-10 pt-6 pb-8 mb-4">
            
            <div className="text-blue-500 text-2xl font-bold pb-5 flex justify-center">
                <h1>Register</h1>
            </div>
            <div className="mb-6">
            <label htmlFor="username" className="block text-sky-100 text-base font-bold mb-2">Username</label>
            <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" name='username' id='username' onChange={handleChange} value={formData.username} autoComplete='off'/><br/><br/>

            </div>
            
            <div className="mb-6">
            <label htmlFor="password" className="block text-sky-100 text-base font-bold mb-2">Password</label>
            <input type='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" name='password' id='password' onChange={handleChange} value={formData.password} autoComplete='off'/><br/><br/>
            </div>
            
            
            <div className="flex justify-center">
            <input type='button' className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value='Register' onClick={handleRegister}/>
            </div>
            
        </div>

                    
        </div>
    )
}

export default RegistrationForm