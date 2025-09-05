import { Appbar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { getUsernameFromToken } from "../utils/auth";

export const Blog = () => {
    const { id } = useParams();
    const username = getUsernameFromToken() || "Anonymous";
    const { loading, blog, error } = useBlog({ id: id || "" });

    if (loading || !blog) {
        return (
            <div>
                <Appbar username={username} />
                <div className="h-screen flex flex-col justify-center items-center">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Appbar username={username} />
                <div className="h-screen flex flex-col justify-center items-center text-red-500">
                    {error}
                </div>
            </div>
        );
    }

    return <FullBlog blog={blog} username={username} />;
};
