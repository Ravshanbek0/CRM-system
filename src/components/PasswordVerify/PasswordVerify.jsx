import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PasswordVerify({ setToken }) {
    const navigate = useNavigate()

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
            alert('Email faqat @gmail.com bilan tugashi kerak!');
            return;
        }
        try {
            await axios.post('https://crm-project.up.railway.app/api/v1/email', { email });
            setShowCodeInput(true);
            setTimer(60);
        } catch (error) {
            alert('Kod yuborishda xatolik yuz berdi!');
        }
    };

    const verifyCode = async () => {
        if (!validateCode(code)) {
            alert('Kod 6 ta raqamdan iborat bo‘lishi kerak!');
            return;
        }
        try {
            await axios.post('https://crm-project.up.railway.app/api/v1/email/verify', { email, code });
            setShowResetForm(true);
            setShowCodeInput(false);
        } catch (error) {
            alert('Kod noto‘g‘ri yoki muddati o‘tib ketgan!');
        }
    };

    const resetPassword = async () => {
        setCodeDone(true)
        setError("");

        if (!validatePassword(newPassword)) {
            setCodeDone(false)

            setError("Parol kamida 6 ta belgidan iborat bo‘lishi, katta harf, raqam va maxsus belgini o‘z ichiga olishi kerak.");
            return;
        }
        try {
            await axios.post(`https://crm-project.up.railway.app/api/v1/admin/reset-pass/${email}`, {
                new_password: newPassword,
                confirm_password: confirmPassword
            });
            loginUser();
        } catch (error) {
            setError('Parolni tiklashda xatolik yuz berdi!');
            setCodeDone(false)

        }
        setCodeDone(false)
    };

    const loginUser = async () => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", newPassword);

            const response = await axios.post("https://crm-project.up.railway.app/api/v1/auth/login", formData, {
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("lastRefresh", Date.now().toString());
            setToken(response.data.access_token)
            navigate('/')
        } catch (error) {
            alert("Login Failed: " + error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-white text-center text-2xl mb-2">Parolni tiklash</h2>
                {!showResetForm ? (
                    <>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600 mt-2"
                        />
                        <button
                            onClick={sendCode}
                            className="w-full bg-blue-500 text-white p-2 rounded-lg mt-3 hover:bg-blue-600"
                            disabled={showCodeInput && timer > 0}
                        >
                            {showCodeInput && timer > 0 ? `Qayta yuborish (${timer}s)` : "Jo'natish"}
                        </button>
                        {showCodeInput && (
                            <div className="mt-4">
                                <p className='text-green-500'>Emailingizga borgan kodni kiriting:</p>
                                <input
                                    type="text"
                                    placeholder="Kodni kiriting"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.trim())}
                                    className="w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600 mt-2"
                                />
                                <button
                                    onClick={verifyCode}
                                    className="w-full bg-green-500 text-white p-2 rounded-lg mt-3 hover:bg-green-600"
                                >
                                    Tasdiqlash
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Yangi parol"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`w-full p-3 bg-[#333333] text-white rounded-lg border ${error ? "border-red-500" : "border-[#555555]"} focus:outline-none focus:ring-2 focus:ring-gray-600 mt-2`}
                            />
                            <span
                                className="absolute right-3 top-5 text-white cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Parolni tasdiqlash"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full p-3 bg-[#333333] text-white rounded-lg border ${error ? "border-red-500" : "border-[#555555]"} focus:outline-none focus:ring-2 focus:ring-gray-600 mt-2`}
                            />
                            <span
                                className="absolute right-3 top-5 text-white cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <button
                            onClick={resetPassword}
                            className="w-full bg-purple-500 text-white p-2 rounded-lg mt-3 hover:bg-purple-600"
                        >
                            {codeDone ? "Jo'natilmoqda..." : "Parolni tiklash"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default PasswordVerify;
