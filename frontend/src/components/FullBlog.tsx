import { type Blog } from "../hooks"
import { Appbar } from "./AppBar"
import { Avatar } from "./Avatar"

interface FullBlogProps {
    blog: Blog;
    username: string;
}

export const FullBlog = ({ blog, username }: FullBlogProps) => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Appbar username={username} />

            <div className="flex justify-center px-4 sm:px-6 lg:px-10 py-8">
                <div className="grid grid-cols-12 gap-8 w-full max-w-screen-xl">

                    <div className="col-span-12 md:col-span-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{blog.title}</h1>
                        <div className="text-sm md:text-base text-slate-500 mb-6">
                            Posted on{" "}
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </div>
                        <div className="prose prose-slate max-w-none text-base md:text-lg leading-relaxed"
                            dangerouslySetInnerHTML = {{ __html: blog.content }}
                        />
                    </div>

                    <div className="col-span-12 md:col-span-4 md:sticky md:top-24">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <div className="text-slate-600 text-lg font-medium pb-2">Author</div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                                </div>
                                <div>
                                    <div className="text-xl font-bold">{blog.author.name || "Anonymous"}</div>
                                    <div className="pt-2 text-slate-500 text-sm">
                                        {/*blog.author.bio || */}
                                        Passionate writer sharing knowledge with the world.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};