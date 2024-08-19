import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4 w-full">
     
       
        <div className="text-3xl font-bold flex flex-col justify-center cursor-pointer">
        <Link to={'/blogs'}>
            Verse
        </Link>
        </div>

        <div className="text-2xl">
      
       <Link to={`/publish`}>
        <button type="button" className=" mr-8 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">New</button>
        </Link>
        <Avatar name="Arnav" size={10}/>
        </div>

    </div>
}