import React from 'react'
import axios from 'axios'

const ApprovalPage = ()=>{
    const [data,setData] = React.useState([])
    const [seed , setSeed] = React.useState(0)

    var b;
    React.useEffect(
        ()=>{
        axios.get('http://localhost:9000/models/PendingArticles',{withCredentials:true}).then(response =>{
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

    },[seed])

    const handleApprove = (event)=>{
        const parent = event.target.parentNode;
        console.log(parent.id)
        axios.patch('http://localhost:9000/api/acceptArticle',{'id':parent.id}).then(response=>{
            console.log(response)
            setSeed(Math.random())
        })
    }
    
    if(data){
        b = data.map((obj)=>{
            return (
                <div key={obj['_id']} id={obj['_id']}>
                    <h4>{obj.articleName}</h4>
                    <h4>{obj.creator}</h4>
                    <h4>{obj.likes}</h4>
                    <button onClick={handleApprove}>Approve</button>
                </div>)
    })}

    return(
         <div>{b}</div>
        //  <div>Ok</div>
    )

}
export default ApprovalPage