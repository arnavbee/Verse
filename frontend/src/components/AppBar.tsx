import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4 w-full">
        <div className="text-3xl font-bold flex flex-col justify-center">
            Verse
        </div>
        <div className="text-2xl">
            <Avatar name="Arnav" size={10}/>
        </div>

    </div>
}