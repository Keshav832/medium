import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    authorName: string;
    publishedDate: string;
    renderContent?: (content: string) => JSX.Element;
}


export const BlogCard = ({
    id,
    title,
    content,
    authorName,
    publishedDate,
    renderContent
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 cursor-pointer w-full max-w-full sm:max-w-screen-md mx-auto rounded-lg hover:bg-white transition">
                <div className="flex items-center gap-2">
                    <Avatar name={authorName} />
                    <div className="font-extralight text-sm">{authorName}</div>
                    <div className="h-1 w-1 rounded-full bg-slate-500" />
                    <div className="font-thin text-slate-500 text-sm">{publishedDate}</div>
                </div>
                <div className="text-xl font-semibold pt-2">{title}</div>
                <div className="text-md font-thin">{renderContent ? renderContent(content) : content }</div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
};