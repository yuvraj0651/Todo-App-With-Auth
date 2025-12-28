import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, loginUser, setUserFromToken } from "../../API/Thunk/AuthThunk";
import { useNavigate } from "react-router";

const LoginModal = ({ onClose, openRegister }) => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [formError, setFormError] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const dispatch = useDispatch();

    const { error: authError, isLoading } = useSelector((state) => state.authData)

    const loginChangeHandler = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
        setFormError({ ...formError, [name]: "" });
        dispatch(clearAuthError());
    };

    const validateForm = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!loginData.email.trim()) {
            newErrors.email = "Email input field is empty";
        } else if (!emailRegex.test(loginData.email)) {
            newErrors.email = "Invalid email address";
        };

        if (!loginData.password.trim()) {
            newErrors.password = "Password input field is empty";
        } else if (loginData.password.trim().length < 6) {
            newErrors.password = "Password must be more than 6 characters";
        };

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = validateForm();
        setFormError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            dispatch(loginUser(loginData)).unwrap().then(() => {
                alert("You are logged in successfully");

                setLoginData({
                    email: "",
                    password: "",
                });

                setFormError({});

                setTimeout(() => {
                    navigate("/todo");
                }, 1000);

                onClose();
            }).catch((error) => {
                alert(error);
            })
        };
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            const user = JSON.parse(token);
            dispatch(setUserFromToken(user));
        }
    },[dispatch])

    return (
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 relative">

            <div className="login-modal-close cursor-pointer text-pink-600 text-lg absolute top-4 right-4" onClick={onClose}>
                <IoMdClose />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Login to your account
            </h2>

            <form onSubmit={handleSubmit} className="py-4 lg:w-[30rem]">
                <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={loginChangeHandler}
                    placeholder="Email address"
                    className="w-full px-4 py-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formError.email && (
                    <p className="mb-3 pl-2 mt-[-1.3rem] tracking-wide text-red-700 text-[0.8rem]">*{formError.email}</p>
                )}

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={loginChangeHandler}
                        placeholder="Password"
                        className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {formError.password && (
                        <p className="mt-1 pl-2 tracking-wide text-red-700 text-[0.8rem]">*{formError.password}</p>
                    )}
                    <span
                        onClick={togglePassword}
                        className="absolute top-3 right-3 font-[500] tracking-wide cursor-pointer text-indigo-700">
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                {authError && (
                    <p className="text-red-700 text-[0.85rem] mb-3 text-center">
                        *{authError}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-4 py-3 rounded-xl text-white font-semibold transition
                    ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">
                    New here?{" "}
                    <span
                        onClick={() => {
                            openRegister();
                            onClose();
                        }}
                        className="text-indigo-600 font-medium cursor-pointer hover:underline"
                    >
                        Register here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginModal;
