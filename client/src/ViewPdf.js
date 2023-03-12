import React from "react";
import { useLocation } from "react-router-dom";
const ViewPdf = ()=>{
    const searchParams = new URLSearchParams(document.location.search)
    const filename = searchParams.get('filename')
    return(
<object className="w-screen h-screen" data={`http://localhost:9000/api/articles/${filename}`} type="application/pdf" > </object>    )
}

export default ViewPdf