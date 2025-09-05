import { useEffect, useRef, useState } from "react";
import { Appbar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../utils/auth";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState(""); // HTML content
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillInstance = useRef<Quill | null>(null);
    const navigate = useNavigate();

    const username = getUsernameFromToken() || "Anonymous";

    useEffect(() => {
        if (!editorRef.current || quillInstance.current) return;

        quillInstance.current = new Quill(editorRef.current, {
            theme: "snow",
            placeholder: "Write your article here...",
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                ],
            },
        });

        const editor = editorRef.current.querySelector(".ql-editor") as HTMLElement;
        
        const adjustHeight = () => {
            editor.style.height = "auto"; // reset height
            editor.style.height = editor.scrollHeight + "px"; // set to content height
        };

        quillInstance.current.on("text-change", () => {
            setContent(editor.innerHTML);
            adjustHeight();
        });

        adjustHeight();
    }, []);

    const handlePublish = async () => {
        if (!title || !content) return;

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                { title, content },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            navigate(`/blog/${response.data.id}`);
        } catch (err) {
            console.error(err);
            alert("Failed to publish blog");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Appbar username={username} />

            <div className="flex justify-center w-full pt-8 px-4 sm:px-6 lg:px-10">
                <div className="max-w-screen-lg w-full flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />

                    <div
                        ref={editorRef}
                        className="bg-white rounded-lg h-64 md:h-96 min-h-[200px]"
                    ></div>

                    <button
                        onClick={handlePublish}
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-200"
                    >
                        Publish blog
                    </button>
                </div>
            </div>
        </div>
    );
};
