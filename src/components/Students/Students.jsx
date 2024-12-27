import React from 'react';
import deleted from "./delete.svg";

const Students = () => {
  return (
    <div>
      <h2 className='text-2xl font-semibold text-blue-600'>Yangi o’quvchi qo’shish</h2>
      <form className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">O'quvchi ismi</label>
                        <input
                            type="text"
                            placeholder="Ismni kiriting"
                            className="w-full p-2 border rounded"
                        />
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
                        <label className="block font-medium">Yo'nalish</label>
                        <select className="w-full p-2 border rounded">
                            <option>Ona-tili</option>
                            <option>Matematika</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block font-medium">Ota-onasining ismi</label>
                        <input
                            type="text"
                            placeholder='Ota-onasining ismi'
                            className="w-full p-2 border rounded"
                        />
                    </div>


                    <div>
                        <label className="block font-medium">Ota-onasining nomeri</label>
                        <input
                            type="text"
                            placeholder="+998 xx xxx xx xx"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Rasm 3x4</label>
                        <input
                            type="file"
                            placeholder="Yuklash"
                            className="w-full p-2 border rounded"
                        />
                    </div>


                </div>
                <div className='flex justify-end'> 
                <button className="bg-blue-600 text-white px-44 py-3 rounded-md mt-2  hover:bg-blue-700">
                Qo’shish
                </button>
                </div>
            </form>

           <div className='flex justify-between items-center'>
           <h2 className="text-2xl font-semibold text-blue-600 mt-8">
            Bizning o’quvchilar
            </h2>
            <input style={{boxShadow:"0 4px 12px 0px rgba(#00000033)"}} className="px-20 py-3 rounded-2xl mt-8 outline-none " type="text" />



           </div>
            <div className="mt-4 bg-gray-50 p-4 rounded shadow">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border border-gray-300 p-2">№</th>
                            <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                            <th className="border border-gray-300 p-2">Telefon nomer</th>
                            <th className="border border-gray-300 p-2">Yo'nalish</th>
                            <th className="border border-gray-300 p-2">Ota-ona(F.I.SH)</th>
                            <th className="border border-gray-300 p-2">Ota-ona (Tel)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 p-2">1</td>
                            <td className="border border-gray-300 p-2">Muxamadaliyev Ibroxim</td>
                            <td className="border border-gray-300 p-2">+998900113861</td>
                            <td className="border border-gray-300 p-2">Matematika</td>
                            <td className="border border-gray-300 p-2">Ota-ona(F.I.SH)</td>
                            <td className="border border-gray-300 p-2 flex justify-around">+998900113861  <button> <img src={deleted} alt="" />  </button>  </td>
                        </tr>
                        {/* More rows as needed */}
                    </tbody>
                </table>
            </div>



    </div>
  )
}

export default Students