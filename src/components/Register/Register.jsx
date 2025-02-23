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

    const validateInputs = () => {
        let newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!isLogin && !fullName.trim()) {
            newErrors.fullName = "Ism-familiya to'ldirilishi shart";
        }
        if (!emailRegex.test(username)) {
            newErrors.username = "Email gmail.com bilan tugashi kerak";
        }
        if (!passwordRegex.test(password)) {
            newErrors.password = "Parol kamida 6 ta belgidan iborat bo‘lishi, katta harf, raqam va maxsus belgini o‘z ichiga olishi kerak";
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
        if (!validateInputs()) return;

        try {
            const formData = new FormData();
            formData.append("email", username);
            formData.append("password", password);

            const response = await axios.post("https://crm-project.up.railway.app/api/v1/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("ref_token", response.data.refresh_token);
            localStorage.setItem("lastRefresh", Date.now().toString());
            setToken(response.data.access_token);
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error("Login Failed:", error);
            setError(error.response.data.message)

        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            const formData = new FormData();
            formData.append("email", username);
            formData.append("full_name", fullName);
            formData.append("password", password);

            const response = await axios.post("https://crm-project.up.railway.app/api/v1/admin", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", response.data.acc_token);
            localStorage.setItem("lastRefresh", Date.now().toString());
            setToken(response.data.acc_token);
        } catch (error) {
            console.error("Signup Failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">

            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-white text-center text-2xl mb-2">{isLogin ? "Login" : "Sign Up"}</h2>
                {isLogin && <h3 className="text-red-500 text-center text-lg mb-6">{error}</h3>}
                <form className="space-y-4" onSubmit={isLogin ? loginUser : handleSignup}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={handleChange(setFullName, "fullName")}
                                className={`w-full p-3 bg-[#333333] text-white rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-[#555555]'} focus:outline-none focus:ring-2 focus:ring-gray-600`}
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </>
                    )}
                    <input
                        type="text"
                        placeholder="Email"
                        value={username}
                        onChange={handleChange(setUsername, "username")}
                        className={`w-full p-3 bg-[#333333] text-white rounded-lg border ${errors.username ? 'border-red-500' : 'border-[#555555]'} focus:outline-none focus:ring-2 focus:ring-gray-600`}
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    <div className="relative">
                        <input
                            type={eye ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handleChange(setPassword, "password")}
                            className={`w-full p-3 bg-[#333333] text-white rounded-lg border ${errors.password ? 'border-red-500' : 'border-[#555555]'} focus:outline-none focus:ring-2 focus:ring-gray-600 pr-10`}
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                            onClick={() => setEye(!eye)}
                        >
                            {eye ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                        </span>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    <button
                        type="submit"
                        className="w-full p-3 bg-[#555555] text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p className="text-left text-gray-400 mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
                    <button className="text-blue-400 hover:underline" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
                {isLogin && <Link to={'/password'}><p className="text-left  text-blue-400 mt-1 cursor-pointer">Parolni unuttingizmi?</p></Link>}

            </div>
        </div>
    );
}

export default Register;
