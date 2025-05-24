import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PasswordVerify({ setToken }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);
    const [timer, setTimer] = useState(60);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [codeDone, setCodeDone] = useState(false);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let interval;
        if (showCodeInput && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setShowCodeInput(false);
        }
        return () => clearInterval(interval);
    }, [showCodeInput, timer]);

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };
    const validateCode = (code) => /^[0-9]{6}$/.test(code);

    const sendCode = async () => {
        if (!validateEmail(email)) {
            setError('Email must end with @gmail.com');
            return;
        }
        try {
            setLoader(true);
            setError("");
            await axios.post('https://crm-system-beta.vercel.app/api/v1/email', { email });
            setShowCodeInput(true);
            setTimer(60);
        } catch (error) {
            setError('Failed to send verification code');
        } finally {
            setLoader(false);
        }
    };

    const verifyCode = async () => {
        if (!validateCode(code)) {
            setError('Code must be 6 digits');
            return;
        }
        try {
            setLoader(true);
            setError("");
            await axios.post('https://crm-system-beta.vercel.app/api/v1/email/verify', { email, code });
            setShowResetForm(true);
            setShowCodeInput(false);
        } catch (error) {
            setError('Invalid or expired code');
        } finally {
            setLoader(false);
        }
    };

    const resetPassword = async () => {
        setCodeDone(true);
        setLoader(true);
        setError("");

        if (!validatePassword(newPassword)) {
            setCodeDone(false);
            setLoader(false);
            setError("Password must contain at least 6 characters, one uppercase letter, one number, and one special character");
            return;
        }
        try {
            await axios.post(`https://crm-system-beta.vercel.app/api/v1/admin/reset-pass/${email}`, {
                new_password: newPassword,
                confirm_password: confirmPassword
            });
            await loginUser();
        } catch (error) {
            setError('Failed to reset password');
            setCodeDone(false);
            setLoader(false);
        }
    };

    const loginUser = async () => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", newPassword);

            const response = await axios.post("https://crm-system-beta.vercel.app/api/v1/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("lastRefresh", Date.now().toString());
            setToken(response.data.access_token);
            navigate('/');
        } catch (error) {
            setError("Login failed: " + error.response?.data?.message);
        } finally {
            setLoader(false);
            setCodeDone(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">EduTrack CRM</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">Password Recovery</h2>
                    <p className="text-gray-500 mt-2">Reset your account password</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
                        <p>{error}</p>
                    </div>
                )}

                {!showResetForm ? (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="yourname@gmail.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#333] focus:border-[#555]"
                                />
                            </div>

                            <button
                                onClick={sendCode}
                                className={`w-full py-3 px-4 bg-[#333] hover:bg-[#555] text-white font-medium rounded-lg transition flex items-center justify-center ${(showCodeInput && timer > 0) || loader ? 'opacity-80' : ''}`}
                                disabled={(showCodeInput && timer > 0) || loader}
                            >
                                {loader ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : showCodeInput && timer > 0 ? `Resend Code (${timer}s)` : "Send Verification Code"}
                            </button>
                        </div>

                        {showCodeInput && (
                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                                    <p className="text-sm text-green-600 mb-2">We've sent a 6-digit code to your email</p>
                                    <input
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value.trim());
                                            setError("");
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#555] focus:border-[#333]"
                                    />
                                </div>

                                <button
                                    onClick={verifyCode}
                                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition flex items-center justify-center"
                                    disabled={loader}
                                >
                                    {loader ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </>
                                    ) : "Verify Code"}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setError("");
                                    }}
                                    className={`w-full px-4 py-3 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError("");
                                    }}
                                    className={`w-full px-4 py-3 rounded-lg border ${error ? "border-red-500" : "border-gray-300"} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12`}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={resetPassword}
                            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition flex items-center justify-center"
                            disabled={loader}
                        >
                            {loader ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Resetting...
                                </>
                            ) : "Reset Password"}
                        </button>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-600 hover:text-blue-800 font-medium transition"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PasswordVerify;