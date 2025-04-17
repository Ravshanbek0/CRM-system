import React, { useEffect, useState } from 'react'

function Payment({ data, dataGroup, setLoading, access_token }) {
    const [paymentData, setPayementData] = useState([])
    useEffect(() => {
        const obj = data.filter((item) => {
            return item.payment_done == true
        })
        setPayementData(obj)
    }, [])



    return (
        <div className="p-4 md:p-6">
            {/* Payment Form */}
            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-semibold text-[#333333] mb-4 md:mb-6">
                To'lov qilish
            </h2>

            <form className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm md:text-base font-medium">O'quvchi ismi</label>
                        <input
                            type="text"
                            placeholder="Ismni kiriting"
                            className="w-full p-2 text-sm md:text-base border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm md:text-base font-medium">Yo'nalish</label>
                        <select className="w-full p-2 text-sm md:text-base border rounded">
                            <option>Ona-tili</option>
                            <option>Matematika</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm md:text-base font-medium">Telefon raqam</label>
                        <input
                            type="text"
                            placeholder="+998 xx xxx xx xx"
                            className="w-full p-2 text-sm md:text-base border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm md:text-base font-medium">To'lov qilayotgan kun</label>
                        <input
                            type="date"
                            className="w-full p-2 text-sm md:text-base border rounded"
                        />
                    </div>
                </div>

                <button className="bg-[#333333] text-white px-4 py-2 text-sm md:text-base rounded mt-2 hover:bg-[#555555]">
                    To'lov qilish
                </button>
            </form>

            {/* Payment History */}
            <h2 className="text-2xl md:text-3xl font-semibold text-[#333333] mt-8 mb-4">
                To'lov qilganlar
            </h2>

            <div className="mt-4 overflow-x-auto">
                <div className="bg-gray-50 p-4 rounded shadow min-w-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#333333] text-white">
                                <th className="border border-gray-300 p-2 text-xs md:text-sm">№</th>
                                <th className="border border-gray-300 p-2 text-xs md:text-sm">O'quvchi ismi</th>
                                <th className="border border-gray-300 p-2 text-xs md:text-sm">Telefon nomer</th>
                                <th className="border border-gray-300 p-2 text-xs md:text-sm hidden md:table-cell">Yo'nalish</th>
                                <th className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">O'qituvchi</th>
                                <th className="border border-gray-300 p-2 text-xs md:text-sm">To'lov vaqti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentData.length > 0 ? (
                                paymentData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{index + 1}</td>
                                        <td className="border border-gray-300 p-2 text-xs md:text-sm">
                                            {item.name} {item.surname}
                                        </td>
                                        <td className="border border-gray-300 p-2 text-xs md:text-sm">{item.phone}</td>
                                        <td className="border border-gray-300 p-2 text-xs md:text-sm hidden md:table-cell">
                                            {item.group[0]?.group_name}
                                        </td>
                                        <td className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">
                                            O'qituvchi F.I.SH
                                        </td>
                                        <td className="border border-gray-300 p-2 text-xs md:text-sm">
                                            {new Date(item.updatedAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-red-600 p-2 font-semibold text-sm md:text-base">
                                        Ma'lumot yo'q.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Payment