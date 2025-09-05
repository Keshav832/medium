import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { getUsernameFromToken } from "../utils/auth";
import { Spinner } from "../components/Spinner";

export const Blogs = () => {
    const username = getUsernameFromToken() || "Anonymous";
    const { blogs, loading, loadingMore, error, hasMore } = useBlogs(10);

    return (
        <div>
            <Appbar username={username} />
            <div className="flex justify-center mt-6">
                <div className="w-full max-w-3xl px-4 flex flex-col gap-6">
                    { loading && Array(5).fill(0).map((_, i) => <BlogSkeleton key={`init-${i}`} />)}

                    { blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content.slice(0, 300)}
                            publishedDate={new Date(blog.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                            renderContent={(content) => (
                                <div
                                    className="prose prose-slate max-w-none text-sm md:text-base leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            )}
                        />
                    ))}

                    { loadingMore && (
                        <div className="flex justify-center py-4">
                            <Spinner />
                        </div>
                    )}

                    { error && <div className="text-red-500 text-center py-4">{error}</div>}

                    { !hasMore && !loading && !loadingMore && blogs.length > 0 && (
                        <div className="text-gray-500 text-center py-4">
                            You have reached the end.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
