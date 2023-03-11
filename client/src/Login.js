import React from "react";
import axios from 'axios'
import { navigate, useNavigate } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()

    React.useEffect(
        () => {
            console.log('check');
            axios.get('http://localhost:9000/verifyAccessToken', { withCredentials: true }).then((response) => {
                console.log(response)
                console.log("check")
                navigate('/')
            }

            )
                .catch(() => {
                    localStorage.clear()
                })
        }, [])




    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }

        })
    }

    const handleLogin = async (event) => {

        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };


        event.preventDefault()
        axios.post('http://localhost:9000/login', formData, config).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('Name', formData.username)
                navigate('/')
            }

        })
            .catch((error) => {
                console.log("Invalid Username/Password")
            })
    }

    return (
        <div className="flex h-screen w-screen justify-center items-center bg-gray-900">
            <div className="form bg-slate-800 shadow-md rounded px-10 pt-6 pb-8 mb-4 " >
                <div className="flex items-center justify-center">
                    <h1 className="flex text-blue-500 font-bold text-2xl">LOGIN</h1>
                </div>


                <div className="mb-4 py-5">

                    <label htmlFor="username" className="block text-sky-100 text-base font-bold mb-2">Username</label>
                    <input type='text' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" name='username' id='username' onChange={handleChange} value={formData.username} autoComplete='off' placeholder="Username"/><br /><br />

                </div>

                <label htmlFor="password" className="block text-sky-100 text-base font-bold mb-2">Password</label>
                <input type='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" name='password' id='password' onChange={handleChange} value={formData.password} autoComplete='off' placeholder="********"/><br /><br />
                <div className="flex items-center justify-center">
                    <button className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleLogin}>Login</button>
                </div>

            </div>
        </div>
    )
}

export default LoginForm