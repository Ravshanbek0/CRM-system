import React, { useState } from "react";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

function Register({ token, setToken }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [eye, setEye] = useState(false);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState();
    const [loader, setLoader] = useState(false);

    const validateInputs = () => {
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!isLogin && !fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }
        if (!emailRegex.test(username)) {
            newErrors.username = "Email must end with gmail.com";
        }
        if (!passwordRegex.test(password)) {
            newErrors.password = "Password must contain at least 6 characters, one uppercase letter, one number, and one special character";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (setter, field) => (e) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (!validateInputs()) return;

        try {
            const formData = new FormData();
            formData.append("email", username);
            formData.append("password", password);

            const response = await axios.post("https://crm-system-beta.vercel.app/api/v1/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("ref_token", response.data.refresh_token);
            localStorage.setItem("lastRefresh", Date.now().toString());
            setToken(response.data.access_token);
            setUsername("");
            setPassword("");
            setLoader(false);
        } catch (error) {
            console.error("Login Failed:", error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
            setLoader(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoader(true);
        if (!validateInputs()) return;

        try {
            const formData = new FormData();
            formData.append("email", username);
            formData.append("full_name", fullName);
            formData.append("password", password);

            const response = await axios.post("https://crm-system-beta.vercel.app/api/v1/admin", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", response.data.acc_token);
            localStorage.setItem("lastRefresh", Date.now().toString());
            setToken(response.data.acc_token);
            setLoader(false);
        } catch (error) {
            console.error("Signup Failed:", error);
            setError(error.response?.data?.message || "Registration failed. Please try again.");
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Information Section */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white flex flex-col justify-center">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-4xl font-bold mb-4">EduTrack Pro</h1>
                        <h2 className="text-2xl font-semibold mb-6">Your Complete Learning Center Management Solution</h2>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start">
                                <svg className="h-6 w-6 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Effortlessly manage students, groups, and attendance</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="h-6 w-6 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Track payments and generate reports</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="h-6 w-6 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Streamline your administrative workflow</span>
                            </li>
                        </ul>

                        <div className="bg-blue-700/30 p-4 rounded-lg border border-blue-600/50">
                            <p className="font-medium">Ready to transform your learning center?</p>
                            <button
                                onClick={() => setIsLogin(false)}
                                className="mt-3 w-full bg-white text-blue-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition"
                            >
                                Sign Up Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {isLogin ? "Welcome Back" : "Create Your Account"}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {isLogin ? "Sign in to manage your learning center" : "Get started with your 14-day free trial"}
                        </p>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                                <p>{error}</p>
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={isLogin ? loginUser : handleSignup}>
                            {!isLogin && (
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={handleChange(setFullName, "fullName")}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={username}
                                    onChange={handleChange(setUsername, "username")}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={eye ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={handleChange(setPassword, "password")}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12`}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                                        onClick={() => setEye(!eye)}
                                    >
                                        {eye ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            {isLogin && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link to="/password" className="text-sm text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loader}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loader ? 'opacity-70' : ''}`}
                            >
                                {loader ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : isLogin ? "Sign In" : "Sign Up"}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        {isLogin ? "New to EduTrack?" : "Already have an account?"}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError(null);
                                }}
                                className="mt-6 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {isLogin ? "Create new account" : "Sign in to existing account"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;