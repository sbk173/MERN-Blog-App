import React from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function ArticleView(props){
    const [filePath , setFilePath] = React.useState(props.path)

    return(
        <div>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
            <Viewer fileUrl='../public/DDCO_ASSIGNMENTS.pdf' />

            </Worker>


        </div>

    )
}

export default ArticleView;