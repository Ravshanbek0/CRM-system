import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Attendance({ setGroup_id, setLoading,dataGroup }) {
    const [combinedData, setCombinedData] = useState([]);
    const fetchData = async () => {
        try {
            // API so'rovlarini parallel bajarish
            const [teachersResponse, groupResponse] = await Promise.all([
                axios.get('https://crm-project.up.railway.app/api/v1/teacher/'), // Teachers API URL
                axios.get('https://crm-project.up.railway.app/api/v1/group/'),   // group API URL
            ]);

            // Ma'lumotlarni massivlar bo'yicha birlashtirish
            const combinedData = teachersResponse.data.map((teacher, index) => ({
                teacher,
                group: groupResponse.data[index] || null, // Guruh mavjud bo'lmasa null qo'shish
            }));

            setCombinedData(combinedData);
            console.log(combinedData);
            
        } catch (err) {
            console.error(err);
            setError('Ma\'lumotlarni olishda xatolik yuz berdi.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        // fetchData()

    }, [])

    return (
        <div>
            <main className="flex-1 p-6 bg-gray-50">
                <div className='flex justify-between items-center'>
                    <h1 className="text-2xl font-semibold text-[#333333] mb-6">Davomat oladigan guruhni tanlang</h1>
                    <input className='py-2 px-4 shadow rounded-lg outline-none border-none w-1/4' type="text" placeholder='Guruh nomini kiriting' />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}

                    {dataGroup && dataGroup.map((item, index) => {
                        console.log(item);
                        
                        return (<Link onClick={() => {

                            // setGroup_id(item.group._id)
                        }} to={`/attendenceGroup/${item._id}`}>
                            <div key={index} className="bg-white shadow rounded-lg  overflow-hidden border border-gray-200">
                                <h2 className="text-lg font-bold bg-[#333333] p-2 text-white mb-2 text-center">{item.group_name}</h2>
                                <div className='p-4'>
                                    {/* <div className='flex items-center'>
                                        <img src="./imgs/face.png" alt="" />
                                        <div>
                                            <p className="text-sm  text-[#333333] font-semibold mb-2">
                                                O'qituvchi: <span className="text-gray-500">{item.teacher.name}</span>
                                            </p>
                                            <p className="text-sm font-semibold text-[#333333] mb-2">
                                                Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-500"> {item.teacher.phone}</span></a>
                                            </p>
                                        </div>
                                    </div> */}
                                    <p className="text-sm text-[#333333] font-semibold  mb-2">Dars kunlari: <span className="text-gray-500">{item.lesson_dates}</span></p>
                                    <p className="text-sm text-[#333333] font-semibold  mb-2">Dars vaqti: <span className="text-gray-500">{item.lesson_time}</span></p>
                                    <p className="text-sm text-[#333333] font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-500">{item.group_pupils.length}ta</span></p>
                                    <p className="text-sm text-[#333333] font-semibold ">To'lov qilganlar: <span className="text-gray-500">{item.payment_done}ta</span></p>
                                </div>
                            </div>
                        </Link>)
                    })}




                </div>
            </main>
        </div>
    )
}

export default Attendance