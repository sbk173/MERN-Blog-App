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
                //navigate('/login')
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
        <div className='form h-screen w-screen flex justify-center items-center bg-gray-900'>
            <div className='bg-gray-800 p-4 rounded'>
                <div className='flex items-center justify-center m-3'>
                    <h1 className='flex text-blue-500 font-bold text-2xl'>UPLOAD ARTICLE</h1>
                </div>
            <div className='m-4'>
            
            <div className='mb-4'>
            <label htmlFor='articlename' className='block text-sky-100 text-lg font-bold mb-2'>Article Name</label>
            <input type='text' id='articlename' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" onChange={handleArticle}/>
            <br/>
            </div>
            <div className='text-sky-200'>
            <input type='file' accept='image/*'  onChange={handleImage}/>
            </div>
            
            <br/>
            <div className='text-sky-200 mb-4'>
            <input type ='file'  accept='application/pdf' onChange={handlePDF}/>
            </div>
            

            {pdf && image && <input type='submit' className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleSubmit}/>}
            {(!pdf || !image) && <h3 className='text-sky-200'>Upload Required files</h3> }
            </div>
            </div>

        </div>
    )
}

export default FileUpload