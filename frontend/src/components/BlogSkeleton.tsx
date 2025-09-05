export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse w-full max-w-full sm:max-w-screen-md mx-auto p-4 border-b border-slate-200 rounded-lg mb-6">
            {/* Author Row */}
            <div className="flex items-center gap-2 mb-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Title */}
            <div className="h-6 bg-gray-200 rounded mb-2"></div>

            {/* Content */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>

            {/* Read time */}
            <div className="h-3 bg-gray-200 rounded mt-4 w-24"></div>

            <span className="sr-only">Loading...</span>
        </div>
    );
};