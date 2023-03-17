import React from 'react'
import { useNavigate } from 'react-router-dom'

const url = 'http://localhost:9000/api/images/'
function Card(props){

    const navigate = useNavigate();

    const handleclick = (event)=>{
        const article = event.currentTarget
        console.log(article,article.value)
        navigate(`/view/article/?filename=${props.id}`)
    }
    return(
        <div >
        <div className='card max-w-sm h-96 rounded-lg overflow-hidden shadow-lg bg-gray-800'>
            <img src={url+props.thumbnail} className="w-full h-4/5" alt='Some IMG'></img>
            <div className='m-4 text-sky-500 font-bold'>
            <h3 className='text-2xl  hover:text-sky-300 cursor-pointer' onClick={handleclick} >{props.articlename}</h3>
            <h4 className='text-sm text-right text-sky-200'>&gt;{props.creator}</h4>
            </div>
            
        </div>
        </div>
    )
}

export default Card;