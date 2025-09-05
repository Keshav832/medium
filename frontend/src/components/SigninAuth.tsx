import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type SigninInputs } from "@resok/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { AuthInput } from "./AuthInput";


export const SigninAuth = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInputs>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        try {
            setLoading(true);

            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signin`,
                postInputs
            );
            const jwt = response.data.token;

            localStorage.setItem("token", jwt);

            toast.success("Signed in successfully 🎉");
            setTimeout(() => navigate("/blogs"), 500)
        } catch (e: any) {
            const message = e.response?.data?.message || e.response?.data?.error || "Invalid email or password. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md px-8">
                <h1 className="text-3xl text-center font-extrabold mb-2">Sign in to your account</h1>
                <p className="text-slate-500 mb-6 text-center">
                    Don't have an account?
                    <Link className="pl-2 underline" to={"/signup"}>
                        Sign up
                    </Link>
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!loading) handleSubmit();
                    }}
                    className="w-full space-y-4"
                >
                    <AuthInput
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        autoComplete="email"
                        autoFocus
                        disabled={loading}
                        onChange={(e) =>
                        setPostInputs({ ...postInputs, email: e.target.value })
                        }
                    />
                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="••••••"
                        autoComplete="current-password"
                        disabled={loading}
                        onChange={(e) =>
                            setPostInputs({ ...postInputs, password: e.target.value })
                        }
                    />

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 
                            ${loading 
                            ? "bg-gray-500 cursor-not-allowed" 
                            : "bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-4 w-4 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        />
                                    </svg>
                                    Signing in...
                                </span>
                                ) : ( "Sign in" )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};