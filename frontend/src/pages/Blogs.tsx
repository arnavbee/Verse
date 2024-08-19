/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlogCard } from "../components/BlogCard"
import {Appbar} from "../components/AppBar"
import { useBlogs } from "../hooks";
export const Blogs = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading....
        </div>
    }
    
    
    return (
    
    <div>
        <Appbar/>
        <div className="flex justify-center">
        <div className="max-w-xl">
            {blogs.map((blog) =>  <BlogCard 
        authorName={"Ish Verduzco"}
        title={"Social media for startup founders: A practical guide to building an online presence"}
        content={"People compare spending time on social media to satisfying a sweet tooth. But for most startup founders, building a social presence is a staple. The platforms we choose can help us research our audiences, drive organic growth, build brands, and get the word out — the argument for building out a social media strategy is pretty straightforward. Putting together an effective, realistic plan, on the other hand, is not."}
        publishedDate={"24 Feb 2024"}

        />)}
       
    </div>

    </div>

    </div>
  

    )
   
} 