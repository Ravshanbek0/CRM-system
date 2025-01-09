import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Attendance() {
    const [combinedData, setCombinedData] = useState([]);
    const fetchData = async () => {
        try {
          // API so'rovlarini parallel bajarish
          const [response1, response2] = await Promise.all([
            axios.get('https://crm-project.up.railway.app/api/v1/group/'), // Birinchi API URL
            axios.get('https://crm-project.up.railway.app/api/v1/teacher/'), // Ikkinchi API URL
          ]);
  
  
          // Key'larni noyob qilib obyektni birlashtirish
          const combined = {
            ...Object.fromEntries(
              Object.entries(response1.data).map(([key, value]) => [0, value])
            ),
            ...Object.fromEntries(
              Object.entries(response2.data).map(([key, value]) => [1, value])
            ),
          };
          
          setCombinedData([combined]);
        } catch (err) {
          console.error(err);
          setError('Ma\'lumotlarni olishda xatolik yuz berdi.');
        } finally {
        }
      };
    useEffect(() => {
        fetchData()
        console.log(combinedData);
        
    }, [])

    return (
        <div>
            <main className="flex-1 p-6 bg-gray-50">
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-semibold text-blue-600 mb-6">Davomat oladigan guruhni tanlang</h1>
                    <input className='py-2 px-4 shadow rounded-lg outline-none border-none w-1/4' type="text" placeholder='Guruh nomini kiriting' />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <Link to={'/attendenceGroup'}>
                        {combinedData && combinedData.map((item,index) => {
                            return (<div key={index} className="bg-white shadow rounded-lg  overflow-hidden border border-gray-200">
                                <h2 className="text-lg font-bold bg-blue-600 p-2 text-white mb-2 text-center">{item[1].group_name}</h2>
                                <div className='p-4'>
                                    <div className='flex items-center'>
                                        <img src="./imgs/face.png" alt="" />
                                        <div>
                                            <p className="text-sm  text-blue-800 font-semibold mb-2">
                                                O'qituvchi: <span className="text-gray-800">{item[1].name}</span>
                                            </p>
                                            <p className="text-sm font-semibold text-blue-800 mb-2">
                                                Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-800"> {item[1].phone}</span></a>
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-blue-800 font-semibold  mb-2">Dars kunlari: <span className="text-gray-800">{item[0].lesson_dates}</span></p>
                                    <p className="text-sm text-blue-800 font-semibold  mb-2">Dars vaqti: <span className="text-gray-800">14:00-16:00</span></p>
                                    <p className="text-sm text-blue-800 font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-800">{item[0].group_pupils.length}ta</span></p>
                                    <p className="text-sm text-blue-800 font-semibold ">To'lov qilganlar: <span className="text-gray-800">{item[0].payment_done}ta</span></p>
                                </div>
                            </div>)
                        })}
                    </Link>



                </div>
            </main>
        </div>
    )
}

export default Attendance