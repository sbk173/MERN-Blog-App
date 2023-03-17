import React from "react";

function Navbar(props){

    const [logged , setLogged] = React.useState(0)
    if (props.username !==undefined){
        setLogged(1)
    }
    return(
            <ul className="flex w-full justify-end bg-slate-800 text-sky-500 font-bold p-4 rounded">
                <li>
                    {logged===1 && <h1 className="px-3 hover:text-sky-400">{props.username}</h1>}
                    {logged===0 && <input type='button' className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Login"/>}
                </li>
            </ul>
        
    )
}

export default Navbar;