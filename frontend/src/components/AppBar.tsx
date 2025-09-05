import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

interface appBarInputs {
    username: string;
}

export const Appbar = ({ username }: appBarInputs) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/blogs" className="text-xl font-bold cursor-pointer">
                    Medium
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/publish">
                        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5">
                            New blog
                        </button>
                    </Link>
                    <Avatar size="big" name={username} />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none"
                    >
                        {mobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className={`md:hidden px-8 py-4 flex flex-col gap-3 bg-white shadow-inner transition-all duration-300 ease-in-out ${ mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden" }`}>
                    <Link to="/publish">
                        <button className="w-40 sm:w-56 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5">
                            New blog
                        </button>
                    </Link>
                    <div className="flex justify-start items-center gap-3 mt-2">
                        <Avatar size="big" name={username} />
                        <span className="font-medium text-gray-700 truncate">{username}</span>
                    </div>
                </div>
            )}
        </header>
    );
};
