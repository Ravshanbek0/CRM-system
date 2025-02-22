import React, { useState } from 'react'

function PasswordVerify() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">

            <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-white text-center text-2xl mb-2"></h2>
                {/* {isLogin && <h3 className="text-red-500 text-center text-lg mb-6">{}</h3>} */}
                <form className="space-y-4">
                    <input
                        type={'email'}
                        placeholder="Email"
                        value=""
                        // onChange={handleChange(setPassword, "password")}
                        className={`w-full p-3 bg-[#333333] text-white rounded-lg border border-[#555555] focus:outline-none focus:ring-2 focus:ring-gray-600 pr-10`}
                    />
                </form>
                <p className="text-left text-gray-400 mt-4">
                    <button className="text-blue-400 hover:underline text-right" >
                        Jo'natish
                    </button>
                </p>

            </div>
        </div>
    )
}

export default PasswordVerify