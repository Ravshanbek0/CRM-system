import React from 'react'

const Groups = () => {
  return (
    <div>
        <h2 className='text-2xl font-semibold text-blue-600'>Yangi guruh qo’shish</h2>
      <form className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">Guruh yo’nalishi</label>
                        <select className="w-full p-2 border rounded">
                            <option>Ona-tili</option>
                            <option>Matematika</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Dars kunlari</label>
                        <select className="w-full p-2 border rounded">
                            <option>DU-CHOR-JUMA</option>
                            <option>SE-PA-SHANBA</option>
                        </select>
                        
                    </div>
                    <div>
                        <label className="block font-medium">Dars vaqti</label>
                        <select className="w-full p-2 border rounded">
                            <option>14:00-16:00</option>
                            <option>16:00-18:00</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block font-medium">O’qituvchi</label>
                        <input
                            type="text"
                            placeholder="O'qituvchi ismi"
                            className="w-full p-2 border rounded"
                        />
                    </div>


                    <div>
                        <label className="block font-medium">O’qituvchi tel nomeri</label>
                        <input
                            type="text"
                            placeholder="+998 xx xxx xx xx"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">O’qituvchi rasmi (3x4)</label>
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
           Mavjud guruhlar
            </h2>
            <input placeholder='Guruh nomini kiriting' style={{boxShadow:"0 4px 12px 0px rgba(#00000033)"}} className="px-20 py-3 rounded-2xl mt-8 outline-none placeholder:ml-[-170px] " type="text" />



           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {/* Card 1 */}
                    <div className="bg-white shadow rounded-lg  overflow-hidden border border-gray-200">
                        <h2 className="text-lg font-bold bg-blue-600 p-2 text-white mb-2 text-center">Matematika</h2>
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <img src="./imgs/face.png" alt="" />
                                <div>
                                    <p className="text-sm  text-blue-800 font-semibold mb-2">
                                        O'qituvchi: <span className="text-gray-800">Muxamadaliyev Ibroxim</span>
                                    </p>
                                    <p className="text-sm font-semibold text-blue-800 mb-2">
                                        Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-800"> +998900113861</span></a>
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">Dars kunlari: <span className="text-gray-800">DU-CHOR-JUMA</span></p>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">Dars vaqti: <span className="text-gray-800">14:00-16:00</span></p>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-800">5ta</span></p>
                            <p className="text-sm text-blue-800 font-semibold ">To'lov qilganlar: <span className="text-gray-800">10ta</span></p>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg  overflow-hidden border border-gray-200">
                        <h2 className="text-lg font-bold bg-blue-600 p-2 text-white mb-2 text-center">Matematika</h2>
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <img src="./imgs/face.png" alt="" />
                                <div>
                                    <p className="text-sm  text-blue-800 font-semibold mb-2">
                                        O'qituvchi: <span className="text-gray-800">Muxamadaliyev Ibroxim</span>
                                    </p>
                                    <p className="text-sm font-semibold text-blue-800 mb-2">
                                        Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-800"> +998900113861</span></a>
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">Dars kunlari: <span className="text-gray-800">DU-CHOR-JUMA</span></p>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">Dars vaqti: <span className="text-gray-800">14:00-16:00</span></p>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-800">5ta</span></p>
                            <p className="text-sm text-blue-800 font-semibold ">To'lov qilganlar: <span className="text-gray-800">10ta</span></p>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded-lg  overflow-hidden border border-gray-200">
                        <h2 className="text-lg font-bold bg-blue-600 p-2 text-white mb-2 text-center">Matematika</h2>
                        <div className='p-4'>
                            <div className='flex items-center'>
                                <img src="./imgs/face.png" alt="" />
                                <div>
                                    <p className="text-sm  text-blue-800 font-semibold mb-2">
                                        O'qituvchi: <span className="text-gray-800">Muxamadaliyev Ibroxim</span>
                                    </p>
                                    <p className="text-sm font-semibold text-blue-800 mb-2">
                                        Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-800"> +998900113861</span></a>
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">Dars kunlari: <span className="text-gray-800">DU-CHOR-JUMA</span></p>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">Dars vaqti: <span className="text-gray-800">14:00-16:00</span></p>
                            <p className="text-sm text-blue-800 font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-800">5ta</span></p>
                            <p className="text-sm text-blue-800 font-semibold ">To'lov qilganlar: <span className="text-gray-800">10ta</span></p>
                        </div>
                    </div>


                </div>
    </div>
  )
}

export default Groups