import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"

function Home(){
    const [user,setUser] = React.useState('')
    const navigate = useNavigate()
    React.useEffect(
        ()=>{
            console.log("Home")
            axios.get('http://localhost:9000/verifyAccessToken',{withCredentials:true}).then((response)=>{
                console.log(response.status)
                if(response.status === 200){
                    setUser(localStorage.getItem('Name'))
                }

            } )
            .catch((error)=>{
                console.log(error)
                navigate('/login')
            })//call to verify JWT
        },
        []
    )

    const handleLogout = ()=>{
        axios.get('http://localhost:9000/logout',{withCredentials:true}).then(()=>{
            navigate('/login')
        })
        .catch(()=>{
            navigate('/login')
        })
        localStorage.clear()
    }

    return(
        <div>
            <h1>Hallo {user}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;