import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number

}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
return (

<Link to={`/blog/${id}`}>

<div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">
        <div>
        <Avatar name={authorName}/>
        </div>
    
    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
    {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
            <Circle/>
        </div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
        {publishedDate}
        </div>
       
    </div>

    <div className="text-xl font-semibold pt-2">
        {title}
    </div>

    <div className="text-md font-thin">
        {content.slice(0,100) + "..."}
    </div>

    <div className="text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(content.length/100)} minute(s) read`}
    </div>
</div>
</Link>)
}


function Circle(){
    return <div className="w-1 h-1 rounded-full bg-gray-300">

    </div>
}






export function Avatar({name, size = 4}: {name: string, size?: number}) {

    return (

< div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600` } > 
    <span className="text-xs text-gray-600 dark:text-gray-300">
        {name[0]}
    </span>

</div>)}

