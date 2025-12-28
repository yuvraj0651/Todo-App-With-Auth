import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, registerUser } from "../../API/Thunk/AuthThunk";

const RegisterModal = ({ onClose, openLogin }) => {

    const [registerData, setRegisterData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const { registerLoading, error: authError } = useSelector((state) => state.authData);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const registerChangeHandler = (event) => {
        const { name, value } = event.target;
        setRegisterData({ ...registerData, [name]: value });
        setError({ ...error, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!registerData.fullName.trim()) {
            newErrors.fullName = "Full Name input field is empty";
        }

        if (!registerData.email.trim()) {
            newErrors.email = "Email input field is empty";
        } else if (!emailRegex.test(registerData.email)) {
            newErrors.email = "Invalid email address";
        };

        if (!registerData.password.trim()) {
            newErrors.password = "Password input field is empty";
        } else if (registerData.password.trim().length < 6) {
            newErrors.password = "Password must be more than 6 characters";
        };

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValidate = validateForm();
        setError(isValidate);

        if (Object.keys(isValidate).length === 0) {

            dispatch(registerUser({
                fullName: registerData.fullName,
                email: registerData.email,
                password: registerData.password,
                username: registerData.email.split("@")[0],
            })).unwrap().then(() => {
                alert("You are registered successfully");

                setRegisterData({
                    email: "",
                    password: "",
                    fullName:"",
                });
                dispatch(clearAuthError());

                setError({});
                onClose();
            }).catch((error) => {
                alert(error);
            })
        };
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 relative">

            <div className="login-modal-close cursor-pointer text-pink-600 text-lg absolute top-4 right-4" onClick={onClose}>
                <IoMdClose />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create your account
            </h2>

            <form onSubmit={handleSubmit} className="py-4 lg:w-[30rem]">
                <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={registerChangeHandler}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {error.fullName && (
                    <p className="mb-3 pl-2 mt-[-1.3rem] tracking-wide text-red-700 text-[0.8rem]">*{error.fullName}</p>
                )}

                <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={registerChangeHandler}
                    placeholder="Email address"
                    className="w-full px-4 py-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {error.email && (
                    <p className="mb-3 pl-2 mt-[-1.3rem] tracking-wide text-red-700 text-[0.8rem]">*{error.email}</p>
                )}

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerData.password}
                        onChange={registerChangeHandler}
                        placeholder="Password"
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {error.password && (
                        <p className="mt-1 pl-2 tracking-wide text-red-700 text-[0.8rem]">*{error.password}</p>
                    )}
                    <span
                        onClick={togglePassword}
                        className="absolute top-3 right-3 font-[500] tracking-wide cursor-pointer text-indigo-700">
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                {authError && (
                    <p className="mb-4 text-center text-red-600 text-sm">
                        {authError}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={registerLoading}
                    className={`w-full mt-6 py-3 rounded-xl text-white font-semibold transition
                    ${registerLoading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
                    `}
                >
                    {registerLoading ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => {
                            openLogin();
                            onClose();
                        }}
                        className="text-indigo-600 font-medium cursor-pointer hover:underline"
                    >
                        Login here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default RegisterModal;
