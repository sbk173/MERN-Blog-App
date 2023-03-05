import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function FileUpload(){
    const [user,setUser] = React.useState(null);
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
    const [articleName , setArticleName] = React.useState(null)
    const [image , setImage] = React.useState(null)
    const [pdf , setPdf] = React.useState(null)
    
    const handleArticle = (event)=>{
        setArticleName(event.target.value)
    }

    const handleImage=(event)=>{
        setImage(event.target.files[0])
    }

    const handlePDF = (event) =>{
        setPdf(event.target.files[0])
    }


    const handleSubmit = ()=>{
        console.log("Here",image.name.replaceAll(' ','_'),pdf.name.replaceAll(' ','_'))
        const formData = new FormData()
        formData.append('image',image)
        formData.append('pdf',pdf)
        formData.append('user',user)
        formData.append('articlename',articleName)
        formData.append('thumbnail',image.name.replaceAll(' ','_'))
        formData.append('filename',pdf.name.replaceAll(' ','_'))
        axios.post('http://localhost:9000/api/upload',formData).then(

            ()=>{console.log('sucessfull')}
        ).catch((err)=>{
            console.log(err.response.data)
        })
        
    }

    return(
        <div className='form'>
            <label htmlFor='articlename' >Article Name</label>
            <input type='text' id='articlename' onChange={handleArticle}/>
            <br/>
            <input type='file' accept='image/*' onChange={handleImage}/>
            <br/>
            <input type ='file' accept='application/pdf' onChange={handlePDF}/>

            {pdf && image && <input type='submit' onClick={handleSubmit}/>}
            {(!pdf || !image) && <h3>Upload Required files</h3> }
        </div>
    )
}

export default FileUpload