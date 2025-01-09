import React from 'react'

function Payment({ data }) {
   
   

    return (
        <div><h2 className="text-2xl font-semibold text-blue-600 text-[40px]">To'lov qilish</h2>

            <form className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">O'quvchi ismi</label>
                        <input
                            type="text"
                            placeholder="Ismni kiriting"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Yo'nalish</label>
                        <select className="w-full p-2 border rounded">
                            <option>Ona-tili</option>
                            <option>Matematika</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium">Telefon raqam</label>
                        <input
                            type="text"
                            placeholder="+998 xx xxx xx xx"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">To'lov qilayotgan kun</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
                    To'lov qilish
                </button>
            </form>

            <h2 className="text-2xl font-semibold text-blue-600 mt-8">
                To'lov qilganlar
            </h2>
            <div className="mt-4 bg-gray-50 p-4 rounded shadow">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border border-gray-300 p-2">№</th>
                            <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                            <th className="border border-gray-300 p-2">Telefon nomer</th>
                            <th className="border border-gray-300 p-2">Yo'nalish</th>
                            <th className="border border-gray-300 p-2">O'qituvchi</th>
                            <th className="border border-gray-300 p-2">To'lov vaqti</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((item) => {
                            return (<tr>
                                <td className="border border-gray-300 p-2">1</td>
                                <td className="border border-gray-300 p-2">{item.name} {item.surname}</td>
                                <td className="border border-gray-300 p-2">{item.phone}</td>
                                <td className="border border-gray-300 p-2">{item.group[0]?.group_name}</td>
                                <td className="border border-gray-300 p-2">O'qituvchi F.I.SH</td>
                                <td className="border border-gray-300 p-2">{item.updatedAt}</td>
                            </tr>)
                        }) : <h1>Ma'lumot yo'q.</h1>}
                        {/* More rows as needed */}
                    </tbody>
                </table>
            </div></div>
    )
}

export default Payment