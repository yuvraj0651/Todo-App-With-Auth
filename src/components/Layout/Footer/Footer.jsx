import { useLocation } from "react-router";

const Footer = () => {

    const location = useLocation();
    let currentPath = location.pathname;
    console.log(currentPath)

    return (
        <footer className={`bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white ${currentPath ==="/todo" ? "mt-10" : "mt-1"}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">

                    {/* Branding / Logo */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-extrabold tracking-wide mb-2">🌟 TodoMaster</h2>
                        <p className="text-gray-100">Manage your tasks efficiently and stay productive!</p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-center md:text-left">
                        <div>
                            <h3 className="font-semibold mb-2">Product</h3>
                            <ul className="space-y-1 text-gray-200">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Download</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Company</h3>
                            <ul className="space-y-1 text-gray-200">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Support</h3>
                            <ul className="space-y-1 text-gray-200">
                                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/30 mt-8 pt-4 text-center text-gray-200 text-sm">
                    © 2025 TodoMaster. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
