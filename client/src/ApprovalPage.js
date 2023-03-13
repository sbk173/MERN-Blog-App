import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ApprovalPage = ()=>{
    const [data,setData] = React.useState([])
    const [seed , setSeed] = React.useState(0)
    const navigate = useNavigate()
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
        event.stopPropagation()
        const parent = event.target.parentNode.parentNode;
        console.log(parent.id)
        axios.patch('http://localhost:9000/api/acceptArticle',{'filename':parent.id}).then(response=>{
            console.log(response)
            setSeed(Math.random())
        })
    }

    const handleClick = (event)=>{
        const article = event.currentTarget
        console.log(article,article.id)
        navigate(`/view/article/?filename=${article.id}`)
        
    }
    
    if(data){
        b = data.map((obj)=>{
            return (
                <tr onClick={handleClick} id={`${obj.filename}`} key={obj['_id']} className='border-b text-sky-200 text-center transition duration-300 ease-in-out hover:bg-slate-700 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                    <td className='whitespace-nowrap px-6 py-4'>{obj.articleName}</td>
                    <td className='whitespace-nowrap px-6 py-4'>{obj.creator}</td>
                    <td className='whitespace-nowrap px-6 py-4'>
                    <button className='bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={handleApprove}>Approve</button>
                    </td>
                </tr>)
    })}

    return(
        <div className='w-screen h-screen bg-slate-900'>
            <div className='flex justify-center py-24'>
            <table className='table-fixed  max-h-full border  bg-slate-800 '>
                <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr className='text-sky-300 font-bold text-lg text-center'>
                        <th className='px-6 py-4'>Article Name</th>
                        <th className='px-6 py-4'>Created By</th>
                        <th className='px-6 py-4'></th>
                    </tr>
                </thead>
                <tbody>
                    {b}
                </tbody>

            </table>

            </div>
            
        </div>

        //  <div>Ok</div>
    )

}
export default ApprovalPage