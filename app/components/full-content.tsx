import parse from "html-react-parser"

interface Props{
    content:string;
}

function FullContent({content}:Props){
    if(!content) return null;
    return <article>{parse(content)}</article>
}

export {FullContent}