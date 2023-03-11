import React from 'react'
const url = 'http://localhost:9000/api/images/'
function Card(props){

    return(
        <div >
        <div className='card max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800'>
            <img src={url+props.thumbnail} className="w-full" alt='Some IMG'></img>
            <div className='m-4 text-sky-100 font-bold'>
            <h3 className='text-2xl text-center' >{props.articlename}</h3>
            <h4 className='text-sm text-right'>&gt;{props.creator}</h4>
            </div>
            
        </div>
        </div>
    )
}

export default Card;