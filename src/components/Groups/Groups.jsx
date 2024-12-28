import React, { useState } from 'react'

const Groups = () => {
    const [disable,setDisable]=useState(false)
    const [attendance, setAttendance] = useState([
        { id: 1, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 2, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 3, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 4, name: "Muxamadaliyev Ibroxim", present: false },
        { id: 5, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 6, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 7, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 8, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 9, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 10, name: "Muxamadaliyev Ibroxim", present: false },
    ]);
    const DisableFunc=()=>{
        setDisable(!disable)
    }

    
    
        const toggleAttendance = (id) => {
            setAttendance((prev) =>
                prev.map((student) =>
                    student.id === id ? { ...student, present: !student.present } : student
                )
            );
        };
    
        const absentStudents = attendance.filter((student) => !student.present);

  return (
    <div>


      <div className={disable==false ? 'block' : 'hidden'}>
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
                    <div onClick={DisableFunc} className="bg-white cursor-pointer shadow rounded-lg  overflow-hidden border border-gray-200">
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
                    <div onClick={DisableFunc} className="bg-white cursor-pointer shadow rounded-lg  overflow-hidden border border-gray-200">
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
                    <div onClick={DisableFunc} className="bg-white shadow cursor-pointer rounded-lg  overflow-hidden border border-gray-200">
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


      <div className={  disable==false ? 'hidden' : 'block'}>
        <h2 className='text-2xl font-semibold text-blue-600'>Informatika guruhi ro’yhati</h2>
        <br />
        <div className='flex gap-8'>
       <div>
       <div className="bg-white shadow w-fit rounded-lg  border border-gray-200">
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


                        <br />
                        <div>
                            <h2 className='font-bold text-2xl text-black'>Shu oy bo’yicha to'lov qilmaganlar </h2>
                            <br />
                            <p className='font-medium'>1.Muxamadaliyev Ibroxim</p>
                            <p className='font-medium'>2.Muxamadaliyev Ibroxim</p>
                            <p className='font-medium'>3.Muxamadaliyev Ibroxim</p>
                            <p className='font-medium'>4.Muxamadaliyev Ibroxim</p>



                        </div>
       </div>

                       


                        



       <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-300 p-2">№</th>
                                    <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                                    <th className="border border-gray-300 p-2">Davomat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((student) => (
                                    <tr
                                        key={student.id}
                                        className={student.id % 2 === 0 ? "bg-gray-100" : ""}
                                    >
                                        <td className="border border-gray-300 p-2 text-center">
                                            {student.id}
                                        </td>
                                        <td className="border border-gray-300 p-2">{student.name}</td>
                                        <td className="border border-gray-300 p-2 text-center">
                                            <button
                                                onClick={() => toggleAttendance(student.id)}
                                                className={`text-xl ${student.present ? "text-green-500" : "text-red-500"
                                                    }`}
                                            >
                                                {student.present ? "✔" : "✖"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

        </div>
      </div>




    </div>
  )
}

export default Groups