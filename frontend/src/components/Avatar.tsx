export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {

    // Function to generate a consistent color based on the username
    const getColor = (str: string) => {
        const colors = [
            "bg-red-200",
            "bg-green-200",
            "bg-blue-200",
            "bg-yellow-200",
            "bg-purple-200",
            "bg-pink-200",
            "bg-indigo-200",
            "bg-teal-200",
        ];
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    };

    const bgColor = getColor(name);

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden rounded-full select-none ${size === "small" ? "w-6 h-6" : "w-10 h-10"} ${bgColor}`}>
            <span className={`${size === "small" ? "text-xs" : "text-base"} font-extralight text-gray-700`}>
                {name[0].toUpperCase()}
            </span>
        </div>
    );
}
