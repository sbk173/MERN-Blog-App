import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"
import Card from "./Card"

function Home(){
    const [user,setUser] = React.useState('')
    const [data,setData] = React.useState([]) 
    const navigate = useNavigate()
    // React.useEffect(
    //     ()=>{
    //         console.log("Home")
    //         axios.get('http://localhost:9000/verifyAccessToken',{withCredentials:true}).then((response)=>{
    //             console.log(response.status)
    //             if(response.status === 200){
    //                 setUser(localStorage.getItem('Name'))
    //             }

    //         } )
    //         .catch((error)=>{
    //             console.log(error)
    //             //navigate('/login')
    //         })//call to verify JWT
    //     },
    //     []
    // )

    React.useEffect(()=>{

        axios.get('http://localhost:9000/models/AcceptedArticles',{withCredentials:true}).then(response =>{
        const temp = response.data 
        var c=[];
        Object.keys(temp).forEach((key)=>{
            c.push(temp[key])
        }) 
        setData(c)
        
        })
        .catch((err)=>{
            console.log(err)
        })

    },[])

    const handleLogout = ()=>{
        axios.get('http://localhost:9000/logout',{withCredentials:true}).then(()=>{
            navigate('/login')
        })
        .catch(()=>{
            navigate('/login')
        })
        localStorage.clear()
    }

    console.log(data)
    var b=[]
    if (data){
        b = data.map((key)=>{
            return <Card id={key.filename} thumbnail={key.thumbnail} articlename={key.articleName} creator={key.creator}/>
        })
    }
    return(
        <div className="h-screen w-screen bg-gray-900">
            <h1>Hallo {user}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div className="items-center grid grid-cols-4 gap-4 content-start px-3">
            {b}
            <Card thumbnail='conductance.png' articlename='lol' creator='halp'/>
            <Card thumbnail='conductance.png' articlename='lol' creator='halp'/>
            <Card thumbnail='conductance.png' articlename='lol' creator='halp'/>
            </div>
        </div>
    )
}

export default Home;