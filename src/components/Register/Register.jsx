import React, { useState } from "react";
import axios from "axios";

function Register({ token, setToken }) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("email", username);
            formData.append("password", password);

            const response = await axios.post("https://crm-project.up.railway.app/api/v1/auth/login", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            localStorage.setItem("token", response.data.access_token)
            localStorage.setItem("ref_token", response.data.refresh_token)
            localStorage.setItem("lastRefresh", Date.now().toString()); // So‘nggi yangilash vaqtini saqlash
            setToken(response.data.access_token)
            setUsername("")
            setPassword("")
            console.log("Login Success:", response.data);
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("email", username);
            formData.append("full_name", fullName);
            formData.append("password", password);

            const response = await axios.post("https://crm-project.up.railway.app/api/v1/admin", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Signup Success:", response.data);
            localStorage.setItem("token", response.data.acc_token)
            localStorage.setItem("lastRefresh", Date.now().toString()); // So‘nggi yangilash vaqtini saqlash
            setToken(response.data.acc_token)
        } catch (error) {
            console.error("Signup Failed:", error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-white text-center text-2xl mb-6">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                {isLogin ? (
                    <form className="space-y-4" onSubmit={loginUser}>
                        <input
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <button
                            type="submit"
                            onClick={loginUser}
                            className="w-full p-3 bg-[#555555] text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4" onSubmit={handleSignup}>
                        <input
                            type="text"
                            placeholder="FullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        <button
                            type="submit"
                            className="w-full p-3 bg-[#555555] text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Sign Up
                        </button>
                    </form>
                )}
                <p className="text-center text-gray-400 mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        className="text-blue-400 hover:underline"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Register
