import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { logout } from "../../API/Thunk/AuthThunk";

const Header = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const location = useLocation();
    let currentLocation = location.pathname;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        alert("Logging you out!");
        
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    return (
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="text-white text-2xl font-extrabold tracking-wide">
                        <Link to="/">
                            🌟 TodoMaster
                        </Link>
                    </div>

                    {/* Desktop: Search + Buttons */}
                    <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-1/3 px-4 py-2 rounded-lg border border-white/30 bg-white/90 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
                        />
                        {
                            currentLocation === "/todo" && (
                                <button
                                    onClick={handleLogout}
                                    className="bg-white/90 text-indigo-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white transition">
                                    Logout
                                </button>
                            )
                        }
                        {
                            currentLocation === "/" && (
                                <Link to="/todo" className="bg-white/90 text-pink-600 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-white transition">
                                    Todo App
                                </Link>
                            )
                        }
                    </div>

                    {/* Mobile: Hamburger */}
                    <div className="md:hidden flex items-center" onClick={toggleSidebar}>
                        <HiOutlineMenu className="text-white w-8 h-8" />
                    </div>
                </div>

                {/* Mobile: Search + Buttons (Stacked) */}
                <div className={`md:hidden navigation mt-4 flex flex-col space-y-2 pb-7 transition-all duration-500 ${isSidebarOpen ? "opened top-8 opacity-100 block" : "-top-40 opacity-0 hidden"}`}>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/90 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition"
                    />
                    <div className="flex space-x-2">
                        <button className="flex-1 bg-white/90 text-indigo-600 font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-white transition">
                            +Add
                        </button>
                        <button className="flex-1 bg-white/90 text-pink-600 font-semibold px-3 py-2 rounded-lg shadow-md hover:bg-white transition">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
