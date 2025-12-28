import { useState } from "react";
import LoginModal from "../../../UI/LoginModal/LoginModal";
import RegisterModal from "../../../UI/RegisterModal/RegisterModal";

const InitialPage = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const toggleLoginModal = () => {
        setIsLoginOpen(!isLoginOpen);
    };

    const toggleRegisterModal = () => {
        setIsRegisterOpen(!isRegisterOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-w-xl w-full p-10 text-center border border-white/20">

                {/* Heading */}
                <h1 className="text-4xl font-bold text-white mb-4">
                    Welcome Back 👋
                </h1>

                {/* Subheading */}
                <p className="text-white/80 text-lg mb-8">
                    Manage your account, access features and explore your dashboard
                </p>

                {/* Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={toggleLoginModal}
                        className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-md hover:scale-105 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={toggleRegisterModal}
                        className="px-6 py-3 rounded-xl bg-indigo-500 text-white font-semibold shadow-md hover:scale-105 transition"
                    >
                        Register
                    </button>
                </div>
            </div>

            {/* Modals (UI only – no logic) */}
            {
                isLoginOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={toggleLoginModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <LoginModal
                                onClose={toggleLoginModal}
                                openRegister={toggleRegisterModal}
                            />
                        </div>
                    </div>
                )
            }
            {
                isRegisterOpen && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={toggleRegisterModal}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <RegisterModal
                                onClose={toggleRegisterModal}
                                openLogin={toggleLoginModal}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default InitialPage;
