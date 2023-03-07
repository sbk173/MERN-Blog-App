import React from 'react'
const url = 'http://localhost:9000/api/images/'
function Card(props){

    return(
        <div className='card'>
            <img src={url+props.thumbnail} width='150' height='150' alt='Some IMG'></img>
            <h3>{props.articlename}</h3>
            <h4>{props.creator}</h4>
        </div>
    )
}

export default Card;