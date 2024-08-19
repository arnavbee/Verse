/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlogCard } from "../components/BlogCard"
import {Appbar} from "../components/AppBar"
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
export const Blogs = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
        </div>
    }
    
    
    return (
    
    <div>
        <Appbar/>
        <div className="flex justify-center">
        <div className="">
            {blogs.map(blog =>  <BlogCard 
        id={blog.id}
        authorName={blog.author?.name || "Anonymous"} 
        title={blog.title}
        content={blog.content}
        publishedDate={"24 Feb 2024"}

        />)}
       
    </div>

    </div>

    </div>
  

    )
   
} 